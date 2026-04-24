import fs from 'fs';
import { buildPage } from './template.js';

// ---------------------------------------------------------------------------
// Batch 1: MBA Courses — 10 courses
// ---------------------------------------------------------------------------

const mbaCoursesUnique = [
  {
    slug: 'mba-marketing-digital',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Marketing Digital 2026: guia completo, salários e melhores universidades',
    subtitle: 'Domine estratégias de marketing digital, redes sociais, analytics e gestão de campanhas para escalar carreiras',
    badge: 'Negócios',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Profissional analisando gráficos de marketing digital em dashboard',
    quickAnswer: '<strong>MBA Marketing Digital</strong> dura <strong>12-18 meses</strong> presencial ou até 24 meses EAD. Investimento: <strong>R$ 15.000–R$ 50.000</strong>. Salário inicial: <strong>R$ 6.000–R$ 12.000</strong>. Especialistas em crescimento digital ganham <strong>R$ 15.000–R$ 30.000</strong>. Público-alvo: profissionais em transição, gestores com menos de 5 anos de experiência.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Marketing Digital' }
    ],
    sidebarLinks: [
      { label: 'MBA em Gestão', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Finanças', href: '../mba-gestao-financeira/index.html' },
      { label: 'MBA em Projetos', href: '../mba-gestao-projetos/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-marketing-digital/index.html',
    content: `
      <h2>O que é MBA em Marketing Digital?</h2>
      <p>MBA (Master of Business Administration) em Marketing Digital é um programa de pós-graduação lato sensu que forma gestores e especialistas em estratégias digitais, growth hacking, análise de dados e gestão de campanhas em ambiente online. Diferente da graduação, o MBA pressupõe experiência prévia e foco aplicado no mercado.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 18–24 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>360–400 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Pré-requisito</td><td>Diploma de graduação ou experiência profissional</td></tr>
          <tr><td>Investimento</td><td>R$ 15.000–R$ 50.000 (total do curso)</td></tr>
        </tbody>
      </table>

      <h2>Áreas de atuação e salários</h2>
      <table>
        <thead><tr><th>Especialização</th><th>Cargo</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Growth Hacking</td><td>Growth Manager</td><td>R$ 8.000–R$ 18.000</td></tr>
          <tr><td>Social Media</td><td>Social Media Manager</td><td>R$ 5.000–R$ 12.000</td></tr>
          <tr><td>SEO/SEM</td><td>Especialista em Tráfego</td><td>R$ 6.000–R$ 15.000</td></tr>
          <tr><td>E-commerce</td><td>Gerente de E-commerce</td><td>R$ 7.000–R$ 20.000</td></tr>
          <tr><td>Analytics</td><td>Analista de Dados Digital</td><td>R$ 7.000–R$ 16.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Profissionais com MBA em Marketing Digital são altamente demandados em startups, agências e empresas consolidadas. A transformação digital acelerou a busca por esses especialistas — praticamente toda empresa média busca gestores de marketing digital. Oportunidades também em consultoria e freelancing.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quanto custa um MBA em Marketing Digital?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Varia de R$ 15.000 a R$ 50.000 dependendo da instituição. Cursos EAD são mais acessíveis (R$ 15.000–R$ 25.000); presenciais em universidades de renome chegam a R$ 40.000–R$ 50.000. Muitas oferecem parcelamento.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale a pena fazer MBA em Marketing Digital?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim, se você já tem experiência em marketing ou quer transicionar para a área digital. O ROI é rápido — muitos profissionais aumentam salário em 30–50% após a conclusão. Certificado de universidade respeitável abre portas em empresas de grande porte.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Posso fazer um MBA em Marketing Digital enquanto trabalho?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. Cursos EAD e híbridos são especificamente desenhados para profissionais em atividade. Aulas geralmente ocorrem à noite ou fim de semana.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-gestao-empresarial',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Gestão Empresarial 2026: duração, grade, salários e perspectivas',
    subtitle: 'Desenvolva habilidades em liderança, estratégia e gestão operacional para escalar na carreira executiva',
    badge: 'Negócios',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop',
    imgAlt: 'Gerentes em sala de reunião discutindo estratégia empresarial',
    quickAnswer: '<strong>MBA Gestão Empresarial</strong> dura <strong>12–20 meses</strong>. Investimento: <strong>R$ 18.000–R$ 60.000</strong>. Salário inicial: <strong>R$ 7.000–R$ 15.000</strong>. Executivos seniors chegam a <strong>R$ 20.000–R$ 40.000</strong>. Público: profissionais com 3+ anos de experiência que buscam cargo de gerência ou diretoria.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Gestão Empresarial' }
    ],
    sidebarLinks: [
      { label: 'MBA em Marketing Digital', href: '../mba-marketing-digital/index.html' },
      { label: 'MBA em Gestão de Projetos', href: '../mba-gestao-projetos/index.html' },
      { label: 'MBA em Finanças', href: '../mba-gestao-financeira/index.html' }
    ],
    date: '2026-04-23',
    readTime: '10 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-gestao-empresarial/index.html',
    content: `
      <h2>O que é MBA em Gestão Empresarial?</h2>
      <p>MBA em Gestão Empresarial é um programa de pós-graduação lato sensu que qualifica executivos em administração estratégica, liderança, operações, governança corporativa e gestão financeira. É o MBA mais procurado no Brasil e prepara profissionais para cargo de gerência ou diretoria.</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–20 meses presencial; 18–24 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>3+ anos de atuação profissional</td></tr>
          <tr><td>Investimento</td><td>R$ 18.000–R$ 60.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Gerente Geral</td><td>Sênior</td><td>R$ 10.000–R$ 20.000</td></tr>
          <tr><td>Diretor de Operações</td><td>Executivo</td><td>R$ 15.000–R$ 35.000</td></tr>
          <tr><td>Coordenador de Projetos</td><td>Intermediário</td><td>R$ 7.000–R$ 12.000</td></tr>
          <tr><td>Analista de Negócios</td><td>Intermediário</td><td>R$ 8.000–R$ 15.000</td></tr>
          <tr><td>Consultor Empresarial</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Demanda altíssima. Praticamente toda empresa com mais de 100 funcionários busca gerentes com MBA. Mercado se estende de bancos a varejo, manufatura, startups e órgãos públicos. Especialistas em e-commerce e transformação digital têm salários acima da média.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>MBA Gestão Empresarial é igual a MBA tradicional?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Basicamente sim. "Gestão Empresarial" é o currículo geral do MBA — inclui liderança, estratégia, finanças, operações, marketing e governança. Outras especialidades (Marketing Digital, Finanças, Projetos) são MBAs focados em um tema específico.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso ter experiência profissional para entrar?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Recomendado ter 3+ anos. Alguns programas aceitam profissionais com menos experiência, mas o aprendizado é mais rico se você já tem contato com gestão ou operações de negócio.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>MBA credencia para trabalhar no exterior?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Depende do prestígio da universidade e da proficiência em inglês. MBAs de instituições top (INSEAD, Kellogg, etc.) abrem portas internacionais. MBAs locais têm reconhecimento limitado no exterior, a menos que a universidade tenha acreditação internacional.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mba-gestao-financeira',
    area: 'pos-graduacao',
    type: 'mba',
    title: 'MBA Gestão Financeira 2026: finanças corporativas, controladoria e investimentos',
    subtitle: 'Especialize-se em finanças corporativas, análise de investimentos e gestão de tesouraria para cargos executivos',
    badge: 'Finanças',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=500&fit=crop',
    imgAlt: 'Analista financeiro analisando gráficos de ações em monitor',
    quickAnswer: '<strong>MBA Gestão Financeira</strong> dura <strong>12–18 meses</strong>. Investimento: <strong>R$ 20.000–R$ 55.000</strong>. Salário inicial: <strong>R$ 8.000–R$ 16.000</strong>. CFOs e Controllers chegam a <strong>R$ 25.000–R$ 50.000</strong>. Público: contadores, analistas financeiros e profissionais com experiência em finanças.',
    breadcrumbs: [
      { label: 'Home', href: '../../../../index.html' },
      { label: 'Pós-graduação', href: '../../index.html' },
      { label: 'MBA', href: '../index.html' },
      { label: 'MBA Gestão Financeira' }
    ],
    sidebarLinks: [
      { label: 'MBA em Negócios Corporativos', href: '../mba-gestao-empresarial/index.html' },
      { label: 'MBA em Finanças Corporativas', href: '../mba-financas-corporativas/index.html' },
      { label: 'MBA em Gestão de Pessoas', href: '../mba-gestao-pessoas/index.html' }
    ],
    date: '2026-04-23',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/pos-graduacao/mba/mba-gestao-financeira/index.html',
    content: `
      <h2>O que é MBA em Gestão Financeira?</h2>
      <p>MBA em Gestão Financeira é uma pós-graduação lato sensu que especifica executivos em finanças corporativas, controladoria, análise de investimentos, tesouraria e governança fiscal. Prepara profissionais para cargos como Controller, Gerente Financeiro ou CFO (Chief Financial Officer).</p>

      <h2>Dados gerais do curso</h2>
      <table>
        <thead><tr><th>Informação</th><th>Detalhe</th></tr></thead>
        <tbody>
          <tr><td>Tipo</td><td>Pós-graduação Lato Sensu (MBA)</td></tr>
          <tr><td>Duração</td><td>12–18 meses presencial; 16–24 meses EAD</td></tr>
          <tr><td>Carga horária</td><td>400–480 horas</td></tr>
          <tr><td>Modalidade</td><td>Presencial, EAD ou híbrida</td></tr>
          <tr><td>Experiência recomendada</td><td>3+ anos em área financeira ou contábil</td></tr>
          <tr><td>Investimento</td><td>R$ 20.000–R$ 55.000</td></tr>
        </tbody>
      </table>

      <h2>Saídas profissionais e salários</h2>
      <table>
        <thead><tr><th>Função</th><th>Nível</th><th>Salário médio</th></tr></thead>
        <tbody>
          <tr><td>Controller</td><td>Executivo</td><td>R$ 18.000–R$ 40.000</td></tr>
          <tr><td>Gerente Financeiro</td><td>Sênior</td><td>R$ 12.000–R$ 25.000</td></tr>
          <tr><td>Analista Sênior de Investimentos</td><td>Sênior</td><td>R$ 10.000–R$ 22.000</td></tr>
          <tr><td>Treasurer (Gerente de Tesouraria)</td><td>Executivo</td><td>R$ 15.000–R$ 35.000</td></tr>
          <tr><td>Consultor Financeiro</td><td>Sênior</td><td>R$ 12.000–R$ 28.000</td></tr>
        </tbody>
      </table>

      <h2>Mercado de trabalho</h2>
      <p>Altamente procurado em bancos, seguradoras, fundos de investimento e grandes corporações. A regulação fiscal e contábil crescente aumenta a demanda por Controllers e Gerentes Financeiros. Startups de fintech também contratam agressivamente profissionais especializados.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Contador pode fazer MBA em Gestão Financeira?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim, absolutamente. É inclusive um caminho natural — contadores aprofundam em gestão e controladoria para transicionar para cargos gerenciais. Muitos MBAs em Finanças têm contadores como alunos.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>O MBA substitui a experiência profissional?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. O MBA complementa a experiência — oferece frameworks, ferramentas e pensamento estratégico. Quem tem experiência + MBA se destaca no mercado; sem experiência, o MBA abre menos portas em finanças.</p></div>
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

generate(mbaCoursesUnique);

console.log('\n✓ Batch 1 (MBA Courses) gerado com template canônico!');
console.log('\nPending batches:');
console.log('Batch 2: 8 Especialização courses');
