import fs from 'fs';
import { buildPage } from './template.js';

// ---------------------------------------------------------------------------
// Batch 2: Especialização Courses — 8 courses
// ---------------------------------------------------------------------------

const especializacaoCourses = [
  {
    slug: 'data-science-ia',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Data Science e IA 2026: machine learning, análise de dados e IA generativa',
    subtitle: 'Domine análise de dados, machine learning e inteligência artificial para transformar dados em decisões estratégicas',
    badge: 'Tecnologia',
    badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop',
    imgAlt: 'Data scientist analisando código Python em computador com visualizações de dados',
    quickAnswer: '<strong>Especialização Data Science e IA</strong> dura <strong>6–12 meses</strong>. Investimento: <strong>R$ 8.000–R$ 25.000</strong>. Salário inicial: <strong>R$ 7.000–R$ 14.000</strong>. Data Scientists seniors ganham <strong>R$ 18.000–R$ 35.000</strong>. Público: engenheiros, matemáticos, analistas buscando evoluir para dados ou IA.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Data Science e IA' }
    ],
    sidebarLinks: [
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' },
      { label: 'Docência em EAD', href: '../docencia-ead/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' }
    ],
    date: '2026-04-23',
    readTime: '10 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/data-science-ia/index.html',
    content: `
      <h2>O que é Especialização em Data Science e IA?</h2>
      <p>Especialização em Data Science e IA é um programa de pós-graduação lato sensu que forma profissionais em análise de grandes volumes de dados (big data), desenvolvimento de modelos de machine learning, estatística aplicada e inteligência artificial generativa. Ideal para quem quer transicionar para carreira em dados ou IA.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–12 meses presencial; 8–16 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–420 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em qualquer área; conhecimento de programação recomendado</td></tr>
          <tr><td>Investimento</td><td>R$ 8.000–R$ 25.000</td></tr>
        </tbody>
      </table>

      <h2>Áreas de atuação e salários</h2>
      <table>
        <thead><tr><th>Especialidade</th><th>Cargo</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Machine Learning</td><td>ML Engineer</td><td>R$ 10.000–R$ 25.000</td></tr>
          <tr><td>Analytics</td><td>Data Analyst</td><td>R$ 7.000–R$ 16.000</td></tr>
          <tr><td>IA Generativa</td><td>AI Specialist</td><td>R$ 12.000–R$ 30.000</td></tr>
          <tr><td>Big Data</td><td>Data Engineer</td><td>R$ 10.000–R$ 22.000</td></tr>
          <tr><td>Business Intelligence</td><td>BI Analyst</td><td>R$ 8.000–R$ 18.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Altíssima demanda. Toda empresa que trabalha com volume de dados busca Data Scientists e ML Engineers. Mercado aquecido por transformação digital, fintech, e-commerce e startups. Profissionais especializados em IA generativa têm salários acima da média e múltiplas oportunidades.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso saber programar para fazer essa especialização?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Recomendado ter noções de Python ou R. Muitos cursos oferecem módulos introdutórios, mas se você não sabe programar, a curva de aprendizado será mais íngreme.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Data Science é diferente de análise de dados?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. Análise de dados é mais simples (SQL, Power BI, Excel). Data Science vai além — envolve machine learning, modelagem estatística e criação de algoritmos preditivos. Data Scientists ganham mais e resolvem problemas mais complexos.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>IA generativa é muito novo — vale a pena estudar agora?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Absolutamente. IA generativa é o tema mais em demanda de 2024–2026. Cursos que cobrem LLMs, prompt engineering e fine-tuning de modelos preparam você para cargos premium. Especialistas nesta área ganham 20–30% acima do mercado.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'gestao-pessoas',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Gestão de Pessoas 2026: recrutamento, desenvolvimento e cultura organizacional',
    subtitle: 'Especialize-se em recursos humanos, recrutamento, desenvolvimento de talentos e liderança de equipes',
    badge: 'Gestão',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Gerente de pessoas em reunião de desenvolvimento com colaboradores',
    quickAnswer: '<strong>Especialização Gestão de Pessoas</strong> dura <strong>6–10 meses</strong>. Investimento: <strong>R$ 7.000–R$ 18.000</strong>. Salário inicial: <strong>R$ 5.000–R$ 10.000</strong>. Gerentes e Diretores de RH ganham <strong>R$ 12.000–R$ 25.000</strong>. Público: profissionais em RH, gestores que querem se especializar em pessoas.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Gestão de Pessoas' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' },
      { label: 'Docência em EAD', href: '../docencia-ead/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/gestao-pessoas/index.html',
    content: `
      <h2>O que é Especialização em Gestão de Pessoas?</h2>
      <p>Especialização em Gestão de Pessoas é uma pós-graduação lato sensu que forma profissionais em recrutamento, seleção, desenvolvimento de talentos, cultura organizacional, liderança, remuneração e relações trabalhistas. Prepara para cargos em Recursos Humanos e gestão estratégica de pessoas.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–10 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–400 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em qualquer área</td></tr>
          <tr><td>Investimento</td><td>R$ 7.000–R$ 18.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Gerente de RH</td><td>Sênior</td><td>R$ 12.000–R$ 22.000</td></tr>
          <tr><td>Especialista em Recrutamento</td><td>Intermediário</td><td>R$ 6.000–R$ 12.000</td></tr>
          <tr><td>Gerente de Talentos</td><td>Sênior</td><td>R$ 10.000–R$ 18.000</td></tr>
          <tr><td>Consultor Organizacional</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Especialista em Cultura</td><td>Intermediário</td><td>R$ 7.000–R$ 14.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda contínua. Toda empresa média ou grande tem departamento de RH. Tendências como employee experience, retenção de talentos e transformação cultural abrem cada vez mais oportunidades. Startups buscam especialistas em cultura e people ops para escalar equipes rápido.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>É possível trabalhar em RH sem especialização?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim, é possível começar como Assistente de RH sem especialização. Mas a especialização diferencia no mercado e abre portas para gerência e consultoria — praticamente essencial para evoluir de carreira.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>O curso cobre relações trabalhistas e legislação?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. A maioria dos cursos inclui módulos de legislação trabalhista (CLT), direito coletivo e conformidade legal. Fundamental para gerir equipes sem riscos legais.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'bim-construcao',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização BIM em Construção 2026: modelagem, gestão de projetos e sustentabilidade',
    subtitle: 'Domine Building Information Modeling (BIM) para otimizar projetos de construção e reduzir custos',
    badge: 'Engenharia',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=500&fit=crop',
    imgAlt: 'Engenheiro visualizando modelo 3D BIM em software de construção',
    quickAnswer: '<strong>Especialização BIM</strong> dura <strong>6–9 meses</strong>. Investimento: <strong>R$ 10.000–R$ 22.000</strong>. Salário inicial: <strong>R$ 6.000–R$ 12.000</strong>. Especialistas BIM ganham <strong>R$ 12.000–R$ 22.000</strong>. Público: engenheiros civis, arquitetos, gestores de obra.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'BIM em Construção' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' },
      { label: 'Docência em EAD', href: '../docencia-ead/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/bim-construcao/index.html',
    content: `
      <h2>O que é Especialização em BIM?</h2>
      <p>Especialização em BIM (Building Information Modeling) é uma pós-graduação lato sensu que forma profissionais em metodologia BIM, modelagem 3D de projetos de construção, gestão colaborativa de projetos e sustentabilidade em edificações. O BIM é hoje obrigatório em licitações de grandes obras no Brasil.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–9 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–420 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em Engenharia Civil ou Arquitetura (recomendado)</td></tr>
          <tr><td>Investimento</td><td>R$ 10.000–R$ 22.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Modelador BIM</td><td>Intermediário</td><td>R$ 8.000–R$ 14.000</td></tr>
          <tr><td>Gestor de Projetos BIM</td><td>Sênior</td><td>R$ 12.000–R$ 22.000</td></tr>
          <tr><td>Coordenador BIM</td><td>Sênior</td><td>R$ 10.000–R$ 18.000</td></tr>
          <tr><td>Consultor BIM</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Supervisora de Obra com BIM</td><td>Intermediário</td><td>R$ 8.000–R$ 15.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Mercado em expansão. O governo federal e bancos de desenvolvimento agora exigem BIM em licitações. Construtoras grandes competem por profissionais qualificados em BIM. Mercado aquecido especialmente em cidades em desenvolvimento imobiliário (São Paulo, Rio, Minas Gerais).</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>BIM é obrigatório em todas as obras?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Obrigatório em obras públicas federais acima de R$ 10 milhões. Privadas ainda têm opção, mas grandes construtoras adotam BIM voluntariamente por eficiência e redução de custos.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Que softwares BIM são ensinados?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Geralmente Revit (mais popular), ArchiCAD ou Tekla. Muitos cursos ensinam múltiplas plataformas. O importante é dominar a metodologia BIM — software é ferramenta.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'docencia-ead',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Docência em EAD 2026: educação a distância, design instrucional e tecnologia',
    subtitle: 'Especialize-se em educação a distância, metodologia ativa e design de cursos online',
    badge: 'Educação',
    badgeClass: 'badge badge--orange',
    img: 'https://images.unsplash.com/photo-1516321318423-f06c3f504fac?w=900&h=500&fit=crop',
    imgAlt: 'Professora ministrando aula virtual em plataforma educacional',
    quickAnswer: '<strong>Especialização Docência em EAD</strong> dura <strong>6–9 meses</strong>. Investimento: <strong>R$ 6.000–R$ 15.000</strong>. Salário inicial: <strong>R$ 4.000–R$ 8.000</strong> (docentes). Profissionais em design instrucional ganham <strong>R$ 8.000–R$ 16.000</strong>. Público: professores, jornalistas, designers que querem atuar em educação digital.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Docência em EAD' }
    ],
    sidebarLinks: [
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' },
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' }
    ],
    date: '2026-04-23',
    readTime: '7 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/docencia-ead/index.html',
    content: `
      <h2>O que é Especialização em Docência em EAD?</h2>
      <p>Especialização em Docência em EAD é uma pós-graduação lato sensu que forma professores e designers instrucional para atuar em educação a distância. Cobre metodologia ativa, tecnologias educacionais, design instrucional, interação online e avaliação em ambientes virtuais.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–9 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–400 horas</td></tr>
          <tr><td>Modalidade</td><td>Geralmente oferecido em EAD</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em qualquer área (docência recomendada)</td></tr>
          <tr><td>Investimento</td><td>R$ 6.000–R$ 15.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Professor EAD</td><td>Intermediário</td><td>R$ 4.000–R$ 9.000</td></tr>
          <tr><td>Designer Instrucional</td><td>Intermediário</td><td>R$ 8.000–R$ 16.000</td></tr>
          <tr><td>Tutor Online</td><td>Básico</td><td>R$ 2.000–R$ 5.000</td></tr>
          <tr><td>Coordenador de Cursos Online</td><td>Sênior</td><td>R$ 8.000–R$ 15.000</td></tr>
          <tr><td>Especialista em Tecnologia Educacional</td><td>Sênior</td><td>R$ 9.000–R$ 18.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Mercado em crescimento explosivo pós-pandemia. Universidades, edtechs, corporações com programas de treinamento e plataformas educacionais buscam designers instrucionais e professores EAD. Startups de educação expandem oferta de cursos online continuamente.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Designer instrucional é professor?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não necessariamente. Designer instrucional planeja e estrutura cursos (currículo, atividades, avaliação). Pode ou não lecionar. Ganham mais que professores EAD tradicionais em muitos casos.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso estar ministrando aulas para fazer o curso?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. Muitos alunos são profissionais que querem transicionar para educação ou aprimorar seu trabalho atual. O curso ensina metodologia e ferramentas — você aprende prático e teórico.</p></div>
          </div>
        </div>
      </section>`
  }
];

// ---------------------------------------------------------------------------
// Gera os arquivos a partir dos dados acima
// ---------------------------------------------------------------------------

function generate(courses) {
  courses.forEach(course => {
    const dirPath = `./pages/pos-graduacao/${course.type}/${course.slug}`;
    const filePath = `${dirPath}/index.html`;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, buildPage(course));
    console.log(`✓ ${course.type}/${course.slug}`);
  });
}

generate(especializacaoCourses);

console.log('\n✓ Batch 2 (Especialização Courses) gerado com template canônico!');
console.log('\nRemaining: 1 additional course (Direito Tributário) — can be added as single item or new batch');
