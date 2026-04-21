// Admin Panel - Article Management
let db;
let currentEditingId = null;
const CATEGORIES = {
  'guias': 'pages/guias',
  'enem-2026': 'pages/enem-2026',
  'carreiras': 'pages/carreiras/salarios',
  'graduacao': 'pages/graduacao',
  'pos-graduacao': 'pages/pos-graduacao',
  'cursos-tecnicos': 'pages/cursos-tecnicos',
  'cursos-livres': 'pages/cursos-livres',
  'universidades': 'pages/universidades'
};

// Initialize Firebase
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize Firebase se ainda não foi feito
    if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
      const firebaseConfig = {
        apiKey: "AIzaSyCFir3vbG5Qak0K36dhznwXf77RiFN0g2I",
        authDomain: "hub-do-estudante.firebaseapp.com",
        projectId: "hub-do-estudante",
        storageBucket: "hub-do-estudante.firebasestorage.app",
        messagingSenderId: "836885204421",
        appId: "1:836885204421:web:d4cda9045c8d81914a8fac"
      };
      firebase.initializeApp(firebaseConfig);
    }

    // Wait for Firebase to be ready
    await new Promise(resolve => {
      const checkFirebase = setInterval(() => {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
          clearInterval(checkFirebase);
          resolve();
        }
      }, 100);
      setTimeout(() => clearInterval(checkFirebase), 5000);
    });

    db = firebase.firestore();
    setupEventListeners();
    initializeTinyMCE();
    loadArticles();
    setTodayDate();
  } catch (error) {
    console.error('Firebase initialization error:', error);
    alert('Erro ao inicializar Firebase. Verifique o console.');
  }
});

function initializeTinyMCE() {
  tinymce.init({
    selector: '#article-content',
    height: 400,
    menubar: false,
    plugins: 'lists link',
    toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist | link'
  });
}

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.admin-nav__item').forEach(btn => {
    btn.addEventListener('click', switchSection);
  });

  // Articles section buttons
  document.getElementById('new-article-btn').addEventListener('click', () => {
    switchSection({ target: { dataset: { section: 'create' } } });
    resetForm();
  });

  // Create section buttons
  document.getElementById('close-form-btn').addEventListener('click', () => {
    switchSection({ target: { dataset: { section: 'articles' } } });
  });

  document.getElementById('cancel-btn').addEventListener('click', () => {
    switchSection({ target: { dataset: { section: 'articles' } } });
  });

  // Form submission
  document.getElementById('article-form').addEventListener('submit', saveArticle);

  // Delete button
  document.getElementById('delete-btn').addEventListener('click', deleteArticle);

  // Download button
  document.getElementById('download-btn').addEventListener('click', () => {
    const articleData = {
      title: document.getElementById('article-title').value,
      slug: document.getElementById('article-slug').value,
      category: document.getElementById('article-category').value,
      badge: document.getElementById('article-badge').value,
      badgeType: document.getElementById('article-badge-type').value,
      subtitle: document.getElementById('article-subtitle').value,
      image: document.getElementById('article-image').value,
      imageAlt: document.getElementById('article-image-alt').value,
      imageCaption: document.getElementById('article-image-caption').value,
      quickAnswer: document.getElementById('article-quick-answer').value,
      content: tinymce.get('article-content').getContent(),
      readTime: parseInt(document.getElementById('article-read-time').value),
      publishDate: document.getElementById('article-date').value,
      author: document.getElementById('article-author').value
    };
    downloadHTML(articleData);
  });

  // Filters
  document.getElementById('search-articles').addEventListener('input', filterArticles);
  document.getElementById('filter-category').addEventListener('change', filterArticles);

  // Auto-generate slug
  document.getElementById('article-title').addEventListener('input', (e) => {
    const slug = e.target.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    document.getElementById('article-slug').value = slug;
  });
}

function switchSection(e) {
  const section = e.target.dataset.section;

  // Update nav active state
  document.querySelectorAll('.admin-nav__item').forEach(item => {
    item.classList.toggle('admin-nav__item--active', item.dataset.section === section);
  });

  // Update section display
  document.querySelectorAll('.admin-section').forEach(sec => {
    sec.classList.toggle('admin-section--active', sec.id === `${section}-section`);
  });
}

async function loadArticles() {
  try {
    const list = document.getElementById('articles-list');
    list.innerHTML = '<p class="loading">Carregando artigos...</p>';

    const snapshot = await db.collection('articles').orderBy('publishDate', 'desc').get();

    if (snapshot.empty) {
      list.innerHTML = '<p class="loading">Nenhum artigo criado ainda.</p>';
      return;
    }

    let html = '';
    snapshot.forEach(doc => {
      const article = doc.data();
      html += renderArticleCard(doc.id, article);
    });

    list.innerHTML = html;

    // Add event listeners to cards
    document.querySelectorAll('.article-card__edit').forEach(btn => {
      btn.addEventListener('click', () => editArticle(btn.dataset.id));
    });

    document.querySelectorAll('.article-card__delete').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja deletar este artigo?')) {
          removeArticle(btn.dataset.id);
        }
      });
    });
  } catch (error) {
    console.error('Error loading articles:', error);
    document.getElementById('articles-list').innerHTML = '<p class="loading">Erro ao carregar artigos.</p>';
  }
}

function renderArticleCard(id, article) {
  const date = new Date(article.publishDate).toLocaleDateString('pt-BR');
  return `
    <div class="article-card">
      <h3 class="article-card__title">${article.title}</h3>
      <div class="article-card__meta">
        <span class="article-card__category">${article.category}</span>
        <span class="article-card__date">${date}</span>
      </div>
      <p class="article-card__excerpt">${article.subtitle.substring(0, 100)}...</p>
      <div class="article-card__actions">
        <button class="article-card__edit" data-id="${id}">Editar</button>
        <button class="article-card__delete" data-id="${id}">Deletar</button>
      </div>
    </div>
  `;
}

async function editArticle(id) {
  try {
    const doc = await db.collection('articles').doc(id).get();
    if (!doc.exists) {
      alert('Artigo não encontrado');
      return;
    }

    const article = doc.data();
    currentEditingId = id;

    // Populate form
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-slug').value = article.slug;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-badge').value = article.badge || '';
    document.getElementById('article-badge-type').value = article.badgeType || 'guide';
    document.getElementById('article-subtitle').value = article.subtitle;
    document.getElementById('article-image').value = article.image;
    document.getElementById('article-image-alt').value = article.imageAlt;
    document.getElementById('article-image-caption').value = article.imageCaption || '';
    document.getElementById('article-quick-answer').value = article.quickAnswer;
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-read-time').value = article.readTime || 10;
    document.getElementById('article-date').value = article.publishDate.split('T')[0];
    document.getElementById('article-author').value = article.author;

    document.getElementById('form-title').textContent = 'Editar Artigo';
    document.getElementById('delete-btn').style.display = 'block';
    document.getElementById('download-btn').style.display = 'block';

    // Switch to form
    switchSection({ target: { dataset: { section: 'create' } } });
  } catch (error) {
    console.error('Error editing article:', error);
    alert('Erro ao carregar artigo');
  }
}

async function saveArticle(e) {
  e.preventDefault();

  const articleData = {
    title: document.getElementById('article-title').value,
    slug: document.getElementById('article-slug').value,
    category: document.getElementById('article-category').value,
    badge: document.getElementById('article-badge').value,
    badgeType: document.getElementById('article-badge-type').value,
    subtitle: document.getElementById('article-subtitle').value,
    image: document.getElementById('article-image').value,
    imageAlt: document.getElementById('article-image-alt').value,
    imageCaption: document.getElementById('article-image-caption').value,
    quickAnswer: document.getElementById('article-quick-answer').value,
    content: tinymce.get('article-content').getContent(),
    readTime: parseInt(document.getElementById('article-read-time').value),
    publishDate: document.getElementById('article-date').value + 'T00:00:00Z',
    author: document.getElementById('article-author').value,
    updatedAt: new Date().toISOString()
  };

  try {
    if (currentEditingId) {
      await db.collection('articles').doc(currentEditingId).update(articleData);
      alert('Artigo atualizado com sucesso!');
    } else {
      articleData.createdAt = new Date().toISOString();
      const docRef = await db.collection('articles').add(articleData);
      alert('Artigo criado com sucesso!');
      currentEditingId = docRef.id;
    }

    // Reload articles
    loadArticles();
    switchSection({ target: { dataset: { section: 'articles' } } });
  } catch (error) {
    console.error('Error saving article:', error);
    alert('Erro ao salvar artigo: ' + error.message);
  }
}

function downloadArticleHTML(article) {
  // Generate HTML content
  const basePath = getBasePath(article.category);
  const dateObj = new Date(article.publishDate);
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  const isoDate = article.publishDate.split('T')[0];

  const badgeClass = getBadgeClass(article.badgeType);
  const breadcrumb = generateBreadcrumb(article.category, getCategoryDisplayName(article.category), article.title);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.title} | Hub do Estudante</title>
  <meta name="description" content="${article.subtitle}">
  <link rel="canonical" href="https://www.hubdoestudante.com.br/${article.category}/${article.slug}/">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${article.title}">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${article.title}","datePublished":"${isoDate}","dateModified":"${isoDate}","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"></noscript>
  <link rel="stylesheet" href="${basePath}assets/css/base.css">
  <link rel="stylesheet" href="${basePath}assets/css/layout.css">
  <link rel="stylesheet" href="${basePath}assets/css/components.css">
  <link rel="stylesheet" href="${basePath}assets/css/article.css">
  <link rel="stylesheet" href="${basePath}assets/css/responsive.css">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4663943063143621" crossorigin="anonymous"></script>
  <link rel="icon" type="image/svg+xml" href="${basePath}assets/img/favicon.svg">
</head>
<body class="page-wrapper">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      ${breadcrumb}
    </div>
  </nav>

  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge ${badgeClass}">${article.badge || 'Artigo'}</span>
          ${article.badgeType === 'enem' ? '<span class="badge badge--green">Atualizado 2026</span>' : ''}
        </div>
        <h1 class="article-hero__title">${article.title}</h1>
        <p class="article-hero__subtitle">${article.subtitle}</p>
        <div class="article-hero__byline">
          <span>Por <strong>${article.author}</strong></span>
          <span>·</span>
          <time datetime="${isoDate}">${formattedDate}</time>
          <span>·</span>
          <span>${article.readTime} min de leitura</span>
        </div>
      </header>

      <figure class="article-figure">
        <img src="${article.image}" alt="${article.imageAlt}" width="900" height="500" loading="eager" fetchpriority="high">
        ${article.imageCaption ? `<figcaption>${article.imageCaption}</figcaption>` : ''}
      </figure>

      <div class="quick-answer">
        <div class="quick-answer__label">Resposta direta</div>
        <p class="quick-answer__text">${article.quickAnswer}</p>
      </div>

      <nav class="toc" aria-label="Índice" id="toc">
        <div class="toc__title">Neste artigo</div>
        <ol class="toc__list" id="toc-list"></ol>
      </nav>

      <div class="article-content" id="article-content">
        ${article.content}
      </div>
    </article>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Outros guias úteis</h3>
        <ul class="sidebar-links">
          <li><a href="#" class="sidebar-link">Confira mais artigos</a></li>
        </ul>
      </div>
    </aside>
  </main>

  <script src="${basePath}assets/js/components-loader.js"></script>
  <script type="module" src="${basePath}assets/js/main.js"></script>
</body>
</html>`;

  return html;
}

function getBasePath(category) {
  const depth = category.split('/').length;
  return '../'.repeat(depth + 1);
}

function getBadgeClass(badgeType) {
  const classes = {
    'guide': 'content-type-badge--guide',
    'enem': 'content-type-badge--enem',
    'finance': 'content-type-badge--finance',
    'job': 'content-type-badge--job'
  };
  return classes[badgeType] || 'content-type-badge--guide';
}

function getCategoryDisplayName(category) {
  const names = {
    'guias': 'Guias',
    'enem-2026': 'ENEM 2026',
    'carreiras': 'Carreiras',
    'graduacao': 'Graduação',
    'pos-graduacao': 'Pós-graduação',
    'cursos-tecnicos': 'Cursos Técnicos',
    'cursos-livres': 'Cursos Livres',
    'universidades': 'Universidades'
  };
  return names[category] || category;
}

function generateBreadcrumb(category, categoryName, articleTitle) {
  const breadcrumbs = {
    'guias': `
        <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
          <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"></li>
          <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Guias</span></a><meta itemprop="position" content="2"></li>
          <li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${articleTitle}</span><meta itemprop="position" content="3"></li>
        </ol>
      `,
    'enem-2026': `
        <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
          <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1"></li>
          <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">ENEM 2026</span></a><meta itemprop="position" content="2"></li>
          <li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${articleTitle}</span><meta itemprop="position" content="3"></li>
        </ol>
      `
  };

  return breadcrumbs[category] || breadcrumbs['guias'];
}

async function deleteArticle() {
  if (!currentEditingId) return;

  if (!confirm('Tem certeza? Esta ação é irreversível.')) return;

  try {
    await removeArticle(currentEditingId);
    alert('Artigo deletado com sucesso!');
    resetForm();
    loadArticles();
    switchSection({ target: { dataset: { section: 'articles' } } });
  } catch (error) {
    console.error('Error deleting article:', error);
    alert('Erro ao deletar artigo');
  }
}

async function removeArticle(id) {
  await db.collection('articles').doc(id).delete();
}

function filterArticles() {
  const search = document.getElementById('search-articles').value.toLowerCase();
  const category = document.getElementById('filter-category').value;

  document.querySelectorAll('.article-card').forEach(card => {
    const title = card.querySelector('.article-card__title').textContent.toLowerCase();
    const cardCategory = card.querySelector('.article-card__category').textContent;

    const matchesSearch = title.includes(search);
    const matchesCategory = !category || cardCategory.includes(category);

    card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
  });
}

function resetForm() {
  document.getElementById('article-form').reset();
  document.getElementById('form-title').textContent = 'Novo Artigo';
  document.getElementById('delete-btn').style.display = 'none';
  document.getElementById('download-btn').style.display = 'none';
  currentEditingId = null;
  setTodayDate();
}

function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('article-date').value = today;
}

function downloadHTML(article) {
  const html = downloadArticleHTML(article);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${article.slug}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
