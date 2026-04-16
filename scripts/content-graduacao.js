#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function gradPage(name, prefix, canonical, breadcrumbs, quickAnswer, body, faqs, relLinks) {
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
  <title>Curso de ${name}: guia completo 2026, duracao, grade e salario | Hub do Estudante</title>
  <meta name="description" content="Tudo sobre o curso de ${name}: duracao, grade curricular, areas de atuacao, salario e melhores universidades em 2026.">
  <link rel="canonical" href="https://www.melhorescursos.com.br/${canonical}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Curso de ${name}: guia completo 2026">
  <meta property="og:site_name" content="Hub do Estudante">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"Curso de ${name}: guia completo 2026","datePublished":"2026-04-12","dateModified":"2026-04-12","author":{"@type":"Organization","name":"Hub do Estudante"},"publisher":{"@type":"Organization","name":"Hub do Estudante"}}</script>
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
      <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">${breadHtml}</ol>
    </div>
  </nav>
  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge content-type-badge--guide">Guia do Curso</span>
          <span class="badge badge--green">Atualizado 2026</span>
        </div>
        <h1 class="article-hero__title">Curso de ${name}: guia completo 2026, duracao, grade e salario</h1>
        <p class="article-hero__subtitle">Tudo sobre o curso de ${name}: grade curricular, duracao, areas de atuacao, salario e como escolher a melhor universidade.</p>
        <div class="article-hero__byline">
          <span>Por <strong>Redacao Hub do Estudante</strong></span>
          <span>·</span>
          <time datetime="2026-04-12">12 de abril de 2026</time>
          <span>·</span>
          <span>8 min de leitura</span>
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
            <h3 class="affiliate-cta-article__title">Quer estudar ${name} com bolsa de ate 50%?</h3>
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
          <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes sobre ${name}</h2>
          <div class="faq-list">${faqHtml}</div>
        </section>
      </div>
    </article>
    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Estudar ${name} com Desconto</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);">
          <a href="${prefix}pages/universidades/anhanguera.html" class="btn btn--affiliate" rel="noopener sponsored">Anhanguera, ate 50% off</a>
          <a href="${prefix}pages/universidades/unopar.html" class="btn btn--affiliate" rel="noopener sponsored">Unopar, ate 50% off</a>
          <a href="${prefix}pages/universidades/uniderp.html" class="btn btn--affiliate" rel="noopener sponsored">Uniderp, ate 50% off</a>
        </div>
        <p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-top:var(--space-3);text-align:center;">Inscricao gratuita · Sem compromisso</p>
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

const COURSES = [
  // SAUDE
  {
    files: ['pages/graduacao/saude/medicina/index.html', 'pages/graduacao/saude/medicina.html'],
    prefix4: '../../../../', prefix3: '../../../',
    canonical: 'graduacao/saude/medicina/',
    name: 'Medicina',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Saude' },
      { label: 'Medicina' }
    ],
    quickAnswer: 'O curso de <strong>Medicina</strong> tem duracao de <strong>6 anos</strong> (12 semestres). Apos a graduacao, e necessario o registro no CRM e, para especialidades, a Residencia Medica. O salario de um medico generalista varia entre <strong>R$ 8.000 e R$ 20.000</strong> e especialistas podem ganhar mais de R$ 50.000.',
    body: `
        <h2>O que e o curso de Medicina?</h2>
        <p>O curso de Medicina forma medicos generalistas capacitados para diagnosticar, tratar e prevenir doencas em todas as fases da vida humana. Apos a graduacao de 6 anos, o medico pode atuar como clinico geral ou buscar especializacao via Residencia Medica.</p>
        <p>E o curso mais concorrido do Brasil, com relacao candidato/vaga que pode ultrapassar 200:1 nos vestibulares das melhores faculdades publicas.</p>
        <h2>Duracao e estrutura</h2>
        <table>
          <thead><tr><th>Fase</th><th>Periodo</th><th>Conteudo</th></tr></thead>
          <tbody>
            <tr><td>Ciclo Basico</td><td>1 ao 4 semestre</td><td>Anatomia, Fisiologia, Bioquimica, Patologia</td></tr>
            <tr><td>Ciclo Clinico</td><td>5 ao 8 semestre</td><td>Clinica Medica, Cirurgia, Pediatria, Ginecologia</td></tr>
            <tr><td>Internato</td><td>9 ao 12 semestre</td><td>2 anos em hospital universitario, rodizios obrigatorios</td></tr>
          </tbody>
        </table>
        <h2>Grade curricular (principais disciplinas)</h2>
        <ul>
          <li>Anatomia Humana e Histologia</li>
          <li>Fisiologia e Bioquimica</li>
          <li>Microbiologia e Imunologia</li>
          <li>Farmacologia e Terapeutica</li>
          <li>Semiologia Medica</li>
          <li>Clinica Medica: cardiologia, pneumologia, neurologia, nefrologia</li>
          <li>Cirurgia Geral</li>
          <li>Pediatria e Neonatologia</li>
          <li>Ginecologia e Obstetricia</li>
          <li>Psiquiatria</li>
          <li>Medicina de Familia e Comunidade</li>
          <li>Urgencia e Emergencia</li>
        </ul>
        <h2>Salario do medico em 2026</h2>
        <table>
          <thead><tr><th>Perfil</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Medico Residente (bolsa MEC)</td><td>R$ 4.106</td></tr>
            <tr><td>Clinico Geral (inicio)</td><td>R$ 8.000 – R$ 14.000</td></tr>
            <tr><td>Clinico Geral (experiencia)</td><td>R$ 14.000 – R$ 25.000</td></tr>
            <tr><td>Especialista (Cardiologista, Ortopedista)</td><td>R$ 18.000 – R$ 40.000</td></tr>
            <tr><td>Especialista (Dermatologista, Radiologista)</td><td>R$ 25.000 – R$ 60.000+</td></tr>
          </tbody>
        </table>
        <h2>Medicina EAD existe?</h2>
        <p>Nao. O MEC proibe categoricamente o curso de Medicina na modalidade EAD. O curso exige 100% de presencialidade, incluindo o internato em hospital universitario. Desconfie de qualquer oferta de "Medicina EAD".</p>`,
    faqs: [
      { q: 'Quanto custa o curso de Medicina no Brasil?', a: 'Em faculdades privadas, as mensalidades variam entre <strong>R$ 5.000 e R$ 12.000/mes</strong>. Nas universidades publicas (USP, UNICAMP, UFSP), o curso e gratuito via SISU.' },
      { q: 'E possivel fazer Medicina EAD?', a: 'Nao. O MEC proibe o curso de Medicina na modalidade EAD. O curso e 100% presencial por exigencia legal.' },
      { q: 'Qual especialidade medica ganha mais?', a: 'As especialidades com maiores salarios em 2026 sao Dermatologia, Radiologia, Neurocirugia e Cardiologia, com profissionais experientes ganhando entre R$ 30.000 e R$ 80.000.' },
      { q: 'Medicina de 6 anos inclui especializacao?', a: 'Nao. Os 6 anos sao a graduacao basica. A especializacao via Residencia Medica e feita apos a formatura e tem duracao de 2 a 5 anos adicionais.' }
    ],
    relLinks: [
      { href: '../enfermagem/index.html', label: 'Curso de Enfermagem' },
      { href: '../medicina-vs-enfermagem/index.html', label: 'Medicina vs Enfermagem: qual escolher?' },
      { href: '../../../../pages/pos-graduacao/especializacao/residencia-medica/index.html', label: 'Residencia Medica' }
    ]
  },
  {
    files: ['pages/graduacao/saude/odontologia/index.html', 'pages/graduacao/saude/odontologia.html'],
    prefix4: '../../../../', prefix3: '../../../',
    canonical: 'graduacao/saude/odontologia/',
    name: 'Odontologia',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Saude' },
      { label: 'Odontologia' }
    ],
    quickAnswer: 'O curso de <strong>Odontologia</strong> tem duracao de <strong>5 anos</strong>. O registro no CRO e obrigatorio para exercer a profissao. O salario de um dentista no Brasil varia entre <strong>R$ 4.000 e R$ 15.000</strong>, podendo ultrapassar R$ 30.000 em especializacoes como implantodontia e ortodontia.',
    body: `
        <h2>O que faz um dentista?</h2>
        <p>O cirurgiao-dentista e o profissional de saude responsavel pelo diagnostico, prevencao e tratamento de doencas bucais, maxilofaciais e estruturas adjacentes. Alem da clinica odontologica, pode atuar em saude publica, pesquisa, docencia e industria odontologica.</p>
        <h2>Duracao e grade curricular</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th></tr></thead>
          <tbody>
            <tr><td>Presencial</td><td>5 anos (10 semestres)</td></tr>
            <tr><td>EAD</td><td>Nao permitido pelo MEC</td></tr>
          </tbody>
        </table>
        <ul>
          <li>Anatomia e Fisiologia Oral</li>
          <li>Dentistica e Materiais Dentarios</li>
          <li>Endodontia (tratamento de canal)</li>
          <li>Periodontia (gengiva)</li>
          <li>Cirurgia Oral e Maxilofacial</li>
          <li>Ortodontia e Ortopedia Facial</li>
          <li>Implantodontia</li>
          <li>Odontopediatria</li>
          <li>Protese Dentaria</li>
          <li>Saude Coletiva e Epidemiologia Bucal</li>
        </ul>
        <h2>Especializacoes mais valorizadas</h2>
        <table>
          <thead><tr><th>Especialidade</th><th>Duracao</th><th>Incremento salarial</th></tr></thead>
          <tbody>
            <tr><td>Implantodontia</td><td>2 anos</td><td>Alto</td></tr>
            <tr><td>Ortodontia</td><td>2 a 3 anos</td><td>Alto</td></tr>
            <tr><td>Protese sobre implante</td><td>2 anos</td><td>Alto</td></tr>
            <tr><td>Endodontia</td><td>2 anos</td><td>Medio-alto</td></tr>
            <tr><td>Odontologia Estetica</td><td>2 anos</td><td>Alto</td></tr>
          </tbody>
        </table>
        <h2>Salario do dentista em 2026</h2>
        <table>
          <thead><tr><th>Perfil</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Recem-formado</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Clinico Geral com experiencia</td><td>R$ 6.000 – R$ 12.000</td></tr>
            <tr><td>Especialista (implante, ortodontia)</td><td>R$ 12.000 – R$ 30.000</td></tr>
            <tr><td>Dentista do Setor Publico</td><td>R$ 5.000 – R$ 12.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Quanto tempo dura o curso de Odontologia?', a: 'O curso de Odontologia tem duracao minima de <strong>5 anos</strong> (10 semestres), com carga horaria de pelo menos 4.000 horas.' },
      { q: 'Odontologia pode ser feita EAD?', a: 'Nao. Assim como Medicina, o MEC nao permite o curso de Odontologia na modalidade EAD. O curso e 100% presencial.' },
      { q: 'Vale a pena abrir clinica odontologica propria?', a: 'Sim, e um caminho muito comum. Dentistas autonomos com clinica propria ou participacao em franquias odontologicas (Odonto Excellence, OdontoCompany) costumam ter rendimentos superiores ao emprego.' }
    ],
    relLinks: [
      { href: '../medicina/index.html', label: 'Curso de Medicina' },
      { href: '../farmacia/index.html', label: 'Curso de Farmacia' },
      { href: '../../../../pages/universidades/unime.html', label: 'UNIME' }
    ]
  },
  {
    files: ['pages/graduacao/saude/medicina-veterinaria/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/saude/medicina-veterinaria/',
    name: 'Medicina Veterinaria',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Saude' },
      { label: 'Medicina Veterinaria' }
    ],
    quickAnswer: 'O curso de <strong>Medicina Veterinaria</strong> tem duracao de <strong>5 anos</strong>. O CRMV e obrigatorio para exercer a profissao. O mercado e amplo: pets, producao animal, saude publica e industria. Salarios variam entre <strong>R$ 3.500 e R$ 12.000</strong>, com especializacoes chegando a mais.',
    body: `
        <h2>O que faz um medico veterinario?</h2>
        <p>O medico veterinario atua na saude animal, abrangendo clinica de pequenos animais (pets), grandes animais (bovinos, equinos), producao animal, inspecao de alimentos, saude publica e pesquisa. E uma profissao com mercado diversificado e em expansao, impulsionada pelo crescimento do mercado pet brasileiro.</p>
        <h2>Duracao e areas de atuacao</h2>
        <table>
          <thead><tr><th>Area</th><th>Exemplos de atuacao</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Clinica de Pequenos Animais</td><td>Consultório, clinica, hospital veterinario</td><td>R$ 4.000 – R$ 12.000</td></tr>
            <tr><td>Grandes Animais (Bovinocultura)</td><td>Fazendas, cooperativas</td><td>R$ 4.500 – R$ 10.000</td></tr>
            <tr><td>Inspecao de Alimentos</td><td>Frigorifico, laticinios, MAPA</td><td>R$ 5.000 – R$ 12.000</td></tr>
            <tr><td>Saude Publica</td><td>Vigilancia sanitaria, zoonoses</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Industria</td><td>Racao, farmaceutica veterinaria</td><td>R$ 5.000 – R$ 12.000</td></tr>
          </tbody>
        </table>
        <h2>Grade curricular</h2>
        <ul>
          <li>Anatomia e Fisiologia Animal</li>
          <li>Microbiologia e Parasitologia</li>
          <li>Farmacologia Veterinaria</li>
          <li>Clinica de Pequenos e Grandes Animais</li>
          <li>Cirurgia Veterinaria</li>
          <li>Reproducao e Obstetricia Animal</li>
          <li>Inspecao e Tecnologia de Alimentos de Origem Animal</li>
          <li>Epidemiologia e Saude Publica Veterinaria</li>
          <li>Nutricao Animal</li>
          <li>Estagio Supervisionado</li>
        </ul>`,
    faqs: [
      { q: 'Medicina Veterinaria pode ser feita EAD?', a: 'Nao. O MEC nao permite Medicina Veterinaria EAD. O curso exige 100% de presencialidade.' },
      { q: 'O mercado pet impactou os salarios dos veterinarios?', a: 'Sim. O Brasil tem mais de 150 milhoes de animais de estimacao e o mercado pet movimentou R$ 68 bilhoes em 2024. Veterinarios especializados em pequenos animais estao entre os mais demandados.' }
    ],
    relLinks: [
      { href: '../medicina/index.html', label: 'Curso de Medicina' },
      { href: '../enfermagem/index.html', label: 'Curso de Enfermagem' },
      { href: '../../../../pages/universidades/uniderp.html', label: 'Uniderp' }
    ]
  },
  {
    files: ['pages/graduacao/saude/medicina-vs-enfermagem/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/saude/medicina-vs-enfermagem/',
    name: 'Medicina vs Enfermagem',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Saude' },
      { label: 'Medicina vs Enfermagem' }
    ],
    quickAnswer: '<strong>Medicina</strong> dura 6 anos, exige CRM e tem maior potencial salarial (R$ 8.000 a R$ 60.000+). <strong>Enfermagem</strong> dura 4 anos, exige COFEN e tem mais vagas no mercado (R$ 3.500 a R$ 9.000). A escolha depende de vocacao, tempo e investimento disponivel.',
    body: `
        <h2>Comparativo geral</h2>
        <table>
          <thead><tr><th>Criterio</th><th>Medicina</th><th>Enfermagem</th></tr></thead>
          <tbody>
            <tr><td>Duracao</td><td>6 anos</td><td>4 anos</td></tr>
            <tr><td>Modalidade</td><td>Somente presencial</td><td>Presencial e EAD</td></tr>
            <tr><td>Custo medio (privada)</td><td>R$ 5.000 – R$ 12.000/mes</td><td>R$ 250 – R$ 900/mes (EAD)</td></tr>
            <tr><td>Conselho profissional</td><td>CRM</td><td>COFEN/COREN</td></tr>
            <tr><td>Residencia obrigatoria?</td><td>Nao, mas recomendada</td><td>Nao aplicavel</td></tr>
            <tr><td>Salario inicial</td><td>R$ 8.000 – R$ 14.000</td><td>R$ 3.000 – R$ 4.500</td></tr>
            <tr><td>Salario senior</td><td>R$ 18.000 – R$ 60.000+</td><td>R$ 6.000 – R$ 10.000</td></tr>
          </tbody>
        </table>
        <h2>Quando escolher Medicina?</h2>
        <ul>
          <li>Voce tem vocacao para diagnostico e tratamento clinico ou cirurgico</li>
          <li>Tem disponibilidade para 6 anos de graduacao mais residencia</li>
          <li>Tem condicoes de pagar ou conseguir bolsa para mensalidades altas (ou passar em publica)</li>
          <li>Deseja a maior autonomia clinica possivel no sistema de saude</li>
        </ul>
        <h2>Quando escolher Enfermagem?</h2>
        <ul>
          <li>Voce se identifica com cuidado direto ao paciente e gestao de equipes de saude</li>
          <li>Busca uma formacao mais curta com entrada rapida no mercado</li>
          <li>Quer a opcao de estudar EAD com menor custo</li>
          <li>Tem interesse em saude publica, gestao hospitalar ou home care</li>
        </ul>
        <h2>As duas carreiras se complementam</h2>
        <p>Medicos e enfermeiros trabalham juntos no mesmo ambiente. O enfermeiro e o profissional de saude que passa mais tempo com o paciente. A decisao entre os dois cursos deve ser baseada em vocacao, objetivos de carreira e contexto financeiro, nao apenas no salario.</p>`,
    faqs: [
      { q: 'Enfermeiro pode fazer o que so medico faz?', a: 'Nao. Diagnostico e prescricao medica sao exclusivos do medico. O enfermeiro tem suas proprias atribuicoes legais definidas pela Lei do Exercicio Profissional de Enfermagem.' },
      { q: 'Enfermeiro pode se tornar medico?', a: 'Pode fazer o vestibular de Medicina normalmente, mas precisa cursar os 6 anos do zero. As disciplinas nao sao aproveitadas automaticamente.' }
    ],
    relLinks: [
      { href: '../medicina/index.html', label: 'Curso de Medicina' },
      { href: '../enfermagem/index.html', label: 'Curso de Enfermagem' },
      { href: '../psicologia/index.html', label: 'Curso de Psicologia' }
    ]
  },
  // TECNOLOGIA
  {
    files: ['pages/graduacao/tecnologia/ciencia-da-computacao/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/tecnologia/ciencia-da-computacao/',
    name: 'Ciencia da Computacao',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Tecnologia' },
      { label: 'Ciencia da Computacao' }
    ],
    quickAnswer: 'O curso de <strong>Ciencia da Computacao</strong> tem duracao de <strong>4 anos</strong>. E o mais teorico e completo da area de TI, formando profissionais para desenvolver software, algoritmos, IA e sistemas complexos. Salarios variam entre <strong>R$ 6.000 e R$ 25.000</strong>.',
    body: `
        <h2>O que e Ciencia da Computacao?</h2>
        <p>Ciencia da Computacao e o curso mais teorico e abrangente da area de TI. Foca nos fundamentos matematicos e logicos da computacao, capacitando o profissional a criar solucoes inovadoras, nao apenas usar tecnologias existentes. E a base para carreitas em IA, criptografia, sistemas operacionais, compiladores e pesquisa tecnologica.</p>
        <h2>Diferenca entre CC, Sistemas de Informacao e ADS</h2>
        <table>
          <thead><tr><th>Curso</th><th>Foco</th><th>Duracao</th></tr></thead>
          <tbody>
            <tr><td>Ciencia da Computacao</td><td>Fundamentos teoricos, algoritmos, IA</td><td>4 anos (bacharelado)</td></tr>
            <tr><td>Sistemas de Informacao</td><td>TI nas organizacoes, gestao e sistemas</td><td>4 anos (bacharelado)</td></tr>
            <tr><td>Analise e Des. de Sistemas</td><td>Desenvolvimento pratico de software</td><td>2,5 a 3 anos (tecnologo)</td></tr>
          </tbody>
        </table>
        <h2>Grade curricular</h2>
        <ul>
          <li>Algoritmos e Estruturas de Dados</li>
          <li>Calculo, Algebra Linear e Probabilidade</li>
          <li>Logica de Programacao (C, Python, Java)</li>
          <li>Teoria da Computacao e Linguagens Formais</li>
          <li>Sistemas Operacionais</li>
          <li>Redes de Computadores</li>
          <li>Banco de Dados</li>
          <li>Inteligencia Artificial e Machine Learning</li>
          <li>Engenharia de Software</li>
          <li>Seguranca da Informacao</li>
          <li>Computacao Grafica</li>
          <li>TCC</li>
        </ul>
        <h2>Salarios em TI (2026)</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Dev Junior</td><td>R$ 3.000 – R$ 5.500</td></tr>
            <tr><td>Dev Pleno</td><td>R$ 6.000 – R$ 11.000</td></tr>
            <tr><td>Dev Senior</td><td>R$ 11.000 – R$ 20.000</td></tr>
            <tr><td>Cientista de Dados</td><td>R$ 8.000 – R$ 18.000</td></tr>
            <tr><td>Engenheiro de IA</td><td>R$ 14.000 – R$ 28.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Ciencia da Computacao e melhor que Sistemas de Informacao?', a: 'Depende do objetivo. CC e mais teorica e indicada para quem quer pesquisa, IA e desenvolvimento de linguagens. SI e mais pratica para quem quer TI nas empresas. Ambas abrem as mesmas portas no mercado.' },
      { q: 'Ciencia da Computacao pode ser feita EAD?', a: 'Sim. Diferentemente de Medicina e Engenharia Civil, CC pode ser cursada EAD. Ha opcoes de qualidade nas principais redes.' }
    ],
    relLinks: [
      { href: '../sistemas-informacao/index.html', label: 'Sistemas de Informacao' },
      { href: '../engenharia-de-software/index.html', label: 'Engenharia de Software' },
      { href: '../seguranca-informacao/index.html', label: 'Seguranca da Informacao' }
    ]
  },
  {
    files: ['pages/graduacao/tecnologia/engenharia-de-software/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/tecnologia/engenharia-de-software/',
    name: 'Engenharia de Software',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Tecnologia' },
      { label: 'Engenharia de Software' }
    ],
    quickAnswer: 'O curso de <strong>Engenharia de Software</strong> tem duracao de <strong>4 anos</strong>. Combina fundamentos de TI com metodologias de desenvolvimento, qualidade de software e gestao de projetos. Salarios variam entre <strong>R$ 5.000 e R$ 22.000</strong>.',
    body: `
        <h2>O que e Engenharia de Software?</h2>
        <p>Engenharia de Software e um curso de bacharelado que forma profissionais para desenvolver sistemas de software com qualidade, eficiencia e manutenibilidade. Diferencia-se da Ciencia da Computacao por ser mais voltado para a pratica de desenvolvimento e gerenciamento de projetos de software.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Programacao Orientada a Objetos (Java, Python, C++)</li>
          <li>Engenharia de Requisitos</li>
          <li>Arquitetura de Software e Padroes de Projeto</li>
          <li>Metodologias Ageis: Scrum, XP, Kanban</li>
          <li>Testes de Software e Quality Assurance</li>
          <li>DevOps e Integracao Continua (CI/CD)</li>
          <li>Banco de Dados Relacionais e Nao-Relacionais</li>
          <li>Computacao em Nuvem (AWS, Azure, GCP)</li>
          <li>Seguranca em Aplicacoes</li>
          <li>Gerencia de Configuracao e Versionamento (Git)</li>
        </ul>
        <h2>Salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Desenvolvedor Junior</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Desenvolvedor Pleno</td><td>R$ 7.000 – R$ 12.000</td></tr>
            <tr><td>Desenvolvedor Senior</td><td>R$ 12.000 – R$ 22.000</td></tr>
            <tr><td>Tech Lead</td><td>R$ 14.000 – R$ 22.000</td></tr>
            <tr><td>QA Engineer Senior</td><td>R$ 8.000 – R$ 14.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Engenharia de Software e a mesma coisa que Ciencia da Computacao?', a: 'Nao. ES e mais pratica, focada no processo de desenvolvimento. CC e mais teorica, com base em matematica e algoritmos. As duas formam bons desenvolvedores.' },
      { q: 'Engenharia de Software pode ser EAD?', a: 'Sim, por ser um bacharelado sem necessidade de laboratorios presenciais obrigatorios, pode ser cursada EAD.' }
    ],
    relLinks: [
      { href: '../ciencia-da-computacao/index.html', label: 'Ciencia da Computacao' },
      { href: '../sistemas-informacao/index.html', label: 'Sistemas de Informacao' },
      { href: '../../../../pages/pos-graduacao/mba/mba-engenharia-software/index.html', label: 'MBA em Engenharia de Software' }
    ]
  },
  {
    files: ['pages/graduacao/tecnologia/seguranca-informacao/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/tecnologia/seguranca-informacao/',
    name: 'Seguranca da Informacao',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Tecnologia' },
      { label: 'Seguranca da Informacao' }
    ],
    quickAnswer: 'O curso de <strong>Seguranca da Informacao</strong> dura entre <strong>2,5 e 4 anos</strong> (tecnologo ou bacharelado). Forma especialistas em ciberseguranca, gestao de riscos e protecao de dados. Com a LGPD e o crescimento dos ataques ciberneticos, e uma das areas com maior demanda no Brasil. Salarios variam entre <strong>R$ 5.000 e R$ 20.000</strong>.',
    body: `
        <h2>Por que Seguranca da Informacao?</h2>
        <p>O Brasil e um dos paises mais atacados por cibercriminosos no mundo. Com a LGPD (Lei Geral de Protecao de Dados) em vigor, empresas de todos os setores precisam de profissionais qualificados em seguranca da informacao. A demanda por especialistas supera a oferta, gerando excelentes oportunidades de carreira.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos de Redes e Criptografia</li>
          <li>Seguranca em Sistemas Operacionais (Linux e Windows)</li>
          <li>Pentest e Ethical Hacking</li>
          <li>Analise de Malware e Forense Digital</li>
          <li>Seguranca em Aplicacoes Web (OWASP Top 10)</li>
          <li>Gestao de Riscos e Frameworks (ISO 27001, NIST)</li>
          <li>LGPD e Privacidade de Dados</li>
          <li>SOC e Resposta a Incidentes</li>
          <li>Seguranca em Cloud</li>
          <li>Governanca de TI (COBIT, ITIL)</li>
        </ul>
        <h2>Certificacoes valorizadas na area</h2>
        <ul>
          <li><strong>CompTIA Security+:</strong> entrada no mercado</li>
          <li><strong>CEH (Certified Ethical Hacker):</strong> pentest</li>
          <li><strong>CISSP:</strong> gestao de seguranca (senior)</li>
          <li><strong>ISO 27001 Lead Implementer/Auditor:</strong> conformidade</li>
          <li><strong>OSCP:</strong> pentest avancado</li>
        </ul>
        <h2>Salarios em Ciberseguranca</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Seguranca Junior</td><td>R$ 4.000 – R$ 7.000</td></tr>
            <tr><td>Analista de Seguranca Pleno</td><td>R$ 7.000 – R$ 12.000</td></tr>
            <tr><td>Especialista em Pentest</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>CISO (Chief Information Security Officer)</td><td>R$ 20.000 – R$ 45.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Preciso saber programar para trabalhar com Seguranca da Informacao?', a: 'Nao e obrigatorio para todas as funcoes, mas ajuda muito. Conhecimento de Python, Bash e Shell script e muito valorizado em pentest e analise de incidentes.' },
      { q: 'Seguranca da Informacao pode ser feita EAD?', a: 'Sim. A maioria dos cursos de tecnologo em SI pode ser cursada EAD, com laboratorios virtuais para as praticas.' }
    ],
    relLinks: [
      { href: '../ciencia-da-computacao/index.html', label: 'Ciencia da Computacao' },
      { href: '../sistemas-informacao/index.html', label: 'Sistemas de Informacao' },
      { href: '../analise-desenvolvimento-sistemas/index.html', label: 'Analise e Desenvolvimento de Sistemas' }
    ]
  },
  {
    files: ['pages/graduacao/tecnologia/sistemas-informacao/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/tecnologia/sistemas-informacao/',
    name: 'Sistemas de Informacao',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Tecnologia' },
      { label: 'Sistemas de Informacao' }
    ],
    quickAnswer: 'O curso de <strong>Sistemas de Informacao</strong> tem duracao de <strong>4 anos</strong>. Combina TI com gestao de negocios, formando profissionais para implantar e gerenciar sistemas em empresas. Salarios variam entre <strong>R$ 4.000 e R$ 16.000</strong>.',
    body: `
        <h2>O que e Sistemas de Informacao?</h2>
        <p>Sistemas de Informacao e um curso de bacharelado que une TI com administracao e negocios. Forma profissionais capazes de analisar processos organizacionais, implementar sistemas ERP, liderar projetos de transformacao digital e atuar como ponte entre a area de TI e as areas de negocios.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Programacao (Python, Java)</li>
          <li>Banco de Dados e SQL</li>
          <li>Analise de Sistemas e UML</li>
          <li>Gestao de Processos de Negocio (BPM)</li>
          <li>Sistemas ERP (SAP, Oracle, TOTVS)</li>
          <li>Gestao de Projetos de TI</li>
          <li>Business Intelligence e Analytics</li>
          <li>Seguranca da Informacao</li>
          <li>Auditoria de Sistemas</li>
          <li>Governanca de TI (ITIL, COBIT)</li>
        </ul>
        <h2>Areas de atuacao</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Analista de Sistemas Junior</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Analista de Sistemas Pleno</td><td>R$ 6.000 – R$ 10.000</td></tr>
            <tr><td>Analista de Negocios (Business Analyst)</td><td>R$ 7.000 – R$ 13.000</td></tr>
            <tr><td>Consultor SAP</td><td>R$ 8.000 – R$ 16.000</td></tr>
            <tr><td>Gerente de TI</td><td>R$ 12.000 – R$ 20.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Qual a diferenca entre Sistemas de Informacao e ADS?', a: 'SI e um bacharelado de 4 anos com visao mais ampla incluindo gestao. ADS e um tecnologo de 2,5 a 3 anos mais pratico e voltado ao desenvolvimento.' },
      { q: 'Sistemas de Informacao pode ser EAD?', a: 'Sim, e um dos cursos de TI com mais opcoes EAD no Brasil.' }
    ],
    relLinks: [
      { href: '../ciencia-da-computacao/index.html', label: 'Ciencia da Computacao' },
      { href: '../analise-desenvolvimento-sistemas/index.html', label: 'ADS' },
      { href: '../engenharia-de-software/index.html', label: 'Engenharia de Software' }
    ]
  },
  // ENGENHARIA
  {
    files: ['pages/graduacao/engenharia/arquitetura-urbanismo/index.html', 'pages/graduacao/engenharias/arquitetura-urbanismo/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/engenharia/arquitetura-urbanismo/',
    name: 'Arquitetura e Urbanismo',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Engenharia' },
      { label: 'Arquitetura e Urbanismo' }
    ],
    quickAnswer: 'O curso de <strong>Arquitetura e Urbanismo</strong> tem duracao de <strong>5 anos</strong>. O registro no CAU e obrigatorio. O arquiteto pode atuar em projetos residenciais, comerciais, urbanismo e interiores. Salarios variam entre <strong>R$ 3.500 e R$ 15.000</strong>.',
    body: `
        <h2>O que faz um arquiteto urbanista?</h2>
        <p>O arquiteto e urbanista e o profissional responsavel pelo projeto, construcao e reforma de edificacoes e espacos urbanos. Combina criatividade, tecnica e conhecimento de normas tecnicas (ABNT, ANVISA, codigo de obras) para criar espacos funcionais, esteticos e seguros.</p>
        <h2>Duracao e grade</h2>
        <table>
          <thead><tr><th>Modalidade</th><th>Duracao</th></tr></thead>
          <tbody>
            <tr><td>Presencial (obrigatorio)</td><td>5 anos (10 semestres)</td></tr>
          </tbody>
        </table>
        <ul>
          <li>Desenho Arquitetonico e Modelagem 3D</li>
          <li>Historia da Arquitetura</li>
          <li>Projeto de Arquitetura I ao VI</li>
          <li>Estruturas para Arquitetura</li>
          <li>Instalacoes Prediais</li>
          <li>Urbanismo e Planejamento Urbano</li>
          <li>Paisagismo e Desenho Urbano</li>
          <li>BIM (Revit, ArchiCAD)</li>
          <li>Conforto Ambiental</li>
          <li>Estagio e TCC</li>
        </ul>
        <h2>Salarios na Arquitetura</h2>
        <table>
          <thead><tr><th>Perfil</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Recem-formado (escritorio)</td><td>R$ 2.500 – R$ 4.500</td></tr>
            <tr><td>Arquiteto com experiencia</td><td>R$ 5.000 – R$ 10.000</td></tr>
            <tr><td>Arquiteto autonomo (projetos)</td><td>R$ 5.000 – R$ 20.000+</td></tr>
            <tr><td>Coordenador de Projetos</td><td>R$ 8.000 – R$ 15.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Arquitetura pode ser EAD?', a: 'Nao. O MEC nao permite Arquitetura e Urbanismo na modalidade EAD. O curso e 100% presencial.' },
      { q: 'Arquiteto precisa do CAU para trabalhar?', a: 'Sim. O registro no CAU (Conselho de Arquitetura e Urbanismo) e obrigatorio para assinar projetos e laudos tecnicos.' }
    ],
    relLinks: [
      { href: '../engenharia-civil/index.html', label: 'Engenharia Civil' },
      { href: '../engenharia-producao/index.html', label: 'Engenharia de Producao' },
      { href: '../../../../pages/pos-graduacao/especializacao/bim-construcao/index.html', label: 'Especializacao em BIM' }
    ]
  },
  {
    files: ['pages/graduacao/engenharia/engenharia-producao/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/engenharia/engenharia-producao/',
    name: 'Engenharia de Producao',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Engenharia' },
      { label: 'Engenharia de Producao' }
    ],
    quickAnswer: 'O curso de <strong>Engenharia de Producao</strong> tem duracao de <strong>5 anos</strong>. E o curso de engenharia mais abrangente, combinando gestao, processos industriais e qualidade. Salarios variam entre <strong>R$ 5.000 e R$ 18.000</strong>.',
    body: `
        <h2>O que e Engenharia de Producao?</h2>
        <p>Engenharia de Producao forma profissionais para otimizar sistemas produtivos, reduzir custos, melhorar qualidade e aumentar a eficiencia em industrias, servicos e logistica. E chamada de "engenharia dos engenheiros" por sua transversalidade.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Calculo, Fisica e Estatistica</li>
          <li>Gestao de Operacoes e Producao</li>
          <li>Planejamento e Controle da Producao (PCP)</li>
          <li>Qualidade e Six Sigma</li>
          <li>Lean Manufacturing e Kaizen</li>
          <li>Logistica e Supply Chain</li>
          <li>Pesquisa Operacional</li>
          <li>Engenharia Economica e Custos</li>
          <li>Gestao de Projetos</li>
          <li>Ergonomia e Seguranca do Trabalho</li>
          <li>Estagio e TCC</li>
        </ul>
        <h2>Salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Engenheiro de Producao Junior</td><td>R$ 4.000 – R$ 7.000</td></tr>
            <tr><td>Engenheiro de Producao Pleno</td><td>R$ 7.000 – R$ 12.000</td></tr>
            <tr><td>Gerente de Producao</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>Consultor Lean/Six Sigma</td><td>R$ 9.000 – R$ 18.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Engenharia de Producao pode ser feita EAD?', a: 'Sim, diferentemente de Engenharia Civil e Mecanica, a Engenharia de Producao pode ser cursada EAD em algumas instituicoes.' },
      { q: 'Engenheiro de Producao precisa de CREA?', a: 'Sim. O registro no CREA e necessario para assinar laudos e projetos tecnicos.' }
    ],
    relLinks: [
      { href: '../engenharia-civil/index.html', label: 'Engenharia Civil' },
      { href: '../arquitetura-urbanismo/index.html', label: 'Arquitetura e Urbanismo' },
      { href: '../../../../pages/graduacao/negocios/logistica/index.html', label: 'Logistica' }
    ]
  },
  {
    files: ['pages/graduacao/engenharia/engenharia-civil/index.html', 'pages/graduacao/engenharias/engenharia-civil/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/engenharia/engenharia-civil/',
    name: 'Engenharia Civil',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Engenharia' },
      { label: 'Engenharia Civil' }
    ],
    quickAnswer: 'O curso de <strong>Engenharia Civil</strong> tem duracao de <strong>5 anos</strong>. Forma engenheiros para projetos estruturais, construcao, infraestrutura e geotecnia. O registro no CREA e obrigatorio. Salarios variam entre <strong>R$ 5.000 e R$ 20.000</strong>.',
    body: `
        <h2>O que faz um engenheiro civil?</h2>
        <p>O engenheiro civil projeta, calcula e supervisiona a construcao de edificacoes, pontes, estradas, barragens, portos e demais obras de infraestrutura. E uma das profissoes mais tradicionais e com maior presenca no mercado de trabalho brasileiro.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Calculo I ao IV e Algebra Linear</li>
          <li>Fisica Geral e Mecanica dos Fluidos</li>
          <li>Resistencia dos Materiais</li>
          <li>Estruturas de Concreto Armado e Protendido</li>
          <li>Estruturas Metalicas e de Madeira</li>
          <li>Geotecnia e Fundacoes</li>
          <li>Hidraulica e Saneamento</li>
          <li>Estradas e Transportes</li>
          <li>Gerenciamento de Obras</li>
          <li>BIM e AutoCAD</li>
          <li>Estagio e TCC</li>
        </ul>
        <h2>Salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Engenheiro Civil Junior</td><td>R$ 4.500 – R$ 7.000</td></tr>
            <tr><td>Engenheiro Civil Pleno</td><td>R$ 7.000 – R$ 12.000</td></tr>
            <tr><td>Gerente de Obras</td><td>R$ 10.000 – R$ 18.000</td></tr>
            <tr><td>Diretor Tecnico</td><td>R$ 18.000 – R$ 35.000</td></tr>
          </tbody>
        </table>`,
    faqs: [
      { q: 'Engenharia Civil pode ser EAD?', a: 'O MEC nao permite Engenharia Civil 100% EAD. Ha cursos semipresenciais autorizados, com aulas praticas e laboratorios presenciais obrigatorios.' },
      { q: 'Engenheiro Civil precisa de CREA para trabalhar?', a: 'Sim. O registro no CREA e obrigatorio para assinar projetos, laudos e ARTs (Anotacoes de Responsabilidade Tecnica).' }
    ],
    relLinks: [
      { href: '../arquitetura-urbanismo/index.html', label: 'Arquitetura e Urbanismo' },
      { href: '../engenharia-producao/index.html', label: 'Engenharia de Producao' },
      { href: '../../../../pages/pos-graduacao/especializacao/bim-construcao/index.html', label: 'Especializacao em BIM' }
    ]
  },
  // EDUCACAO
  {
    files: ['pages/graduacao/educacao/pedagogia/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/educacao/pedagogia/',
    name: 'Pedagogia',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Educacao' },
      { label: 'Pedagogia' }
    ],
    quickAnswer: 'O curso de <strong>Pedagogia</strong> tem duracao de <strong>4 anos</strong>. Forma educadores para atuar na educacao infantil, ensino fundamental I, gestao escolar e educacao corporativa. Disponivel em EAD com excelente custo-beneficio. Salarios variam entre <strong>R$ 2.200 e R$ 7.000</strong>.',
    body: `
        <h2>O que faz um pedagogo?</h2>
        <p>O pedagogo e o profissional habilitado para planejar, executar e avaliar processos educativos em escolas, empresas e instituicoes. Pode atuar como professor na educacao infantil e ensino fundamental I, coordenador pedagogico, diretor escolar ou especialista em treinamento e desenvolvimento (T&D) empresarial.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos da Educacao</li>
          <li>Psicologia da Educacao e do Desenvolvimento</li>
          <li>Didatica e Metodologias de Ensino</li>
          <li>Educacao Infantil</li>
          <li>Alfabetizacao e Letramento</li>
          <li>Educacao Especial e Inclusiva</li>
          <li>Gestao Escolar e Coordenacao Pedagogica</li>
          <li>Educacao de Jovens e Adultos (EJA)</li>
          <li>Tecnologias na Educacao</li>
          <li>Estagio Supervisionado e TCC</li>
        </ul>
        <h2>Areas de atuacao e salarios</h2>
        <table>
          <thead><tr><th>Cargo</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>Professor Educacao Infantil</td><td>R$ 2.200 – R$ 4.000</td></tr>
            <tr><td>Professor Ensino Fundamental I</td><td>R$ 2.500 – R$ 4.500</td></tr>
            <tr><td>Coordenador Pedagogico</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Pedagogo Empresarial (T&D)</td><td>R$ 4.000 – R$ 7.000</td></tr>
            <tr><td>Diretor Escolar</td><td>R$ 5.000 – R$ 9.000</td></tr>
          </tbody>
        </table>
        <h2>Pedagogia EAD vale a pena?</h2>
        <p>Sim. O curso de Pedagogia EAD de instituicao credenciada pelo MEC tem o mesmo valor legal. O estagio supervisionado e realizado presencialmente em escola proxima ao aluno. E uma das melhores opcoes de custo-beneficio no ensino superior brasileiro.</p>`,
    faqs: [
      { q: 'Pedagogia habilita para dar aulas em qual nivel?', a: 'A graduacao em Pedagogia habilita para docencia na <strong>Educacao Infantil e Ensino Fundamental I</strong> (1 ao 5 ano). Para Ensino Fundamental II e Medio, e necessaria licenciatura especifica por disciplina.' },
      { q: 'Pedagogia pode ser feita completamente EAD?', a: 'O curso pode ser EAD, mas exige <strong>estagio supervisionado presencial</strong> em escola proxima ao polo do aluno. Essa e a unica parte presencial obrigatoria.' },
      { q: 'Pedagogo pode trabalhar em empresa?', a: 'Sim. A pedagogia empresarial e uma area em crescimento. Pedagogos atuam em RH, treinamento e desenvolvimento, educacao corporativa e design instrucional.' }
    ],
    relLinks: [
      { href: '../../../../pages/pos-graduacao/especializacao/docencia-ead/index.html', label: 'Especializacao em Docencia EAD' },
      { href: '../../../../pages/pos-graduacao/mba/mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' },
      { href: '../../../../pages/universidades/unime.html', label: 'UNIME' }
    ]
  },
  // HUMANAS
  {
    files: ['pages/graduacao/humanas/servico-social/index.html'],
    prefix4: '../../../../',
    canonical: 'graduacao/humanas/servico-social/',
    name: 'Servico Social',
    breadcrumbs4: [
      { href: '../../../../index.html', label: 'Home' },
      { href: '../../index.html', label: 'Graduacao' },
      { href: '../index.html', label: 'Humanas' },
      { label: 'Servico Social' }
    ],
    quickAnswer: 'O curso de <strong>Servico Social</strong> tem duracao de <strong>4 anos</strong>. Forma assistentes sociais para atuar em saude, educacao, assistencia social e empresas. O registro no CRESS e obrigatorio. Salarios variam entre <strong>R$ 2.500 e R$ 7.000</strong>.',
    body: `
        <h2>O que faz um assistente social?</h2>
        <p>O assistente social e o profissional que trabalha com populacoes em situacao de vulnerabilidade social, garantindo o acesso a direitos e politicas publicas. Atua em hospitais, escolas, CRAS, CREAS, empresas, sindicatos, penitenciarias e organizacoes nao-governamentais.</p>
        <h2>Grade curricular</h2>
        <ul>
          <li>Fundamentos de Servico Social</li>
          <li>Teoria Social e Marxismo</li>
          <li>Politica Social e Seguridade Social</li>
          <li>Direitos Humanos e Cidadania</li>
          <li>Servico Social em Saude</li>
          <li>Servico Social na Educacao</li>
          <li>Assistencia Social e SUAS</li>
          <li>Crianca, Adolescente e Familia (ECA)</li>
          <li>Etica Profissional</li>
          <li>Estagio Supervisionado e TCC</li>
        </ul>
        <h2>Salarios e mercado</h2>
        <table>
          <thead><tr><th>Setor</th><th>Faixa salarial</th></tr></thead>
          <tbody>
            <tr><td>CRAS / CREAS (setor publico)</td><td>R$ 2.500 – R$ 5.000</td></tr>
            <tr><td>Hospitais e UBS</td><td>R$ 3.000 – R$ 5.500</td></tr>
            <tr><td>Empresas (RH/Bem-Estar)</td><td>R$ 3.500 – R$ 6.000</td></tr>
            <tr><td>Concurso Publico (federal)</td><td>R$ 5.000 – R$ 8.000</td></tr>
          </tbody>
        </table>
        <h2>Servico Social EAD</h2>
        <p>O curso de Servico Social pode ser cursado na modalidade EAD com estagio presencial obrigatorio. E uma das opcoes mais acessiveis do ensino superior, com mensalidades a partir de R$ 150 em redes como Anhanguera, Unopar e Uniderp.</p>`,
    faqs: [
      { q: 'Servico Social EAD e reconhecido pelo MEC?', a: 'Sim. O diploma de Servico Social EAD de instituicao credenciada pelo MEC tem o mesmo valor legal. O assistente social pode se registrar no CRESS normalmente.' },
      { q: 'Assistente Social pode trabalhar em empresa privada?', a: 'Sim. Grandes empresas com mais de 300 funcionarios frequentemente tem assistentes sociais no RH para suporte a funcionarios e programas de bem-estar.' }
    ],
    relLinks: [
      { href: '../../../../pages/graduacao/educacao/pedagogia/index.html', label: 'Pedagogia' },
      { href: '../../../../pages/pos-graduacao/mba/mba-gestao-pessoas/index.html', label: 'MBA em Gestao de Pessoas' }
    ]
  }
];

let count = 0;
for (const c of COURSES) {
  const breadcrumbs3 = c.breadcrumbs4.map(b => {
    if (!b.href) return b;
    // Ajusta prefix de ../../../../ para ../../../
    return { ...b, href: b.href.replace('../../../../', '../../../') };
  });

  for (const file of c.files) {
    const isDepth4 = file.endsWith('/index.html') && file.split('/').length === 5;
    const prefix = isDepth4 ? c.prefix4 : (c.prefix3 || c.prefix4);
    const breadcrumbs = isDepth4 ? c.breadcrumbs4 : breadcrumbs3;
    const html = gradPage(c.name, prefix, c.canonical, breadcrumbs, c.quickAnswer, c.body, c.faqs, c.relLinks);
    fs.writeFileSync(path.join(root, file), html, 'utf-8');
    console.log(`✓ ${file}`);
    count++;
  }
}
console.log(`\n✅ ${count} paginas escritas`);
