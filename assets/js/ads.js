/**
 * ads.js — Hub do Estudante
 * Injeta slots de anúncio AdSense automaticamente por tipo de página.
 * pub-id: ca-pub-4663943063143621
 *
 * Slots configurados (preencher data-ad-slot após aprovação):
 *   SLOT_ARTICLE_TOP      — após TOC em artigos
 *   SLOT_ARTICLE_MID      — meio do conteúdo (após 3º h2)
 *   SLOT_ARTICLE_BOTTOM   — antes do FAQ / tags
 *   SLOT_SIDEBAR          — widget na sidebar
 *   SLOT_LISTING          — entre cards em listagens
 *   SLOT_TABLE            — acima da tabela de salários
 *   SLOT_FOOTER           — antes do footer (todas as páginas)
 */

const PUB_ID = 'ca-pub-4663943063143621';

// ─── Substitua os valores abaixo pelos data-ad-slot reais após aprovação ───
const SLOTS = {
  ARTICLE_TOP:    'XXXXXXXXXX',  // Retângulo após TOC
  ARTICLE_MID:    'XXXXXXXXXX',  // Retângulo meio do artigo
  ARTICLE_BOTTOM: 'XXXXXXXXXX',  // Horizontal antes do FAQ
  SIDEBAR:        'XXXXXXXXXX',  // Sidebar widget
  LISTING:        'XXXXXXXXXX',  // Horizontal em listagens
  TABLE:          'XXXXXXXXXX',  // Horizontal acima da tabela
  FOOTER:         'XXXXXXXXXX',  // Horizontal antes do footer
};

const APPROVED = false; // ← mude para true após aprovação do AdSense

/**
 * Cria um elemento de slot AdSense.
 * Em modo pendente (APPROVED=false), exibe apenas o container vazio.
 */
function createSlot(type, format = 'auto') {
  const wrapper = document.createElement('div');
  wrapper.className = `ad-slot ad-slot--${type}`;
  wrapper.setAttribute('aria-hidden', 'true');

  if (APPROVED) {
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = PUB_ID;
    ins.dataset.adSlot = SLOTS[type.toUpperCase().replace('-', '_')] || '';
    ins.dataset.adFormat = format;
    ins.dataset.fullWidthResponsive = 'true';
    wrapper.appendChild(ins);
    wrapper.classList.add('is-loaded');

    // Push após inserção no DOM
    requestAnimationFrame(() => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
    });
  }

  return wrapper;
}

function insertAfter(newEl, referenceEl) {
  if (!referenceEl || !referenceEl.parentNode) return;
  referenceEl.parentNode.insertBefore(newEl, referenceEl.nextSibling);
}

function insertBefore(newEl, referenceEl) {
  if (!referenceEl || !referenceEl.parentNode) return;
  referenceEl.parentNode.insertBefore(newEl, referenceEl);
}

// ─── SLOT FOOTER: todas as páginas ───────────────────────────────────────────
function injectFooterAd() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;
  const slot = createSlot('footer', 'horizontal');
  const container = document.createElement('div');
  container.className = 'container';
  container.appendChild(slot);
  const wrap = document.createElement('div');
  wrap.style.cssText = 'background:var(--color-bg);padding-block:var(--space-2)';
  wrap.appendChild(container);
  insertBefore(wrap, footer);
}

// ─── SLOTS DE ARTIGO ─────────────────────────────────────────────────────────
function injectArticleAds() {
  const articleContent = document.querySelector('.article-content');
  if (!articleContent) return;

  // 1. Após o TOC
  const toc = document.querySelector('.toc');
  if (toc) insertAfter(createSlot('rectangle'), toc);

  // 2. Após o 3º h2 dentro do conteúdo
  const h2s = articleContent.querySelectorAll('h2');
  if (h2s.length >= 3) insertAfter(createSlot('rectangle'), h2s[2]);

  // 3. Antes do FAQ ou antes das article-tags
  const faq = document.querySelector('.faq-section');
  const tags = document.querySelector('.article-tags');
  const bottomTarget = faq || tags;
  if (bottomTarget) insertBefore(createSlot('horizontal'), bottomTarget);

  // 4. Sidebar — após o primeiro sidebar-widget
  const sidebarWidget = document.querySelector('.sidebar-widget');
  if (sidebarWidget) {
    const sidebarSlot = createSlot('sidebar');
    const wrap = document.createElement('div');
    wrap.className = 'sidebar-widget';
    wrap.style.overflow = 'hidden';
    wrap.appendChild(sidebarSlot);
    insertAfter(wrap, sidebarWidget);
  }
}

// ─── SLOTS DE LISTAGEM (índices de seção) ────────────────────────────────────
function injectListingAds() {
  const grid = document.querySelector('.grid-3, .grid-2, .listing-grid');
  if (!grid) return;

  // Após o 4º card
  const cards = grid.querySelectorAll('.card, .course-card');
  if (cards.length >= 4) {
    const slot = createSlot('horizontal');
    slot.style.gridColumn = '1 / -1'; // span full width no grid
    insertAfter(slot, cards[3]);
  }
}

// ─── SLOT TABELA DE SALÁRIOS ─────────────────────────────────────────────────
function injectTableAd() {
  const tableWrap = document.querySelector('.sal-table-wrap');
  if (!tableWrap) return;
  insertBefore(createSlot('horizontal'), tableWrap);
}

// ─── INICIALIZAÇÃO ────────────────────────────────────────────────────────────
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

// Aguarda components:loaded para garantir que header/footer já foram injetados
if (window.componentsLoaded) {
  initAds();
} else {
  document.addEventListener('components:loaded', initAds);
}
