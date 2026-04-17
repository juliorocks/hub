/**
 * lazyload.js — Hub do Estudante
 * Lazy loading de imagens via Intersection Observer
 * Fallback para navegadores sem suporte ao atributo loading="lazy" nativo
 */

const OBSERVER_MARGIN = '200px'; // pré-carrega 200px antes de entrar na viewport

/**
 * Inicializa lazy loading para imagens com data-src.
 * Imagens com loading="lazy" nativo são ignoradas (navegador cuida).
 */
export function initLazyLoad() {
  // Se o navegador suporta loading="lazy" nativamente, não precisamos de JS
  if ('loading' in HTMLImageElement.prototype) return;

  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: carrega tudo imediatamente
    images.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: OBSERVER_MARGIN }
  );

  images.forEach(img => observer.observe(img));
}

/**
 * Substitui data-src por src efetivando o carregamento.
 */
function loadImage(img) {
  if (img.dataset.src) {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  }
  if (img.dataset.srcset) {
    img.srcset = img.dataset.srcset;
    img.removeAttribute('data-srcset');
  }
}
