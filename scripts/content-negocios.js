#!/usr/bin/env node
// Gera conteudo real para paginas de negocios, saude restantes, pos-graduacao e carreiras

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function page(opts) {
  const {
    prefix,
    canonical,
    title,
    description,
    breadcrumbs,
    h1,
    subtitle,
    quickAnswer,
    body,
    faqs,
    ctaTitle,
    ctaText,
    sidebarLinks,
    readTime = '8 min de leitura'
  } = opts;

  const bcrumbs = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) {
      return `<li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><span itemprop="name">${b.name}</span><meta itemprop="position" content="${i+1}"></li>`;
    }
    return `<li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem"><a href="${b.href}" class="breadcrumb__link" itemprop="item"><span itemprop="name">${b.name}</span></a><meta itemprop="position" content="${i+1}"></li>`;
  }).join('');

  const faqHtml = faqs.map(f => `
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              <span>${f.q}</span>
              <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="faq-answer"><p>${f.a}</p></div>
          </div>`).join('\n');

  const sidebarHtml = sidebarLinks ? `
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Cursos Relacionados</h3>
        <ul class="sidebar-links">${sidebarLinks.map(l => `<li><a href="${l.href}" class="sidebar-link">${l.name}</a></li>`).join('')}</ul>
      </div>` : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title.split(':')[0]}">
  <meta property="og:description" content="${description}">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title.split(':')[0]}","datePublished":"2026-04-12","dateModified":"2026-04-12","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
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
        ${bcrumbs}
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
        <h1 class="article-hero__title">${h1}</h1>
        <p class="article-hero__subtitle">${subtitle}</p>
        <div class="article-hero__byline">
          <span>Por <strong>Redacao Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="2026-04-12">12 de abril de 2026</time>
          <span>·</span>
          <span>${readTime}</span>
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
            <h3 class="affiliate-cta-article__title">${ctaTitle}</h3>
            <p class="affiliate-cta-article__text">${ctaText}</p>
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
      ${sidebarHtml}
    </aside>
  </main>

  <script src="${prefix}assets/js/components-loader.js"></script>
  <script type="module" src="${prefix}assets/js/main.js"></script>
</body>
</html>`;
}

// ─── CURSOS ───────────────────────────────────────────────────────────────────

const COURSES = [

  // ── ADMINISTRACAO ──────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/negocios/administracao/index.html',
      'pages/graduacao/administracao/index.html',
    ],
    prefix4: '../../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/administracao/',
    title: 'Curso de Administracao: guia completo 2026, duracao, grade e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Administracao: duracao, grade curricular, areas de atuacao, salario e as melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Administracao' }
    ],
    h1: 'Curso de Administracao: guia completo 2026, duracao, grade e mercado',
    subtitle: 'Grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Administracao</strong> dura <strong>4 anos</strong> (8 semestres) na maioria das universidades. Forma profissionais para gerir empresas publicas, privadas e organizacoes do terceiro setor. O salario de um administrador inicia em torno de <strong>R$ 3.500</strong> e pode superar <strong>R$ 12.000</strong> em cargos de lideranca.',
    body: `
        <h2>O que e o curso de Administracao?</h2>
        <p>O curso de Administracao forma profissionais capacitados para planejar, organizar, dirigir e controlar recursos humanos, financeiros, materiais e tecnologicos em organizacoes de qualquer porte e setor. E um dos cursos mais procurados do Brasil, com ampla oferta presencial e EAD.</p>
        <p>O bacharel em Administracao pode atuar em empresas privadas, orgaos publicos, startups, ONGs e tambem como empreendedor.</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>4 anos (8 semestres)</td><td>3.000 horas</td></tr>
            <tr><td>Presencial</td><td>4 anos (8 semestres)</td><td>3.000 horas</td></tr>
            <tr><td>Hibrido</td><td>4 anos (8 semestres)</td><td>3.000 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Teoria Geral da Administracao</li>
          <li>Matematica Financeira e Estatistica</li>
          <li>Contabilidade Geral e Gerencial</li>
          <li>Gestao de Pessoas e Comportamento Organizacional</li>
          <li>Marketing e Vendas</li>
          <li>Gestao de Operacoes e Logistica</li>
          <li>Financas Corporativas</li>
          <li>Empreendedorismo e Inovacao</li>
          <li>Direito Empresarial</li>
          <li>Gestao Estrategica e Planejamento</li>
          <li>Sistemas de Informacao Gerencial</li>
          <li>Estagio Supervisionado e TCC</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Assistente Administrativo</td><td>R$ 2.000 – R$ 3.500</td></tr>
            <tr><td>Analista Administrativo</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Coordenador Administrativo</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Gerente Administrativo</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Diretor Executivo / CEO (PME)</td><td>R$ 12.000 – R$ 30.000</td></tr>
          </tbody>
        </table>

        <h2>Administracao EAD vale a pena?</h2>
        <p>Sim. O curso de Administracao EAD credenciado pelo MEC tem o mesmo valor legal que o presencial. O formato online e ideal para quem trabalha em paralelo, com provas e algumas atividades presenciais (polo EAD). Grandes redes como Anhanguera, Unopar e Uniderp oferecem o curso com mensalidades a partir de R$ 139.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Administracao?', a: 'A duracao minima e de <strong>4 anos</strong> (8 semestres), tanto no presencial quanto no EAD, conforme as diretrizes curriculares nacionais.' },
      { q: 'Qual e o salario de um administrador recen-formado?', a: 'O salario inicial varia entre <strong>R$ 2.000 e R$ 3.500</strong>. Com experiencia e especializacao, o profissional pode superar R$ 12.000 em cargos de gestao.' },
      { q: 'Administracao EAD tem valor no mercado?', a: 'Sim. O diploma de instituicao credenciada pelo MEC tem o mesmo reconhecimento legal, independente da modalidade. A aceitacao pelo mercado de trabalho e ampla.' },
      { q: 'Quais sao as melhores universidades para Administracao?', a: 'Entre as mais procuradas estao Anhanguera, Unopar, Uniderp, FGV, Mackenzie, ESPM e Insper. Para quem busca custo-beneficio no EAD, Anhanguera e Unopar se destacam com bolsas de ate 50%.' }
    ],
    ctaTitle: 'Faca Administracao com bolsa de ate 50%',
    ctaText: 'Compare universidades parceiras com desconto garantido. Matricula gratuita e sem burocracia.',
    sidebarLinks: [
      { name: 'Ciencias Contabeis', href: '../ciencias-contabeis/index.html' },
      { name: 'Gestao de RH', href: '../gestao-recursos-humanos/index.html' },
      { name: 'Marketing', href: '../marketing/index.html' }
    ]
  },

  // ── CIENCIAS CONTABEIS ──────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/negocios/ciencias-contabeis/index.html',
      'pages/graduacao/negocios/ciencias-contabeis.html',
      'pages/graduacao/administracao/ciencias-contabeis/index.html',
    ],
    prefix4: '../../../../',
    prefix3: '../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/ciencias-contabeis/',
    title: 'Curso de Ciencias Contabeis: guia 2026, duracao, grade e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Ciencias Contabeis: duracao, grade, areas de atuacao, salario de contador e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Ciencias Contabeis' }
    ],
    h1: 'Curso de Ciencias Contabeis: guia completo 2026, duracao, grade e mercado',
    subtitle: 'Grade curricular, duracao, salario de contador e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Ciencias Contabeis</strong> dura <strong>4 anos</strong> (8 semestres). Forma contadores, auditores e analistas financeiros. O salario inicial e em torno de <strong>R$ 2.500</strong> e profissionais com CRC ativo e especializacao podem ganhar acima de <strong>R$ 10.000</strong>.',
    body: `
        <h2>O que e o curso de Ciencias Contabeis?</h2>
        <p>Ciencias Contabeis e um curso de bacharelado que forma profissionais para registrar, analisar e interpretar as informacoes financeiras e patrimoniais de empresas e organizacoes. O contador e essencial para o cumprimento de obrigacoes fiscais, trabalhistas e societarias.</p>
        <p>Apos a graduacao, o profissional deve se registrar no Conselho Regional de Contabilidade (CRC) para exercer a profissao de contador.</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>4 anos (8 semestres)</td><td>3.000 horas</td></tr>
            <tr><td>Presencial</td><td>4 anos (8 semestres)</td><td>3.000 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Contabilidade Geral e Intermediaria</li>
          <li>Contabilidade de Custos</li>
          <li>Contabilidade Tributaria</li>
          <li>Auditoria Contabil</li>
          <li>Pericia Contabil</li>
          <li>Contabilidade Societaria e IFRS</li>
          <li>Matematica Financeira e Estatistica</li>
          <li>Legislacao Tributaria (IRPJ, CSLL, PIS, COFINS)</li>
          <li>Contabilidade Publica</li>
          <li>Analise de Demonstracoes Contabeis</li>
          <li>Estagio Supervisionado e TCC</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Auxiliar de Escritorio Contabil</td><td>R$ 1.800 – R$ 2.800</td></tr>
            <tr><td>Assistente Contabil</td><td>R$ 2.500 – R$ 4.000</td></tr>
            <tr><td>Contador</td><td>R$ 4.000 – R$ 8.000</td></tr>
            <tr><td>Auditor Independente</td><td>R$ 6.000 – R$ 12.000</td></tr>
            <tr><td>Controller / CFO</td><td>R$ 10.000 – R$ 25.000</td></tr>
          </tbody>
        </table>

        <h2>Exame de Suficiencia do CFC</h2>
        <p>Para registrar-se no CRC e exercer a profissao de contador, o graduado deve ser aprovado no <strong>Exame de Suficiencia do Conselho Federal de Contabilidade (CFC)</strong>. O exame e realizado duas vezes ao ano e avalia conhecimentos contabeis, legislacao e etica profissional. A taxa de aprovacao historica varia entre 30% e 50%.</p>`,
    faqs: [
      { q: 'Quanto tempo dura Ciencias Contabeis?', a: 'O curso tem duracao de <strong>4 anos</strong> (8 semestres), tanto na modalidade EAD quanto presencial.' },
      { q: 'E obrigatorio fazer o Exame de Suficiencia?', a: 'Sim. Para se registrar no Conselho Regional de Contabilidade (CRC) e atuar como contador, e obrigatorio ser aprovado no Exame de Suficiencia do CFC.' },
      { q: 'Qual e o salario de um contador no Brasil?', a: 'O salario varia entre <strong>R$ 4.000 e R$ 8.000</strong> para contadores registrados. Especialistas em IFRS, auditoria ou planejamento tributario podem superar R$ 12.000.' },
      { q: 'Ciencias Contabeis EAD e reconhecido pelo MEC?', a: 'Sim. O diploma de instituicao credenciada tem o mesmo valor legal. O importante e verificar se a faculdade e credenciada pelo MEC antes de se matricular.' }
    ],
    ctaTitle: 'Faca Ciencias Contabeis com desconto',
    ctaText: 'Compare as melhores universidades parceiras com bolsas de ate 50%.',
    sidebarLinks: [
      { name: 'Administracao', href: '../administracao/index.html' },
      { name: 'Gestao de RH', href: '../gestao-recursos-humanos/index.html' },
      { name: 'Logistica', href: '../logistica/index.html' }
    ]
  },

  // ── GESTAO DE RH ────────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/negocios/gestao-recursos-humanos/index.html',
      'pages/graduacao/negocios/gestao-rh.html',
      'pages/graduacao/administracao/gestao-recursos-humanos/index.html',
    ],
    prefix4: '../../../../',
    prefix3: '../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/gestao-de-recursos-humanos/',
    title: 'Curso de Gestao de Recursos Humanos: guia 2026, duracao e mercado | Hub do Estudante',
    description: 'Tudo sobre Gestao de Recursos Humanos: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Gestao de RH' }
    ],
    h1: 'Curso de Gestao de Recursos Humanos: guia completo 2026',
    subtitle: 'Grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Gestao de Recursos Humanos (GRH)</strong> dura <strong>2 a 3 anos</strong> como tecnologia ou <strong>4 anos</strong> como bacharelado. Forma profissionais para recrutamento, treinamento, folha de pagamento e desenvolvimento organizacional. O salario inicial e de aproximadamente <strong>R$ 2.500</strong>, chegando a <strong>R$ 10.000</strong> em cargos de gerencia.',
    body: `
        <h2>O que e o curso de Gestao de RH?</h2>
        <p>O curso de Gestao de Recursos Humanos forma profissionais para gerenciar o capital humano das organizacoes. Abrange desde processos operacionais como recrutamento, selecao e folha de pagamento ate estrategias de desenvolvimento organizacional, cultura e engajamento.</p>
        <p>O curso pode ser oferecido como <strong>Tecnologo</strong> (2 a 3 anos) ou como <strong>Bacharelado em Administracao</strong> com habilitacao em RH (4 anos).</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Tipo</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>Tecnologo EAD</td><td>2 a 3 anos</td><td>1.600 a 2.000 horas</td></tr>
            <tr><td>Bacharelado Presencial</td><td>4 anos</td><td>3.000 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Recrutamento e Selecao</li>
          <li>Treinamento e Desenvolvimento (T&amp;D)</li>
          <li>Gestao de Desempenho e Competencias</li>
          <li>Cargos, Salarios e Beneficios</li>
          <li>Legislacao Trabalhista e Previdenciaria</li>
          <li>Folha de Pagamento e eSocial</li>
          <li>Saude e Seguranca do Trabalho</li>
          <li>Cultura Organizacional e Clima</li>
          <li>People Analytics</li>
          <li>Psicologia Organizacional</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Assistente de RH</td><td>R$ 2.000 – R$ 3.000</td></tr>
            <tr><td>Analista de RH</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Especialista em T&amp;D</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Business Partner (HRBP)</td><td>R$ 7.000 – R$ 13.000</td></tr>
            <tr><td>Gerente de RH</td><td>R$ 8.000 – R$ 18.000</td></tr>
          </tbody>
        </table>

        <h2>O mercado de trabalho em RH</h2>
        <p>A area de Recursos Humanos vive uma transformacao acelerada. People Analytics, inteligencia artificial no recrutamento e gestao remota de equipes sao tendencias que exigem profissionais atualizados. Empresas de tecnologia, servicos financeiros e o setor publico sao os maiores empregadores.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Gestao de RH?', a: 'O curso tecnologo dura de <strong>2 a 3 anos</strong>. O bacharelado tem duracao de <strong>4 anos</strong>. Ambos sao reconhecidos pelo MEC.' },
      { q: 'Qual e o salario de um analista de RH?', a: 'O salario de analista de RH varia entre <strong>R$ 3.500 e R$ 6.000</strong>. Em cargos de gerencia, pode superar R$ 15.000.' },
      { q: 'GRH EAD tem valor no mercado?', a: 'Sim. O diploma de tecnologia em GRH de instituicao credenciada pelo MEC tem reconhecimento legal e e aceito pela maioria das empresas.' },
      { q: 'Qual a diferenca entre tecnologo e bacharel em RH?', a: 'O tecnologo foca em competencias operacionais e de gestao, com duracao menor. O bacharelado em Administracao com habilitacao em RH tem formacao mais ampla. Para a maioria das vagas de analista e gerente, ambos sao igualmente aceitos.' }
    ],
    ctaTitle: 'Faca Gestao de RH com desconto',
    ctaText: 'Compare universidades com bolsas de ate 50% em RH. Matricula gratuita.',
    sidebarLinks: [
      { name: 'Administracao', href: '../administracao/index.html' },
      { name: 'Ciencias Contabeis', href: '../ciencias-contabeis/index.html' },
      { name: 'Marketing', href: '../marketing/index.html' }
    ]
  },

  // ── LOGISTICA ───────────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/negocios/logistica/index.html',
      'pages/graduacao/negocios/logistica.html',
      'pages/graduacao/administracao/logistica/index.html',
    ],
    prefix4: '../../../../',
    prefix3: '../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/logistica/',
    title: 'Curso de Logistica: guia completo 2026, duracao, grade e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Logistica: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Logistica' }
    ],
    h1: 'Curso de Logistica: guia completo 2026, duracao, grade e mercado',
    subtitle: 'Grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Logistica</strong> dura <strong>2 a 3 anos</strong> como tecnologia. Forma profissionais para gestao de estoque, transporte, supply chain e operacoes. O salario inicial e de aproximadamente <strong>R$ 2.500</strong>, chegando a <strong>R$ 12.000</strong> em cargos de coordenacao e gerencia de supply chain.',
    body: `
        <h2>O que e o curso de Logistica?</h2>
        <p>O Tecnologo em Logistica forma profissionais para planejar, executar e controlar o fluxo de materiais, informacoes e pessoas ao longo da cadeia de suprimentos. Abrange desde o armazenamento e transporte ate a gestao de fornecedores e distribuicao.</p>
        <p>E um dos cursos com maior demanda no Brasil, impulsionado pelo crescimento do e-commerce, da industria e do agronegocio.</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>Tecnologo EAD</td><td>2 a 3 anos</td><td>1.600 a 2.000 horas</td></tr>
            <tr><td>Tecnologo Presencial</td><td>2 a 3 anos</td><td>1.600 a 2.000 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Gestao de Estoque e Armazenagem</li>
          <li>Transporte e Modal de Cargas</li>
          <li>Supply Chain Management</li>
          <li>Gestao de Compras e Fornecedores</li>
          <li>Planejamento e Controle da Producao (PCP)</li>
          <li>Logistica Reversa</li>
          <li>Comercio Exterior e Alfandega</li>
          <li>WMS e TMS (sistemas de gestao)</li>
          <li>Lean Logistics e Melhoria Continua</li>
          <li>Matematica Financeira e Indicadores</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Assistente de Logistica</td><td>R$ 2.000 – R$ 3.200</td></tr>
            <tr><td>Analista de Logistica</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Coordenador de Logistica</td><td>R$ 5.000 – R$ 9.000</td></tr>
            <tr><td>Gerente de Supply Chain</td><td>R$ 8.000 – R$ 18.000</td></tr>
            <tr><td>Diretor de Operacoes</td><td>R$ 15.000 – R$ 35.000</td></tr>
          </tbody>
        </table>

        <h2>Por que Logistica esta em alta?</h2>
        <p>O Brasil movimenta mais de R$ 2 trilhoes em cargas por ano. O crescimento do e-commerce criou uma demanda explosiva por profissionais de last mile, fulfillment e logistica reversa. A profissao figura entre as mais aquecidas no mercado de trabalho brasileiro.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Logistica?', a: 'O tecnologo dura de <strong>2 a 3 anos</strong>, dependendo da instituicao e modalidade.' },
      { q: 'Qual e o salario de um profissional de logistica?', a: 'O salario inicial e de aproximadamente <strong>R$ 2.500 a R$ 3.500</strong>. Com experiencia e certificacoes, gerentes de supply chain ganham entre R$ 8.000 e R$ 18.000.' },
      { q: 'Logistica EAD tem reconhecimento?', a: 'Sim. O diploma de tecnologo em Logistica de instituicao credenciada pelo MEC tem o mesmo valor legal que o presencial.' },
      { q: 'Quais certificacoes complementam o curso de Logistica?', a: 'As certificacoes mais valorizadas sao APICS CPIM, APICS CSCP, Six Sigma (Green/Black Belt) e certificacoes em WMS/TMS como SAP EWM.' }
    ],
    ctaTitle: 'Faca Logistica com desconto de ate 50%',
    ctaText: 'Compare universidades parceiras com bolsas garantidas. Anhanguera, Unopar e mais.',
    sidebarLinks: [
      { name: 'Administracao', href: '../administracao/index.html' },
      { name: 'Gestao de RH', href: '../gestao-recursos-humanos/index.html' },
      { name: 'Ciencias Contabeis', href: '../ciencias-contabeis/index.html' }
    ]
  },

  // ── MARKETING ───────────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/negocios/marketing/index.html',
      'pages/graduacao/negocios/marketing.html',
      'pages/graduacao/administracao/marketing/index.html',
    ],
    prefix4: '../../../../',
    prefix3: '../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/marketing/',
    title: 'Curso de Marketing: guia completo 2026, duracao, grade e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Marketing: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Marketing' }
    ],
    h1: 'Curso de Marketing: guia completo 2026, duracao, grade e mercado',
    subtitle: 'Grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Marketing</strong> dura <strong>2 a 3 anos</strong> como tecnologia ou <strong>4 anos</strong> como bacharelado. Forma profissionais para gestao de marcas, publicidade, marketing digital e inteligencia de mercado. O salario inicial e de aproximadamente <strong>R$ 2.800</strong>, chegando a <strong>R$ 15.000</strong> em cargos de gerencia.',
    body: `
        <h2>O que e o curso de Marketing?</h2>
        <p>O curso de Marketing forma profissionais para planejar e executar estrategias de comunicacao, branding, vendas e relacionamento com o cliente. Com a transformacao digital, o profissional de marketing atual precisa dominar tanto o marketing tradicional quanto o digital.</p>
        <p>O curso pode ser oferecido como <strong>Tecnologo em Marketing</strong> (2 a 3 anos) ou como <strong>Bacharelado</strong> (4 anos).</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Tipo</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>Tecnologo EAD</td><td>2 a 3 anos</td><td>1.600 a 2.000 horas</td></tr>
            <tr><td>Bacharelado Presencial</td><td>4 anos</td><td>3.000 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos de Marketing e Comportamento do Consumidor</li>
          <li>Pesquisa de Mercado e Inteligencia Competitiva</li>
          <li>Marketing Digital: SEO, SEM e Midias Sociais</li>
          <li>Gestao de Marca (Branding)</li>
          <li>Publicidade, Propaganda e Midia</li>
          <li>E-commerce e Marketing de Conteudo</li>
          <li>Gestao de Produto e Pricing</li>
          <li>CRM e Fidelizacao de Clientes</li>
          <li>Analise de Dados e Marketing Analytics</li>
          <li>Etica e Legislacao em Marketing</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Assistente de Marketing</td><td>R$ 2.000 – R$ 3.200</td></tr>
            <tr><td>Analista de Marketing</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Social Media / Gestor de Trafego</td><td>R$ 3.000 – R$ 7.000</td></tr>
            <tr><td>Especialista em Marketing Digital</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Gerente de Marketing</td><td>R$ 9.000 – R$ 20.000</td></tr>
          </tbody>
        </table>

        <h2>Marketing digital e o futuro da profissao</h2>
        <p>O profissional de marketing digital e um dos mais demandados no Brasil. Dominar Google Ads, Meta Ads, SEO, automacao de marketing (RD Station, HubSpot) e analise de dados (GA4, Power BI) e diferencial competitivo. Cursos de especializacao e certificacoes Google e Meta complementam a formacao.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Marketing?', a: 'O tecnologo dura <strong>2 a 3 anos</strong>. O bacharelado tem duracao de <strong>4 anos</strong>.' },
      { q: 'Qual e o salario de um profissional de marketing?', a: 'O salario inicial varia entre <strong>R$ 2.800 e R$ 4.000</strong>. Gerentes de marketing experientes ganham entre R$ 9.000 e R$ 20.000.' },
      { q: 'Marketing EAD tem valor no mercado de trabalho?', a: 'Sim. Grandes agencias e empresas contratam profissionais com diploma EAD credenciado. O portfolio e as certificacoes (Google, Meta, HubSpot) pesam muito na selecao.' },
      { q: 'Qual a diferenca entre Marketing e Publicidade e Propaganda?', a: 'Marketing abrange gestao de marca, estrategia comercial e inteligencia de mercado. Publicidade e Propaganda foca na criacao de peca criativas e campanhas. Ambos se complementam, e muitos profissionais transitam entre as duas areas.' }
    ],
    ctaTitle: 'Faca Marketing com desconto de ate 50%',
    ctaText: 'Compare as melhores universidades com bolsas garantidas. Anhanguera, Unopar e mais.',
    sidebarLinks: [
      { name: 'Administracao', href: '../administracao/index.html' },
      { name: 'Gestao de RH', href: '../gestao-recursos-humanos/index.html' },
      { name: 'Logistica', href: '../logistica/index.html' }
    ]
  },

  // ── EDUCACAO FISICA ─────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/saude/educacao-fisica/index.html',
      'pages/graduacao/saude/educacao-fisica.html',
    ],
    prefix4: '../../../../',
    prefix3: '../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/educacao-fisica/',
    title: 'Curso de Educacao Fisica: guia completo 2026, duracao e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Educacao Fisica: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Saude', href: '../index.html' },
      { name: 'Educacao Fisica' }
    ],
    h1: 'Curso de Educacao Fisica: guia completo 2026, duracao e mercado',
    subtitle: 'Grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Educacao Fisica</strong> dura <strong>3 a 4 anos</strong>. Existe a licenciatura (para docencia escolar) e o bacharelado (para treinamento desportivo, academias e saude). O salario inicial e de aproximadamente <strong>R$ 2.500</strong>, chegando a <strong>R$ 8.000</strong> como personal trainer senior ou coordenador esportivo.',
    body: `
        <h2>O que e o curso de Educacao Fisica?</h2>
        <p>O curso de Educacao Fisica forma profissionais para promover a saude, o esporte e a qualidade de vida por meio da atividade fisica. Existe em dois formatos: <strong>Licenciatura</strong>, voltada para o ensino escolar, e <strong>Bacharelado</strong>, voltado para academias, clubes, reabilitacao e alto rendimento.</p>
        <p>O profissional deve se registrar no <strong>CREF (Conselho Regional de Educacao Fisica)</strong> para atuar na area.</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Habilitacao</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>Bacharelado EAD</td><td>3 anos</td><td>2.400 horas</td></tr>
            <tr><td>Bacharelado Presencial</td><td>4 anos</td><td>2.800 horas</td></tr>
            <tr><td>Licenciatura Presencial</td><td>3 a 4 anos</td><td>3.200 horas</td></tr>
          </tbody>
        </table>

        <h2>Grade curricular</h2>
        <ul>
          <li>Anatomia e Fisiologia Humana</li>
          <li>Cineantropometria e Avaliacao Fisica</li>
          <li>Biomecânica e Cinesiologia</li>
          <li>Fisiologia do Exercicio</li>
          <li>Treinamento Desportivo e Prescricao de Exercicios</li>
          <li>Nutricao Esportiva</li>
          <li>Saude Coletiva e Saude do Trabalhador</li>
          <li>Primeiros Socorros</li>
          <li>Gestao de Academias e Eventos Esportivos</li>
          <li>Estagio Supervisionado</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Area</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Professor de Educacao Fisica (escola publica)</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Personal Trainer</td><td>R$ 3.000 – R$ 10.000</td></tr>
            <tr><td>Profissional de Academia</td><td>R$ 2.500 – R$ 5.000</td></tr>
            <tr><td>Preparador Fisico (futebol/esportes)</td><td>R$ 4.000 – R$ 15.000</td></tr>
            <tr><td>Coordenador de Academia / Fitness</td><td>R$ 5.000 – R$ 10.000</td></tr>
          </tbody>
        </table>

        <h2>Licenciatura ou Bacharelado: qual escolher?</h2>
        <p>Se o objetivo e <strong>dar aulas em escolas</strong> (publicas ou privadas) do ensino basico, a Licenciatura e obrigatoria. Para atuar em academias, clubes, hospitais, empresas (qualidade de vida) ou como personal trainer, o Bacharelado e o caminho certo. Alguns profissionais fazem os dois para ampliar as possibilidades de atuacao.</p>`,
    faqs: [
      { q: 'Quanto tempo dura Educacao Fisica?', a: 'O bacharelado dura <strong>3 a 4 anos</strong>. A licenciatura dura <strong>3 a 4 anos</strong>, com mais horas praticas em escolas.' },
      { q: 'Preciso me registrar no CREF?', a: 'Sim. O registro no <strong>CREF</strong> e obrigatorio para exercer atividades de Educacao Fisica em academias, clubes e espacos de saude.' },
      { q: 'Educacao Fisica EAD e aceita pelo CREF?', a: 'O bacharelado EAD de instituicao credenciada pelo MEC e aceito para registro no CREF. Verifique se a universidade escolhida e reconhecida antes de se matricular.' },
      { q: 'Quanto ganha um personal trainer?', a: 'O personal trainer autonomo pode ganhar entre <strong>R$ 3.000 e R$ 10.000</strong> ou mais, dependendo da clientela, localizacao e diferenciais de servico.' }
    ],
    ctaTitle: 'Faca Educacao Fisica com desconto',
    ctaText: 'Compare as melhores universidades com bolsas de ate 50%.',
    sidebarLinks: [
      { name: 'Enfermagem', href: '../enfermagem/index.html' },
      { name: 'Nutricao', href: '../nutricao/index.html' },
      { name: 'Psicologia', href: '../psicologia/index.html' }
    ]
  },

  // ── FISIOTERAPIA ────────────────────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/saude/fisioterapia/index.html',
    ],
    prefix4: '../../../../',
    canonical: 'https://www.melhorescursos.com.br/graduacao/fisioterapia/',
    title: 'Curso de Fisioterapia: guia completo 2026, duracao, grade e mercado | Hub do Estudante',
    description: 'Tudo sobre o curso de Fisioterapia: duracao, grade curricular, areas de especializacao, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Graduacao', href: '../../index.html' },
      { name: 'Saude', href: '../index.html' },
      { name: 'Fisioterapia' }
    ],
    h1: 'Curso de Fisioterapia: guia completo 2026, duracao, grade e mercado',
    subtitle: 'Grade curricular, duracao, areas de especializacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O curso de <strong>Fisioterapia</strong> dura <strong>4 a 5 anos</strong> (8 a 10 semestres). Forma fisioterapeutas para reabilitacao musculoesqueletica, neurologica, respiratoria e esportiva. O salario inicial e de aproximadamente <strong>R$ 3.500</strong>, chegando a <strong>R$ 10.000</strong> com especializacao.',
    body: `
        <h2>O que e o curso de Fisioterapia?</h2>
        <p>O curso de Fisioterapia forma profissionais para prevenir, avaliar e tratar disfuncoes do sistema musculoesqueletico, neurologico, cardiorrespiratorio e dermato-funcional. O fisioterapeuta atua em hospitais, clinicas, academias, empresas e domicilios.</p>
        <p>Apos a graduacao, o profissional deve se registrar no <strong>CREFITO (Conselho Regional de Fisioterapia e Terapia Ocupacional)</strong>.</p>

        <h2>Duracao e modalidades</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>Bacharelado Presencial</td><td>4 a 5 anos (8-10 semestres)</td><td>4.000 horas</td></tr>
          </tbody>
        </table>
        <p><em>Nota: Fisioterapia exige estagio clinico presencial obrigatorio, o que limita a oferta em EAD puro. A maioria das universidades oferece apenas o formato presencial ou hibrido com estagio obrigatorio.</em></p>

        <h2>Grade curricular</h2>
        <ul>
          <li>Anatomia, Fisiologia e Bioquimica</li>
          <li>Biomecânica Aplicada</li>
          <li>Cinesioterapia e Recursos Fisioterapeuticos</li>
          <li>Fisioterapia Musculoesqueletica e Ortopedica</li>
          <li>Fisioterapia Neurologica (AVC, TCE, Parkinson)</li>
          <li>Fisioterapia Cardiorrespiratoria e UTI</li>
          <li>Fisioterapia Esportiva</li>
          <li>Fisioterapia Dermato-funcional</li>
          <li>Fisioterapia Pediatrica e Geriatrica</li>
          <li>Acupuntura e Terapias Manuais</li>
          <li>Estagio Clinico Supervisionado (800 horas)</li>
        </ul>

        <h2>Areas de especializacao e salarios</h2>
        <table>
          <thead><tr><th>Area / Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Fisioterapeuta Hospitalar</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Fisioterapeuta Clinico (reabilitacao)</td><td>R$ 3.500 – R$ 7.000</td></tr>
            <tr><td>Fisioterapeuta Esportivo</td><td>R$ 4.000 – R$ 12.000</td></tr>
            <tr><td>Fisioterapeuta Dermato-funcional</td><td>R$ 5.000 – R$ 15.000</td></tr>
            <tr><td>Fisioterapeuta em UTI / Especialista</td><td>R$ 6.000 – R$ 15.000</td></tr>
          </tbody>
        </table>

        <h2>Especializacoes mais valorizadas</h2>
        <p>Apos a graduacao, especializacoes que mais valorizam o fisioterapeuta no Brasil incluem: <strong>RPG (Reeducacao Postural Global)</strong>, <strong>Pilates Clinico</strong>, <strong>Fisioterapia em UTI</strong>, <strong>Fisioterapia Esportiva</strong> e <strong>Dermato-funcional</strong>. A area estetica (fisioterapia dermato-funcional) tem alta demanda privada e permite faturamentos acima de R$ 15.000 para profissionais autonomos.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Fisioterapia?', a: 'A duracao e de <strong>4 a 5 anos</strong> (8 a 10 semestres), com carga horaria minima de 4.000 horas incluindo estagio clinico.' },
      { q: 'Fisioterapia tem EAD?', a: 'A maior parte das disciplinas teoricas pode ser em EAD, mas o estagio clinico e obrigatoriamente presencial. Procure instituicoes credenciadas com polos de estagio na sua cidade.' },
      { q: 'Qual e o salario inicial de um fisioterapeuta?', a: 'O salario inicial varia entre <strong>R$ 3.500 e R$ 5.000</strong>. Com especializacao em areas de alta demanda como UTI ou dermato-funcional, pode superar R$ 10.000.' },
      { q: 'E necessario se registrar no CREFITO?', a: 'Sim. O registro no <strong>CREFITO</strong> e obrigatorio para exercer a profissao de fisioterapeuta no Brasil.' }
    ],
    ctaTitle: 'Faca Fisioterapia com desconto',
    ctaText: 'Compare as melhores universidades com bolsas de ate 50%. Anhanguera e outras.',
    sidebarLinks: [
      { name: 'Enfermagem', href: '../enfermagem/index.html' },
      { name: 'Educacao Fisica', href: '../educacao-fisica/index.html' },
      { name: 'Nutricao', href: '../nutricao/index.html' }
    ]
  },

  // ── QUANTO GANHA MEDICO (SAUDE) ─────────────────────────────────────────────
  {
    files: [
      'pages/graduacao/saude/quanto-ganha-medico/index.html',
      'pages/carreiras/salarios/quanto-ganha-medico/index.html',
    ],
    prefix4: '../../../../',
    canonical: 'https://www.melhorescursos.com.br/carreiras/salarios/quanto-ganha-medico/',
    title: 'Quanto ganha um medico no Brasil em 2026? Salario por especialidade | Hub do Estudante',
    description: 'Salario de medico em 2026: medico generalista, clinico geral, especialistas (cardiologista, cirurgiao, etc). Faixas salariais por especialidade e setor.',
    breadcrumbs4: [
      { name: 'Home', href: '../../../../index.html' },
      { name: 'Carreiras', href: '../../../../pages/carreiras/index.html' },
      { name: 'Salarios', href: '../index.html' },
      { name: 'Quanto ganha um medico' }
    ],
    h1: 'Quanto ganha um medico no Brasil em 2026?',
    subtitle: 'Salarios por especialidade, setor de trabalho e regime de contratacao. Dados atualizados para 2026.',
    quickAnswer: 'O salario de um <strong>medico no Brasil</strong> varia entre <strong>R$ 8.000 e R$ 60.000</strong> dependendo da especialidade, regime de trabalho e localizacao. Medicos generalistas do SUS ganham em media R$ 10.000 a R$ 14.000 (com plantoes). Especialistas em cirurgia, cardiologia e anestesiologia podem superar R$ 40.000 mensais.',
    body: `
        <h2>Salario de medico por especialidade</h2>
        <table>
          <thead><tr><th>Especialidade</th><th>Faixa salarial mensal</th></tr></thead>
          <tbody>
            <tr><td>Medico de Familia (ESF / PSF)</td><td>R$ 8.000 – R$ 12.000</td></tr>
            <tr><td>Clinico Geral (Hospitalar)</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>Medico do Trabalho</td><td>R$ 12.000 – R$ 20.000</td></tr>
            <tr><td>Pediatra</td><td>R$ 10.000 – R$ 20.000</td></tr>
            <tr><td>Ginecologista / Obstetra</td><td>R$ 12.000 – R$ 25.000</td></tr>
            <tr><td>Psiquiatra</td><td>R$ 15.000 – R$ 30.000</td></tr>
            <tr><td>Cardiologista</td><td>R$ 15.000 – R$ 35.000</td></tr>
            <tr><td>Anestesiologista</td><td>R$ 20.000 – R$ 45.000</td></tr>
            <tr><td>Cirurgiao Geral</td><td>R$ 15.000 – R$ 35.000</td></tr>
            <tr><td>Cirurgiao Plastico</td><td>R$ 20.000 – R$ 60.000</td></tr>
            <tr><td>Neurocirurgiao</td><td>R$ 25.000 – R$ 60.000</td></tr>
            <tr><td>Radiologista</td><td>R$ 18.000 – R$ 40.000</td></tr>
          </tbody>
        </table>

        <h2>Salario de medico por setor</h2>
        <table>
          <thead><tr><th>Setor</th><th>Caracteristicas</th><th>Renda media</th></tr></thead>
          <tbody>
            <tr><td>SUS (CLT ou RPA)</td><td>Salario fixo + plantoes</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>Hospital Privado (CLT)</td><td>Salario + sobreaviso</td><td>R$ 12.000 – R$ 25.000</td></tr>
            <tr><td>Clinica Propria</td><td>Variavel por consultas/procedimentos</td><td>R$ 15.000 – R$ 80.000</td></tr>
            <tr><td>Telemedicina</td><td>Por hora ou por consulta</td><td>R$ 60 – R$ 200/hora</td></tr>
            <tr><td>Industria Farmaceutica</td><td>Salario fixo + bonus</td><td>R$ 15.000 – R$ 30.000</td></tr>
          </tbody>
        </table>

        <h2>Quanto tempo leva para se tornar medico?</h2>
        <p>A formacao medica completa no Brasil leva no minimo <strong>12 anos</strong>:</p>
        <ul>
          <li><strong>Graduacao em Medicina:</strong> 6 anos (12 semestres)</li>
          <li><strong>Residencia Medica:</strong> 2 a 6 anos (dependendo da especialidade)</li>
          <li><strong>Especializacao / Subespecialidade (opcional):</strong> 1 a 3 anos adicionais</li>
        </ul>

        <h2>Especialidades mais bem pagas</h2>
        <p>As especialidades com maior potencial de ganho no Brasil sao <strong>Anestesiologia, Cirurgia Plastica, Neurocirurgia, Radiologia e Cardiologia</strong>. Anestesiologistas e cirurgioes plasticos com consultorio ou atuacao em clinicas esteticas podem superar R$ 60.000 mensais.</p>`,
    faqs: [
      { q: 'Qual e o salario minimo de um medico no Brasil?', a: 'Nao existe piso salarial federal para medicos, mas o Conselho Federal de Medicina (CFM) recomenda um minimo de R$ 13.500 para 20h semanais. Na pratica, medicos em inicio de carreira no SUS ganham entre <strong>R$ 8.000 e R$ 12.000</strong>.' },
      { q: 'Qual e a especialidade medica mais bem paga?', a: '<strong>Anestesiologia, Neurocirurgia e Cirurgia Plastica</strong> sao as especialidades com maior potencial de ganho, com faixas acima de R$ 40.000 mensais para profissionais experientes.' },
      { q: 'Medico do SUS ganha bem?', a: 'Medicos do Programa Mais Medicos e da ESF ganham entre R$ 8.000 e R$ 14.000 mensais com 40h semanais. Plantoes adicionais podem elevar a renda para R$ 20.000 ou mais.' },
      { q: 'Vale a pena fazer medicina hoje no Brasil?', a: 'Sim. Apesar da longa formacao (6 anos de graduacao + residencia), a carreira medica oferece alta remuneracao, estabilidade e diversas possibilidades de atuacao. O mercado continua aquecido, especialmente em especialidades cirurgicas e diagnostico por imagem.' }
    ],
    ctaTitle: 'Quer ingressar na area de saude?',
    ctaText: 'Compare os hub do estudante de saude com bolsas de ate 50%. Enfermagem, Farmacia, Fisioterapia e mais.',
    sidebarLinks: [
      { name: 'Curso de Medicina', href: '../medicina/index.html' },
      { name: 'Curso de Enfermagem', href: '../enfermagem/index.html' },
      { name: 'Curso de Farmacia', href: '../farmacia/index.html' }
    ]
  },

  // ── MBA GESTAO NEGOCIOS ──────────────────────────────────────────────────────
  {
    files: [
      'pages/pos-graduacao/mba-gestao-negocios.html',
    ],
    prefix4: '../../',
    canonical: 'https://www.melhorescursos.com.br/pos-graduacao/mba-gestao-negocios/',
    title: 'MBA em Gestao de Negocios: guia completo 2026, duracao e mercado | Hub do Estudante',
    description: 'Tudo sobre o MBA em Gestao de Negocios: duracao, grade curricular, diferencas para o MBA Executivo, salario e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../index.html' },
      { name: 'Pos-graduacao', href: '../pos-graduacao/index.html' },
      { name: 'MBA em Gestao de Negocios' }
    ],
    h1: 'MBA em Gestao de Negocios: guia completo 2026',
    subtitle: 'Duracao, grade curricular, areas de atuacao, salario e como escolher a melhor universidade.',
    quickAnswer: 'O <strong>MBA em Gestao de Negocios</strong> dura entre <strong>12 e 18 meses</strong> na modalidade EAD. Capacita executivos e gestores para decisoes estrategicas, financeiras e operacionais em empresas de qualquer porte. O salario de um gerente geral ou diretor no Brasil varia entre <strong>R$ 10.000 e R$ 30.000</strong>.',
    body: `
        <h2>O que e o MBA em Gestao de Negocios?</h2>
        <p>O MBA em Gestao de Negocios e uma pos-graduacao lato sensu que fornece uma visao 360 graus da gestao empresarial. Ao contrario de MBAs especializados, este programa abrange todas as areas funcionais de uma empresa: financas, marketing, operacoes, pessoas e estrategia.</p>
        <p>E indicado para profissionais que buscam posicoes de lideranca generalista, como CEO, diretor geral ou gerente de unidade de negocio.</p>

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
          <li>Estrategia Empresarial e Planejamento</li>
          <li>Financas para Executivos nao Financeiros</li>
          <li>Marketing Estrategico e Digital</li>
          <li>Gestao de Pessoas e Lideranca</li>
          <li>Gestao de Operacoes e Supply Chain</li>
          <li>Analise de Dados e Business Intelligence</li>
          <li>Inovacao, Transformacao Digital e Startups</li>
          <li>Direito Empresarial e Compliance</li>
          <li>Negociacao e Gestao de Conflitos</li>
          <li>TCC ou Case Final</li>
        </ul>

        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Gerente de Area</td><td>R$ 8.000 – R$ 15.000</td></tr>
            <tr><td>Gerente Geral / Unidade de Negocio</td><td>R$ 12.000 – R$ 25.000</td></tr>
            <tr><td>Diretor Executivo</td><td>R$ 20.000 – R$ 50.000</td></tr>
            <tr><td>CEO (PME)</td><td>R$ 15.000 – R$ 40.000</td></tr>
            <tr><td>Consultor de Negocios (autonomo)</td><td>R$ 10.000 – R$ 30.000</td></tr>
          </tbody>
        </table>

        <h2>MBA em Gestao de Negocios x MBA Executivo: qual a diferenca?</h2>
        <p>O <strong>MBA em Gestao de Negocios</strong> tem foco mais academico e operacional, adequado para profissionais em transicao para cargos de lideranca. O <strong>MBA Executivo</strong> geralmente exige mais anos de experiencia e e voltado para executivos que ja ocupam cargos de gerencia ou diretoria. Ambos sao pos-graduacoes lato sensu no Brasil.</p>`,
    faqs: [
      { q: 'Quanto tempo dura o MBA em Gestao de Negocios?', a: 'A duracao padrao e de <strong>12 a 18 meses</strong> no EAD. Cursos presenciais podem durar ate 24 meses.' },
      { q: 'Preciso ter experiencia para fazer esse MBA?', a: 'Nao e obrigatorio, mas recomenda-se ao menos 2 a 3 anos de experiencia profissional para melhor aproveitamento do conteudo. Algumas instituicoes nao exigem experiencia minima.' },
      { q: 'MBA EAD e aceito pelo mercado?', a: 'Sim. Desde que a instituicao seja credenciada pelo MEC, o titulo e legalmente equivalente ao presencial. Grandes consultorias e empresas contratam profissionais com MBA EAD.' },
      { q: 'Qual a diferenca entre MBA e especializacao?', a: 'Na pratica brasileira, ambos sao pos-graduacoes lato sensu com carga minima de 360 horas. O MBA normalmente tem foco em gestao e lideranca empresarial, enquanto a especializacao pode focar em qualquer area tecnica.' }
    ],
    ctaTitle: 'Faca MBA em Gestao de Negocios com bolsa',
    ctaText: 'Compare as melhores universidades parceiras com desconto garantido.',
    sidebarLinks: [
      { name: 'MBA em Gestao Empresarial', href: 'mba/mba-gestao-empresarial/index.html' },
      { name: 'MBA em Financas Corporativas', href: 'mba/mba-financas-corporativas/index.html' },
      { name: 'MBA em Marketing Digital', href: 'mba/mba-marketing-digital/index.html' }
    ]
  },

  // ── POS DIREITO ─────────────────────────────────────────────────────────────
  {
    files: [
      'pages/pos-graduacao/pos-direito.html',
    ],
    prefix4: '../../',
    canonical: 'https://www.melhorescursos.com.br/pos-graduacao/direito/',
    title: 'Pos-graduacao em Direito: guia 2026, areas, duracao e mercado | Hub do Estudante',
    description: 'Tudo sobre pos-graduacao em Direito: especializacoes mais valorizadas, duracao, salario de advogado especialista e melhores universidades em 2026.',
    breadcrumbs4: [
      { name: 'Home', href: '../../index.html' },
      { name: 'Pos-graduacao', href: '../pos-graduacao/index.html' },
      { name: 'Pos em Direito' }
    ],
    h1: 'Pos-graduacao em Direito: guia completo 2026',
    subtitle: 'As especializacoes mais valorizadas, duracao, salario de advogado especialista e como escolher a melhor universidade.',
    quickAnswer: 'A <strong>pos-graduacao em Direito</strong> dura entre <strong>12 e 18 meses</strong> no EAD. As especializacoes mais valorizadas sao Direito Tributario, Direito Digital, Direito Trabalhista e Direito Empresarial. O salario de um advogado especialista varia entre <strong>R$ 6.000 e R$ 25.000</strong> dependendo da area e do porte do escritorio.',
    body: `
        <h2>Por que fazer pos-graduacao em Direito?</h2>
        <p>Com mais de 1,3 milhao de advogados registrados na OAB, a especializacao e fundamental para se destacar no mercado juridico. A pos-graduacao permite aprofundar conhecimentos em uma area especifica, aumentar a remuneracao e abrir portas em grandes escritorios e corporacoes.</p>

        <h2>Especializacoes mais valorizadas em 2026</h2>
        <table>
          <thead><tr><th>Especializacao</th><th>Mercado / Demanda</th></tr></thead>
          <tbody>
            <tr><td>Direito Tributario</td><td>Altissima demanda em empresas e escritorios</td></tr>
            <tr><td>Direito Digital e Protecao de Dados (LGPD)</td><td>Alta demanda, area em expansao</td></tr>
            <tr><td>Direito Empresarial e Contratos</td><td>Alta demanda em in-house e escritorios</td></tr>
            <tr><td>Direito Trabalhista</td><td>Alta demanda, especialmente em reforma trabalhista</td></tr>
            <tr><td>Direito Previdenciario</td><td>Alta demanda para advogados autonomos</td></tr>
            <tr><td>Compliance e Governanca Corporativa</td><td>Alta demanda em grandes empresas</td></tr>
            <tr><td>Direito Imobiliario</td><td>Media-alta demanda, boa renda autonoma</td></tr>
          </tbody>
        </table>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD</td><td>12 a 18 meses</td><td>360 a 480 horas</td></tr>
            <tr><td>Presencial / Hibrido</td><td>12 a 24 meses</td><td>360 a 500 horas</td></tr>
          </tbody>
        </table>

        <h2>Salarios por area juridica</h2>
        <table>
          <thead><tr><th>Area</th><th>Faixa salarial (advogado especialista)</th></tr></thead>
          <tbody>
            <tr><td>Tributarista (escritorio)</td><td>R$ 8.000 – R$ 25.000</td></tr>
            <tr><td>Advogado In-House (empresa)</td><td>R$ 7.000 – R$ 20.000</td></tr>
            <tr><td>Trabalhista (autonomo)</td><td>R$ 5.000 – R$ 15.000</td></tr>
            <tr><td>Especialista em LGPD / DPO</td><td>R$ 8.000 – R$ 18.000</td></tr>
            <tr><td>Compliance Officer</td><td>R$ 10.000 – R$ 25.000</td></tr>
          </tbody>
        </table>

        <h2>Pos-graduacao em Direito conta pontos para concursos?</h2>
        <p>Sim. Em concursos para carreiras juridicas (Procurador, Delegado, Juiz, Promotor), a pos-graduacao lato sensu pode contar como titulacao adicional em provas de titulo ou como requisito de progressao na carreira. Para magistratura e MP, o mestrado e doutorado sao mais valorizados.</p>`,
    faqs: [
      { q: 'Pos-graduacao em Direito e o mesmo que mestrado?', a: 'Nao. Pos-graduacao lato sensu (especializacao/MBA) e diferente do mestrado (stricto sensu). O mestrado exige dissertacao, defesa banca e tem duracao de 2 a 4 anos. A especializacao dura 12 a 18 meses e nao exige defesa.' },
      { q: 'Qual a especializacao em Direito mais bem paga?', a: '<strong>Direito Tributario</strong> e a especialidade com maior demanda e remuneracao no Brasil, seguida por Compliance, Direito Digital e Direito Empresarial.' },
      { q: 'Pos em Direito EAD tem valor?', a: 'Sim. O diploma de especializacao EAD de instituicao credenciada pelo MEC tem o mesmo valor legal. Grandes escritorios e empresas aceitam profissionais com especializacao EAD.' },
      { q: 'E necessario ser advogado para fazer pos-graduacao em Direito?', a: 'Nao obrigatoriamente. Profissionais de compliance, RH, contabilidade e gestao frequentemente fazem especializacoes juridicas para complementar a formacao.' }
    ],
    ctaTitle: 'Faca pos em Direito com desconto',
    ctaText: 'Compare as melhores universidades juridicas com bolsas de ate 50%.',
    sidebarLinks: [
      { name: 'Especializacao em Direito Tributario', href: '../pos-graduacao/especializacao/especializacao-direito-tributario/index.html' },
      { name: 'MBA em Gestao Empresarial', href: '../pos-graduacao/mba/mba-gestao-empresarial/index.html' },
      { name: 'MBA em Compliance', href: '../pos-graduacao/mba/mba-gestao-empresarial/index.html' }
    ]
  },

  // ── ESPECIALIZACAO SAUDE ────────────────────────────────────────────────────
  {
    files: [
      'pages/pos-graduacao/especializacao-saude.html',
    ],
    prefix4: '../../',
    canonical: 'https://www.melhorescursos.com.br/pos-graduacao/especializacao-saude/',
    title: 'Especializacao em Saude: guia 2026, areas, duracao e mercado | Hub do Estudante',
    description: 'As melhores especializacoes em Saude em 2026: enfermagem, fisioterapia, nutricao, saude publica e gestao hospitalar. Duracao, salario e universidades.',
    breadcrumbs4: [
      { name: 'Home', href: '../../index.html' },
      { name: 'Pos-graduacao', href: '../pos-graduacao/index.html' },
      { name: 'Especializacao em Saude' }
    ],
    h1: 'Especializacao em Saude: guia completo 2026',
    subtitle: 'As areas mais valorizadas, duracao, salario e como escolher a melhor especializacao em saude.',
    quickAnswer: 'A <strong>especializacao em Saude</strong> dura entre <strong>12 e 18 meses</strong> no EAD. As areas mais procuradas sao Enfermagem, Fisioterapia, Nutricao Clinica, Saude Publica e Gestao em Saude. Profissionais com especializacao ganham em media <strong>30 a 50% mais</strong> que generalistas da mesma area.',
    body: `
        <h2>Por que fazer especializacao em Saude?</h2>
        <p>A especializacao e um diferencial competitivo fundamental para profissionais de saude. Permite atuacao em areas clinicas especificas, aumenta a remuneracao e e exigida para concursos publicos e cargos hospitalares de nivel senior.</p>

        <h2>Areas mais valorizadas em 2026</h2>
        <table>
          <thead><tr><th>Area de Especializacao</th><th>Profissoes que mais buscam</th></tr></thead>
          <tbody>
            <tr><td>Enfermagem em UTI / Intensivismo</td><td>Enfermeiros</td></tr>
            <tr><td>Fisioterapia em Neurologia</td><td>Fisioterapeutas</td></tr>
            <tr><td>Nutricao Clinica e Metabolismo</td><td>Nutricionistas</td></tr>
            <tr><td>Saude Publica e Epidemiologia</td><td>Medicos, enfermeiros, farmacos</td></tr>
            <tr><td>Gestao Hospitalar e Sistemas de Saude</td><td>Todos os profissionais de saude</td></tr>
            <tr><td>Saude Mental e Psiquiatria</td><td>Psicologos, enfermeiros, assistentes sociais</td></tr>
            <tr><td>Dermato-funcional e Estetica</td><td>Fisioterapeutas, esteticistas</td></tr>
          </tbody>
        </table>

        <h2>Duracao e formato</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th><th>Carga horaria</th></tr></thead>
          <tbody>
            <tr><td>EAD (com pratica supervisionada)</td><td>12 a 18 meses</td><td>360 a 480 horas</td></tr>
            <tr><td>Presencial / Residencia Multiprofissional</td><td>12 a 24 meses</td><td>1.440 a 5.760 horas</td></tr>
          </tbody>
        </table>

        <h2>Impacto salarial da especializacao</h2>
        <table>
          <thead><tr><th>Profissao</th><th>Sem especializacao</th><th>Com especializacao</th></tr></thead>
          <tbody>
            <tr><td>Enfermeiro</td><td>R$ 3.500 – R$ 5.000</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Fisioterapeuta</td><td>R$ 3.500 – R$ 5.500</td><td>R$ 5.500 – R$ 15.000</td></tr>
            <tr><td>Nutricionista</td><td>R$ 3.000 – R$ 5.000</td><td>R$ 4.500 – R$ 10.000</td></tr>
            <tr><td>Psicologo</td><td>R$ 3.000 – R$ 5.000</td><td>R$ 5.000 – R$ 12.000</td></tr>
          </tbody>
        </table>

        <h2>Residencia Multiprofissional: vale a pena?</h2>
        <p>A <strong>Residencia Multiprofissional em Saude</strong> e o programa de especializacao mais rigoroso para profissionais de saude nao-medicos. Dura 2 anos com dedicacao exclusiva (60h/semana) e paga uma bolsa de R$ 4.106 mensais pelo MEC. E altamente valorizada para atuacao em hospitais terciarios e ensino superior.</p>`,
    faqs: [
      { q: 'Qual a melhor especializacao em saude para fazer em 2026?', a: 'Depende da sua formacao base. Para enfermeiros: <strong>UTI ou Saude Mental</strong>. Para fisioterapeutas: <strong>Neurologia ou Dermato-funcional</strong>. Para nutricionistas: <strong>Nutricao Clinica</strong>. Gestao Hospitalar e uma opcao transversal para qualquer profissional de saude.' },
      { q: 'Especializacao em Saude EAD tem valor?', a: 'Sim. Especializacoes EAD credenciadas pelo MEC sao aceitas em concursos publicos, hospitais e planos de carreira. Verifique se o curso exige pratica presencial (obrigatorio para algumas areas clinicas).' },
      { q: 'Quanto custa uma especializacao em Saude?', a: 'No EAD, os precos variam de R$ 150 a R$ 400 mensais (12 a 18 meses). Especializacoes presenciais em institutos especializados podem custar R$ 500 a R$ 2.000/mes.' },
      { q: 'Especializacao lato sensu e o mesmo que residencia?', a: 'Nao. A residencia em saude e um programa de especializacao pratica de regime de dedicacao exclusiva, financiada pelo MEC. A especializacao lato sensu e um curso de pos-graduacao regular, sem necessidade de dedicacao exclusiva.' }
    ],
    ctaTitle: 'Faca sua especializacao em Saude com desconto',
    ctaText: 'Compare as melhores universidades com bolsas de ate 50%.',
    sidebarLinks: [
      { name: 'MBA em Saude', href: '../pos-graduacao/mba/mba-saude/index.html' },
      { name: 'Especializacao em Gestao Hospitalar', href: '../pos-graduacao/mba/mba-saude-gestao-hospitalar/index.html' },
      { name: 'Residencia Medica', href: '../pos-graduacao/especializacao/especializacao-residencia-medica/index.html' }
    ]
  },

];

// ─── WRITE FILES ──────────────────────────────────────────────────────────────

let count = 0;

for (const course of COURSES) {
  for (const filePath of course.files) {
    const fullPath = path.join(root, filePath);
    const depth = filePath.split('/').length - 1;
    const isDepth3 = depth === 3;

    let prefix = course.prefix4;
    if (isDepth3 && course.prefix3) prefix = course.prefix3;

    // Breadcrumbs: for depth-3 files, adjust href levels
    let breadcrumbs = course.breadcrumbs4;
    if (isDepth3 && course.breadcrumbs3) breadcrumbs = course.breadcrumbs3;

    const html = page({
      ...course,
      prefix,
      breadcrumbs
    });

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, html, 'utf-8');
    console.log('✓', filePath);
    count++;
  }
}

console.log(`\n✅ ${count} paginas escritas`);
