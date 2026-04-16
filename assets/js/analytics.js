/**
 * analytics.js — Hub do Estudante
 * Eventos GA4 via gtag — tempo de leitura, scroll depth, engajamento
 */

const SCROLL_MILESTONES = [25, 50, 75, 90];
const READ_TIME_CHECK_INTERVAL = 30; // segundos

/**
 * Inicializa rastreio de engajamento editorial.
 */
export function initAnalytics() {
  if (typeof gtag !== 'function') return;

  trackScrollDepth();
  trackReadTime();
  trackOutboundLinks();
}

/**
 * Rastreia profundidade de scroll (25%, 50%, 75%, 90%).
 */
function trackScrollDepth() {
  const fired = new Set();

  const handler = throttle(() => {
    const scrolled = window.scrollY + window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const pct = Math.round((scrolled / total) * 100);

    SCROLL_MILESTONES.forEach(milestone => {
      if (pct >= milestone && !fired.has(milestone)) {
        fired.add(milestone);
        gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `${milestone}%`,
          value: milestone
        });
      }
    });
  }, 500);

  window.addEventListener('scroll', handler, { passive: true });
}

/**
 * Rastreia tempo de leitura em segundos.
 */
function trackReadTime() {
  const article = document.querySelector('.article-content');
  if (!article) return;

  const startTime = Date.now();
  let lastReported = 0;

  const interval = setInterval(() => {
    // Só conta se a aba está ativa e o artigo está visível
    if (document.hidden) return;

    const elapsed = Math.round((Date.now() - startTime) / 1000);
    const next = lastReported + READ_TIME_CHECK_INTERVAL;

    if (elapsed >= next) {
      lastReported = elapsed;
      gtag('event', 'read_time', {
        event_category: 'engagement',
        event_label: `${elapsed}s`,
        value: elapsed
      });
    }
  }, 5000);

  // Limpa ao sair da página
  window.addEventListener('beforeunload', () => clearInterval(interval));
}

/**
 * Rastreia cliques em links externos (não-afiliados).
 */
function trackOutboundLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    if (link.dataset.affiliateClick) return; // já rastreado pelo affiliate.js

    try {
      const url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        gtag('event', 'outbound_click', {
          event_category: 'outbound',
          event_label: url.hostname,
          transport_type: 'beacon'
        });
      }
    } catch {
      // URL inválida — ignora
    }
  });
}

/** Utilitário throttle simples */
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
