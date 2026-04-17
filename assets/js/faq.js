/**
 * faq.js — Hub do Estudante
 * Accordions de FAQ com acessibilidade (ARIA)
 */

/**
 * Inicializa todos os accordions de FAQ na página.
 */
export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  console.log('[FAQ] Encontrados', faqItems.length, 'itens FAQ');
  if (!faqItems.length) return;

  faqItems.forEach((item, idx) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    console.log(`[FAQ ${idx}] btn:`, !!btn, 'answer:', !!answer);
    if (!btn || !answer) return;

    // Setup inicial de acessibilidade
    const answerId = `faq-answer-${Math.random().toString(36).slice(2, 8)}`;
    answer.id = answerId;
    btn.setAttribute('aria-controls', answerId);
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = item.classList.contains('is-open');
      console.log('[FAQ Click] isOpen antes:', isOpen, '-> mudar para:', !isOpen);
      toggleFAQ(item, btn, !isOpen);
    });

    // Suporte a teclado
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = item.classList.contains('is-open');
        toggleFAQ(item, btn, !isOpen);
      }
    });
  });
}

function toggleFAQ(item, btn, open) {
  item.classList.toggle('is-open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
