/**
 * affiliate.js — Hub do Estudante
 * Rastreio de cliques em links de afiliado
 * Adiciona UTMs automáticos, registra evento no GA4 e envia ao backend
 */

const AFFILIATE_ENDPOINT = '/api/analytics/affiliate-click';
const UTM_SOURCE  = 'hub-do-estudante';
const UTM_MEDIUM  = 'referral';

/**
 * Inicializa o rastreio de cliques em todos os links de afiliado da página.
 * Funciona com delegação de eventos — seguro para conteúdo dinâmico.
 */
export function initAffiliate() {
  document.addEventListener('click', handleAffiliateClick);
  addUTMsToAffiliateLinks();
}

/**
 * Captura cliques em links com data-affiliate-click="true"
 */
function handleAffiliateClick(event) {
  const link = event.target.closest('[data-affiliate-click="true"]');
  if (!link) return;

  const data = buildClickData(link);

  // Dispara em paralelo — não bloqueia a navegação
  trackGA4(data);
  trackBackend(data);
}

/**
 * Extrai metadados do elemento clicado.
 */
function buildClickData(link) {
  const article = link.closest('article, [data-affiliate-id]');
  return {
    course:    link.dataset.affiliateCourse   || link.dataset.course   || 'unknown',
    position:  link.dataset.position          || 'body',
    articleUrl: window.location.pathname,
    affiliateId: link.dataset.affiliateId     || article?.dataset?.affiliateId || null,
    href:       link.href,
    timestamp:  new Date().toISOString()
  };
}

/**
 * Dispara evento no Google Analytics 4 via gtag.
 * O gtag é injetado pelo GTM — verifica existência antes de chamar.
 */
function trackGA4(data) {
  if (typeof gtag !== 'function') return;

  gtag('event', 'affiliate_click', {
    event_category:  'affiliate',
    event_label:     data.course,
    affiliate_course: data.course,
    affiliate_position: data.position,
    page_path:       data.articleUrl
  });
}

/**
 * Envia o clique para o backend (Node.js API) de forma assíncrona.
 * Usa sendBeacon quando disponível (mais confiável no unload).
 */
function trackBackend(data) {
  const payload = JSON.stringify(data);

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon(AFFILIATE_ENDPOINT, blob);
    return;
  }

  // Fallback: fetch fire-and-forget
  fetch(AFFILIATE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true
  }).catch(() => {
    // Silencioso — rastreio não pode quebrar a navegação do usuário
  });
}

/**
 * Adiciona parâmetros UTM automáticos a todos os links de afiliado da página.
 * Executa uma vez no carregamento.
 */
function addUTMsToAffiliateLinks() {
  const links = document.querySelectorAll('[data-affiliate-click="true"]');

  links.forEach(link => {
    try {
      const url = new URL(link.href, window.location.origin);

      // Não sobrescreve UTMs já existentes
      if (url.searchParams.get('utm_source')) return;

      const course  = link.dataset.affiliateCourse || link.dataset.course || '';
      const position = link.dataset.position || 'body';

      url.searchParams.set('utm_source',   UTM_SOURCE);
      url.searchParams.set('utm_medium',   UTM_MEDIUM);
      url.searchParams.set('utm_campaign', course || 'generic');
      url.searchParams.set('utm_content',  position);

      link.href = url.toString();
    } catch {
      // URL inválida ou relativa sem host — ignora
    }
  });
}
