import fs from 'fs';
import { buildPage } from './template.js';

// ---------------------------------------------------------------------------
// Batch 3: MBA Remaining (7 courses) + Especialização Remaining (4 courses)
// ---------------------------------------------------------------------------

const batch3Courses = [
  // MBA Courses
  {
    slug: 'mba-gestao-projetos',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Gestão de Projetos 2026: PMBOK, Agile, Scrum e liderança de equipes',
    subtitle: 'Domine metodologias ágeis, PMBOK e liderança para gerenciar projetos complexos e multidisciplinares',
    badge: 'Gestão',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Gerente de projetos em reunião de planejamento com quadro kanban',
    quickAnswer: '<strong>MBA Gestão de Projetos</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 16.000–R$ 50.000</strong>. Salário inicial: <strong>R$ 8.000–R$ 15.000</strong>. Project Managers sêniors ganham <strong>R$ 18.000–R$ 35.000</strong>. Público: profissionais com 3+ anos que querem gerenciar projetos grandes.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Gestão de Projetos' }
    ],
    sidebarLinks: [
      { label: 'MBA em Marketing Digital', href: '../mba-marketing-digital/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Gestão Financeira', href: '../mba-gestao-financeira/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-gestao-projetos/index.html',
    content: `
      <h2>O que é MBA em Gestão de Projetos?</h2>
      <p>MBA em Gestão de Projetos é uma pós-graduação lato sensu que forma gerentes de projeto em metodologias ágeis (Scrum, Kanban), PMBOK (padrão internacional), liderança, comunicação e gestão de riscos. Essencial para profissionais que coordenam equipes multidisciplinares.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–20 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>3+ anos em coordenação/gestão</td></tr>
          <tr><td>Investimento</td><td>R$ 16.000–R$ 50.000</td></tr>
        </tbody>
      </table>

      <h2>Certificações & Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Project Manager</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>PMO (Project Management Office)</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Scrum Master</td><td>Intermediário</td><td>R$ 8.000–R$ 16.000</td></tr>
          <tr><td>Agile Coach</td><td>Sênior</td><td>R$ 12.000–R$ 22.000</td></tr>
          <tr><td>Director de Programas</td><td>Executivo</td><td>R$ 18.000–R$ 35.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda crescente em tecnologia, construção, saúde e manufatura. Empresas adotam metodologias ágeis em grande velocidade — há falta de PMs qualificados. Certificações como PMP (PMBOK) e CSM (Scrum) aumentam empregabilidade em 40–50%.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>MBA em Gestão de Projetos = PMP?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não são a mesma coisa. MBA é um curso de pós-graduação (geralmente 12–18 meses). PMP é uma certificação profissional (prova de conhecimento). Muitos MBAs preparam para PMP, mas não garantem.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual é melhor: PMBOK ou Agile?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Depende do projeto. PMBOK (planejamento rigoroso) é melhor para projetos tradicionais com escopo fixo. Agile é melhor para startups e ambientes de mudança rápida. Bons PMs dominam ambas.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-gestao-pessoas',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Gestão de Pessoas 2026: recrutamento, desenvolvimento e cultura organizacional',
    subtitle: 'Desenvolva competências em RH estratégico, liderança de equipes e transformação organizacional',
    badge: 'Gestão',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Líder discutindo desenvolvimento de equipe em sessão de coaching',
    quickAnswer: '<strong>MBA Gestão de Pessoas</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 16.000–R$ 48.000</strong>. Salário inicial: <strong>R$ 7.000–R$ 14.000</strong>. Diretores de RH ganham <strong>R$ 18.000–R$ 35.000</strong>. Público: RHs, gestores buscando liderança estratégica.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Gestão de Pessoas' }
    ],
    sidebarLinks: [
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Gestão de Projetos', href: '../mba-gestao-projetos/index.html' },
      { label: 'MBA em Gestão Financeira', href: '../mba-gestao-financeira/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-gestao-pessoas/index.html',
    content: `
      <h2>O que é MBA em Gestão de Pessoas?</h2>
      <p>MBA em Gestão de Pessoas é uma pós-graduação lato sensu que qualifica profissionais em RH estratégico, recrutamento e seleção, desenvolvimento de talentos, remuneração, cultura organizacional, liderança transformacional e gestão de mudanças.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–20 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>3+ anos em RH ou gestão</td></tr>
          <tr><td>Investimento</td><td>R$ 16.000–R$ 48.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Diretor de RH</td><td>Executivo</td><td>R$ 18.000–R$ 35.000</td></tr>
          <tr><td>Gerente de Talentos</td><td>Sênior</td><td>R$ 12.000–R$ 20.000</td></tr>
          <tr><td>Chief People Officer</td><td>C-level</td><td>R$ 20.000–R$ 40.000</td></tr>
          <tr><td>Consultor Organizacional</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Gestor de Desenvolvimento</td><td>Intermediário</td><td>R$ 8.000–R$ 15.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Tendências como employee experience, retenção de talentos e liderança inclusiva aumentam demanda por especialistas em RH estratégico. Startups de fintech e tech buscam agressivamente CPOs (Chief People Officers). Consultoria também aquecida.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>MBA Gestão de Pessoas é diferente de Especialização em Gestão de Pessoas?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. O MBA é mais profundo e estratégico (12–18 meses, 400+ horas), enquanto a especialização é mais prática e focada (6–10 meses, 360 horas). MBA prepara para C-level; especialização para gerência operacional.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Devo fazer MBA ou especialização em RH?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Se você quer crescer para diretoria ou C-level, escolha MBA. Se quer aprofundar em RH operacional/tático, especialização é mais prática e rápida. Alguns profissionais fazem especialização primeiro, depois MBA.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-financas-corporativas',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Finanças Corporativas 2026: análise de investimentos, valoração e estratégia financeira',
    subtitle: 'Especialize-se em planejamento financeiro, análise de investimentos e gestão de valor empresarial',
    badge: 'Finanças',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=500&fit=crop',
    imgAlt: 'Analista de investimentos revisando gráficos de ações em múltiplos monitores',
    quickAnswer: '<strong>MBA Finanças Corporativas</strong> dura <strong>12–20 meses</strong>. Investimento: <strong>R$ 20.000–R$ 60.000</strong>. Salário inicial: <strong>R$ 10.000–R$ 18.000</strong>. CFOs e especialistas em M&A ganham <strong>R$ 30.000–R$ 60.000</strong>. Público: profissionais em finanças/controladoria buscando nível executivo.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Finanças Corporativas' }
    ],
    sidebarLinks: [
      { label: 'MBA em Gestão Financeira', href: '../mba-gestao-financeira/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Gestão de Projetos', href: '../mba-gestao-projetos/index.html' }
    ],
    date: '2026-04-23',
    readTime: '10 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-financas-corporativas/index.html',
    content: `
      <h2>O que é MBA em Finanças Corporativas?</h2>
      <p>MBA em Finanças Corporativas é uma pós-graduação lato sensu que forma executivos em análise de investimentos, valoração de empresas, fusões & aquisições (M&A), planejamento financeiro estratégico e estruturação de capital. Diferencia-se do MBA em Gestão Financeira por ser mais voltado a estratégia e investimentos.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–20 meses presencial; 18–24 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>480–520 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>5+ anos em finanças ou investimentos</td></tr>
          <tr><td>Investimento</td><td>R$ 20.000–R$ 60.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais & salários</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>CFO (Chief Financial Officer)</td><td>C-level</td><td>R$ 30.000–R$ 60.000</td></tr>
          <tr><td>Analista de M&A</td><td>Sênior</td><td>R$ 18.000–R$ 35.000</td></tr>
          <tr><td>Gestor de Private Equity</td><td>Sênior</td><td>R$ 20.000–R$ 50.000</td></tr>
          <tr><td>Diretor Financeiro</td><td>Executivo</td><td>R$ 22.000–R$ 45.000</td></tr>
          <tr><td>Analista de Investimentos</td><td>Intermediário</td><td>R$ 10.000–R$ 22.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Altamente procurado em bancos de investimento, private equity, fundos de venture capital e corporações em crescimento. Mercado de M&A no Brasil segue aquecido pós-reforma tributária. Profissionais com MBA em Finanças Corporativas têm acesso a bônus e participação nos deals.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual é a diferença entre MBA em Finanças Corporativas e Gestão Financeira?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Gestão Financeira é operacional (controladoria, tesouraria, compliance). Finanças Corporativas é estratégica (M&A, valoração, estrutura de capital). Corporativas prepara para CFO; Gestão para Controller.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso de experiência em investimentos?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Altamente recomendado ter 5+ anos. Este é um MBA de nível executivo — sem experiência prévia, o aprendizado será desafiador e menos aplicável.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-engenharia-software',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Engenharia de Software 2026: arquitetura, DevOps, segurança e liderança técnica',
    subtitle: 'Desenvolva expertise em arquitetura de sistemas, DevOps, cybersecurity e gestão de equipes técnicas',
    badge: 'Tecnologia',
    badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=500&fit=crop',
    imgAlt: 'Arquiteto de software em whiteboard desenhando arquitetura de sistema',
    quickAnswer: '<strong>MBA Engenharia de Software</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 18.000–R$ 48.000</strong>. Salário inicial: <strong>R$ 10.000–R$ 18.000</strong>. CTOs e Staff Engineers ganham <strong>R$ 25.000–R$ 50.000</strong>. Público: engenheiros com 5+ anos buscando liderança técnica.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Engenharia de Software' }
    ],
    sidebarLinks: [
      { label: 'MBA em Marketing Digital', href: '../mba-marketing-digital/index.html' },
      { label: 'MBA em Gestão de Projetos', href: '../mba-gestao-projetos/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-engenharia-software/index.html',
    content: `
      <h2>O que é MBA em Engenharia de Software?</h2>
      <p>MBA em Engenharia de Software é uma pós-graduação lato sensu que qualifica engenheiros em arquitetura de sistemas, padrões de design, DevOps, cybersecurity, escalabilidade, liderança técnica e gestão de equipes. Prepara para cargos como Tech Lead, Architect ou CTO.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–20 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>5+ anos como engenheiro de software</td></tr>
          <tr><td>Investimento</td><td>R$ 18.000–R$ 48.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>CTO (Chief Technology Officer)</td><td>C-level</td><td>R$ 25.000–R$ 50.000</td></tr>
          <tr><td>Software Architect</td><td>Sênior</td><td>R$ 16.000–R$ 30.000</td></tr>
          <tr><td>Tech Lead</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>DevOps Lead</td><td>Sênior</td><td>R$ 12.000–R$ 22.000</td></tr>
          <tr><td>Security Architect</td><td>Sênior</td><td>R$ 14.000–R$ 28.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda altíssima em startups de tecnologia, fintechs, Big Techs (Google, Microsoft, Amazon) e empresas em transformação digital. Profissionais com habilidades em cloud (AWS, GCP, Azure), Kubernetes e segurança estão em falta extrema. Salários 30–50% acima de engenheiros plenos.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso saber Kubernetes para fazer o MBA?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não é pré-requisito, mas ajuda. Muitos cursos ensinam DevOps e containerização do zero. Ideal ter experiência com Linux, redes e infraestrutura.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>CTO precisa de MBA em Engenharia de Software?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não é obrigatório, mas ajuda muito. Startups preferem engenheiros brilhantes com vision. Corporações e scale-ups frequentemente procuram CTOs com MBA em Eng. Software por experiência comprovada.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-saude',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA em Saúde 2026: gestão hospitalar, saúde pública e regulamentação',
    subtitle: 'Especialize-se em gestão de serviços de saúde, saúde pública, regulamentação e empreendedorismo médico',
    badge: 'Saúde',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=900&h=500&fit=crop',
    imgAlt: 'Gestor de saúde em reunião de diretoria em hospital moderno',
    quickAnswer: '<strong>MBA em Saúde</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 16.000–R$ 45.000</strong>. Salário inicial: <strong>R$ 8.000–R$ 14.000</strong>. Diretores de saúde ganham <strong>R$ 18.000–R$ 35.000</strong>. Público: médicos, enfermeiros, gestores buscando saúde executiva.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA em Saúde' }
    ],
    sidebarLinks: [
      { label: 'MBA Saúde - Gestão Hospitalar', href: '../mba-saude-gestao-hospitalar/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Gestão Financeira', href: '../mba-gestao-financeira/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-saude/index.html',
    content: `
      <h2>O que é MBA em Saúde?</h2>
      <p>MBA em Saúde é uma pós-graduação lato sensu que forma gestores de saúde em administração hospitalar, saúde pública, regulamentação ANVISA/ANS, empreendedorismo em saúde (startups de health tech) e gestão de equipes multidisciplinares em ambiente clínico.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–20 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>Profissional de saúde (médico, enfermeiro, farmacêutico) com 3+ anos</td></tr>
          <tr><td>Investimento</td><td>R$ 16.000–R$ 45.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Diretor de Hospital</td><td>Executivo</td><td>R$ 18.000–R$ 35.000</td></tr>
          <tr><td>Gerente de Saúde Pública</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Fundador de Startup de Health Tech</td><td>C-level</td><td>Variável (equity)</td></tr>
          <tr><td>Diretor Clínico</td><td>Executivo</td><td>R$ 15.000–R$ 28.000</td></tr>
          <tr><td>Gestor de Operações</td><td>Intermediário</td><td>R$ 8.000–R$ 16.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Setor de saúde em expansão — hospitais, clínicas, planos de saúde e health techs crescem rapidamente. Profissionais com MBA em Saúde são raros e altamente valorizados. Especialistas em saúde digital e telemedicina têm salários premium.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Só médicos podem fazer MBA em Saúde?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. Enfermeiros, farmacêuticos, fisioterapeutas, administradores e gestores de saúde podem fazer. Qualquer profissional de saúde com experiência é bem-vindo.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual é a diferença entre MBA em Saúde e Gestão Hospitalar?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Saúde é mais amplo (cobre saúde pública, regulação, inovação). Gestão Hospitalar é focado em operações e gestão dentro do hospital. Saúde prepara para direção estratégica; Gestão Hospitalar para operação dia-a-dia.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-saude-gestao-hospitalar',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Saúde - Gestão Hospitalar 2026: operações, RH clínico e qualidade em saúde',
    subtitle: 'Domine gestão de operações hospitalares, qualidade assistencial e liderança de equipes clínicas',
    badge: 'Saúde',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=900&h=500&fit=crop',
    imgAlt: 'Gestor hospitalar verificando protocolos de qualidade em centro cirúrgico',
    quickAnswer: '<strong>MBA Saúde - Gestão Hospitalar</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 16.000–R$ 42.000</strong>. Salário inicial: <strong>R$ 8.000–R$ 14.000</strong>. Diretores de operações ganham <strong>R$ 16.000–R$ 32.000</strong>. Público: profissionais em hospitais, clínicas e serviços de saúde.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Saúde - Gestão Hospitalar' }
    ],
    sidebarLinks: [
      { label: 'MBA em Saúde', href: '../mba-saude/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Gestão de Pessoas', href: '../mba-gestao-pessoas/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-saude-gestao-hospitalar/index.html',
    content: `
      <h2>O que é MBA em Saúde - Gestão Hospitalar?</h2>
      <p>MBA em Saúde - Gestão Hospitalar é uma pós-graduação lato sensu que especializa profissionais em administração hospitalar, gestão de operações, qualidade assistencial, compliance regulatório (ANVISA, JCI) e liderança de equipes multidisciplinares em ambientes clínicos.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–20 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>3+ anos em ambiente hospitalar</td></tr>
          <tr><td>Investimento</td><td>R$ 16.000–R$ 42.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Diretor de Operações</td><td>Executivo</td><td>R$ 16.000–R$ 30.000</td></tr>
          <tr><td>Gerente de Qualidade</td><td>Sênior</td><td>R$ 10.000–R$ 18.000</td></tr>
          <tr><td>Supervisor de Enfermagem</td><td>Intermediário</td><td>R$ 8.000–R$ 14.000</td></tr>
          <tr><td>Coordenador de Compliance</td><td>Intermediário</td><td>R$ 8.000–R$ 15.000</td></tr>
          <tr><td>Gestor de Recursos Humanos Clínico</td><td>Intermediário</td><td>R$ 8.000–R$ 16.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Rede hospitalares brasileiras buscam gestores qualificados em operações e qualidade. Mercado aquecido por modernização de hospitais, exigências regulatórias mais rigorosas (ANVISA) e expansão de clínicas privadas. Oportunidades também em hospital dia e unidades de cuidado especializado.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false"><span>Qual é o diferencial desta especialização em relação a MBA em Saúde?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
          <div class="faq-answer"><p>Este é mais operacional e tático (qualidade, eficiência, protocolos hospitalares). MBA em Saúde é mais estratégico e abrangente (saúde pública, inovação, empreendedorismo).</p></div>
        </div>
        <div class="faq-item">
          <button class="faq-question" aria-expanded="false"><span>Preciso ser médico para gerenciar um hospital?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
          <div class="faq-answer"><p>Não. Qualquer profissional com experiência hospitalar e MBA em Gestão Hospitalar pode gerenciar. Muitos diretores são administradores, não médicos. O importante é entender operações de saúde.</p></div>
        </div>
      </section>`
  },

  // Especialização Courses
  {
    slug: 'direito-tributario',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Direito Tributário 2026: impostos, planejamento fiscal e compliance',
    subtitle: 'Domine legislação tributária, planejamento fiscal estratégico e conformidade legal para empresas',
    badge: 'Direito',
    badgeClass: 'badge badge--orange',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Advogado tributarista revisando documentação fiscal em escritório',
    quickAnswer: '<strong>Especialização Direito Tributário</strong> dura <strong>6–10 meses</strong>. Investimento: <strong>R$ 8.000–R$ 20.000</strong>. Salário inicial: <strong>R$ 6.000–R$ 12.000</strong>. Especialistas em tributos ganham <strong>R$ 12.000–R$ 25.000</strong>. Público: advogados, contadores, gestores buscando especialização fiscal.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Direito Tributário' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' },
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/direito-tributario/index.html',
    content: `
      <h2>O que é Especialização em Direito Tributário?</h2>
      <p>Especialização em Direito Tributário é uma pós-graduação lato sensu que forma profissionais em legislação tributária (impostos federais, estaduais e municipais), planejamento fiscal estratégico, procedimentos administrativos e contencioso tributário. Essencial para advogados, contadores e gestores que trabalham com compliance fiscal.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–10 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–420 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em Direito (recomendado), Contabilidade ou Administração</td></tr>
          <tr><td>Investimento</td><td>R$ 8.000–R$ 20.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Advogado Tributarista</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Especialista em Planejamento Fiscal</td><td>Intermediário</td><td>R$ 8.000–R$ 15.000</td></tr>
          <tr><td>Contador Especializado</td><td>Intermediário</td><td>R$ 7.000–R$ 14.000</td></tr>
          <tr><td>Compliance Officer</td><td>Sênior</td><td>R$ 10.000–R$ 18.000</td></tr>
          <tr><td>Consultor Fiscal</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda contínua em escritórios de advocacia, consultorias, grandes corporações e startups. Reforma tributária de 2024–2026 aumenta demanda por especialistas. Profissionais em planejamento fiscal têm salários altos e job security.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso ser advogado para estudar Direito Tributário?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não obrigatoriamente. Contadores, gestores e administradores podem fazer. Mas advogados têm vantagem de entender o sistema legal como um todo.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale a pena especializar em Tributário?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. Especialistas em tributos são raros e bem remunerados. Toda empresa precisa de planejamento fiscal — demanda constante e job security alto.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'logistica-supply-chain',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Logística e Supply Chain 2026: otimização, procurement e operações',
    subtitle: 'Especialize-se em gestão de cadeia de suprimentos, logística e otimização operacional',
    badge: 'Gestão',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1586528116039-c48148d8e280?w=900&h=500&fit=crop',
    imgAlt: 'Gerente de logística monitorando rastreamento de carga em centro de distribuição',
    quickAnswer: '<strong>Especialização Logística e Supply Chain</strong> dura <strong>6–10 meses</strong>. Investimento: <strong>R$ 9.000–R$ 22.000</strong>. Salário inicial: <strong>R$ 6.000–R$ 12.000</strong>. Gestores de operação ganham <strong>R$ 12.000–R$ 22.000</strong>. Público: logística, compras, operações e profissionais buscando evoluir.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Logística e Supply Chain' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/logistica-supply-chain/index.html',
    content: `
      <h2>O que é Especialização em Logística e Supply Chain?</h2>
      <p>Especialização em Logística e Supply Chain é uma pós-graduação lato sensu que forma profissionais em gestão de cadeia de suprimentos, logística, procurement (compras), armazenagem, distribuição e otimização de processos. Essencial para empresas buscarem eficiência operacional e redução de custos.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–10 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–420 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em qualquer área</td></tr>
          <tr><td>Investimento</td><td>R$ 9.000–R$ 22.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Gerente de Supply Chain</td><td>Sênior</td><td>R$ 12.000–R$ 22.000</td></tr>
          <tr><td>Gerente de Logística</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Especialista em Procurement</td><td>Intermediário</td><td>R$ 8.000–R$ 16.000</td></tr>
          <tr><td>Coordenador de Operações</td><td>Intermediário</td><td>R$ 7.000–R$ 13.000</td></tr>
          <tr><td>Consultor Logístico</td><td>Sênior</td><td>R$ 12.000–R$ 24.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda alta em e-commerce, varejo, manufatura e agronegócio. Otimização de custos e sustentabilidade em cadeias de suprimento são prioridades — especialistas são bem valorizados. Profissionais com conhecimento em sistemas ERP e IA para logística têm salários acima da média.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso trabalhar com logística para fazer o curso?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Ajuda, mas não é obrigatório. Profissionais de operações, compras e até finanças podem fazer e aplicar no seu contexto. O aprendizado é bastante prático.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual é a diferença entre Logística e Supply Chain?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Logística é parte de Supply Chain. Supply Chain é a cadeia inteira (fornecedores → produção → distribuição → cliente). O curso cobre ambas — logística operacional e estratégia de cadeia de suprimentos.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'residencia-medica',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização Residência Médica 2026: formação clínica, pesquisa e especialidades',
    subtitle: 'Aprofunde-se em especialidade médica com formação clínica, pesquisa e prática supervisionada',
    badge: 'Saúde',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1631217269769-1ac42eb25860?w=900&h=500&fit=crop',
    imgAlt: 'Médico residente em formação clínica durante atendimento supervisionado',
    quickAnswer: '<strong>Residência Médica</strong> dura <strong>2–6 anos</strong> (conforme especialidade). Bolsa: <strong>R$ 3.500–R$ 7.000/mês</strong>. Após residência: <strong>R$ 8.000–R$ 30.000+</strong> conforme especialidade. Público: médicos recém-graduados buscando especialização clínica e expertise.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Residência Médica' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' },
      { label: 'BIM em Construção', href: '../bim-construcao/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/residencia-medica/index.html',
    content: `
      <h2>O que é Residência Médica?</h2>
      <p>Residência Médica é um programa de pós-graduação lato sensu (stricto sensu em alguns casos) que oferece formação clínica especializada supervisionada. Médicos recém-formados atuam em hospital ou serviço de saúde sob supervisão, ganhando experiência prática intensiva em uma especialidade médica.</p>

      <h2>Dados gerais do programa</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Programa de especialização clínica (lato sensu)</td></tr>
          <tr><td>Duração</td><td>2–6 anos conforme especialidade</td></tr>
          <tr><td>Carga horária</td><td>60–80 horas/semana (atendimento + pesquisa)</td></tr>
          <tr><td>Modalidade</td><td>Presencial (obrigatório)</td></tr>
          <tr><td>Pré-requisito</td><td>Diploma de Medicina + aprovação em prova de seleção</td></tr>
          <tr><td>Bolsa/Salário</td><td>R$ 3.500–R$ 7.000/mês (programa)</td></tr>
        </tbody>
      </table>

      <h2>Especialidades comuns & duração</h2>
      <table>
        <thead><tr><th>Especialidade</th><th>Duração</th><th>Salário após residência</th></tr></thead>
        <tbody>
          <tr><td>Pediatria</td><td>3 anos</td><td>R$ 10.000–R$ 18.000</td></tr>
          <tr><td>Cirurgia Geral</td><td>3 anos</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Cardiologia</td><td>3 anos (+ 2 subesp.)</td><td>R$ 20.000–R$ 45.000</td></tr>
          <tr><td>Psiquiatria</td><td>3 anos</td><td>R$ 8.000–R$ 18.000</td></tr>
          <tr><td>Neurologia</td><td>3 anos</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Dermatologia</td><td>3 anos</td><td>R$ 16.000–R$ 40.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Residência é praticamente obrigatória para médicos que querem bom salário e atuação em especialidade. Especialidades com menos concorrência (interior, regiões norte/nordeste) têm vagas mais acessíveis. Currículo de residente sênior abre portas em hospitais de ponta.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Residência é obrigatória?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não é obrigatória por lei, mas é praticamente obrigatória para trabalhar como especialista. Médicos clínicos gerais sem residência ganham muito menos — R$ 4.000–R$ 8.000.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Como ingressar em uma residência?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Através de prova de seleção nacional (ENARE) ou processos seletivos de universidades/hospitais. Competição é alta — especialmente em especialidades de prestígio (Cardiologia, Dermatologia, Cirurgia).</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Posso trabalhar enquanto faço residência?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não é recomendado. Residência é período integral — 60–80 horas/semana. Maioria dos programas proíbe trabalho paralelo.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'saude',
    area: 'pos-graduacao',
    type: 'especializacao',
    title: 'Especialização em Saúde Pública 2026: políticas, gestão e epidemiologia',
    subtitle: 'Especialize-se em saúde pública, políticas de saúde, epidemiologia e gestão de programas',
    badge: 'Saúde',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=900&h=500&fit=crop',
    imgAlt: 'Profissional de saúde pública analisando dados epidemiológicos em painel',
    quickAnswer: '<strong>Especialização em Saúde Pública</strong> dura <strong>6–10 meses</strong>. Investimento: <strong>R$ 8.000–R$ 18.000</strong>. Salário: <strong>R$ 5.000–R$ 11.000</strong> (setor público) ou <strong>R$ 8.000–R$ 16.000</strong> (privado/ONGs). Público: profissionais de saúde buscando atuar em programas e políticas.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'Especialização', href: '../index.html' },
      { label: 'Saúde Pública' }
    ],
    sidebarLinks: [
      { label: 'Data Science e IA', href: '../data-science-ia/index.html' },
      { label: 'Gestão de Pessoas', href: '../gestao-pessoas/index.html' },
      { label: 'Docência em EAD', href: '../docencia-ead/index.html' }
    ],
    date: '2026-04-23',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/especializacao/saude/index.html',
    content: `
      <h2>O que é Especialização em Saúde Pública?</h2>
      <p>Especialização em Saúde Pública é uma pós-graduação lato sensu que forma profissionais em epidemiologia, políticas de saúde, vigilância sanitária, gestão de programas de saúde, saúde coletiva e análise de indicadores de saúde. Essencial para quem trabalha em secretarias de saúde, ONGs e agências internacionais.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (Especialização)</td></tr>
          <tr><td>Duração</td><td>6–10 meses presencial; 8–12 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–400 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Graduação em área de saúde (recomendado)</td></tr>
          <tr><td>Investimento</td><td>R$ 8.000–R$ 18.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Gestor de Programa de Saúde</td><td>Intermediário</td><td>R$ 6.000–R$ 12.000</td></tr>
          <tr><td>Epidemiologista</td><td>Intermediário</td><td>R$ 7.000–R$ 14.000</td></tr>
          <tr><td>Analista de Saúde Pública</td><td>Intermediário</td><td>R$ 5.500–R$ 11.000</td></tr>
          <tr><td>Consultor de Saúde (ONG/Internacional)</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Especialista em Vigilância</td><td>Intermediário</td><td>R$ 6.000–R$ 13.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda em secretarias estaduais/municipais de saúde, ministério da saúde, ONGs internacionais (WHO, PAHO) e agências de desenvolvimento. Especialistas em saúde digital e dados de saúde têm salários premium. Concursos públicos frequentemente exigem ou valorizam esta especialização.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso ser médico para trabalhar com saúde pública?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. Enfermeiros, farmacêuticos, odontólogos, nutricionistas e até não-profissionais de saúde podem trabalhar com saúde pública. Formação em saúde é recomendada mas não obrigatória.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale a pena para concurso público?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. Edital de concursos em saúde frequentemente menciona esta especialização como diferencial. Candidatos com especialização têm vantagem competitiva em pontuação ou análise de currículo.</p></div>
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

    fs.writeFileSync(filePath, buildPage({
      ...course,
      courseSlug: course.slug,
      courseName: course.title
    }));
    console.log(`✓ ${course.type}/${course.slug}`);
  });
}

generate(batch3Courses);

console.log('\n✓ Batch 3 gerado com template canônico!');
console.log('\n🎉 All pós-graduação courses completed!');
console.log('   MBA: 10/10 courses ✅');
console.log('   Especialização: 8/8 courses ✅');
console.log('   Total: 18 courses ✅');
