/**
 * main.js — Hub do Estudante
 * Entry point: importa e inicializa todos os módulos
 * Nenhuma lógica de negócio aqui — apenas orquestração
 */

import { initSearch } from './search.js';
import { initAffiliate } from './affiliate.js';
import { initAnalytics } from './analytics.js';
import { initLazyLoad } from './lazyload.js';
import { initFAQ } from './faq.js';
import { initTOC } from './toc.js';
import { initMegaMenu } from './menu.js';

/**
 * Inicializa todos os módulos quando o DOM está pronto.
 * Módulos verificam internamente se o elemento necessário existe
 * antes de agir — seguro rodar em todas as páginas.
 */
function init() {
  initMegaMenu();
  initSearch();
  initAffiliate();
  initAnalytics();
  initLazyLoad();
  initFAQ();
  initTOC();
}

// Aguarda DOM pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// "Ver mais" matérias
(function initVerMais() {
  const btn = document.getElementById('ver-mais-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const extras = document.querySelectorAll('.materias-extras');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      extras.forEach(el => el.classList.remove('is-visible'));
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M12 5v14M5 12l7 7 7-7"/></svg> Ver mais matérias`;
    } else {
      extras.forEach(el => el.classList.add('is-visible'));
      btn.setAttribute('aria-expanded', 'true');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><path d="M12 19V5M5 12l7-7 7 7"/></svg> Ver menos`;
    }
  });
})();
