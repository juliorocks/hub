/**
 * listing.js — Hub do Estudante
 * Filtros e ordenação da página de listagem (category.html)
 */

/**
 * Inicializa filtros por tipo de conteúdo e ordenação.
 */
export function initListing() {
  initFilterTabs();
  initSortSelect();
}

// Auto-init se carregado diretamente na página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initListing);
} else {
  initListing();
}

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab[data-filter]');
  const grid = document.getElementById('articles-grid');
  if (!tabs.length || !grid) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Atualiza estado ativo
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      // Filtra os cards
      const cards = grid.querySelectorAll('[data-type]');
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.style.display = show ? '' : 'none';
      });

      // Atualiza contagem
      updateResultCount(grid, filter);
    });
  });
}

function initSortSelect() {
  const select = document.getElementById('sort-select');
  const grid = document.getElementById('articles-grid');
  if (!select || !grid) return;

  select.addEventListener('change', () => {
    const value = select.value;
    const cards = Array.from(grid.querySelectorAll('article.card'));

    cards.sort((a, b) => {
      if (value === 'az') {
        const titleA = a.querySelector('.card__title')?.textContent.trim() || '';
        const titleB = b.querySelector('.card__title')?.textContent.trim() || '';
        return titleA.localeCompare(titleB, 'pt-BR');
      }
      if (value === 'popular') {
        return (Number(b.dataset.views) || 0) - (Number(a.dataset.views) || 0);
      }
      // 'recent' (default): por data
      return (Number(b.dataset.timestamp) || 0) - (Number(a.dataset.timestamp) || 0);
    });

    cards.forEach(card => grid.appendChild(card));
  });
}

function updateResultCount(grid, filter) {
  const counter = document.querySelector('.listing-results-count strong');
  if (!counter) return;

  const visible = grid.querySelectorAll('[data-type]:not([style*="display: none"])').length;
  counter.textContent = `${visible}`;
}
