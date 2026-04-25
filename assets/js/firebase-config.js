// Firebase Configuration
// IMPORTANTE: Substitua com suas credenciais do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCFir3vbG5Qak0K36dhznwXf77RiFN0g2I",
  authDomain: "hub-do-estudante.firebaseapp.com",
  databaseURL: "https://hub-do-estudante-default-rtdb.firebaseio.com",
  projectId: "hub-do-estudante",
  storageBucket: "hub-do-estudante.firebasestorage.app",
  messagingSenderId: "836885204421",
  appId: "1:836885204421:web:d4cda9045c8d81914a8fac"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const realtimeDb = firebase.database();

// Handle Newsletter Signup
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForms = document.querySelectorAll('.cta-box__form');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const emailInput = form.querySelector('.cta-box__input');
      const email = emailInput.value.trim();
      const submitBtn = form.querySelector('button[type="submit"]');

      // Validação básica
      if (!email || !email.includes('@')) {
        alert('Por favor, insira um e-mail válido');
        return;
      }

      // Mostrar loading
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Salvando...';
      submitBtn.disabled = true;

      try {
        // Salvar no Firestore
        await db.collection('newsletter').add({
          email: email,
          dataInscricao: new Date().toISOString(),
          status: 'ativo',
          origem: window.location.pathname
        });

        // Sucesso
        submitBtn.textContent = '✓ Inscrição confirmada!';
        emailInput.value = '';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);

      } catch (error) {
        console.error('Erro ao salvar newsletter:', error);
        alert('Erro ao inscrever. Tente novamente mais tarde.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
});
