/**
 * components-loader.js
 * Injeta header e footer como componentes reutilizáveis
 * Executa logo ao carregar a página
 */

function getBasePath() {
  const path = window.location.pathname;

  // Se estiver em arquivo local (file://)
  if (window.location.protocol === 'file:') {
    // Encontrar onde 'pages' começa no path
    const pagesIndex = path.indexOf('/pages/');

    if (pagesIndex !== -1) {
      // Pega tudo após '/pages/'
      const afterPages = path.substring(pagesIndex + 7); // 7 = '/pages/'.length

      // Conta quantas pastas tem após 'pages' (excluindo o arquivo .html)
      const folders = afterPages.split('/').filter(part => part && !part.endsWith('.html'));

      // Se tem pastas após 'pages', precisa voltar folders.length + 1 níveis
      // O +1 é para voltar além de 'pages' até a raiz
      const depth = folders.length + 1;
      return '../'.repeat(depth);
    }

    // Se não tiver '/pages/' no path, é página na raiz (index.html, sobre.html, etc)
    return './';
  }

  // Se estiver em servidor web, usar caminho absoluto
  return '/';
}

function getHeaderHTML(basePath) {
  return `<header class="site-header" role="banner">
  <div class="header-top">
    <div class="container">
      <span>Portal de educação superior e profissional do Brasil</span>
      <nav class="header-top-links">
        <a href="${basePath}sobre.html">Sobre</a>
        <a href="#" onclick="return false">Anuncie</a>
        <a href="#" onclick="return false">Contato</a>
      </nav>
    </div>
  </div>

  <div class="header-main">
    <div class="container">
      <a href="${basePath}index.html" class="site-logo">
        <div class="site-logo__icon">
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect width="64" height="64" rx="14" fill="#5B21B6"/>
            <polygon points="32,14 58,26 32,38 6,26" fill="white"/>
            <rect x="24" y="36" width="16" height="12" rx="2" fill="white"/>
            <rect x="24" y="36" width="16" height="4" rx="1" fill="#DDD6FE"/>
            <line x1="8" y1="26" x2="8" y2="40" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="8" cy="41" r="2.5" fill="white"/>
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
        <a href="${basePath}pages/universidades/index.html" class="btn btn--secondary btn--sm header-actions__btn">Universidades</a>
        <button type="button" class="mobile-search-toggle" id="mobile-search-toggle" aria-label="Buscar" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <button type="button" class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="site-nav">
          <span class="mobile-nav-toggle__bars" aria-hidden="true">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
    </div>
  </div>

  <nav class="site-nav" id="site-nav">
    <div class="container">
      <ul class="nav-list">
        <li class="nav-item"><a href="${basePath}pages/graduacao/index.html" class="nav-link">Graduação</a></li>
        <li class="nav-item"><a href="${basePath}pages/pos-graduacao/index.html" class="nav-link">Pós-graduação</a></li>
        <li class="nav-item"><a href="${basePath}pages/cursos-tecnicos/index.html" class="nav-link">Técnicos</a></li>
        <li class="nav-item"><a href="${basePath}pages/cursos-livres/index.html" class="nav-link">Cursos Livres</a></li>
        <li class="nav-item"><a href="${basePath}pages/carreiras/salarios/" class="nav-link">Carreiras & Salários</a></li>
        <li class="nav-item"><a href="${basePath}pages/universidades/index.html" class="nav-link">Universidades</a></li>
      </ul>
    </div>
  </nav>
  <div class="site-nav-backdrop" id="site-nav-backdrop" aria-hidden="true"></div>
</header>`;
}

function getFooterHTML(basePath) {
  return `<footer class="site-footer">
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <div>
          <p style="font-family: var(--font-body); font-size: var(--text-xl); color: white; font-weight: 700; margin-bottom: var(--space-3);">Hub do Estudante</p>
          <p class="footer-brand__desc">Portal editorial independente de educação superior do Brasil.</p>
        </div>
        <div>
          <h3 class="footer-col__title">Cursos</h3>
          <nav class="footer-links">
            <a href="${basePath}pages/graduacao/index.html">Graduação</a>
            <a href="${basePath}pages/pos-graduacao/index.html">Pós-graduação</a>
            <a href="${basePath}pages/cursos-tecnicos/index.html">Cursos Técnicos</a>
            <a href="${basePath}pages/cursos-livres/index.html">Cursos Livres</a>
            <a href="${basePath}pages/carreiras/salarios/">Carreiras & Salários</a>
          </nav>
        </div>
        <div>
          <h3 class="footer-col__title">Universidades</h3>
          <nav class="footer-links">
            <a href="${basePath}pages/universidades/anhanguera.html">Anhanguera</a>
            <a href="${basePath}pages/universidades/unopar.html">Unopar</a>
            <a href="${basePath}pages/universidades/ampli.html">Ampli</a>
          </nav>
        </div>
        <div>
          <h3 class="footer-col__title">Institucional</h3>
          <nav class="footer-links">
            <a href="${basePath}sobre.html">Sobre</a>
            <a href="${basePath}politica-privacidade.html">Privacidade</a>
            <a href="${basePath}termos-de-uso.html">Termos de Uso</a>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container">
      <p class="footer-bottom__copy">© 2026 Hub do Estudante. Links de parceiros podem gerar comissão para o portal.</p>
    </div>
  </div>
</footer>`;
}

function wireMobileNav() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const backdrop = document.getElementById('site-nav-backdrop');
  const header = document.querySelector('.site-header');
  if (!mobileToggle || !siteNav) return;

  const closeNav = () => {
    siteNav.classList.remove('is-open');
    backdrop?.classList.remove('is-visible');
    header?.classList.remove('is-nav-open');
    document.body.classList.remove('no-scroll');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('is-active');
  };
  const openNav = () => {
    siteNav.classList.add('is-open');
    backdrop?.classList.add('is-visible');
    header?.classList.add('is-nav-open');
    document.body.classList.add('no-scroll');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('is-active');
  };

  mobileToggle.addEventListener('click', () => {
    if (siteNav.classList.contains('is-open')) closeNav();
    else openNav();
  });
  backdrop?.addEventListener('click', closeNav);
  siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });

  const mq = window.matchMedia('(min-width: 1025px)');
  const onMq = (e) => { if (e.matches) closeNav(); };
  mq.addEventListener ? mq.addEventListener('change', onMq) : mq.addListener(onMq);

  // Mobile search toggle
  const searchToggle = document.getElementById('mobile-search-toggle');
  const headerSearch = document.querySelector('.header-search');
  if (searchToggle && headerSearch) {
    searchToggle.addEventListener('click', () => {
      const isOpen = headerSearch.classList.toggle('is-visible');
      searchToggle.setAttribute('aria-expanded', String(isOpen));
      searchToggle.classList.toggle('is-active', isOpen);
      if (isOpen) headerSearch.querySelector('input')?.focus();
    });
  }
}

// Mapa área → cor predominante
const AREA_COLORS = {
  graduacao:    '#2563EB', // azul
  posgraduacao: '#7C3AED', // roxo
  tecnicos:     '#EA580C', // laranja
  livres:       '#DB2777', // rosa
  carreiras:    '#059669', // verde
  universidades:'#4F46E5', // índigo
};

// Mapa de padrões de URL para área
const AREA_URL_MAP = [
  { pattern: /\/graduacao\//,          area: 'graduacao' },
  { pattern: /\/pos-graduacao\//,      area: 'posgraduacao' },
  { pattern: /\/tecnicos\//,           area: 'tecnicos' },
  { pattern: /\/cursos-livres\//,      area: 'livres' },
  { pattern: /\/carreiras\//,          area: 'carreiras' },
  { pattern: /\/universidades\//,      area: 'universidades' },
];

function detectArea() {
  // Prioridade: atributo data-area no body, senão detecta pela URL
  const explicit = document.body.dataset.area;
  if (explicit && AREA_COLORS[explicit]) return explicit;
  const path = window.location.href;
  for (const { pattern, area } of AREA_URL_MAP) {
    if (pattern.test(path)) return area;
  }
  return null;
}

function wireActiveNav(area) {
  if (!area) return;
  const links = document.querySelectorAll('.nav-link');
  // Mapa área → índice do nav (0-based)
  const areaIndex = { graduacao: 0, posgraduacao: 1, tecnicos: 2, livres: 3, carreiras: 4, universidades: 5 };
  const idx = areaIndex[area];
  if (idx === undefined) return;
  links.forEach((link, i) => {
    link.classList.toggle('is-active', i === idx);
  });
}

function applyAreaColor(area) {
  if (!area) return;
  const color = AREA_COLORS[area];
  if (!color) return;
  // Define a CSS custom property no :root para uso em qualquer elemento da página
  document.documentElement.style.setProperty('--area-color', color);
  document.body.dataset.area = area;
}

function injectComponents() {
  try {
    const basePath = getBasePath();

    // Injeta novo header no topo do body
    const bodyFirst = document.body.firstChild;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = getHeaderHTML(basePath);
    document.body.insertBefore(tempDiv.firstElementChild, bodyFirst);

    // Injeta novo footer no final do body
    const tempDiv2 = document.createElement('div');
    tempDiv2.innerHTML = getFooterHTML(basePath);
    document.body.appendChild(tempDiv2.firstElementChild);

    // Wire mobile navigation imediatamente após injeção
    wireMobileNav();

    // Detecta área e aplica cor + nav ativo
    const area = detectArea();
    applyAreaColor(area);
    wireActiveNav(area);

    // Marca como carregado
    window.componentsLoaded = true;
    document.documentElement.setAttribute('data-components-loaded', 'true');
    document.dispatchEvent(new CustomEvent('components:loaded'));

  } catch (error) {
    console.warn('[Components] Erro ao injetar:', error);
  }
}

// Injeta assim que possível
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
