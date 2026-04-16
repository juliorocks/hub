#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function page(prefix, canonical, title, desc, h1, subtitle, quickAnswer, content, faq, tags, sidebar) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://www.melhorescursos.com.br/${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title}","datePublished":"2026-04-12","dateModified":"2026-04-12","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
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
  ${content}
  <script src="${prefix}assets/js/components-loader.js"></script>
  <script type="module" src="${prefix}assets/js/main.js"></script>
</body>
</html>`;
}

function mbaPage(slug, courseName, prefix, canonical, breadcrumbs, quickAnswer, body, faqs, relLinks) {
  const faqHtml = faqs.map(f => `
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>${f.q}</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="faq-answer"><p>${f.a}</p></div>
          </div>`).join('');

  const sidebarLinks = relLinks.map(l => `<li><a href="${l.href}" class="sidebar-link">${l.label}</a></li>`).join('');

  const breadHtml = breadcrumbs.map((b, i) => b.href
    ? `<li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="${b.href}" class="breadcrumb__link" itemprop="item"><span itemprop="name">${b.label}</span></a><meta itemprop="position" content="${i+1}"></li>`
    : `<li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${b.label}</span><meta itemprop="position" content="${i+1}"></li>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${courseName}: guia completo 2026, duração, grade e mercado | Hub do Estudante</title>
  <meta name="description" content="Tudo sobre o ${courseName}: duração, grade curricular, áreas de atuação, salário e melhores universidades em 2026.">
  <link rel="canonical" href="https://www.melhorescursos.com.br/${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${courseName}: guia completo 2026">
  <meta property="og:description" content="Duração, grade, áreas de atuação, salário e como escolher a melhor universidade.">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${courseName}: guia completo 2026","datePublished":"2026-04-12","dateModified":"2026-04-12","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
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
        <h1 class="article-hero__title">${courseName}: guia completo 2026, duração, grade e mercado</h1>
        <p class="article-hero__subtitle">Tudo sobre o ${courseName}: grade curricular, duração, áreas de atuação, salário e como escolher a melhor universidade.</p>
        <div class="article-hero__byline">
          <span>Por <strong>Redação Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="2026-04-12">12 de abril de 2026</time>
          <span>·</span>
          <span>8 min de leitura</span>
        </div>
      </header>

      <div class="quick-answer">
        <div class="quick-answer__label">Resposta rápida</div>
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
            <h3 class="affiliate-cta-article__title">Quer fazer ${courseName} com bolsa?</h3>
            <p class="affiliate-cta-article__text">Compare as melhores universidades parceiras com desconto garantido. Anhanguera, Unopar, Uniderp e mais.</p>
            <div class="affiliate-cta-article__actions">
              <a href="${prefix}pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" data-affiliate-click="true" rel="noopener sponsored">
                Ver bolsas na Anhanguera
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="${prefix}pages/universidades/unopar.html" class="btn btn--secondary btn--lg" data-affiliate-click="true" rel="noopener sponsored">
                Ver bolsas na Unopar
              </a>
            </div>
          </div>
        </div>

        <section class="faq-section" aria-labelledby="faq-title">
          <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
          <div class="faq-list">
            ${faqHtml}
          </div>
        </section>
      </div>
    </article>

    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Fazer com Desconto</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">
          <a href="${prefix}pages/universidades/anhanguera.html" class="btn btn--affiliate" rel="noopener sponsored">Anhanguera, ate 50% off</a>
          <a href="${prefix}pages/universidades/unopar.html" class="btn btn--affiliate" rel="noopener sponsored">Unopar, ate 50% off</a>
          <a href="${prefix}pages/universidades/uniderp.html" class="btn btn--affiliate" rel="noopener sponsored">Uniderp, ate 50% off</a>
        </div>
        <p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-3);text-align:center;">Inscricao gratuita · Sem compromisso</p>
      </div>
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Cursos Relacionados</h3>
        <ul class="sidebar-links">${sidebarLinks}</ul>
      </div>
    </aside>
  </main>

  <script src="${prefix}assets/js/components-loader.js"></script>
  <script type="module" src="${prefix}assets/js/main.js"></script>
</body>
</html>`;
}

const MBAS = [
  {
    file: 'pages/pos-graduacao/mba/mba-gestao-projetos/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-gestao-projetos/',
    name: 'MBA em Gestao de Projetos',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Gestao de Projetos' }
    ],
    quickAnswer: 'O <strong>MBA em Gestao de Projetos</strong> dura entre <strong>12 e 18 meses</strong> na modalidade EAD. Capacita profissionais para liderar projetos usando metodologias como PMI/PMBOK, Scrum e Agile. O salario de um gerente de projetos no Brasil varia entre <strong>R$ 7.000 e R$ 18.000</strong>. A certificacao PMP e amplamente valorizada no mercado.',
    body: `
        <h2>O que e o MBA em Gestao de Projetos?</h2>
        <p>O MBA em Gestao de Projetos e uma pos-graduacao lato sensu que capacita profissionais para planejar, executar e controlar projetos em qualquer setor da economia. O curso abrange metodologias classicas como o PMBOK (PMI) e metodologias ageis como Scrum, Kanban e SAFe.</p>
        <p>E indicado para profissionais de TI, engenharia, industria, servicos financeiros e qualquer area que envolva gestao de iniciativas com prazo, custo e escopo definidos.</p>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td><td>360 a 480 horas</td></tr>
            <tr><td>Presencial / Hibrido</td><td>12 a 24 meses</td><td>360 a 480 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos de Gestao de Projetos (PMBOK 7a edicao)</li>
          <li>Metodologias Ageis: Scrum, Kanban e SAFe</li>
          <li>Gestao de Escopo, Prazo e Custos</li>
          <li>Gestao de Riscos e Qualidade</li>
          <li>Lideranca e Gestao de Equipes</li>
          <li>Gestao de Stakeholders e Comunicacao</li>
          <li>Gestao de Contratos e Aquisicoes</li>
          <li>Project Management Office (PMO)</li>
          <li>Transformacao Digital e Inovacao</li>
          <li>TCC ou Artigo Final</li>
        </ul>

        <h2>Areas de atuacao</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Projetos</td><td>R$ 4.500 – R$ 8.000</td></tr>
            <tr><td>Gerente de Projetos</td><td>R$ 7.000 – R$ 15.000</td></tr>
            <tr><td>Gerente de Projetos Senior</td><td>R$ 12.000 – R$ 20.000</td></tr>
            <tr><td>Scrum Master</td><td>R$ 6.000 – R$ 12.000</td></tr>
            <tr><td>Coordenador de PMO</td><td>R$ 8.000 – R$ 18.000</td></tr>
          </tbody>
        </table>

        <h2>Vale a pena fazer a certificacao PMP?</h2>
        <p>A certificacao <strong>PMP (Project Management Professional)</strong>, emitida pelo PMI, e uma das mais reconhecidas globalmente para gestao de projetos. Profissionais certificados PMP ganham em media 20% a mais do que nao certificados, segundo pesquisas do proprio PMI. O MBA ajuda na preparacao para o exame, mas a certificacao e independente do curso.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o MBA em Gestao de Projetos?', a: 'A duracao padrao e de <strong>12 a 18 meses</strong> na modalidade EAD. Cursos presenciais ou hibridpos podem durar ate 24 meses.' },
      { q: 'O MBA em Gestao de Projetos substitui a certificacao PMP?', a: 'Nao. O MBA e um titulo academico de pos-graduacao lato sensu. A PMP e uma certificacao profissional do PMI, independente. O MBA pode ajudar na preparacao para o exame PMP.' },
      { q: 'Qual o salario de um gerente de projetos no Brasil?', a: 'O salario medio varia entre <strong>R$ 7.000 e R$ 15.000</strong> dependendo do setor, experiencia e certificacoes. Em grandes empresas e no setor de TI, pode ultrapassar R$ 18.000.' },
      { q: 'MBA em Gestao de Projetos EAD tem valor no mercado?', a: 'Sim. Desde que seja de instituicao credenciada pelo MEC, o diploma tem o mesmo valor legal que o presencial. A modalidade EAD e amplamente aceita no mercado de trabalho.' }
    ],
    relLinks: [
      { href: '../mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' },
      { href: '../mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' },
      { href: '../mba-marketing-digital/index.html', label: 'MBA em Marketing Digital' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-gestao-pessoas/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-gestao-pessoas/',
    name: 'MBA em Gestao de Pessoas',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Gestao de Pessoas' }
    ],
    quickAnswer: 'O <strong>MBA em Gestao de Pessoas</strong> dura entre <strong>12 e 18 meses</strong> na modalidade EAD. Forma especialistas em RH estrategico, lideranca, cultura organizacional e desenvolvimento humano. O salario de um gestor de RH sênior no Brasil varia entre <strong>R$ 6.000 e R$ 15.000</strong>.',
    body: `
        <h2>O que e o MBA em Gestao de Pessoas?</h2>
        <p>O MBA em Gestao de Pessoas e uma pos-graduacao voltada para profissionais que atuam ou desejam atuar na area de Recursos Humanos de forma estrategica. Vai alem do RH operacional, abordando lideranca, cultura organizacional, employer branding, diversidade e inclusao, e gestao por competencias.</p>
        <p>E indicado para profissionais de RH, psicologos organizacionais, administradores, gestores de equipes e liderancas que desejam aprofundar conhecimentos em pessoas e cultura.</p>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td><td>360 a 480 horas</td></tr>
            <tr><td>Presencial / Hibrido</td><td>12 a 24 meses</td><td>360 a 480 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>RH Estrategico e Gestao por Competencias</li>
          <li>Recrutamento e Selecao 4.0</li>
          <li>Treinamento, Desenvolvimento e Educacao Corporativa</li>
          <li>Avaliacao de Desempenho e Feedback</li>
          <li>Remuneracao e Beneficios</li>
          <li>Lideranca e Desenvolvimento de Equipes</li>
          <li>Cultura Organizacional e Clima</li>
          <li>Diversidade, Equidade e Inclusao</li>
          <li>People Analytics e HR Tech</li>
          <li>Legislacao Trabalhista e Compliance</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de RH Pleno</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Gestor de RH</td><td>R$ 6.000 – R$ 10.000</td></tr>
            <tr><td>HRBP (HR Business Partner)</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Diretor de Gente e Gestao</td><td>R$ 15.000 – R$ 30.000</td></tr>
            <tr><td>CHRO (Chief HR Officer)</td><td>R$ 25.000 – R$ 60.000+</td></tr>
          </tbody>
        </table>

        <h2>People Analytics: a tendencia do RH moderno</h2>
        <p>O uso de dados para tomar decisoes sobre pessoas e uma das principais tendencias do setor. O MBA em Gestao de Pessoas atualizado inclui modulos de <strong>People Analytics</strong>, que ensinam a usar dados para reducao de turnover, melhoria de engajamento, previsao de demissoes e otimizacao de processos seletivos.</p>`,
    faqs: [
      { q: 'MBA em Gestao de Pessoas e o mesmo que MBA em RH?', a: 'Essencialmente sim. "MBA em Gestao de Pessoas" e "MBA em RH Estrategico" cobrem os mesmos conteudos. O foco e no RH estrategico, nao no operacional.' },
      { q: 'Preciso ter experiencia em RH para fazer o MBA?', a: 'Nao e obrigatorio, mas e recomendavel. O MBA e pos-graduacao lato sensu, exige apenas diploma de graduacao em qualquer area para ingresso.' },
      { q: 'Qual o salario de um HRBP no Brasil?', a: 'O salario de um HR Business Partner varia entre <strong>R$ 8.000 e R$ 15.000</strong>, dependendo do porte da empresa, setor e localizacao.' },
      { q: 'O MBA em Gestao de Pessoas serve para psicologos?', a: 'Sim. Psicologos com interesse em RH e organizacoes se beneficiam muito do MBA, especialmente para atuar em processos seletivos, coaching e desenvolvimento organizacional.' }
    ],
    relLinks: [
      { href: '../mba-gestao-projetos/index.html', label: 'MBA em Gestao de Projetos' },
      { href: '../mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' },
      { href: '../../../../pages/graduacao/negocios/gestao-recursos-humanos/index.html', label: 'Graduacao em Gestao de RH' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-gestao-empresarial/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-gestao-empresarial/',
    name: 'MBA em Gestao Empresarial',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Gestao Empresarial' }
    ],
    quickAnswer: 'O <strong>MBA em Gestao Empresarial</strong> dura entre <strong>12 e 18 meses</strong>. E o MBA mais abrangente e procurado no Brasil, cobrindo financas, marketing, estrategia, operacoes e lideranca. O salario de um gestor com MBA varia entre <strong>R$ 8.000 e R$ 20.000</strong>.',
    body: `
        <h2>O que e o MBA em Gestao Empresarial?</h2>
        <p>O MBA em Gestao Empresarial e considerado o MBA generalista por excelencia. Forma executivos com visao 360 graus do negocio, capacitando-os a tomar decisoes estrategicas em financas, marketing, operacoes, pessoas e inovacao. E o MBA mais ofertado e mais buscado no Brasil.</p>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td><td>360 a 480 horas</td></tr>
            <tr><td>Presencial / Hibrido</td><td>18 a 24 meses</td><td>480 a 600 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Estrategia Empresarial e Competitividade</li>
          <li>Financas Corporativas e Analise de Investimentos</li>
          <li>Marketing Estrategico e Branding</li>
          <li>Gestao de Operacoes e Cadeia de Suprimentos</li>
          <li>Lideranca e Comportamento Organizacional</li>
          <li>Gestao de Projetos e Inovacao</li>
          <li>Direito Empresarial e Compliance</li>
          <li>Business Intelligence e Tomada de Decisao</li>
          <li>Empreendedorismo e Startups</li>
          <li>Negociacoes Empresariais</li>
        </ul>

        <h2>Para quem e indicado?</h2>
        <p>O MBA em Gestao Empresarial e indicado para:</p>
        <ul>
          <li>Profissionais em transicao para cargos de lideranca</li>
          <li>Empreendedores que desejam estruturar melhor seus negocios</li>
          <li>Gestores que querem ampliar sua visao estrategica</li>
          <li>Profissionais de qualquer area que almejam cargos executivos</li>
        </ul>

        <h2>Salarios com MBA em Gestao Empresarial</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Gerente de Area</td><td>R$ 8.000 – R$ 14.000</td></tr>
            <tr><td>Diretor de Divisao</td><td>R$ 15.000 – R$ 30.000</td></tr>
            <tr><td>CEO / Diretor Geral (PME)</td><td>R$ 20.000 – R$ 50.000</td></tr>
            <tr><td>Consultor Empresarial Senior</td><td>R$ 10.000 – R$ 25.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'MBA em Gestao Empresarial vale para qualquer area?', a: 'Sim. Por ser generalista, e aplicavel a qualquer setor. E especialmente valioso para quem esta migrando para cargos de gestao.' },
      { q: 'Qual a diferenca entre MBA e especializacao?', a: 'Na pratica, no Brasil, ambos sao pos-graduacao lato sensu com no minimo 360 horas. O MBA geralmente foca em gestao e lideranca com abordagem mais pratica e voltada para o mercado.' },
      { q: 'MBA EAD e reconhecido pelo MEC?', a: 'Pos-graduacoes lato sensu (incluindo MBAs) nao sao reguladas diretamente pelo MEC da mesma forma que a graduacao. O que conta e a credibilidade da instituicao e seu registro no e-MEC.' },
      { q: 'Quanto tempo dura o MBA em Gestao Empresarial?', a: 'Em media <strong>12 a 18 meses</strong> no formato EAD e <strong>18 a 24 meses</strong> no presencial.' }
    ],
    relLinks: [
      { href: '../mba-gestao-projetos/index.html', label: 'MBA em Gestao de Projetos' },
      { href: '../mba-financas-corporativas/index.html', label: 'MBA em Financas Corporativas' },
      { href: '../mba-marketing-digital/index.html', label: 'MBA em Marketing Digital' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-gestao-financeira/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-gestao-financeira/',
    name: 'MBA em Gestao Financeira',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Gestao Financeira' }
    ],
    quickAnswer: 'O <strong>MBA em Gestao Financeira</strong> dura entre <strong>12 e 18 meses</strong>. Forma especialistas em financas corporativas, controladoria, analise de investimentos e planejamento financeiro. O salario de um gestor financeiro no Brasil varia entre <strong>R$ 7.000 e R$ 18.000</strong>.',
    body: `
        <h2>O que e o MBA em Gestao Financeira?</h2>
        <p>O MBA em Gestao Financeira e uma pos-graduacao voltada para profissionais que desejam aprofundar conhecimentos em financas corporativas, mercado de capitais, controladoria e planejamento financeiro estrategico. E uma das especializacoes mais valorizadas em bancos, consultorias e grandes empresas.</p>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td></tr>
            <tr><td>Presencial / Hibrido</td><td>18 a 24 meses</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Financas Corporativas e Valuation</li>
          <li>Analise de Demonstrativos Financeiros</li>
          <li>Gestao de Custos e Controladoria</li>
          <li>Planejamento e Orcamento Empresarial</li>
          <li>Mercado de Capitais e Investimentos</li>
          <li>Matematica Financeira Avancada</li>
          <li>Gestao de Riscos e Compliance Financeiro</li>
          <li>Tributacao e Planejamento Fiscal</li>
          <li>Business Intelligence e Analise de Dados</li>
          <li>Auditoria e Controles Internos</li>
        </ul>

        <h2>Salarios na area financeira</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista Financeiro Senior</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Controller</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Gerente Financeiro</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>CFO (Diretor Financeiro)</td><td>R$ 20.000 – R$ 60.000+</td></tr>
          </tbody>
        </table>

        <h2>Certificacoes complementares</h2>
        <p>Profissionais de financas costumam buscar certificacoes como <strong>CPA-10, CPA-20, CFP (Planejador Financeiro), CFA</strong> e outras da ANBIMA e CVM. O MBA prepara bem para essas certificacoes, especialmente para o <strong>CFP</strong>.</p>`,
    faqs: [
      { q: 'Qual a diferenca entre MBA em Gestao Financeira e MBA em Financas Corporativas?', a: 'Sao muito similares. O MBA em Gestao Financeira tende a ser mais amplo (inclui controladoria e planejamento). O de Financas Corporativas foca mais em mercado de capitais, valuation e M&A.' },
      { q: 'Preciso ser contador para fazer MBA em Gestao Financeira?', a: 'Nao. O curso e aberto a qualquer graduado: administradores, economistas, engenheiros e outros se beneficiam muito do MBA em Gestao Financeira.' },
      { q: 'MBA em Financas ajuda a passar em concurso?', a: 'Indiretamente. Os conteudos de financas publicas, orcamento e auditoria sao uteis para concursos de controladoria, auditoria fiscal e tesouraria.' }
    ],
    relLinks: [
      { href: '../mba-financas-corporativas/index.html', label: 'MBA em Financas Corporativas' },
      { href: '../mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' },
      { href: '../../../../pages/graduacao/negocios/ciencias-contabeis/index.html', label: 'Graduacao em Ciencias Contabeis' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-financas-corporativas/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-financas-corporativas/',
    name: 'MBA em Financas Corporativas',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Financas Corporativas' }
    ],
    quickAnswer: 'O <strong>MBA em Financas Corporativas</strong> dura entre <strong>12 e 18 meses</strong>. E focado em mercado de capitais, valuation, fusoes e aquisicoes e estrutura de capital. Muito valorizado em bancos de investimento e grandes corporacoes. Salarios variam entre <strong>R$ 10.000 e R$ 30.000</strong> para perfis senior.',
    body: `
        <h2>O que e o MBA em Financas Corporativas?</h2>
        <p>O MBA em Financas Corporativas e uma das especializacoes mais tecnicas e valorizadas do mercado financeiro. Foca em analise de investimentos, estrutura de capital, valuation de empresas, mercado de capitais, fusoes e aquisicoes (M&A) e gestao de portfolios. E o caminho preferido de profissionais que desejam trabalhar em bancos de investimento, fundos e grandes corporacoes.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Valuation e Analise de Empresas</li>
          <li>Estrutura de Capital e Teoria de Financas</li>
          <li>Mercado de Capitais: acoes, renda fixa, derivativos</li>
          <li>Fusoes, Aquisicoes e Private Equity</li>
          <li>Gestao de Risco: VaR, stress testing</li>
          <li>Corporate Finance e Decisoes de Investimento</li>
          <li>Financiamento de Projetos (Project Finance)</li>
          <li>Regulacao do Mercado Financeiro (CVM, Banco Central)</li>
          <li>Modelagem Financeira em Excel e Python</li>
        </ul>

        <h2>Salarios e cargos</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de M&A</td><td>R$ 7.000 – R$ 14.000</td></tr>
            <tr><td>Gerente de Financas Corporativas</td><td>R$ 12.000 – R$ 20.000</td></tr>
            <tr><td>Gestor de Fundos</td><td>R$ 15.000 – R$ 35.000</td></tr>
            <tr><td>Diretor de Financas (IB)</td><td>R$ 30.000 – R$ 80.000+</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'MBA em Financas Corporativas serve para quem quer trabalhar em banco?', a: 'Sim. E um dos perfis mais valorizados em bancos de investimento, area de corporate banking e estruturacao de operacoes.' },
      { q: 'Preciso saber Python para o MBA em Financas Corporativas?', a: 'Nao e pre-requisito, mas cursos modernos incluem modulos de modelagem em Python e Excel avancado. Aprender programacao complementa muito a carreira em financas.' },
      { q: 'CFA substitui o MBA em Financas Corporativas?', a: 'Sao complementares, nao substitutos. O CFA e uma certificacao global rigorosa focada em analise de investimentos. O MBA da uma formacao mais ampla em gestao.' }
    ],
    relLinks: [
      { href: '../mba-gestao-financeira/index.html', label: 'MBA em Gestao Financeira' },
      { href: '../mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' },
      { href: '../../../../pages/graduacao/negocios/ciencias-contabeis/index.html', label: 'Graduacao em Ciencias Contabeis' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-marketing-digital/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-marketing-digital/',
    name: 'MBA em Marketing Digital',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Marketing Digital' }
    ],
    quickAnswer: 'O <strong>MBA em Marketing Digital</strong> dura entre <strong>12 e 18 meses</strong>. Cobre SEO, midia paga, redes sociais, e-commerce, automacao de marketing e data-driven marketing. O salario de um gerente de marketing digital varia entre <strong>R$ 6.000 e R$ 15.000</strong>.',
    body: `
        <h2>O que e o MBA em Marketing Digital?</h2>
        <p>O MBA em Marketing Digital prepara profissionais para planejar e executar estrategias de marketing no ambiente digital. Com o crescimento do comercio eletronico e da presenca online das empresas, a demanda por especialistas em marketing digital nunca foi tao alta no Brasil.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Estrategia Digital e Transformacao Digital</li>
          <li>SEO (Search Engine Optimization)</li>
          <li>Google Ads, Meta Ads e Midia Programatica</li>
          <li>Social Media e Gestao de Comunidades</li>
          <li>Marketing de Conteudo e Inbound Marketing</li>
          <li>E-commerce e Marketplace</li>
          <li>CRM, Automacao e E-mail Marketing</li>
          <li>Web Analytics: Google Analytics 4, Looker Studio</li>
          <li>Growth Hacking e Funnels de Conversao</li>
          <li>Branding Digital e UX</li>
        </ul>

        <h2>Salarios no marketing digital</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Marketing Digital</td><td>R$ 3.500 – R$ 6.500</td></tr>
            <tr><td>Especialista em Trafego Pago</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Gerente de Marketing Digital</td><td>R$ 7.000 – R$ 15.000</td></tr>
            <tr><td>Head of Growth</td><td>R$ 12.000 – R$ 22.000</td></tr>
            <tr><td>CMO (Chief Marketing Officer)</td><td>R$ 20.000 – R$ 50.000+</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Preciso ter graduacao em marketing para fazer o MBA?', a: 'Nao. O MBA e aberto a qualquer graduado. Profissionais de comunicacao, publicidade, administracao, jornalismo e TI sao bem-vindos.' },
      { q: 'MBA em Marketing Digital serve para freelancers?', a: 'Sim. Muitos alunos usam o MBA para estruturar uma carreira como consultor ou freelancer de marketing digital, ampliando repertorio tecnico e network.' },
      { q: 'O MBA em Marketing Digital inclui trafego pago?', a: 'Sim. Google Ads e Meta Ads sao disciplinas essenciais em todos os MBAs de Marketing Digital modernos.' }
    ],
    relLinks: [
      { href: '../mba-gestao-empresarial/index.html', label: 'MBA em Gestao Empresarial' },
      { href: '../../../../pages/graduacao/negocios/marketing/index.html', label: 'Graduacao em Marketing' },
      { href: '../mba-gestao-projetos/index.html', label: 'MBA em Gestao de Projetos' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-saude/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-saude/',
    name: 'MBA em Saude',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Saude' }
    ],
    quickAnswer: 'O <strong>MBA em Saude</strong> dura entre <strong>12 e 18 meses</strong>. Forma gestores para hospitais, clinicas, operadoras de saude e industria farmaceutica. O salario de um gestor hospitalar sênior varia entre <strong>R$ 8.000 e R$ 20.000</strong>.',
    body: `
        <h2>O que e o MBA em Saude?</h2>
        <p>O MBA em Saude e uma pos-graduacao voltada para profissionais de saude (medicos, enfermeiros, farmaceuticos, fisioterapeutas) e de gestao que desejam ocupar cargos de lideranca no setor de saude. Combina conhecimentos clinicos com gestao estrategica de servicos de saude.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Gestao Hospitalar e de Servicos de Saude</li>
          <li>Economia da Saude e Financiamento</li>
          <li>Regulacao do Setor Saude (ANS, ANVISA)</li>
          <li>Qualidade e Acreditacao Hospitalar (ONA, JCI)</li>
          <li>Gestao de Pessoas em Saude</li>
          <li>Marketing em Saude</li>
          <li>Gestao de Operacoes em Saude</li>
          <li>Saude Digital e Telemedicina</li>
          <li>Epidemiologia e Saude Publica</li>
          <li>Etica e Direito Medico</li>
        </ul>

        <h2>Salarios na gestao de saude</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Coordenador de Unidade de Saude</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Gerente Hospitalar</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Diretor Medico</td><td>R$ 15.000 – R$ 30.000</td></tr>
            <tr><td>Diretor Executivo de Hospital</td><td>R$ 25.000 – R$ 60.000+</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'O MBA em Saude e so para medicos?', a: 'Nao. E indicado para qualquer profissional de saude (enfermeiros, farmaceuticos, fisioterapeutas) e tambem para gestores de outras areas que atuam no setor saude.' },
      { q: 'MBA em Saude serve para trabalhar em plano de saude?', a: 'Sim. As operadoras de saude (Unimed, Hapvida, Amil, etc.) sao grandes empregadoras de profissionais com MBA em Saude para cargos de gestao e regulacao.' },
      { q: 'Preciso de CRM para fazer o MBA em Saude?', a: 'Nao. O MBA em Saude nao e um curso clinico. Nao exige CRM ou qualquer registro de conselho profissional para ingresso.' }
    ],
    relLinks: [
      { href: '../mba-saude-gestao-hospitalar/index.html', label: 'MBA em Saude e Gestao Hospitalar' },
      { href: '../mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' },
      { href: '../../../../pages/graduacao/saude/medicina/index.html', label: 'Curso de Medicina' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-saude-gestao-hospitalar/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-saude-gestao-hospitalar/',
    name: 'MBA em Saude e Gestao Hospitalar',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Saude e Gestao Hospitalar' }
    ],
    quickAnswer: 'O <strong>MBA em Saude e Gestao Hospitalar</strong> dura entre <strong>12 e 18 meses</strong>. E focado especificamente em administracao hospitalar, acreditacao, qualidade assistencial e gestao de operacoes hospitalares. Salarios de diretores hospitalares chegam a <strong>R$ 30.000 a R$ 60.000</strong>.',
    body: `
        <h2>O que e o MBA em Saude e Gestao Hospitalar?</h2>
        <p>O MBA em Saude e Gestao Hospitalar e uma pos-graduacao especializada na administracao de hospitais, clinicas e redes de saude. Aborda desde a gestao operacional (leitos, centro cirurgico, pronto-socorro) ate a gestao estrategica (financas hospitalares, acreditacao, expansao).</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Administracao Hospitalar e Estrutura Organizacional</li>
          <li>Acreditacao ONA e JCI</li>
          <li>Gestao da Qualidade Assistencial e Seguranca do Paciente</li>
          <li>Gestao de Leitos e Fluxo de Pacientes</li>
          <li>Financas Hospitalares e Faturamento</li>
          <li>Gestao de Suprimentos e Farmacia Hospitalar</li>
          <li>Regulacao Sanitaria (ANVISA, ANS)</li>
          <li>Indicadores Hospitalares e Dashboard</li>
          <li>Transformacao Digital na Saude (prontuario eletronico, telemedicina)</li>
        </ul>

        <h2>Diferenciais do setor hospitalar</h2>
        <p>O Brasil tem mais de 6.800 hospitais e o setor saude representa cerca de 10% do PIB nacional. A demanda por gestores qualificados e crescente, especialmente com o movimento de acreditacao hospitalar, que exige profissionais capacitados em qualidade e seguranca do paciente.</p>`,
    faqs: [
      { q: 'Qual a diferenca entre MBA em Saude e MBA em Gestao Hospitalar?', a: 'O MBA em Gestao Hospitalar e mais especifico para administracao de hospitais. O MBA em Saude e mais amplo, incluindo operadoras, industria farmaceutica e saude publica.' },
      { q: 'O que e acreditacao hospitalar e por que importa no MBA?', a: 'Acreditacao e um processo de avaliacao da qualidade e seguranca de um hospital por orgaos como a ONA (nacional) e a JCI (internacional). Hospitals acreditados sao mais competitivos e o MBA prepara gestores para esse processo.' }
    ],
    relLinks: [
      { href: '../mba-saude/index.html', label: 'MBA em Saude' },
      { href: '../mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' },
      { href: '../../../../pages/graduacao/saude/medicina/index.html', label: 'Curso de Medicina' }
    ]
  },
  {
    file: 'pages/pos-graduacao/mba/mba-engenharia-software/index.html',
    prefix: '../../../../',
    canonical: 'pos-graduacao/mba/mba-engenharia-software/',
    name: 'MBA em Engenharia de Software',
    breadcrumbs: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Pos-graduacao' },
      { href: '../index.html', label: 'MBA' },
      { label: 'MBA em Engenharia de Software' }
    ],
    quickAnswer: 'O <strong>MBA em Engenharia de Software</strong> dura entre <strong>12 e 18 meses</strong>. Combina gestao de TI com praticas avancadas de desenvolvimento de software, arquitetura de sistemas e lideranca tecnica. Salarios variam entre <strong>R$ 10.000 e R$ 25.000</strong> para tech leads e arquitetos.',
    body: `
        <h2>O que e o MBA em Engenharia de Software?</h2>
        <p>O MBA em Engenharia de Software une competencias tecnicas avancadas com gestao de produtos e times de tecnologia. E voltado para desenvolvedores que desejam crescer para cargos de lideranca tecnica (Tech Lead, Arquiteto de Software, CTO) sem abrir mao da profundidade tecnica.</p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Arquitetura de Software e Design Patterns</li>
          <li>Microservicos e Arquitetura de Nuvem (AWS, Azure, GCP)</li>
          <li>DevOps, CI/CD e SRE</li>
          <li>Gestao de Produtos Digitais (Product Management)</li>
          <li>Metodologias Ageis: Scrum, Kanban, SAFe</li>
          <li>Seguranca em Software (DevSecOps)</li>
          <li>Lideranca Tecnica e Gestao de Times</li>
          <li>Inteligencia Artificial e Machine Learning aplicados</li>
          <li>Engenharia de Dados e Pipelines</li>
          <li>TCC em projeto real</li>
        </ul>

        <h2>Salarios em TI com MBA</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Tech Lead / Lider Tecnico</td><td>R$ 12.000 – R$ 20.000</td></tr>
            <tr><td>Arquiteto de Software</td><td>R$ 15.000 – R$ 25.000</td></tr>
            <tr><td>Engineering Manager</td><td>R$ 18.000 – R$ 30.000</td></tr>
            <tr><td>CTO (startups)</td><td>R$ 20.000 – R$ 50.000+</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Preciso saber programar para fazer MBA em Engenharia de Software?', a: 'Sim. O curso e voltado para profissionais de TI com experiencia em desenvolvimento. Nao e um curso introdutorio.' },
      { q: 'MBA em Engenharia de Software e melhor que uma Especializacao em Arquitetura?', a: 'Depende do objetivo. O MBA da uma visao mais ampla incluindo gestao. A especializacao tecnica e mais profunda tecnicamente. Para quem quer cargos de lideranca, o MBA e mais indicado.' }
    ],
    relLinks: [
      { href: '../mba-gestao-projetos/index.html', label: 'MBA em Gestao de Projetos' },
      { href: '../../../../pages/graduacao/tecnologia/engenharia-de-software/index.html', label: 'Graduacao em Engenharia de Software' },
      { href: '../../../../pages/graduacao/tecnologia/sistemas-informacao/index.html', label: 'Sistemas de Informacao' }
    ]
  }
];

for (const mba of MBAS) {
  const html = mbaPage(mba.slug, mba.name, mba.prefix, mba.canonical, mba.breadcrumbs, mba.quickAnswer, mba.body, mba.faqs, mba.relLinks);
  const outPath = path.join(root, mba.file);
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`✓ ${mba.file}`);
}

console.log(`\n✅ ${MBAS.length} MBAs escritos`);
