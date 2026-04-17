/**
 * toc.js — Hub do Estudante
 * Gera o índice do artigo (Table of Contents) automaticamente
 * a partir dos H2 do .article-content
 */

/**
 * Gera o TOC e destaca o item ativo conforme o scroll.
 */
export function initTOC() {
  const tocList = document.querySelector('.toc__list');
  const content = document.querySelector('.article-content');
  if (!tocList || !content) return;

  const headings = content.querySelectorAll('h2');
  if (headings.length < 2) {
    // Esconde o TOC se tiver menos de 2 seções
    tocList.closest('.toc')?.style.setProperty('display', 'none');
    return;
  }

  // Gera IDs e links
  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = slugify(h.textContent) || `secao-${i + 1}`;
    }

    const li = document.createElement('li');
    li.className = 'toc__item';

    const link = document.createElement('a');
    link.href = `#${h.id}`;
    link.className = 'toc__link';
    link.textContent = h.textContent;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${h.id}`);
    });

    li.appendChild(link);
    tocList.appendChild(li);
  });

  // Destaque ativo por scroll
  if ('IntersectionObserver' in window) {
    highlightActiveTOC(headings);
  }
}

/**
 * Observa quais headings estão visíveis e atualiza o link ativo no TOC.
 */
function highlightActiveTOC(headings) {
  const links = document.querySelectorAll('.toc__link');
  let currentActive = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.style.color = isActive ? 'var(--color-primary)' : '';
            link.style.fontWeight = isActive ? 'var(--weight-bold)' : '';
          });
          currentActive = id;
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px' }
  );

  headings.forEach(h => observer.observe(h));
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
