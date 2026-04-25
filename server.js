import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'hub-dev-secret-change-in-prod',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000, // 8 horas
  },
}));

// --- Arquivos estáticos públicos (assets, pages, etc) ---
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// --- Rotas públicas ---
const publicFiles = ['index.html', 'sobre.html', 'politica-privacidade.html', 'termos-de-uso.html', 'ads.txt', 'robots.txt', 'sitemap.xml', 'sitemap-index.xml'];
publicFiles.forEach(file => {
  app.get(`/${file === 'index.html' ? '' : file}`, (req, res) => {
    res.sendFile(path.join(__dirname, file));
  });
});
app.get('/index.html', (req, res) => res.redirect('/'));

// --- API: Meta Conversions API ---
const PIXEL_ID = '1598794954687611';
const META_API_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

async function sha256(value) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function normalizePhone(phone) {
  if (!phone) return null;
  return phone.replace(/\D/g, '').replace(/^0/, '55');
}

app.post('/api/lead', async (req, res) => {
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
  if (!ACCESS_TOKEN) {
    console.error('[CAPI] META_CAPI_TOKEN não configurado');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const { name, email, whatsapp, course_name, category, url, event_id } = req.body;

    const [hashedEmail, hashedPhone, hashedName] = await Promise.all([
      sha256(email),
      sha256(normalizePhone(whatsapp)),
      sha256(name),
    ]);

    const payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id || `lead_${Date.now()}`,
        event_source_url: url,
        action_source: 'website',
        user_data: {
          em: hashedEmail,
          ph: hashedPhone,
          fn: hashedName,
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress,
        },
        custom_data: {
          content_name: course_name,
          content_category: category,
          currency: 'BRL',
          value: 0,
        },
      }],
    };

    const response = await fetch(`${META_API_URL}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) return res.status(502).json({ error: 'Meta API error', details: result });
    return res.status(200).json({ success: true, events_received: result.events_received });

  } catch (error) {
    console.error('[CAPI] Erro:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Admin: autenticação ---
const ADMIN_PASS = process.env.ADMIN_PASS;

// Middleware que protege tudo em /admin exceto o POST de login
function requireAdminAuth(req, res, next) {
  if (req.session?.adminAuth) return next();
  // Serve a tela de login
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Hub do Estudante</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#1a1a1a;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .box{background:#262626;padding:2.5rem;border-radius:12px;width:100%;max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
    h2{color:#38bdf8;margin-bottom:.5rem;font-size:1.5rem}
    p{color:#888;margin-bottom:2rem;font-size:.9rem}
    input{width:100%;padding:.875rem 1rem;background:#333;border:1px solid #444;border-radius:6px;color:white;font-size:1rem;margin-bottom:1rem}
    input:focus{outline:none;border-color:#38bdf8}
    button{width:100%;padding:.875rem;background:#38bdf8;color:white;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer}
    button:hover{background:#0284c7}
    .err{color:#f87171;font-size:.85rem;margin-top:.5rem;display:none}
  </style>
</head>
<body>
  <div class="box">
    <h2>Hub Admin</h2>
    <p>Área restrita</p>
    <form method="POST" action="/admin/login">
      <input type="password" name="password" placeholder="Senha" autofocus>
      <button type="submit">Entrar</button>
    </form>
  </div>
</body>
</html>`);
}

app.post('/admin/login', (req, res) => {
  if (!ADMIN_PASS) return res.status(500).send('ADMIN_PASS não configurado no servidor.');
  if (req.body.password === ADMIN_PASS) {
    req.session.adminAuth = true;
    return res.redirect('/admin');
  }
  res.status(401).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin — Hub do Estudante</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#1a1a1a;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .box{background:#262626;padding:2.5rem;border-radius:12px;width:100%;max-width:360px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
    h2{color:#38bdf8;margin-bottom:.5rem;font-size:1.5rem}
    p{color:#888;margin-bottom:2rem;font-size:.9rem}
    input{width:100%;padding:.875rem 1rem;background:#333;border:1px solid #444;border-radius:6px;color:white;font-size:1rem;margin-bottom:1rem}
    input:focus{outline:none;border-color:#38bdf8}
    button{width:100%;padding:.875rem;background:#38bdf8;color:white;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer}
    button:hover{background:#0284c7}
    .err{color:#f87171;font-size:.85rem;margin-top:.5rem}
  </style>
</head>
<body>
  <div class="box">
    <h2>Hub Admin</h2>
    <p>Área restrita</p>
    <form method="POST" action="/admin/login">
      <input type="password" name="password" placeholder="Senha" autofocus>
      <button type="submit">Entrar</button>
      <p class="err">Senha incorreta</p>
    </form>
  </div>
</body>
</html>`);
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
});

// Serve o admin (protegido) — requireAdminAuth bloqueia tudo incluindo arquivos estáticos
app.use('/admin', requireAdminAuth, express.static(path.join(__dirname, 'admin'), { index: 'index.html' }));

// --- 404 ---
app.use((req, res) => {
  const file404 = path.join(__dirname, '404.html');
  res.status(404).sendFile(file404, err => {
    if (err) res.status(404).send('Página não encontrada');
  });
});

app.listen(PORT, () => console.log(`Hub do Estudante rodando na porta ${PORT}`));

export default app;
