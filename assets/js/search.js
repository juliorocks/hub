/**
 * search.js — Hub do Estudante
 * Busca live client-side com Fuse.js + dropdown rico
 */

const FUSE_CDN = '/assets/js/fuse.esm.js';
const SEARCH_INDEX_URL = '/assets/data/search-index.json';
const MIN_QUERY_LENGTH = 2;
const MAX_RESULTS = 7;
const DEBOUNCE_MS = 180;

let fuseInstance = null;
let searchData = null;

export function initSearch() {
  // Se o header ainda não foi injetado, esperar pelo evento components:loaded
  if (!document.getElementById('header-search-input')) {
    document.addEventListener('components:loaded', () => bindSearchInputs(), { once: true });
  } else {
    bindSearchInputs();
  }
}

function bindSearchInputs() {
  const inputs = document.querySelectorAll('#header-search-input, #hero-search');
  if (!inputs.length) return;

  inputs.forEach(input => {
    const dropdown = input.id === 'header-search-input'
      ? document.getElementById('search-results-dropdown')
      : createDropdown(input);

    if (!dropdown) return;

    let debounceTimer = null;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => handleInput(input, dropdown), DEBOUNCE_MS);
    });

    input.addEventListener('keydown', (e) => handleKeyNav(e, dropdown, input));

    document.addEventListener('click', (e) => {
      if (!input.closest('.header-search, .home-hero__search')?.contains(e.target)) {
        closeDropdown(dropdown, input);
      }
    });

    // Enter → busca completa
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !dropdown.querySelector('.search-item:focus')) {
        const q = input.value.trim();
        if (q) window.location.href = `/busca/?q=${encodeURIComponent(q)}`;
      }
    });
  });

  // Botão busca hero
  document.querySelector('.home-hero__search-btn')?.addEventListener('click', () => {
    const val = document.getElementById('hero-search')?.value.trim();
    if (val) window.location.href = `/busca/?q=${encodeURIComponent(val)}`;
  });

  // Botão busca header
  document.querySelector('.header-search__btn')?.addEventListener('click', () => {
    const val = document.getElementById('header-search-input')?.value.trim();
    if (val) window.location.href = `/busca/?q=${encodeURIComponent(val)}`;
  });
}

async function handleInput(input, dropdown) {
  const query = input.value.trim();

  if (query.length < MIN_QUERY_LENGTH) {
    closeDropdown(dropdown, input);
    return;
  }

  showLoading(dropdown, input);

  if (!searchData) await loadSearchData();

  if (!fuseInstance || !searchData) {
    renderError(dropdown);
    return;
  }

  const results = fuseInstance.search(query, { limit: MAX_RESULTS });
  renderResults(dropdown, results, query, input);
}

async function loadSearchData() {
  try {
    const [response, { default: Fuse }] = await Promise.all([
      fetch(SEARCH_INDEX_URL),
      import(/* @vite-ignore */ FUSE_CDN)
    ]);
    if (!response.ok) throw new Error('Índice não encontrado');
    searchData = await response.json();
    fuseInstance = new Fuse(searchData, {
      keys: [
        { name: 'title',    weight: 0.55 },
        { name: 'keywords', weight: 0.30 },
        { name: 'excerpt',  weight: 0.10 },
        { name: 'areaLabel', weight: 0.05 }
      ],
      threshold: 0.38,
      includeScore: true,
      minMatchCharLength: 2
    });
  } catch (err) {
    console.warn('[Search] Falha ao carregar índice:', err.message);
    searchData = null;
  }
}

function renderResults(dropdown, results, query, input) {
  if (!results.length) {
    dropdown.innerHTML = `
      <div class="search-empty">
        <div class="search-empty__icon">🔍</div>
        <p class="search-empty__text">Nenhum resultado para <strong>"${escapeHTML(query)}"</strong></p>
        <a href="/busca/?q=${encodeURIComponent(query)}" class="search-footer__link">Ver busca completa →</a>
      </div>
    `;
    openDropdown(dropdown, input);
    return;
  }

  // Agrupar por tipo
  const groups = {};
  const typeOrder = ['universidade', 'curso', 'posgraduacao', 'carreira'];
  const typeLabels = {
    universidade: 'Universidades',
    curso: 'Cursos de Graduação',
    posgraduacao: 'Pós-graduação',
    carreira: 'Carreiras & Salários'
  };

  results.forEach(({ item }) => {
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item);
  });

  let html = '<div class="search-groups">';

  typeOrder.forEach(type => {
    if (!groups[type]?.length) return;
    html += `<div class="search-group">
      <div class="search-group__label">${typeLabels[type]}</div>`;

    groups[type].forEach((item, i) => {
      const isUniv = item.type === 'universidade';
      const thumb = isUniv && item.logo
        ? `<div class="search-item__logo" style="background:${item.logoBg}">
             <img src="${item.logo}" alt="${escapeHTML(item.title)}" onerror="this.parentElement.innerHTML='<span class=\\'search-item__logo-fallback\\'>${escapeHTML(item.title[0])}</span>'">
           </div>`
        : `<div class="search-item__emoji" style="background:${item.areaColor}15; color:${item.areaColor};">${item.emoji || '📄'}</div>`;

      html += `
        <a href="${item.url}" class="search-item" tabindex="-1" data-index="${i}">
          ${thumb}
          <div class="search-item__info">
            <span class="search-item__title">${highlight(escapeHTML(item.title), query)}</span>
            <span class="search-item__excerpt">${escapeHTML(item.excerpt)}</span>
          </div>
          <span class="search-item__arrow">→</span>
        </a>`;
    });

    html += '</div>';
  });

  html += '</div>';
  html += `
    <div class="search-footer">
      <a href="/busca/?q=${encodeURIComponent(query)}" class="search-footer__link">
        Ver todos os resultados para <strong>"${escapeHTML(query)}"</strong> →
      </a>
    </div>`;

  dropdown.innerHTML = html;
  openDropdown(dropdown, input);
}

function highlight(text, query) {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'),
    '<mark class="search-highlight">$1</mark>');
}

function escapeHTML(str = '') {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function handleKeyNav(e, dropdown, input) {
  const items = [...dropdown.querySelectorAll('.search-item')];
  if (!items.length) return;
  const active = document.activeElement;
  let idx = items.indexOf(active);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (idx < items.length - 1) items[idx + 1].focus();
    else items[0].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (idx > 0) items[idx - 1].focus();
    else { input.focus(); }
  } else if (e.key === 'Enter' && active?.classList.contains('search-item')) {
    e.preventDefault();
    active.click();
  } else if (e.key === 'Escape') {
    closeDropdown(dropdown, input);
    input.focus();
  }
}

function showLoading(dropdown, input) {
  dropdown.innerHTML = `
    <div class="search-loading">
      <div class="search-loading__dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  openDropdown(dropdown, input);
}

function renderError(dropdown) {
  dropdown.innerHTML = `
    <div class="search-empty">
      <div class="search-empty__icon">⚠️</div>
      <p class="search-empty__text">Não foi possível carregar a busca.</p>
    </div>`;
}

function openDropdown(dropdown, input) {
  dropdown.classList.add('is-visible');
  input.setAttribute('aria-expanded', 'true');
  input.setAttribute('aria-autocomplete', 'list');
}

function closeDropdown(dropdown, input) {
  dropdown.classList.remove('is-visible');
  input?.setAttribute('aria-expanded', 'false');
}

function createDropdown(input) {
  const wrapper = input.parentElement;
  // Check if already exists (attached to body)
  const existing = document.getElementById('hero-search-dropdown');
  if (existing) return existing;

  const el = document.createElement('div');
  el.id = 'hero-search-dropdown';
  el.className = 'search-results search-results--hero';
  el.setAttribute('role', 'listbox');
  // Append to body to escape all ancestor overflow:hidden / stacking contexts
  document.body.appendChild(el);

  // Position relative to the wrapper using fixed coords
  const reposition = () => {
    const rect = wrapper.getBoundingClientRect();
    el.style.top = (rect.bottom + 8) + 'px';
    el.style.left = rect.left + 'px';
    el.style.width = rect.width + 'px';
  };

  reposition();
  window.addEventListener('scroll', reposition, { passive: true });
  window.addEventListener('resize', reposition, { passive: true });

  return el;
}
