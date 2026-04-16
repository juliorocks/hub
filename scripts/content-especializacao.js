#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function espPage(name, prefix, canonical, breadcrumbs, quickAnswer, body, faqs, relLinks) {
  const faqHtml = faqs.map(f => `
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>${f.q}</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="faq-answer"><p>${f.a}</p></div>
          </div>`).join('');

  const sideLinks = relLinks.map(l => `<li><a href="${l.href}" class="sidebar-link">${l.label}</a></li>`).join('');

  const breadHtml = breadcrumbs.map((b, i) => b.href
    ? `<li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="${b.href}" class="breadcrumb__link" itemprop="item"><span itemprop="name">${b.label}</span></a><meta itemprop="position" content="${i+1}"></li>`
    : `<li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${b.label}</span><meta itemprop="position" content="${i+1}"></li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}: guia completo 2026, duracao, grade e mercado | Hub do Estudante</title>
  <meta name="description" content="Tudo sobre ${name}: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.">
  <link rel="canonical" href="https://www.melhorescursos.com.br/${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${name}: guia completo 2026">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${name}: guia completo 2026","datePublished":"2026-04-12","dateModified":"2026-04-12","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="${prefix}assets/css/base.css">
  <link rel="stylesheet" href="${prefix}assets/css/layout.css">
  <link rel="stylesheet" href="${prefix}assets/css/components.css">
  <link rel="stylesheet" href="${prefix}assets/css/article.css">
  <link rel="stylesheet" href="${prefix}assets/css/responsive.css">
</head>
<body class="page-wrapper">

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
        ${breadHtml}
      </ol>
    </div>
  </nav>

  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge content-type-badge--guide">Guia do Curso</span>
          <span class="badge badge--green">Atualizado 2026</span>
        </div>
        <h1 class="article-hero__title">${name}: guia completo 2026, duracao, grade e mercado</h1>
        <p class="article-hero__subtitle">Tudo sobre ${name}: grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.</p>
        <div class="article-hero__byline">
          <span>Por <strong>Redacao Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="2026-04-12">12 de abril de 2026</time>
          <span>·</span>
          <span>7 min de leitura</span>
        </div>
      </header>

      <div class="quick-answer">
        <div class="quick-answer__label">Resposta rapida</div>
        <p class="quick-answer__text">${quickAnswer}</p>
      </div>

      <nav class="toc" aria-label="Indice" id="toc">
        <div class="toc__title">Neste artigo</div>
        <ol class="toc__list" id="toc-list"></ol>
      </nav>

      <div class="article-content" id="article-content">
        ${body}

        <div class="affiliate-cta-article">
          <div class="affiliate-cta-article__content">
            <h3 class="affiliate-cta-article__title">Quer fazer ${name} com bolsa?</h3>
            <p class="affiliate-cta-article__text">Compare as melhores universidades parceiras com desconto garantido.</p>
            <div class="affiliate-cta-article__actions">
              <a href="${prefix}pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" data-affiliate-click="true" rel="noopener sponsored">
                Ver bolsas na Anhanguera
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="${prefix}pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver bolsas na Unopar</a>
            </div>
          </div>
        </div>

        <section class="faq-section" aria-labelledby="faq-title">
          <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
          <div class="faq-list">${faqHtml}</div>
        </section>
      </div>
    </article>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Estudar com Desconto</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">
          <a href="${prefix}pages/universidades/anhanguera.html" class="btn btn--affiliate" rel="noopener sponsored">Anhanguera, ate 50% off</a>
          <a href="${prefix}pages/universidades/unopar.html" class="btn btn--affiliate" rel="noopener sponsored">Unopar, ate 50% off</a>
          <a href="${prefix}pages/universidades/uniderp.html" class="btn btn--affiliate" rel="noopener sponsored">Uniderp, ate 50% off</a>
        </div>
      </div>
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Cursos Relacionados</h3>
        <ul class="sidebar-links">${sideLinks}</ul>
      </div>
    </aside>
  </main>

  <script src="${prefix}assets/js/components-loader.js"></script>
  <script type="module" src="${prefix}assets/js/main.js"></script>
</body>
</html>`;
}

const PAGES = [
  {
    file: 'pages/pos-graduacao/especializacao/gestao-pessoas/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/gestao-pessoas/',
    name: 'Especializacao em Gestao de Pessoas',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Gestao de Pessoas' }
    ],
    quickAnswer: 'A <strong>Especializacao em Gestao de Pessoas</strong> dura entre <strong>12 e 18 meses</strong>. Forma especialistas em RH estrategico, lideranca, cultura organizacional e desenvolvimento de talentos. O salario de um especialista de RH sênior varia entre <strong>R$ 5.000 e R$ 12.000</strong>.',
    body: `
        <h2>O que e a Especializacao em Gestao de Pessoas?</h2>
        <p>A Especializacao em Gestao de Pessoas e uma pos-graduacao lato sensu voltada para quem deseja se aprofundar na area de Recursos Humanos. Diferentemente do MBA, a especializacao tende a ser mais tecnica e focada em um dominio especifico, ideal para quem ja atua em RH e quer aprofundar conhecimentos.</p>

        <h2>Duracao e carga horaria</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td><td>360 horas</td></tr>
            <tr><td>Presencial</td><td>18 a 24 meses</td><td>360 a 420 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Recrutamento e Selecao por Competencias</li>
          <li>Treinamento e Desenvolvimento (T&D)</li>
          <li>Gestao do Desempenho e Feedback</li>
          <li>Cargos, Salarios e Beneficios</li>
          <li>Relacoes Trabalhistas e Sindicais</li>
          <li>Cultura e Clima Organizacional</li>
          <li>Coaching e Mentoring</li>
          <li>People Analytics</li>
          <li>Diversidade e Inclusao</li>
          <li>Saude e Qualidade de Vida no Trabalho</li>
        </ul>

        <h2>Salarios na area de Gestao de Pessoas</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de RH Senior</td><td>R$ 4.000 – R$ 7.000</td></tr>
            <tr><td>Especialista de RH</td><td>R$ 5.500 – R$ 10.000</td></tr>
            <tr><td>HRBP</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Gerente de RH</td><td>R$ 9.000 – R$ 18.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Qual a diferenca entre Especializacao em Gestao de Pessoas e MBA em RH?', a: 'A especializacao e mais tecnica e profunda em RH. O MBA tem visao mais ampla de negocios e lideranca. Para quem ja e da area de RH, a especializacao costuma ser mais indicada.' },
      { q: 'Gestao de Pessoas EAD e reconhecida no mercado?', a: 'Sim. Pos-graduacoes lato sensu EAD de instituicoes conceituadas sao amplamente aceitas no mercado de trabalho.' }
    ],
    relLinks: [
      { href: '../../../../pages/pos-graduacao/mba/mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' },
      { href: '../../../../pages/graduacao/negocios/gestao-recursos-humanos/index.html', label: 'Graduacao em Gestao de RH' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/saude/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/saude/',
    name: 'Especializacao em Saude',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Especializacao em Saude' }
    ],
    quickAnswer: 'As <strong>Especializacoes em Saude</strong> duram entre <strong>12 e 24 meses</strong>. Existem diversas modalidades: saude publica, gestao hospitalar, saude da familia, urgencia e emergencia. Salarios variam conforme a especialidade e atuacao no setor publico ou privado.',
    body: `
        <h2>O que sao as Especializacoes em Saude?</h2>
        <p>As especializacoes em saude sao pos-graduacoes voltadas para profissionais da area (medicos, enfermeiros, farmaceuticos, fisioterapeutas, nutricionistas e outros) que desejam aprofundar conhecimentos em uma area especifica. Sao diferentes das residencias medicas, pois sao cursos lato sensu, nao strito sensu.</p>

        <h2>Principais areas de especializacao em saude</h2>
        <table>
          <thead><tr><th>Area</th><th>Perfil indicado</th><th>Duracao</th></tr></thead>
          <tbody>
            <tr><td>Saude Publica e Epidemiologia</td><td>Todos os profissionais de saude</td><td>12 a 18 meses</td></tr>
            <tr><td>Gestao em Saude</td><td>Gestores e clinicos que querem liderar</td><td>12 a 18 meses</td></tr>
            <tr><td>Saude da Familia e Comunidade</td><td>Medicos, enfermeiros, ACS</td><td>12 a 18 meses</td></tr>
            <tr><td>Urgencia e Emergencia</td><td>Medicos, enfermeiros, socorristas</td><td>12 a 18 meses</td></tr>
            <tr><td>Nutricao Clinica</td><td>Nutricionistas</td><td>12 a 18 meses</td></tr>
            <tr><td>Farmacia Clinica</td><td>Farmaceuticos</td><td>12 a 18 meses</td></tr>
          </tbody>
        </table>

        <h2>Diferencas: Especializacao vs Residencia</h2>
        <ul>
          <li><strong>Especializacao (lato sensu):</strong> pos-graduacao academica, sem internato, mais flexivel, pode ser EAD</li>
          <li><strong>Residencia Medica:</strong> treinamento em servico em hospital, remunerada, altamente competitiva, strito sensu</li>
          <li><strong>Residencia Multiprofissional:</strong> para nao-medicos (enfermeiros, farmaceuticos etc.), em servico</li>
        </ul>

        <h2>Salarios com especializacao em saude</h2>
        <table>
          <thead><tr><th>Profissional</th><th>Sem especializacao</th><th>Com especializacao</th></tr></thead>
          <tbody>
            <tr><td>Enfermeiro</td><td>R$ 3.500 – R$ 5.000</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Farmaceutico</td><td>R$ 3.500 – R$ 5.500</td><td>R$ 5.500 – R$ 10.000</td></tr>
            <tr><td>Fisioterapeuta</td><td>R$ 2.500 – R$ 4.500</td><td>R$ 4.500 – R$ 8.000</td></tr>
            <tr><td>Nutricionista</td><td>R$ 2.500 – R$ 4.000</td><td>R$ 4.000 – R$ 8.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Especializacao em saude pode ser feita EAD?', a: 'Sim, para especializacoes que nao exigem pratica clinica intensiva. Gestao em Saude, Saude Publica e Farmacia Clinica (parte teorica) podem ser feitas EAD.' },
      { q: 'Especializacao em saude conta como residencia?', a: 'Nao. A residencia e treinamento em servico e tem valor diferente no mercado clinico. A especializacao e um titulo academico lato sensu, valioso para gestao e concursos.' }
    ],
    relLinks: [
      { href: '../../../../pages/pos-graduacao/mba/mba-saude/index.html', label: 'MBA em Saude' },
      { href: '../../../../pages/pos-graduacao/especializacao/residencia-medica/index.html', label: 'Residencia Medica' },
      { href: '../../../../pages/graduacao/saude/medicina/index.html', label: 'Curso de Medicina' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/data-science-ia/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/data-science-ia/',
    name: 'Especializacao em Data Science e Inteligencia Artificial',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Data Science e IA' }
    ],
    quickAnswer: 'A <strong>Especializacao em Data Science e IA</strong> dura entre <strong>12 e 18 meses</strong>. Cobre machine learning, redes neurais, analise de dados com Python e R, e aplicacoes praticas de IA. Salarios variam entre <strong>R$ 8.000 e R$ 22.000</strong> para cientistas de dados senior.',
    body: `
        <h2>O que e a Especializacao em Data Science e IA?</h2>
        <p>A Especializacao em Data Science e Inteligencia Artificial forma profissionais capazes de coletar, processar e interpretar grandes volumes de dados, construir modelos preditivos e implementar solucoes de IA em empresas. E uma das areas com maior demanda e melhores salarios no mercado de tecnologia brasileiro e global.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Python para Data Science (Pandas, NumPy, Matplotlib)</li>
          <li>Estatistica e Probabilidade aplicadas</li>
          <li>Machine Learning supervisionado e nao supervisionado</li>
          <li>Deep Learning e Redes Neurais (TensorFlow, PyTorch)</li>
          <li>Processamento de Linguagem Natural (NLP)</li>
          <li>Computer Vision</li>
          <li>Engenharia de Dados e Pipelines (Spark, Airflow)</li>
          <li>Big Data e Cloud (AWS, GCP, Azure)</li>
          <li>IA Generativa e LLMs</li>
          <li>Etica em IA e LGPD</li>
        </ul>

        <h2>Salarios em Data Science e IA</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Dados</td><td>R$ 4.500 – R$ 8.000</td></tr>
            <tr><td>Cientista de Dados Pleno</td><td>R$ 8.000 – R$ 14.000</td></tr>
            <tr><td>Cientista de Dados Senior</td><td>R$ 14.000 – R$ 22.000</td></tr>
            <tr><td>Engenheiro de ML</td><td>R$ 12.000 – R$ 25.000</td></tr>
            <tr><td>Head of Data / CDO</td><td>R$ 20.000 – R$ 45.000+</td></tr>
          </tbody>
        </table>

        <h2>Preciso saber programar antes?</h2>
        <p>O ideal e ter nocoes de logica de programacao e Python basico antes de iniciar. Muitos cursos oferecem modulos introdutorios de Python, mas quem ja programa tem uma vantagem significativa para acompanhar o ritmo.</p>`,
    faqs: [
      { q: 'Especializacao em Data Science e melhor que bootcamp?', a: 'Sao complementares. O bootcamp e mais rapido e pratico. A especializacao da profundidade teorica e um diploma reconhecido. Para cargos senior e pesquisa, a especializacao (ou mestrado) e mais valorizada.' },
      { q: 'Qual a diferenca entre Data Science e Inteligencia Artificial?', a: 'Data Science foca em analise e extracao de valor de dados. IA e o campo mais amplo de sistemas que simulam inteligencia humana. Machine Learning e a intersecao das duas areas.' },
      { q: 'Data Science EAD tem credibilidade no mercado?', a: 'Sim, desde que a instituicao seja reconhecida. Em TI, o portfolio de projetos e as habilidades tecnicas demonstradas pesam mais que a modalidade do curso.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/tecnologia/ciencia-da-computacao/index.html', label: 'Ciencia da Computacao' },
      { href: '../../../../pages/graduacao/tecnologia/sistemas-informacao/index.html', label: 'Sistemas de Informacao' },
      { href: '../../../../pages/pos-graduacao/mba/mba-engenharia-software/index.html', label: 'MBA em Engenharia de Software' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/direito-tributario/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/direito-tributario/',
    name: 'Especializacao em Direito Tributario',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Direito Tributario' }
    ],
    quickAnswer: 'A <strong>Especializacao em Direito Tributario</strong> dura entre <strong>12 e 18 meses</strong>. E uma das especializacoes juridicas mais valorizadas no Brasil, dada a complexidade do sistema tributario nacional. Advogados tributaristas chegam a <strong>R$ 10.000 a R$ 30.000</strong>.',
    body: `
        <h2>O que e a Especializacao em Direito Tributario?</h2>
        <p>A Especializacao em Direito Tributario forma advogados e profissionais de contabilidade para atuacao na area fiscal e tributaria. O sistema tributario brasileiro e um dos mais complexos do mundo, o que torna essa especializacao altamente demandada por escritorios, empresas e consultorias.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Direito Constitucional Tributario</li>
          <li>Codigo Tributario Nacional (CTN)</li>
          <li>ICMS, ISS, IPI, PIS/Cofins</li>
          <li>IRPJ, CSLL e Tributacao das Empresas</li>
          <li>IRPF e Planejamento Patrimonial</li>
          <li>Processo Administrativo Fiscal</li>
          <li>Contencioso Tributario (CARF, STJ, STF)</li>
          <li>Planejamento Tributario e Elisao Fiscal</li>
          <li>Tributacao Internacional e Transfer Pricing</li>
          <li>Reforma Tributaria e IBS/CBS/IS</li>
        </ul>

        <h2>Salarios na area tributaria</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Advogado Tributarista Associado</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Advogado Tributarista Senior</td><td>R$ 10.000 – R$ 20.000</td></tr>
            <tr><td>Socio Tributario (escritorio)</td><td>R$ 25.000 – R$ 80.000+</td></tr>
            <tr><td>Consultor Tributario Empresarial</td><td>R$ 8.000 – R$ 18.000</td></tr>
            <tr><td>Procurador da Fazenda (concurso)</td><td>R$ 18.000 – R$ 28.000</td></tr>
          </tbody>
        </table>

        <h2>Reforma Tributaria 2024-2026</h2>
        <p>A aprovacao da Reforma Tributaria (EC 132/2023) e a implementacao do IBS, CBS e Imposto Seletivo criou uma demanda enorme por especialistas. Profissionais com especializacao em Direito Tributario atualizada com a reforma estao entre os mais buscados no mercado juridico atual.</p>`,
    faqs: [
      { q: 'Preciso ser advogado para fazer especializacao em Direito Tributario?', a: 'Nao obrigatoriamente. Contadores, administradores e economistas tambem se beneficiam da especializacao, especialmente para consultoria tributaria e planejamento fiscal.' },
      { q: 'Direito Tributario EAD tem qualidade?', a: 'Sim, desde que a instituicao tenha bom corpo docente e material atualizado. A Reforma Tributaria exige conteudo muito atualizado, entao verifique o ano do material.' }
    ],
    relLinks: [
      { href: '../../../../pages/pos-graduacao/direito/index.html', label: 'Pos-Graduacao em Direito' },
      { href: '../../../../pages/graduacao/direito/direito.html', label: 'Graduacao em Direito' },
      { href: '../../../../pages/graduacao/negocios/ciencias-contabeis/index.html', label: 'Ciencias Contabeis' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/docencia-ead/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/docencia-ead/',
    name: 'Especializacao em Docencia para EAD',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Docencia para EAD' }
    ],
    quickAnswer: 'A <strong>Especializacao em Docencia para EAD</strong> dura entre <strong>12 e 18 meses</strong>. Capacita professores e tutores para criar e ministrar cursos na modalidade a distancia. Com o boom do EAD no Brasil, a demanda por educadores digitais nunca foi tao alta. Salarios variam entre <strong>R$ 2.500 e R$ 8.000</strong>.',
    body: `
        <h2>O que e a Especializacao em Docencia para EAD?</h2>
        <p>A Especializacao em Docencia para EAD (Educacao a Distancia) prepara professores, tutores e designers instrucionais para atuar no ensino online. Com o crescimento exponencial do EAD no Brasil (mais de 4 milhoes de matriculas em pos-graduacao EAD), a demanda por profissionais qualificados nessa modalidade e muito alta.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos do EAD e Educacao Online</li>
          <li>Tecnologias Educacionais e AVA (Moodle, Canvas)</li>
          <li>Design Instrucional e Producao de Conteudo</li>
          <li>Tutoria Online e Mediacao Pedagogica</li>
          <li>Avaliacao no Ensino a Distancia</li>
          <li>Gamificacao e Aprendizagem Ativa</li>
          <li>Video-aulas: roteiro, gravacao e edicao</li>
          <li>Educacao Corporativa e T&D Online</li>
          <li>Legislacao do EAD no Brasil (Decreto 9.057/2017)</li>
          <li>TCC</li>
        </ul>

        <h2>Atuacao profissional</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Tutor EAD (IES)</td><td>R$ 1.500 – R$ 3.500</td></tr>
            <tr><td>Professor Conteudista</td><td>R$ 3.000 – R$ 6.000</td></tr>
            <tr><td>Designer Instrucional</td><td>R$ 4.000 – R$ 8.000</td></tr>
            <tr><td>Coordenador Pedagogico EAD</td><td>R$ 5.000 – R$ 10.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Preciso ser professor para fazer a especializacao em Docencia EAD?', a: 'Nao e exigido ser professor formado. Profissionais de qualquer area que querem criar cursos online ou trabalhar em educacao corporativa podem se inscrever.' },
      { q: 'A especializacao em Docencia EAD serve para dar aulas em universidades?', a: 'Para aulas em ensino superior, a maioria das IES exige mestrado ou doutorado. A especializacao e suficiente para tutoria, design instrucional e educacao corporativa.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/educacao/pedagogia/index.html', label: 'Graduacao em Pedagogia' },
      { href: '../../../../pages/pos-graduacao/mba/mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/logistica-supply-chain/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/logistica-supply-chain/',
    name: 'Especializacao em Logistica e Supply Chain',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'Logistica e Supply Chain' }
    ],
    quickAnswer: 'A <strong>Especializacao em Logistica e Supply Chain</strong> dura entre <strong>12 e 18 meses</strong>. Forma especialistas em cadeias de suprimentos, gestao de estoque, importacao/exportacao e logistica 4.0. Salarios variam entre <strong>R$ 5.000 e R$ 15.000</strong>.',
    body: `
        <h2>O que e a Especializacao em Logistica e Supply Chain?</h2>
        <p>A Especializacao em Logistica e Supply Chain forma profissionais para gerenciar o fluxo de materiais, informacoes e recursos desde o fornecedor ate o cliente final. Com o boom do e-commerce e a globalizacao das cadeias produtivas, logistas qualificados sao altamente demandados.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Gestao da Cadeia de Suprimentos (SCM)</li>
          <li>Gestao de Estoques e Armazenagem</li>
          <li>Logistica de Transporte e Distribuicao</li>
          <li>Comercio Exterior: importacao e exportacao</li>
          <li>Logistica Reversa e Sustentabilidade</li>
          <li>Supply Chain 4.0: IoT, IA e automacao</li>
          <li>Gestao de Fornecedores e Compras Estrategicas</li>
          <li>Planejamento e Controle da Producao (PCP)</li>
          <li>Indicadores e KPIs de Logistica</li>
          <li>SAP SCM e Sistemas ERP</li>
        </ul>

        <h2>Salarios na logistica</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Logistica</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Especialista em Supply Chain</td><td>R$ 6.000 – R$ 10.000</td></tr>
            <tr><td>Gerente de Logistica</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Diretor de Supply Chain</td><td>R$ 18.000 – R$ 35.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Qual a diferenca entre logistica e supply chain?', a: 'Logistica foca no transporte, armazenagem e distribuicao de produtos. Supply Chain e mais amplo, incluindo toda a cadeia: fornecedores, producao, logistica e atendimento ao cliente.' },
      { q: 'Vale a pena fazer certificacao APICS junto com a especializacao?', a: 'Sim. As certificacoes CPIM e CSCP da APICS sao altamente valorizadas globalmente para profissionais de supply chain e complementam muito bem a especializacao.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/negocios/logistica/index.html', label: 'Graduacao em Logistica' },
      { href: '../../../../pages/pos-graduacao/mba/mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/bim-construcao/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/bim-construcao/',
    name: 'Especializacao em BIM e Construcao Digital',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Especializacao' },
      { label: 'BIM e Construcao Digital' }
    ],
    quickAnswer: 'A <strong>Especializacao em BIM (Building Information Modeling)</strong> dura entre <strong>12 e 18 meses</strong>. E obrigatoria para obras publicas federais desde 2021 e cada vez mais exigida em projetos privados. Salarios de coordenadores BIM variam entre <strong>R$ 6.000 e R$ 15.000</strong>.',
    body: `
        <h2>O que e BIM e por que se especializar?</h2>
        <p>BIM (Building Information Modeling) e uma metodologia de trabalho colaborativo para projetos de construcao que integra todas as disciplinas (arquitetura, estrutura, instalacoes) em um modelo digital tridimensional. Desde o Decreto Federal 9.983/2019, o uso do BIM e obrigatorio em obras publicas federais, o que criou uma demanda enorme por profissionais qualificados.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos do BIM e ISO 19650</li>
          <li>Revit Architecture para Projetos</li>
          <li>Revit Structure e MEP</li>
          <li>Navisworks: coordenacao e deteccao de interferencias</li>
          <li>BIM 4D (cronograma) e 5D (orcamento)</li>
          <li>Gestao de Informacoes: CDE e BIM 360</li>
          <li>Interoperabilidade e IFC</li>
          <li>LOD e Nivel de Desenvolvimento do Modelo</li>
          <li>Contrato e Responsabilidades no BIM</li>
          <li>Implementacao do BIM em Escritorios</li>
        </ul>

        <h2>Salarios com especializacao em BIM</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Projetista BIM</td><td>R$ 4.000 – R$ 7.000</td></tr>
            <tr><td>Coordenador BIM</td><td>R$ 7.000 – R$ 13.000</td></tr>
            <tr><td>Gerente BIM</td><td>R$ 12.000 – R$ 20.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Preciso saber usar Revit antes da especializacao?', a: 'O ideal e ter conhecimentos basicos de Revit ou AutoCAD. Muitos cursos oferecem modulos introdutorios, mas quem ja usa CAD tem vantagem.' },
      { q: 'BIM e exigido em obras privadas?', a: 'Ainda nao e obrigatorio em obras privadas, mas construtoras e incorporadoras de medio e grande porte ja exigem BIM em seus projetos, e a tendencia e de crescimento.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/engenharia/arquitetura-urbanismo/index.html', label: 'Arquitetura e Urbanismo' },
      { href: '../../../../pages/graduacao/engenharia/engenharia-civil/index.html', label: 'Engenharia Civil' }
    ]
  },
  {
    file: 'pages/pos-graduacao/especializacao/residencia-medica/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/especializacao/residencia-medica/',
    name: 'Residencia Medica',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'Pos-Graduacao em Saude' },
      { label: 'Residencia Medica' }
    ],
    quickAnswer: 'A <strong>Residencia Medica</strong> e o principal caminho de especializacao para medicos no Brasil. Dura de <strong>2 a 5 anos</strong> dependendo da especialidade. O residente recebe bolsa do MEC de <strong>R$ 4.106/mes</strong> (R1) e pode chegar a R$ 6.000+ nas especialidades. O acesso e pela prova do REVALIDA (para estrangeiros) ou diretamente apos o CRM.',
    body: `
        <h2>O que e a Residencia Medica?</h2>
        <p>A Residencia Medica e a modalidade de pos-graduacao strito sensu destinada exclusivamente a medicos formados e registrados no CRM. E considerada o padrao ouro de formacao especializada no Brasil. Diferentemente das especializacoes lato sensu, a residencia e treinamento em servico supervisionado dentro de hospitais credenciados.</p>

        <h2>Como funciona</h2>
        <table>
          <thead><tr><th>Aspecto</th><th>Detalhe</th></tr></thead>
          <tbody>
            <tr><td>Duracao</td><td>2 anos (clinica geral) a 5 anos (cirurgias e sub-especializacoes)</td></tr>
            <tr><td>Carga horaria</td><td>60 horas semanais (limite legal)</td></tr>
            <tr><td>Bolsa MEC (R1)</td><td>R$ 4.106,00/mes</td></tr>
            <tr><td>Acesso</td><td>Prova de Residencia Medica do hospital ou concurso publico</td></tr>
            <tr><td>Titulacao</td><td>Especialista pelo CFM + titulo de especialista pela sociedade medica</td></tr>
          </tbody>
        </table>

        <h2>Especialidades mais concorridas e seus salarios</h2>
        <table>
          <thead><tr><th>Especialidade</th><th>Duracao</th><th>Salario medio</th></tr></thead>
          <tbody>
            <tr><td>Clinica Medica</td><td>2 anos</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Pediatria</td><td>2 anos</td><td>R$ 7.000 – R$ 13.000</td></tr>
            <tr><td>Cirurgia Geral</td><td>2 anos (+ subespecialidade)</td><td>R$ 10.000 – R$ 20.000</td></tr>
            <tr><td>Cardiologia</td><td>3 anos</td><td>R$ 18.000 – R$ 40.000</td></tr>
            <tr><td>Dermatologia</td><td>3 anos</td><td>R$ 20.000 – R$ 50.000+</td></tr>
            <tr><td>Oftalmologia</td><td>3 anos</td><td>R$ 18.000 – R$ 45.000</td></tr>
            <tr><td>Ortopedia</td><td>3 anos</td><td>R$ 15.000 – R$ 35.000</td></tr>
            <tr><td>Radiologia</td><td>3 anos</td><td>R$ 18.000 – R$ 45.000</td></tr>
            <tr><td>Neurocirugia</td><td>5 anos</td><td>R$ 25.000 – R$ 60.000+</td></tr>
          </tbody>
        </table>

        <h2>Como se preparar para a residencia</h2>
        <p>A concorrencia para residencias nos grandes hospitais publicos (HCFMUSP, UNIFESP, INCA, HU) e altissima. A preparacao exige estudo intensivo dos temas cobrados nas provas, simulados e, muitas vezes, cursinho pre-residencia medica.</p>`,
    faqs: [
      { q: 'E obrigatorio fazer residencia para trabalhar como medico?', a: 'Nao. O medico formado com CRM pode trabalhar sem residencia, mas apenas como clinico geral. Para exercer uma especialidade reconhecida pelo CFM, a residencia ou o titulo de especialista via prova sao necessarios.' },
      { q: 'Medico formado no exterior pode fazer residencia no Brasil?', a: 'Sim, apos revalidar o diploma pelo REVALIDA (exame federal) e obter o CRM.' },
      { q: 'Quanto ganha um medico residente?', a: 'O residente de primeiro ano (R1) recebe a bolsa do MEC de <strong>R$ 4.106/mes</strong> brutos. Alguns hospitais pagem complemento. Residentes de anos superiores podem receber ate R$ 6.000.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/saude/medicina/index.html', label: 'Curso de Medicina' },
      { href: '../../../../pages/pos-graduacao/especializacao/saude/index.html', label: 'Especializacao em Saude' },
      { href: '../../../../pages/pos-graduacao/mba/mba-saude/index.html', label: 'MBA em Saude' }
    ]
  },
  {
    file: 'pages/pos-graduacao/direito/index.html',
    prefix: '../../../',
    canonical: 'pos-graduacao/direito/',
    name: 'Pos-Graduacao em Direito',
    breadcrumbs: [
      { href: '../../../index.html', label: 'Home' },
      { href: '../index.html', label: 'Pos-graduacao' },
      { label: 'Direito' }
    ],
    quickAnswer: 'A <strong>Pos-Graduacao em Direito</strong> abrange especializacoes, MBAs e mestrados para bachareis em Direito ou profissionais afins. As areas mais valorizadas em 2026 sao Direito Tributario, Trabalhista, Penal e Digital. Salarios de advogados especializados variam entre <strong>R$ 6.000 e R$ 30.000</strong>.',
    body: `
        <h2>Por que fazer pos-graduacao em Direito?</h2>
        <p>O mercado juridico brasileiro e extremamente especializado. A OAB tem mais de 1,3 milhao de advogados inscritos, e a diferenciacao por especialidade e fundamental para se destacar. A pos-graduacao em Direito permite ao profissional aprofundar conhecimentos em uma area especifica, aumentar sua empregabilidade e cobrar honorarios mais altos.</p>

        <h2>Principais areas de especializacao juridica</h2>
        <table>
          <thead><tr><th>Area</th><th>Demanda no mercado</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Direito Tributario</td><td>Muito alta</td><td>R$ 8.000 – R$ 30.000</td></tr>
            <tr><td>Direito Trabalhista</td><td>Alta</td><td>R$ 5.000 – R$ 18.000</td></tr>
            <tr><td>Direito Penal e Processo Penal</td><td>Alta</td><td>R$ 5.000 – R$ 25.000</td></tr>
            <tr><td>Direito Digital e LGPD</td><td>Crescente</td><td>R$ 6.000 – R$ 20.000</td></tr>
            <tr><td>Direito Empresarial e M&A</td><td>Alta</td><td>R$ 8.000 – R$ 30.000+</td></tr>
            <tr><td>Direito Imobiliario</td><td>Media</td><td>R$ 5.000 – R$ 15.000</td></tr>
            <tr><td>Direito de Familia e Sucessoes</td><td>Media</td><td>R$ 4.000 – R$ 12.000</td></tr>
            <tr><td>Compliance e Anticorrupcao</td><td>Crescente</td><td>R$ 8.000 – R$ 25.000</td></tr>
          </tbody>
        </table>

        <h2>Pos-graduacao lato sensu vs stricto sensu em Direito</h2>
        <ul>
          <li><strong>Especializacao e MBA (lato sensu):</strong> 360 a 480 horas, 12 a 24 meses, voltado para o mercado</li>
          <li><strong>Mestrado Profissional (stricto sensu):</strong> 2 anos, dissertacao, mais academico, necessario para docencia</li>
          <li><strong>Mestrado Academico (stricto sensu):</strong> 2 anos, pesquisa original, linha academica</li>
          <li><strong>Doutorado:</strong> 4 anos, pesquisa inedita, exigido para professor titular</li>
        </ul>

        <h2>Direito Digital: a area que mais cresce</h2>
        <p>Com a LGPD (Lei Geral de Protecao de Dados), o Marco Civil da Internet e o crescimento das fintechs e plataformas digitais, o Direito Digital e a area juridica que mais cresce em demanda. Advogados especializados em privacidade de dados, contratos digitais e regulacao de IA sao dos mais buscados atualmente.</p>`,
    faqs: [
      { q: 'Posso fazer pos em Direito sem ser advogado?', a: 'Sim. As especializacoes lato sensu em Direito aceitam qualquer graduado. Contadores, administradores e profissionais de compliance se beneficiam muito.' },
      { q: 'Preciso estar na OAB para fazer especializacao em Direito?', a: 'Nao. A inscricao na OAB nao e pre-requisito para a pos-graduacao. Voce precisa apenas do diploma de graduacao.' },
      { q: 'Pos em Direito EAD tem validade para concursos?', a: 'Para a maioria dos concursos publicos juridicos (Magistratura, MP, Defensoria), o que conta e o diploma de graduacao em Direito. A pos-graduacao da pontos em processos seletivos de cargos publicos nao exclusivos para advogados.' }
    ],
    relLinks: [
      { href: '../../especializacao/direito-tributario/index.html', label: 'Especializacao em Direito Tributario' },
      { href: '../../../graduacao/direito/direito.html', label: 'Graduacao em Direito' },
      { href: '../../mba/mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' }
    ]
  }
];

for (const p of PAGES) {
  const html = espPage(p.name, p.prefix, p.canonical, p.breadcrumbs, p.quickAnswer, p.body, p.faqs, p.relLinks);
  fs.writeFileSync(path.join(root, p.file), html, 'utf-8');
  console.log(`✓ ${p.file}`);
}
console.log(`\n✅ ${PAGES.length} paginas escritas`);
