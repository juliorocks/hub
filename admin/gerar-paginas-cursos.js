import fs from 'fs';
import { buildPage } from './template.js';

// ---------------------------------------------------------------------------
// Dados dos cursos — adicionar novos cursos aqui seguindo o mesmo padrão
// ---------------------------------------------------------------------------

// Saúde
const saude = [
  {
    slug: 'medicina', area: 'saude',
    title: 'Medicina - Bacharelado 2026: guia completo, salários e mercado',
    subtitle: 'O curso de maior prestígio do Brasil: o que esperar, quanto ganha e como se preparar',
    badge: 'Saúde', badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&h=500&fit=crop',
    imgAlt: 'Estudantes de medicina em laboratório',
    quickAnswer: 'O curso de <strong>Medicina</strong> dura <strong>12 semestres (6 anos)</strong> mais 2 anos de internato obrigatório. Salário inicial: <strong>R$ 5.000–R$ 8.000</strong>. Especialistas chegam a <strong>R$ 30.000–R$ 60.000</strong>. Exige nota acima de 700 no ENEM e é o curso mais concorrido do Brasil.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Graduação', href: '../../index.html' },
      { label: 'Saúde', href: '../index.html' },
      { label: 'Medicina' }
    ],
    sidebarLinks: [
      { label: 'Enfermagem', href: '../enfermagem/index.html' },
      { label: 'Odontologia', href: '../odontologia/index.html' },
      { label: 'Farmácia', href: '../farmacia/index.html' },
      { label: 'Nutrição', href: '../nutricao/index.html' },
      { label: 'Fisioterapia', href: '../fisioterapia/index.html' },
      { label: 'Psicologia', href: '../psicologia/index.html' }
    ],
    content: `
        <h2>O que é o curso de Medicina?</h2>
        <p>Medicina é o curso de bacharelado de maior prestígio e concorrência no Brasil. Forma profissionais habilitados para diagnóstico, tratamento e prevenção de doenças humanas. A formação dura 6 anos (12 semestres) e inclui 2 anos obrigatórios de internato em hospital universitário.</p>

        <h2>Dados gerais do curso</h2>
        <table>
          <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
          <tbody>
            <tr><td>Duração</td><td>12 semestres (6 anos) + 2 anos de internato</td></tr>
            <tr><td>Grau</td><td>Bacharel em Medicina</td></tr>
            <tr><td>Carga horária mínima</td><td>7.200 horas</td></tr>
            <tr><td>Modalidade</td><td>Presencial (obrigatório por lei)</td></tr>
            <tr><td>Nota de corte ENEM</td><td>700+ pontos</td></tr>
            <tr><td>Registro profissional</td><td>CRM</td></tr>
          </tbody>
        </table>

        <h2>Salários por especialidade</h2>
        <table>
          <thead><tr><th>Especialidade</th><th>Duração residência</th><th>Salário médio</th></tr></thead>
          <tbody>
            <tr><td>Clínico Geral</td><td>—</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Pediatria</td><td>2 anos</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Cirurgia Geral</td><td>2 anos</td><td>R$ 12.000 – R$ 22.000</td></tr>
            <tr><td>Cardiologia</td><td>3 anos</td><td>R$ 18.000 – R$ 40.000</td></tr>
            <tr><td>Dermatologia</td><td>3 anos</td><td>R$ 20.000 – R$ 55.000</td></tr>
            <tr><td>Neurocirurgia</td><td>5 anos</td><td>R$ 25.000 – R$ 65.000</td></tr>
          </tbody>
        </table>

        <h2>Mercado de trabalho</h2>
        <p>O Brasil tem déficit de médicos em regiões do interior e Norte/Nordeste — empregabilidade quase imediata após o CRM. Nas grandes capitais, a especialização é praticamente obrigatória para boas remunerações.</p>

        <div class="affiliate-cta-article">
          <div class="affiliate-cta-article__content">
            <h3 class="affiliate-cta-article__title">Quer cursar Medicina com bolsa?</h3>
            <p class="affiliate-cta-article__text">Compare universidades com as melhores notas no MEC e desconto garantido.</p>
            <div class="affiliate-cta-article__actions">
              <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver bolsas na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
              <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver bolsas na Unopar</a>
            </div>
          </div>
        </div>

        <section class="faq-section" aria-labelledby="faq-title">
          <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
          <div class="faq-list">
            <div class="faq-item">
              <button class="faq-question" aria-expanded="false"><span>Medicina pode ser feita à distância?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="faq-answer"><p>Não. Por determinação do CFM e do MEC, o curso de Medicina é obrigatoriamente presencial.</p></div>
            </div>
            <div class="faq-item">
              <button class="faq-question" aria-expanded="false"><span>É preciso fazer residência médica?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="faq-answer"><p>Não é obrigatório, mas é altamente recomendado. Sem residência, o médico só pode atuar como clínico geral. A especialização praticamente dobra ou triplica o salário.</p></div>
            </div>
          </div>
        </section>`
  }
  // Adicionar outros cursos de saúde aqui conforme necessário
];

// ---------------------------------------------------------------------------
// Gera os arquivos a partir dos dados acima
// ---------------------------------------------------------------------------

function generate(courses) {
  courses.forEach(course => {
    const dirPath = `./pages/graduacao/${course.area}/${course.slug}`;
    const filePath = `${dirPath}/index.html`;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, buildPage(course));
    console.log(`✓ ${course.area}/${course.slug}`);
  });
}

generate(saude);

console.log('\n✓ Páginas geradas com template canônico!');
