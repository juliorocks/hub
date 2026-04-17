/**
 * menu.js — Hub do Estudante
 * Mega menu mobile + hamburger toggle
 */

/**
 * Inicializa o comportamento do mega menu.
 * No desktop: hover (CSS). No mobile: toggle ao toque.
 */
export function initMegaMenu() {
  // Hamburger e mobile search são ligados em components-loader.js (executa logo após injetar o header).
  // Aqui só lidamos com comportamento touch do mega menu (se houver).

  // Touch: abre mega menu no primeiro toque, navega no segundo
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('.nav-link[aria-haspopup]').forEach(link => {
      let touched = false;
      link.addEventListener('click', (e) => {
        if (!touched) {
          e.preventDefault();
          touched = true;
          // Fecha outros menus abertos
          document.querySelectorAll('.nav-item.is-open').forEach(item => {
            if (item !== link.parentElement) item.classList.remove('is-open');
          });
          link.parentElement.classList.toggle('is-open');
        }
      });

      // Reset ao clicar fora
      document.addEventListener('click', (e) => {
        if (!link.parentElement.contains(e.target)) {
          link.parentElement.classList.remove('is-open');
          touched = false;
        }
      });
    });
  }
}
