/**
 * template.js — Template canônico do Hub do Estudante
 *
 * Usar buildPage() para QUALQUER nova página do site.
 * Nunca criar HTML de página manualmente — sempre via esta função.
 *
 * Estrutura garantida:
 *   CSS: base, layout, components, article, responsive (caminhos absolutos)
 *   JS:  components-loader.js + main.js (caminhos absolutos)
 *   body: class="page-wrapper" data-area="{area}"
 *   nav.breadcrumb → main.layout-main.container → article.article-body
 *     → header.article-hero
 *     → div.quick-answer
 *     → nav.toc
 *     → div.article-content#article-content
 *   aside.sidebar com links de desconto e cursos relacionados
 */

export function buildPage({
  slug,
  area,
  breadcrumbs,
  title,
  subtitle,
  badge,
  badgeClass,
  img,
  imgAlt,
  quickAnswer,
  content,
  sidebarLinks = [],
  date = '2026-04-23',
  readTime = '7 min de leitura',
  canonical = null
}) {
  const dateFormatted = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const canonicalUrl = canonical || `https://hubdoestudante.com.br/pages/graduacao/${area}/${slug}/index.html`;

  const breadcrumbItems = breadcrumbs.map((b, i) => {
    const pos = i + 1;
    if (!b.href) {
      return `<li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${b.label}</span><meta itemprop="position" content="${pos}"></li>`;
    }
    return `<li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="${b.href}" class="breadcrumb__link" itemprop="item"><span itemprop="name">${b.label}</span></a><meta itemprop="position" content="${pos}"></li>`;
  }).join('\n        ');

  const sidebarLinksHtml = sidebarLinks.length
    ? sidebarLinks.map(l => `<li><a href="${l.href}" class="sidebar-link">${l.label}</a></li>`).join('\n          ')
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${subtitle} — guia completo ${new Date(date).getFullYear()} com salários, mercado de trabalho e especializações.">
  <title>${title} | Hub do Estudante</title>
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta name="robots" content="index, follow">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title}","datePublished":"${date}","dateModified":"${date}","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
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
<body class="page-wrapper" data-area="${area}">

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
        ${breadcrumbItems}
      </ol>
    </div>
  </nav>

  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge content-type-badge--guide">Graduação</span>
          <span class="${badgeClass}">${badge}</span>
        </div>
        <h1 class="article-hero__title">${title}</h1>
        <p class="article-hero__subtitle">${subtitle}</p>
        <div class="article-hero__byline">
          <span>Por <strong>Redação Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="${date}">${dateFormatted}</time>
          <span>·</span>
          <span>${readTime}</span>
        </div>
        <img src="${img}" alt="${imgAlt}">
      </header>

      <div class="quick-answer">
        <div class="quick-answer__label">Resposta rápida</div>
        <p class="quick-answer__text">${quickAnswer}</p>
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
        <h3 class="sidebar-widget__title">Estudar com Desconto</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">
          <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate" rel="noopener sponsored">Anhanguera, até 50% off</a>
          <a href="/pages/universidades/unopar.html" class="btn btn--affiliate" rel="noopener sponsored">Unopar, até 50% off</a>
          <a href="/pages/universidades/uniderp.html" class="btn btn--affiliate" rel="noopener sponsored">Uniderp, até 50% off</a>
        </div>
      </div>${sidebarLinksHtml ? `
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Cursos Relacionados</h3>
        <ul class="sidebar-links">
          ${sidebarLinksHtml}
        </ul>
      </div>` : ''}
    </aside>
  </main>

  <script src="/assets/js/components-loader.js"></script>
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>`;
}
