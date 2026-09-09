/**
 * chrome-partials.mjs — fonte única do header e footer server-side.
 * Usado por scripts/patch-chrome.mjs (assa nos HTML estáticos) e por server.js (SSR de artigos).
 * Links absolutos (/) — o site é sempre servido por server.js em produção.
 */

export const ADSENSE_TAG =
  '  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4663943063143621" crossorigin="anonymous"></script>';

export const HEADER_HTML = `<header class="site-header" role="banner" data-chrome="ssr">
  <div class="header-top">
    <div class="container">
      <span>Portal de educação superior e profissional do Brasil</span>
      <nav class="header-top-links">
        <a href="/sobre.html">Sobre</a>
        <a href="/politica-privacidade.html">Privacidade</a>
        <a href="/termos-de-uso.html">Termos</a>
      </nav>
    </div>
  </div>
  <div class="header-main">
    <div class="container">
      <a href="/" class="site-logo">
        <div class="site-logo__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 22 8.5 12 15 2 8.5 12 2"/>
            <path d="M6 11.5v5c0 0 2.5 2.5 6 2.5s6-2.5 6-2.5v-5"/>
            <line x1="22" y1="8.5" x2="22" y2="14"/>
            <circle cx="22" cy="14.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </div>
        <div class="site-logo__text">
          <span class="site-logo__name">Hub do Estudante</span>
          <span class="site-logo__tagline">Portal de Educação</span>
        </div>
      </a>
      <div class="header-search" role="search">
        <input type="search" id="header-search-input" class="header-search__input" placeholder="Buscar cursos, faculdades, carreiras...">
        <button class="header-search__btn" aria-label="Pesquisar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <div class="search-results" id="search-results-dropdown"></div>
      </div>
      <div class="header-actions">
        <button type="button" class="mobile-search-toggle" id="mobile-search-toggle" aria-label="Buscar" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button type="button" class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-nav">
          <span class="mobile-nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>
      </div>
    </div>
  </div>
  <nav class="site-nav" id="site-nav" aria-label="Navegação principal">
    <div class="container">
      <ul class="nav-list">
        <li class="nav-item"><a href="/pages/graduacao/index.html" class="nav-link">Graduação</a></li>
        <li class="nav-item"><a href="/pages/pos-graduacao/index.html" class="nav-link">Pós-graduação</a></li>
        <li class="nav-item"><a href="/pages/cursos-tecnicos/index.html" class="nav-link">Técnicos</a></li>
        <li class="nav-item"><a href="/pages/cursos-livres/index.html" class="nav-link">Cursos Livres</a></li>
        <li class="nav-item"><a href="/pages/carreiras/index.html" class="nav-link">Carreiras &amp; Salários</a></li>
        <li class="nav-item"><a href="/pages/guias/index.html" class="nav-link">Guias</a></li>
        <li class="nav-item"><a href="/pages/enem-2026/index.html" class="nav-link" style="color:#38bdf8;font-weight:700;">ENEM 2026</a></li>
      </ul>
    </div>
  </nav>
  <div class="site-nav-backdrop" id="site-nav-backdrop" aria-hidden="true"></div>
</header>`;

export const FOOTER_HTML = `<footer class="site-footer" data-chrome="ssr">
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <div>
          <p style="font-family: var(--font-body); font-size: var(--text-xl); color: white; font-weight: 700; margin-bottom: var(--space-3);">Hub do Estudante</p>
          <p class="footer-brand__desc">Portal editorial independente de educação superior e profissional do Brasil. Guias, comparativos e dados de mercado sem vínculo comercial com instituições de ensino.</p>
        </div>
        <div>
          <h3 class="footer-col__title">Cursos</h3>
          <nav class="footer-links">
            <a href="/pages/graduacao/index.html">Graduação</a>
            <a href="/pages/pos-graduacao/index.html">Pós-graduação</a>
            <a href="/pages/cursos-tecnicos/index.html">Cursos Técnicos</a>
            <a href="/pages/cursos-livres/index.html">Cursos Livres</a>
            <a href="/pages/carreiras/index.html">Carreiras &amp; Salários</a>
            <a href="/pages/enem-2026/index.html">ENEM 2026</a>
          </nav>
        </div>
        <div>
          <h3 class="footer-col__title">Institucional</h3>
          <nav class="footer-links">
            <a href="/sobre.html">Sobre</a>
            <a href="/pages/guias/index.html">Guias</a>
            <a href="/politica-privacidade.html">Política de Privacidade</a>
            <a href="/termos-de-uso.html">Termos de Uso</a>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p class="footer-bottom__copy">© 2026 Hub do Estudante. Portal editorial independente. Conteúdo gratuito mantido com publicidade do Google AdSense — os anúncios não influenciam a linha editorial.</p>
    </div>
  </div>
</footer>`;
