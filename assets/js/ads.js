/**
 * ads.js — Hub do Estudante
 * Injeta slots de anúncio AdSense automaticamente por tipo de página.
 * pub-id: ca-pub-4663943063143621
 */

const PUB_ID = 'ca-pub-4663943063143621';

const SLOTS = {
  DISPLAY:    '3052523021',   // article-rectangle — display responsivo
  IN_FEED:    '5295542986',   // in-feed — entre cards de listagem
  IN_ARTICLE: '6277452168',   // in-article — dentro do conteúdo editorial
  MULTIPLEX:  '1178228211',   // multiplex — recomendações no fim da página
};

// Layout key do in-feed
const IN_FEED_LAYOUT_KEY = '-68+ce+2u-x+6c';

/**
 * Cria um <ins> AdSense e faz o push imediatamente após inserção no DOM.
 */
function createIns({ slot, format, layout, layoutKey, style = 'display:block' }) {
  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.cssText = style;
  ins.dataset.adClient = PUB_ID;
  ins.dataset.adSlot = slot;
  ins.dataset.adFormat = format;
  if (layout) ins.dataset.adLayout = layout;
  if (layoutKey) ins.dataset.adLayoutKey = layoutKey;
  if (format === 'auto') ins.dataset.fullWidthResponsive = 'true';
  return ins;
}

function pushAd(ins) {
  requestAnimationFrame(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  });
  // Observa o ins para detectar quando o AdSense preencheu o slot
  observeAdFill(ins);
  return ins;
}

/**
 * Usa MutationObserver para detectar quando o AdSense insere conteúdo
 * no <ins> e adiciona is-loaded no wrapper pai (.ad-slot).
 */
function observeAdFill(ins) {
  const observer = new MutationObserver(() => {
    const filled = ins.innerHTML.trim() !== '' ||
                   ins.getAttribute('data-ad-status') === 'filled' ||
                   ins.style.height > '0';
    if (filled) {
      ins.closest('.ad-slot')?.classList.add('is-loaded');
      observer.disconnect();
    }
  });
  observer.observe(ins, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ad-status'] });
  // Timeout de segurança: se em 5s não carregou, descarta o slot silenciosamente
  setTimeout(() => observer.disconnect(), 5000);
}

function wrap(ins, className) {
  const div = document.createElement('div');
  div.className = `ad-slot ${className}`;
  div.setAttribute('aria-hidden', 'true');
  div.appendChild(ins);
  return div;
}

function insertAfter(el, ref) {
  if (!ref?.parentNode) return;
  ref.parentNode.insertBefore(el, ref.nextSibling);
}

function insertBefore(el, ref) {
  if (!ref?.parentNode) return;
  ref.parentNode.insertBefore(el, ref);
}

// ─── FOOTER: todas as páginas ─────────────────────────────────────────────────
function injectFooterAd() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  // Multiplex — recomendações de conteúdo antes do footer
  const ins = createIns({ slot: SLOTS.MULTIPLEX, format: 'autorelaxed' });
  pushAd(ins);
  const container = document.createElement('div');
  container.className = 'container';
  container.appendChild(wrap(ins, 'ad-slot--footer'));
  const section = document.createElement('div');
  section.style.cssText = 'background:var(--color-bg);padding-block:var(--space-4)';
  section.appendChild(container);
  insertBefore(section, footer);
}

// ─── ARTIGOS ──────────────────────────────────────────────────────────────────
function injectArticleAds() {
  const articleContent = document.querySelector('.article-content');
  if (!articleContent) return;

  // 1. Após o TOC — display responsivo
  const toc = document.querySelector('.toc');
  if (toc) {
    const ins = createIns({ slot: SLOTS.DISPLAY, format: 'auto' });
    pushAd(ins);
    insertAfter(wrap(ins, 'ad-slot--rectangle'), toc);
  }

  // 2. In-article após o 2º h2 dentro do conteúdo
  const h2s = articleContent.querySelectorAll('h2');
  if (h2s.length >= 2) {
    const ins = createIns({
      slot: SLOTS.IN_ARTICLE,
      format: 'fluid',
      layout: 'in-article',
      style: 'display:block; text-align:center;'
    });
    pushAd(ins);
    insertAfter(wrap(ins, 'ad-slot--horizontal'), h2s[1]);
  }

  // 3. Display antes do FAQ ou article-tags
  const target = document.querySelector('.faq-section') || document.querySelector('.article-tags');
  if (target) {
    const ins = createIns({ slot: SLOTS.DISPLAY, format: 'auto' });
    pushAd(ins);
    insertBefore(wrap(ins, 'ad-slot--horizontal'), target);
  }

  // 4. Display no sidebar — após o primeiro widget
  const sidebarWidget = document.querySelector('.sidebar-widget');
  if (sidebarWidget) {
    const ins = createIns({ slot: SLOTS.DISPLAY, format: 'auto' });
    pushAd(ins);
    const widgetWrap = document.createElement('div');
    widgetWrap.className = 'sidebar-widget';
    widgetWrap.style.overflow = 'hidden';
    widgetWrap.appendChild(wrap(ins, 'ad-slot--sidebar'));
    insertAfter(widgetWrap, sidebarWidget);
  }
}

// ─── LISTAGENS ────────────────────────────────────────────────────────────────
function injectListingAds() {
  const grid = document.querySelector('.grid-3, .grid-2, .listing-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.card, .course-card');
  if (cards.length >= 4) {
    const ins = createIns({
      slot: SLOTS.IN_FEED,
      format: 'fluid',
      layoutKey: IN_FEED_LAYOUT_KEY,
    });
    pushAd(ins);
    const slot = wrap(ins, 'ad-slot--horizontal');
    slot.style.gridColumn = '1 / -1';
    insertAfter(slot, cards[3]);
  }
}

// ─── TABELA DE SALÁRIOS ───────────────────────────────────────────────────────
function injectTableAd() {
  const tableWrap = document.querySelector('.sal-table-wrap');
  if (!tableWrap) return;

  const ins = createIns({ slot: SLOTS.DISPLAY, format: 'auto' });
  pushAd(ins);
  insertBefore(wrap(ins, 'ad-slot--horizontal'), tableWrap);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function initAds() {
  injectFooterAd();

  if (document.querySelector('.article-content')) {
    injectArticleAds();
  } else if (document.querySelector('.sal-table-wrap')) {
    injectTableAd();
  } else {
    injectListingAds();
  }
}

if (window.componentsLoaded) {
  initAds();
} else {
  document.addEventListener('components:loaded', initAds);
}
