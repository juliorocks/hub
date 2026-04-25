import { readFileSync, existsSync } from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carrega .env antes de tudo (Vercel já injeta as vars; local usa o arquivo)
try {
  const envFile = path.join(__dirname, '.env');
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch (_) {}

const app = express();
const PORT = process.env.PORT || 3000;

const COOKIE_NAME = 'hub_admin';
const COOKIE_TTL  = 8 * 60 * 60; // 8h em segundos

// Lidos em runtime (não no topo) para garantir que dotenv já carregou
const getAdminPass    = () => process.env.ADMIN_PASS;
const getCookieSecret = () => process.env.SESSION_SECRET || 'hub-dev-secret';

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSP permissivo — permite scripts externos (GA, Meta Pixel, Firebase, fontes Google)
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.gstatic.com https://www.gstatic.com/firebasejs/ https://pagead2.googlesyndication.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https://images.unsplash.com https://www.facebook.com https://www.google-analytics.com https://www.googletagmanager.com; " +
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://graph.facebook.com https://*.firebaseio.com https://firestore.googleapis.com; " +
    "frame-src 'self' https://pagead2.googlesyndication.com; " +
    "object-src 'none';"
  );
  next();
});

// --- Cookie auth helpers ---
function signToken(value) {
  const sig = crypto.createHmac('sha256', getCookieSecret()).update(value).digest('hex');
  return `${value}.${sig}`;
}

function verifyToken(token) {
  if (!token) return false;
  const lastDot = token.lastIndexOf('.');
  if (lastDot === -1) return false;
  const value = token.slice(0, lastDot);
  const sig   = token.slice(lastDot + 1);
  const expected = crypto.createHmac('sha256', getCookieSecret()).update(value).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex')) && value === 'authenticated';
  } catch { return false; }
}

function parseCookies(req) {
  const raw = req.headers.cookie || '';
  return Object.fromEntries(raw.split(';').map(c => c.trim().split('=').map(decodeURIComponent)));
}

function isAdminAuth(req) {
  const cookies = parseCookies(req);
  return verifyToken(cookies[COOKIE_NAME]);
}

// --- HTML de login ---
function loginHTML(error = false) {
  return `<!DOCTYPE html>
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
    p.sub{color:#888;margin-bottom:2rem;font-size:.9rem}
    input{width:100%;padding:.875rem 1rem;background:#333;border:1px solid #444;border-radius:6px;color:white;font-size:1rem;margin-bottom:1rem;box-sizing:border-box}
    input:focus{outline:none;border-color:#38bdf8}
    button{width:100%;padding:.875rem;background:#38bdf8;color:white;border:none;border-radius:6px;font-weight:700;font-size:1rem;cursor:pointer}
    button:hover{background:#0284c7}
    .err{color:#f87171;font-size:.85rem;margin-top:.75rem}
  </style>
</head>
<body>
  <div class="box">
    <h2>Hub Admin</h2>
    <p class="sub">Área restrita</p>
    <form method="POST" action="/admin/login">
      <input type="password" name="password" placeholder="Senha" autofocus>
      <button type="submit">Entrar</button>
      ${error ? '<p class="err">Senha incorreta</p>' : ''}
    </form>
  </div>
</body>
</html>`;
}

// --- Middleware de proteção do admin ---
function requireAdminAuth(req, res, next) {
  if (isAdminAuth(req)) return next();
  res.status(200).send(loginHTML());
}

// --- Rotas de login/logout ---
app.post('/admin/login', (req, res) => {
  const ADMIN_PASS = getAdminPass();
  if (!ADMIN_PASS) return res.status(500).send('ADMIN_PASS não configurado.');
  if (req.body.password === ADMIN_PASS) {
    const token = signToken('authenticated');
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/admin; Max-Age=${COOKIE_TTL}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
    return res.redirect('/admin');
  }
  res.status(401).send(loginHTML(true));
});

app.get('/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/admin; Max-Age=0`);
  res.redirect('/admin');
});

// --- Arquivos estáticos públicos ---
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages',  express.static(path.join(__dirname, 'pages')));

// Raiz e arquivos públicos soltos (exclui /admin — protegido pela rota abaixo)
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) return next();
  express.static(__dirname, { index: 'index.html' })(req, res, next);
});

app.get('/index.html', (req, res) => res.redirect('/'));

// --- API: Meta Conversions API ---
const PIXEL_ID    = '1598794954687611';
const META_API_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

function normalizePhone(phone) {
  if (!phone) return null;
  return phone.replace(/\D/g, '').replace(/^0/, '55');
}

app.post('/api/lead', async (req, res) => {
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;
  if (!ACCESS_TOKEN) return res.status(500).json({ error: 'Server misconfigured' });

  try {
    const { name, email, whatsapp, course_name, category, url, event_id } = req.body;

    const hash = v => v ? crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex') : null;
    const [hashedEmail, hashedPhone, hashedName] = [
      hash(email),
      hash(normalizePhone(whatsapp)),
      hash(name),
    ];

    const payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: event_id || `lead_${Date.now()}`,
        event_source_url: url,
        action_source: 'website',
        user_data: {
          em: hashedEmail, ph: hashedPhone, fn: hashedName,
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress,
        },
        custom_data: { content_name: course_name, content_category: category, currency: 'BRL', value: 0 },
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

// --- Admin (protegido) ---
app.use('/admin', requireAdminAuth, express.static(path.join(__dirname, 'admin'), { index: 'index.html' }));

// --- 404 ---
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), err => {
    if (err) res.status(404).send('Página não encontrada');
  });
});

app.listen(PORT, () => console.log(`Hub do Estudante rodando na porta ${PORT}`));

export default app;
