#!/usr/bin/env node
// Corrige todos os links quebrados identificados no audit

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

function fix(filePath, replacements) {
  const fullPath = path.join(root, filePath);
  if (!fs.existsSync(fullPath)) { console.log('SKIP (nao existe):', filePath); return; }
  let html = fs.readFileSync(fullPath, 'utf-8');
  const original = html;
  for (const [from, to] of replacements) {
    html = html.split(from).join(to);
  }
  if (html !== original) {
    fs.writeFileSync(fullPath, html, 'utf-8');
    console.log('✓', filePath);
  } else {
    console.log('~ sem mudanca:', filePath);
  }
}

// ── 1. Depth-3 alias files em negocios/ (foram escritas com prefix4 errado) ──
// ciencias-contabeis.html, gestao-rh.html, logistica.html, marketing.html, educacao-fisica.html
// estao em pages/graduacao/negocios/ (depth 3) mas receberam prefix4 (../../../../)
// Correto: prefix3 = ../../../
// Tambem as sidebar links estao com "../X/index.html" que de depth-3 aponta para graduacao/X/

const negociosDepth3 = [
  'pages/graduacao/negocios/ciencias-contabeis.html',
  'pages/graduacao/negocios/gestao-rh.html',
  'pages/graduacao/negocios/logistica.html',
  'pages/graduacao/negocios/marketing.html',
];

for (const f of negociosDepth3) {
  fix(f, [
    // prefix4 → prefix3
    ['href="../../../../assets/', 'href="../../../assets/'],
    ['href="../../../../pages/universidades/', 'href="../../universidades/'],
    ['href="../../../../index.html"', 'href="../../../index.html"'],
    // breadcrumb Graduacao: ../../index.html from depth-3 = pages/index.html (wrong)
    // from negocios/X.html, graduacao index is ../index.html
    ['href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao',
     'href="../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao'],
    // sidebar links: ../X/index.html from depth-3 = graduacao/X/index.html (wrong, that folder doesn't exist)
    // these should point to sibling folders inside negocios/
    ['href="../ciencias-contabeis/index.html"', 'href="ciencias-contabeis/index.html"'],
    ['href="../gestao-recursos-humanos/index.html"', 'href="gestao-recursos-humanos/index.html"'],
    ['href="../logistica/index.html"', 'href="logistica/index.html"'],
    ['href="../marketing/index.html"', 'href="marketing/index.html"'],
    ['href="../administracao/index.html"', 'href="administracao/index.html"'],
  ]);
}

// educacao-fisica.html is in pages/graduacao/saude/ (depth 3)
fix('pages/graduacao/saude/educacao-fisica.html', [
  ['href="../../../../assets/', 'href="../../../assets/'],
  ['href="../../../../pages/universidades/', 'href="../../universidades/'],
  ['href="../../../../index.html"', 'href="../../../index.html"'],
  ['href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao',
   'href="../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao'],
  // sidebar: from saude/ these are siblings
  ['href="../enfermagem/index.html"', 'href="enfermagem/index.html"'],
  ['href="../nutricao/index.html"', 'href="nutricao/index.html"'],
  ['href="../psicologia/index.html"', 'href="psicologia/index.html"'],
]);

// ── 2. medicina.html and odontologia.html in pages/graduacao/saude/ (depth 3) ──
fix('pages/graduacao/saude/medicina.html', [
  // breadcrumb Graduacao: should be ../index.html not ../../index.html
  ['href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao',
   'href="../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao'],
  // sidebar siblings: ../enfermagem → enfermagem/
  ['href="../enfermagem/index.html"', 'href="enfermagem/index.html"'],
  ['href="../medicina-vs-enfermagem/index.html"', 'href="medicina-vs-enfermagem/index.html"'],
  // residencia medica link: ../../../../pages/pos-graduacao/especializacao/residencia-medica/
  // from pages/graduacao/saude/ = ../../pos-graduacao/especializacao/residencia-medica/
  ['href="../../../../pages/pos-graduacao/especializacao/residencia-medica/index.html"',
   'href="../../pos-graduacao/especializacao/residencia-medica/index.html"'],
]);

fix('pages/graduacao/saude/odontologia.html', [
  ['href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao',
   'href="../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao'],
  // sidebar: siblings in saude/
  ['href="../medicina/index.html"', 'href="medicina/index.html"'],
  ['href="../farmacia/index.html"', 'href="farmacia/index.html"'],
  // unime.html link: ../../../../pages/universidades/unime.html from depth-3 = bad
  // from pages/graduacao/saude/: universidades is ../../universidades/
  ['href="../../../../pages/universidades/unime.html"', 'href="../../universidades/unime.html"'],
]);

// ── 3. pages/graduacao/administracao/index.html (depth 3, NOT depth 4) ──
// This file is at pages/graduacao/administracao/index.html (3 levels deep)
// But was written with prefix4 (../../../../)
fix('pages/graduacao/administracao/index.html', [
  ['href="../../../../assets/', 'href="../../../assets/'],
  ['href="../../../../pages/universidades/', 'href="../../universidades/'],
  ['href="../../../../index.html"', 'href="../../../index.html"'],
  // breadcrumb Graduacao: from pages/graduacao/administracao/ → ../index.html
  ['href="../../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao',
   'href="../index.html" class="breadcrumb__link" itemprop="item"><span itemprop="name">Graduacao'],
  // sidebar links pointing to siblings inside administracao/
  ['href="../ciencias-contabeis/index.html"', 'href="ciencias-contabeis/index.html"'],
  ['href="../gestao-recursos-humanos/index.html"', 'href="gestao-recursos-humanos/index.html"'],
  ['href="../marketing/index.html"', 'href="marketing/index.html"'],
]);

// ── 4. pages/graduacao/administracao/X/index.html sidebar "Administracao" link ──
// "../administracao/index.html" from pages/graduacao/administracao/X/ = pages/graduacao/administracao/administracao/ (wrong)
// Should be "../../administracao/index.html" → goes up to administracao/
// But actually they want to link to administracao/index.html which IS the parent = ../index.html
for (const sub of ['ciencias-contabeis', 'gestao-recursos-humanos', 'logistica', 'marketing']) {
  fix(`pages/graduacao/administracao/${sub}/index.html`, [
    ['href="../administracao/index.html"', 'href="../index.html"'],
  ]);
}

// ── 5. Especializacao pages: href="../index.html" → pages/pos-graduacao/especializacao/index.html ──
// These pages are at pages/pos-graduacao/especializacao/X/index.html
// "../index.html" resolves to pages/pos-graduacao/especializacao/index.html which doesn't exist
// The pos-graduacao index is at pages/pos-graduacao/index.html = ../../index.html
const especializacoes = [
  'pages/pos-graduacao/especializacao/bim-construcao/index.html',
  'pages/pos-graduacao/especializacao/data-science-ia/index.html',
  'pages/pos-graduacao/especializacao/direito-tributario/index.html',
  'pages/pos-graduacao/especializacao/docencia-ead/index.html',
  'pages/pos-graduacao/especializacao/gestao-pessoas/index.html',
  'pages/pos-graduacao/especializacao/logistica-supply-chain/index.html',
  'pages/pos-graduacao/especializacao/residencia-medica/index.html',
  'pages/pos-graduacao/especializacao/saude/index.html',
];

for (const f of especializacoes) {
  fix(f, [
    // sidebar link "../index.html" from inside especializacao/X/ → goes to especializacao/index.html (doesn't exist)
    // Should go to pos-graduacao/index.html = ../../index.html
    ['"../index.html" class="sidebar-link"', '"../../index.html" class="sidebar-link"'],
  ]);
}

// ── 6. pos-graduacao/direito/index.html bad links ──
fix('pages/pos-graduacao/direito/index.html', [
  // ../../especializacao/direito-tributario/ from pages/pos-graduacao/direito/ = pages/especializacao/ (wrong)
  // Should be ../especializacao/direito-tributario/
  ['href="../../especializacao/direito-tributario/index.html"',
   'href="../especializacao/direito-tributario/index.html"'],
  // ../../mba/mba-gestao-empresarial/ → ../mba/mba-gestao-empresarial/
  ['href="../../mba/mba-gestao-empresarial/index.html"',
   'href="../mba/mba-gestao-empresarial/index.html"'],
  // ../../../graduacao/direito/direito.html → ../../graduacao/direito/index.html
  ['href="../../../graduacao/direito/direito.html"',
   'href="../../graduacao/direito/index.html"'],
]);

// ── 7. pos-graduacao/especializacao-saude.html bad links ──
fix('pages/pos-graduacao/especializacao-saude.html', [
  // ../pos-graduacao/especializacao/especializacao-residencia-medica/index.html
  // from pages/pos-graduacao/ this resolves to pages/pos-graduacao/especializacao/... (wrong extra prefix)
  // should be: especializacao/residencia-medica/index.html (relative from pos-graduacao/)
  ['href="../pos-graduacao/especializacao/especializacao-residencia-medica/index.html"',
   'href="especializacao/residencia-medica/index.html"'],
]);

// ── 8. pos-graduacao/pos-direito.html bad links ──
fix('pages/pos-graduacao/pos-direito.html', [
  ['href="../pos-graduacao/especializacao/especializacao-direito-tributario/index.html"',
   'href="especializacao/direito-tributario/index.html"'],
]);

// ── 9. carreiras/salarios/quanto-ganha-medico/index.html sidebar links ──
// "../enfermagem/index.html" → from pages/carreiras/salarios/quanto-ganha-medico/ → pages/carreiras/salarios/enfermagem/ (doesn't exist)
// These pages don't exist, just remove or point to graduacao pages
fix('pages/carreiras/salarios/quanto-ganha-medico/index.html', [
  ['href="../enfermagem/index.html"', 'href="../../../graduacao/saude/enfermagem/index.html"'],
  ['href="../farmacia/index.html"', 'href="../../../graduacao/saude/farmacia/index.html"'],
  ['href="../medicina/index.html"', 'href="../../../graduacao/saude/medicina/index.html"'],
]);

// ── 10. Missing category index pages ──
// pages/graduacao/educacao/index.html, engenharia/index.html, engenharias/index.html,
// humanas/index.html — create simple redirect/stub pages

function createCategoryPage(filePath, title, parentHref, links) {
  const fullPath = path.join(root, filePath);
  if (fs.existsSync(fullPath)) return; // don't overwrite
  const depth = filePath.split('/').length - 1;
  const prefix = '../'.repeat(depth) ;

  const linksHtml = links.map(l => `
        <li><a href="${l.href}" class="sidebar-link" style="font-size:var(--text-base);padding:var(--space-3) 0;border-bottom:1px solid var(--color-border);display:block;">${l.name}</a></li>`).join('');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Hub do Estudante</title>
  <meta name="robots" content="index, follow">
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
  <main class="layout-main container" id="main-content" style="padding-top:var(--space-10);">
    <h1 style="font-size:var(--text-3xl);font-weight:700;margin-bottom:var(--space-6);">${title}</h1>
    <ul style="list-style:none;padding:0;max-width:600px;">${linksHtml}
    </ul>
    <p style="margin-top:var(--space-8);"><a href="${parentHref}" style="color:var(--color-primary);">Ver todos os cursos de graduacao</a></p>
  </main>
  <script src="${prefix}assets/js/components-loader.js"></script>
  <script type="module" src="${prefix}assets/js/main.js"></script>
</body>
</html>`;

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf-8');
  console.log('✓ criado:', filePath);
}

createCategoryPage('pages/graduacao/educacao/index.html', 'Cursos de Educacao', '../index.html', [
  { href: 'pedagogia/index.html', name: 'Pedagogia' },
]);

createCategoryPage('pages/graduacao/engenharia/index.html', 'Cursos de Engenharia', '../index.html', [
  { href: 'arquitetura-urbanismo/index.html', name: 'Arquitetura e Urbanismo' },
  { href: 'engenharia-civil/index.html', name: 'Engenharia Civil' },
  { href: 'engenharia-producao/index.html', name: 'Engenharia de Producao' },
]);

createCategoryPage('pages/graduacao/engenharias/index.html', 'Cursos de Engenharia', '../index.html', [
  { href: 'arquitetura-urbanismo/index.html', name: 'Arquitetura e Urbanismo' },
  { href: 'engenharia-civil/index.html', name: 'Engenharia Civil' },
]);

createCategoryPage('pages/graduacao/humanas/index.html', 'Cursos de Humanas', '../index.html', [
  { href: 'servico-social/index.html', name: 'Servico Social' },
]);

// engenharias: fix engenharia-producao link (doesn't exist in engenharias/)
// arquitetura-urbanismo and engenharia-civil in engenharias/ link to ../engenharia-producao/ which doesn't exist
// Point to engenharia/engenharia-producao/ instead
for (const f of ['pages/graduacao/engenharias/arquitetura-urbanismo/index.html', 'pages/graduacao/engenharias/engenharia-civil/index.html']) {
  fix(f, [
    ['href="../engenharia-producao/index.html"', 'href="../../engenharia/engenharia-producao/index.html"'],
  ]);
}

console.log('\n✅ Correcoes aplicadas');
