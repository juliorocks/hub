/**
 * lead-form.js
 * Gerencia o formulário flutuante de captação de leads
 * Integra com Firebase para armazenar leads e Meta Pixel para tracking
 */

class LeadForm {
  constructor() {
    this.pixelId = '1598794954687611';
    this.isOpen = false;
    this.formData = {};
    this.courses = {}; // Carregará do array abaixo
    this.init();
  }

  // Dados dos cursos por categoria
  getCourseData() {
    return {
      graduacao: [
        { id: 'medicina', name: 'Medicina' },
        { id: 'direito', name: 'Direito' },
        { id: 'engenharia', name: 'Engenharia' },
        { id: 'administracao', name: 'Administração' },
        { id: 'contabilidade', name: 'Contabilidade' },
        // ... adicionar mais conforme necessário
      ],
      pos_graduacao: [
        { id: 'mba-marketing-digital', name: 'MBA Marketing Digital' },
        { id: 'mba-gestao-empresarial', name: 'MBA Gestão Empresarial' },
        { id: 'mba-gestao-financeira', name: 'MBA Gestão Financeira' },
        { id: 'mba-gestao-projetos', name: 'MBA Gestão de Projetos' },
        { id: 'mba-gestao-pessoas', name: 'MBA Gestão de Pessoas' },
        { id: 'mba-financas-corporativas', name: 'MBA Finanças Corporativas' },
        { id: 'mba-engenharia-software', name: 'MBA Engenharia de Software' },
        { id: 'mba-saude', name: 'MBA em Saúde' },
        { id: 'mba-saude-gestao-hospitalar', name: 'MBA Saúde - Gestão Hospitalar' },
        { id: 'data-science-ia', name: 'Especialização Data Science e IA' },
        { id: 'gestao-pessoas', name: 'Especialização Gestão de Pessoas' },
        { id: 'bim-construcao', name: 'Especialização BIM em Construção' },
        { id: 'docencia-ead', name: 'Especialização Docência em EAD' },
        { id: 'direito-tributario', name: 'Especialização Direito Tributário' },
        { id: 'logistica-supply-chain', name: 'Especialização Logística Supply Chain' },
        { id: 'residencia-medica', name: 'Residência Médica' },
        { id: 'saude', name: 'Especialização Saúde Pública' },
      ],
      tecnico: [
        { id: 'tecnico-informatica', name: 'Técnico em Informática' },
        { id: 'tecnico-enfermagem', name: 'Técnico em Enfermagem' },
        { id: 'tecnico-administracao', name: 'Técnico em Administração' },
      ],
      profissionalizante: [
        { id: 'prog-web', name: 'Programação Web' },
        { id: 'ux-design', name: 'UX Design' },
      ],
      livres: [
        { id: 'excel-avancado', name: 'Excel Avançado' },
        { id: 'inglés-online', name: 'Inglês Online' },
      ],
    };
  }

  init() {
    this.courses = this.getCourseData();
    this.createButton();
    this.createModal();
    this.attachEventListeners();
    this.loadContextFromPage();
  }

  createButton() {
    const btn = document.createElement('button');
    btn.className = 'lead-form__button';
    btn.innerHTML = `
      <span class="lead-form__button-text">Quero saber mais</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Abrir formulário de interesse');
    btn.addEventListener('click', () => this.open());
    document.body.appendChild(btn);
    this.button = btn;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'lead-form__modal';
    modal.innerHTML = `
      <div class="lead-form__backdrop"></div>
      <div class="lead-form__content">
        <button class="lead-form__close" aria-label="Fechar formulário">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="lead-form__header">
          <h2 class="lead-form__title">Receba informações sobre cursos</h2>
          <p class="lead-form__subtitle">Preencha os dados abaixo para receber um contato da equipe</p>
        </div>

        <form class="lead-form__form" id="lead-form-element">
          <div class="form-group">
            <label for="lead-name">Nome completo</label>
            <input type="text" id="lead-name" name="name" required>
          </div>

          <div class="form-group">
            <label for="lead-email">E-mail</label>
            <input type="email" id="lead-email" name="email" required>
          </div>

          <div class="form-group">
            <label for="lead-whatsapp">WhatsApp</label>
            <input type="tel" id="lead-whatsapp" name="whatsapp" placeholder="(11) 99999-9999" required>
          </div>

          <div id="lead-course-container" class="form-group">
            <!-- Será preenchido dinamicamente -->
          </div>

          <button type="submit" class="lead-form__submit">Quero receber informações</button>
        </form>

        <p class="lead-form__privacy">Seus dados estão seguros. <a href="/politica-privacidade.html" target="_blank">Política de Privacidade</a></p>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
    this.form = modal.querySelector('#lead-form-element');
  }

  attachEventListeners() {
    const backdrop = this.modal.querySelector('.lead-form__backdrop');
    const closeBtn = this.modal.querySelector('.lead-form__close');

    backdrop.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());

    // Fechar com Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Submit do formulário
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  loadContextFromPage() {
    const body = document.body;
    const courseName = body.dataset.courseName;
    const courseId = body.dataset.course;
    const area = body.dataset.area;

    const container = document.getElementById('lead-course-container');

    if (courseName && courseId) {
      // Página específica de curso
      container.innerHTML = `
        <div class="form-group">
          <label>Curso de interesse</label>
          <div class="form-static-value">${courseName}</div>
          <input type="hidden" name="course_id" value="${courseId}">
          <input type="hidden" name="course_name" value="${courseName}">
        </div>
      `;
      this.currentCourse = { id: courseId, name: courseName };
    } else {
      // Página geral: mostrar dropdowns
      container.innerHTML = `
        <div class="form-group">
          <label for="lead-category">Categoria</label>
          <select id="lead-category" name="category" required>
            <option value="">Selecione uma categoria...</option>
            <option value="graduacao">Graduação</option>
            <option value="pos_graduacao">Pós-Graduação</option>
            <option value="tecnico">Técnico</option>
            <option value="profissionalizante">Profissionalizante</option>
            <option value="livres">Cursos Livres</option>
          </select>
        </div>

        <div class="form-group" id="subcategory-container" style="display:none;">
          <label for="lead-subcategory">Curso de interesse</label>
          <select id="lead-subcategory" name="course_name">
            <option value="">Selecione um curso...</option>
          </select>
        </div>
      `;

      const categorySelect = document.getElementById('lead-category');
      const subcategoryContainer = document.getElementById('subcategory-container');
      const subcategorySelect = document.getElementById('lead-subcategory');

      categorySelect.addEventListener('change', (e) => {
        const category = e.target.value;
        if (category && this.courses[category]) {
          subcategoryContainer.style.display = 'block';
          subcategorySelect.innerHTML = '<option value="">Selecione um curso...</option>';
          this.courses[category].forEach(course => {
            const option = document.createElement('option');
            option.value = course.name;
            option.textContent = course.name;
            subcategorySelect.appendChild(option);
          });
        } else {
          subcategoryContainer.style.display = 'none';
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      course_name: formData.get('course_name') || this.currentCourse?.name || 'Não especificado',
      course_id: formData.get('course_id') || this.currentCourse?.id || 'unknown',
      category: formData.get('category') || 'general',
      created_at: new Date().toISOString(),
      url: window.location.href,
    };

    // Salvar no Firebase
    this.saveToFirebase(data);

    // Disparar evento no Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: data.course_name,
        content_category: data.category,
        value: 0,
        currency: 'BRL',
      });
    }

    // Mostrar mensagem de sucesso
    this.showSuccessMessage();

    // Limpar formulário
    this.form.reset();
  }

  saveToFirebase(data) {
    // Verifica se Firebase está disponível
    if (typeof firebase === 'undefined' || !firebase.database) {
      console.warn('Firebase não está inicializado. Lead capturado mas não salvo.');
      console.log('Dados do lead:', data);
      return;
    }

    try {
      const db = firebase.database();
      const leadsRef = db.ref('leads');
      leadsRef.push(data)
        .then(() => console.log('Lead salvo no Firebase com sucesso'))
        .catch(err => console.error('Erro ao salvar lead:', err));
    } catch (error) {
      console.error('Erro ao acessar Firebase:', error);
    }
  }

  showSuccessMessage() {
    const form = this.form;
    const originalHTML = form.innerHTML;

    form.innerHTML = `
      <div class="lead-form__success">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <h3>Obrigado!</h3>
        <p>Receberemos seus dados em breve e entraremos em contato.</p>
      </div>
    `;

    setTimeout(() => {
      form.innerHTML = originalHTML;
      this.attachEventListeners();
    }, 3000);
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.modal.querySelector('input')?.focus();
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

// Inicializa quando os componentes estão carregados
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LeadForm();
  });
} else {
  new LeadForm();
}
