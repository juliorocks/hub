/**
 * main.js — Hub do Estudante
 * Entry point: importa e inicializa todos os módulos
 */

import { initSearch } from './search.js';

function init() {
  initSearch();
  wrapArticleTables();
}

/**
 * Envolve todas as <table> dentro de .article-content em um wrapper
 * com overflow-x: auto para scroll horizontal seguro em mobile.
 * Também protege .comparison-table fora de .article-content.
 * Aplicado via JS para não precisar editar cada HTML individualmente.
 */
function wrapArticleTables() {
  // Tabelas dentro de article-content
  document.querySelectorAll('.article-content table').forEach(table => {
    if (table.closest('.table-scroll-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  // comparison-table fora de article-content (ex: sidebar, seções)
  document.querySelectorAll('.comparison-table').forEach(table => {
    if (table.closest('.comparison-table-wrapper') || table.closest('.table-scroll-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'comparison-table-wrapper';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
}

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
