import { readFileSync, existsSync } from 'fs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import admin from 'firebase-admin';

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

// --- Firebase Admin — inicializa imediatamente no startup ---
let firestoreDb = null;
try {
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountEnv) {
    const sa = JSON.parse(serviceAccountEnv);
    if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(sa) });
    console.log('[Firebase Admin] iniciado via env var');
  } else {
    const saPath = path.join(__dirname, 'firebase-service-account.json');
    if (existsSync(saPath)) {
      const sa = JSON.parse(readFileSync(saPath, 'utf8'));
      if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(sa) });
      console.log('[Firebase Admin] iniciado via arquivo local');
    } else {
      console.warn('[Firebase Admin] sem credenciais — SSR desativado');
    }
  }
  if (admin.apps.length) firestoreDb = admin.firestore();
} catch (e) {
  console.error('[Firebase Admin] init error:', e.message);
}

function getFirestore() { return firestoreDb; }

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

// Raiz e arquivos públicos soltos (exclui /admin e index.html — ambos têm rota própria)
app.use((req, res, next) => {
  if (req.path.startsWith('/admin')) return next();
  if (req.path === '/' || req.path === '/index.html') return next();
  express.static(__dirname, { index: false })(req, res, next);
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

// --- SSR: Artigos do Firestore ---
const ARTICLE_COLLECTIONS = {
  guias:    { section: 'guias',    label: 'Guias',    area: 'guias' },
  'enem-2026': { section: 'enem-2026', label: 'ENEM 2026', area: 'enem-2026' },
  'carreiras/salarios': { section: 'carreiras/salarios', label: 'Salários', area: 'carreiras' },
};

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function renderArticle(a, section) {
  const { label, area } = ARTICLE_COLLECTIONS[section] || { label: section, area: section };
  const canonical = `https://hubdoestudante.com.br/pages/${section}/${a.slug}.html`;
  const dateStr   = formatDate(a.publishDate);
  const dateIso   = a.publishDate ? a.publishDate.split('T')[0] : '';
  const readTime  = a.readTime || '5 min de leitura';

  const breadcrumbLabel = section === 'carreiras/salarios' ? 'Salários' :
                          section === 'enem-2026' ? 'ENEM 2026' : 'Guias';
  const breadcrumbHref  = section === 'carreiras/salarios' ? '/pages/carreiras/salarios/' :
                          `/pages/${section}/`;

  const heroImage = a.image
    ? `<img src="${a.image}" alt="${a.title}" loading="lazy">`
    : '';

  const badgeType = a.badgeType || 'guide';
  const badgeLabel = a.badgeLabel || label;
  const badgeTag   = a.badgeTag  || '';

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": a.title,
    "description": a.metaDescription || a.subtitle || '',
    "image": a.image || '',
    "datePublished": dateIso,
    "dateModified": a.updatedAt ? a.updatedAt.split('T')[0] : dateIso,
    "author": { "@type": "Organization", "name": "Hub do Estudante" },
    "publisher": { "@type": "Organization", "name": "Hub do Estudante" }
  });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${(a.metaDescription || a.subtitle || '').replace(/"/g, '&quot;')}">
  <title>${a.title} | Hub do Estudante</title>
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${a.title}">
  <meta property="og:description" content="${(a.metaDescription || a.subtitle || '').replace(/"/g, '&quot;')}">
  <meta property="og:url" content="${canonical}">
  ${a.image ? `<meta property="og:image" content="${a.image}">` : ''}
  <meta name="robots" content="index, follow">
  <script type="application/ld+json">${schema}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"></noscript>
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/layout.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/article.css">
  <link rel="stylesheet" href="/assets/css/responsive.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4663943063143621" crossorigin="anonymous"></script>
</head>
<body class="page-wrapper" data-area="${area}" data-course="${a.slug}" data-course-name="${a.title}">

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="/" class="breadcrumb__link" itemprop="item"><span itemprop="name">Home</span></a>
          <meta itemprop="position" content="1">
        </li>
        <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="${breadcrumbHref}" class="breadcrumb__link" itemprop="item"><span itemprop="name">${breadcrumbLabel}</span></a>
          <meta itemprop="position" content="2">
        </li>
        <li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <span itemprop="name">${a.title}</span>
          <meta itemprop="position" content="3">
        </li>
      </ol>
    </div>
  </nav>

  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge content-type-badge--${badgeType}">${badgeLabel}</span>
          ${badgeTag ? `<span class="badge badge--green">${badgeTag}</span>` : ''}
        </div>
        <h1 class="article-hero__title">${a.title}</h1>
        ${a.subtitle ? `<p class="article-hero__subtitle">${a.subtitle}</p>` : ''}
        <div class="article-hero__byline">
          <span>Por <strong>Redação Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="${dateIso}">${dateStr}</time>
          <span>·</span>
          <span>${readTime}</span>
        </div>
        ${heroImage}
      </header>

      ${a.quickAnswer ? `
      <div class="quick-answer">
        <div class="quick-answer__label">Resposta rápida</div>
        <p class="quick-answer__text">${a.quickAnswer}</p>
      </div>` : ''}

      <nav class="toc" aria-label="Índice" id="toc">
        <div class="toc__title">Neste artigo</div>
        <ol class="toc__list" id="toc-list"></ol>
      </nav>

      <div class="article-content" id="article-content">
        ${a.content || ''}
      </div>
    </article>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Estudar com Desconto</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate" rel="noopener sponsored">Anhanguera, até 50% off</a>
          <a href="/pages/universidades/unopar.html" class="btn btn--affiliate" rel="noopener sponsored">Unopar, até 50% off</a>
          <a href="/pages/universidades/uniderp.html" class="btn btn--affiliate" rel="noopener sponsored">Uniderp, até 50% off</a>
        </div>
      </div>
    </aside>
  </main>

  <script src="/assets/js/components-loader.js"></script>
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>`;
}

async function serveArticle(req, res, section) {
  const slug = req.params.slug;
  const db = getFirestore();
  if (!db) return res.status(503).send('Serviço indisponível');
  try {
    const snap = await db.collection('articles')
      .where('slug', '==', slug)
      .where('category', '==', section)
      .limit(1).get();
    if (snap.empty) return res.status(404).sendFile(path.join(__dirname, '404.html'), e => {
      if (e) res.status(404).send('Artigo não encontrado');
    });
    const article = snap.docs[0].data();
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    res.send(renderArticle(article, section));
  } catch (e) {
    console.error('[SSR]', e);
    res.status(500).send('Erro interno');
  }
}

// --- SSR: Home Page ---
function articleUrl(a) {
  const base = a.category === 'carreiras/salarios' ? '/pages/carreiras/salarios/'
             : a.category === 'enem-2026'          ? '/pages/enem-2026/'
             : '/pages/guias/';
  return `${base}${a.slug}`;
}

function cardFeatured(a) {
  const date = new Date(a.publishDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return `
  <article class="card card--featured destaques-grid__main">
    <div class="card__image">
      <img width="800" height="450" fetchpriority="high" loading="eager" src="${a.image || ''}" alt="${a.title}">
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span class="content-type-badge content-type-badge--${a.badgeType || 'guide'}">${a.badgeLabel || 'Guia'}</span>
        ${a.badgeTag ? `<span class="badge badge--purple">${a.badgeTag}</span>` : ''}
      </div>
      <h3 class="card__title"><a href="${articleUrl(a)}">${a.title}</a></h3>
      <p class="card__excerpt">${a.subtitle || ''}</p>
      <div class="card__footer">
        <span class="card__date">${date}</span>
        <span class="card__read-time">${a.readTime || '5 min'}</span>
      </div>
    </div>
  </article>`;
}

function cardSmall(a, eager = false) {
  const date = new Date(a.publishDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
  return `
  <article class="card">
    <div class="card__image">
      <img width="800" height="450" loading="${eager ? 'eager' : 'lazy'}" src="${a.image || ''}" alt="${a.title}">
    </div>
    <div class="card__body">
      <div class="card__meta">
        <span class="content-type-badge content-type-badge--${a.badgeType || 'guide'}">${a.badgeLabel || 'Guia'}</span>
        ${a.badgeTag ? `<span class="badge badge--green">${a.badgeTag}</span>` : ''}
      </div>
      <h3 class="card__title"><a href="${articleUrl(a)}">${a.title}</a></h3>
      <p class="card__excerpt">${a.subtitle || ''}</p>
      <div class="card__footer">
        <span class="card__date">${date}</span>
        <span class="card__read-time">${a.readTime || '5 min'}</span>
      </div>
    </div>
  </article>`;
}

app.get(['/', '/index.html'], async (req, res) => {
  if (req.path === '/index.html') return res.redirect(301, '/');

  let html = readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const db = getFirestore();

  if (db) {
    try {
      const snap = await db.collection('articles').get();
      const arts = [];
      snap.forEach(d => arts.push(d.data()));
      arts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

      const featured  = arts[0];
      const sideCards = arts.slice(1, 3);
      const gridCards = arts.slice(3, 21);

      html = html.replace('<!--DESTAQUE_FEATURED-->', featured ? cardFeatured(featured) : '');
      html = html.replace('<!--DESTAQUE_SIDE-->', sideCards.map(a => cardSmall(a, true)).join(''));
      html = html.replace('<!--ARTICLES_GRID-->', gridCards.map(a => cardSmall(a)).join(''));
    } catch (e) {
      console.error('[Home SSR]', e.message);
      html = html.replace('<!--DESTAQUE_FEATURED-->', '').replace('<!--DESTAQUE_SIDE-->', '').replace('<!--ARTICLES_GRID-->', '');
    }
  } else {
    console.warn('[Home SSR] Firebase não disponível');
    html = html.replace('<!--DESTAQUE_FEATURED-->', '').replace('<!--DESTAQUE_SIDE-->', '').replace('<!--ARTICLES_GRID-->', '');
  }

  res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=60');
  res.send(html);
});

// Rotas SSR — antes dos estáticos para ter prioridade
app.get('/pages/guias/:slug.html',              (req, res) => serveArticle(req, res, 'guias'));
app.get('/pages/guias/:slug',                   (req, res) => serveArticle(req, res, 'guias'));
app.get('/pages/enem-2026/:slug.html',          (req, res) => serveArticle(req, res, 'enem-2026'));
app.get('/pages/enem-2026/:slug',               (req, res) => serveArticle(req, res, 'enem-2026'));
app.get('/pages/carreiras/salarios/:slug.html', (req, res) => serveArticle(req, res, 'carreiras/salarios'));
app.get('/pages/carreiras/salarios/:slug',      (req, res) => serveArticle(req, res, 'carreiras/salarios'));

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
