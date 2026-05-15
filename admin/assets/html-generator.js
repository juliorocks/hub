// HTML Article Generator
// Converts Firestore article data to properly formatted HTML file

function generateArticleHTML(article) {
  const basePath = getBasePath(article.category);
  const dateObj = new Date(article.publishDate);
  const formattedDate = dateObj.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
  const isoDate = article.publishDate;

  // Parse content if it's markdown-like
  const content = parseContent(article.content);

  // Determine badge class
  const badgeClass = getBadgeClass(article.badgeType);

  // Format breadcrumb
  const categoryName = getCategoryDisplayName(article.category);
  const breadcrumb = generateBreadcrumb(article.category, categoryName, article.title);

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
        ${content}
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

function parseContent(content) {
  // Simple markdown-to-HTML converter
  let html = content;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (!para.match(/^<[uh]/)) {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');

  // If already HTML, return as-is
  if (content.includes('<')) {
    return content;
  }

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

// Export for use in admin.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateArticleHTML };
}
