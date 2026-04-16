#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

let fixed = 0;
let created = 0;
let errors = 0;

function getAllHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) files.push(...getAllHtmlFiles(fullPath));
    else if (item.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

// ═══════════════════════════════════════════════════
// PASSO 1: Remover type="module" de TODOS os arquivos
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 1: Removendo type="module" de components-loader.js...');
const allFiles = getAllHtmlFiles(path.join(projectRoot, 'pages'));

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;
  // Remove type="module" especificamente do script do components-loader
  content = content.replace(
    /<script\s+type="module"\s+src="([^"]*components-loader\.js)"/g,
    '<script src="$1"'
  );
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fixed++;
    console.log(`  ✓ ${path.relative(projectRoot, filePath)}`);
  }
}
console.log(`  Total: ${fixed} arquivos corrigidos`);

// ═══════════════════════════════════════════════════
// PASSO 2: Corrigir path prefix de arquivos .html com depth errado
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 2: Corrigindo path prefix de arquivos com depth errado...');

// Arquivos .html (não index.html em pasta) estão em pages/X/Y/arquivo.html = depth 3
// Mas foram copiados de pages/X/Y/Z/index.html = depth 4 (com ../../../../)
// Precisa trocar ../../../../ por ../../../
const filesToFix3to2 = [
  'pages/graduacao/negocios/ciencias-contabeis.html',
  'pages/graduacao/negocios/gestao-rh.html',
  'pages/graduacao/negocios/logistica.html',
  'pages/graduacao/negocios/marketing.html',
  'pages/graduacao/saude/educacao-fisica.html',
  'pages/graduacao/saude/medicina.html',
  'pages/graduacao/saude/odontologia.html',
];

// Este está em pages/pos-graduacao/pos-direito.html = depth 2, mas tem ../../../ (depth 3)
// Precisa trocar ../../../ por ../../
const filesToFix2to1 = [
  'pages/pos-graduacao/pos-direito.html',
];

// Este está em pages/graduacao/administracao/index.html = depth 3, mas tem ../../../../ (depth 4)
// Precisa trocar ../../../../ por ../../../
const filesToFix4to3 = [
  'pages/graduacao/administracao/index.html',
];

function fixPathPrefix(relFile, fromPrefix, toPrefix) {
  const fullPath = path.join(projectRoot, relFile);
  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠️  Não encontrado: ${relFile}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;
  // Substitui todas ocorrências do prefixo (em assets e links internos)
  content = content.replaceAll(fromPrefix, toPrefix);
  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    fixed++;
    console.log(`  ✓ ${relFile}: ${fromPrefix} → ${toPrefix}`);
  } else {
    console.log(`  ⚠️  Nada mudou em ${relFile} (prefixo "${fromPrefix}" não encontrado)`);
  }
}

for (const f of filesToFix3to2) fixPathPrefix(f, '../../../../', '../../../');
for (const f of filesToFix2to1) fixPathPrefix(f, '../../../', '../../');
for (const f of filesToFix4to3) fixPathPrefix(f, '../../../../', '../../../');

// ═══════════════════════════════════════════════════
// PASSO 3: Criar páginas faltantes como pastas/index.html
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 3: Criando páginas faltantes (pastas com index.html)...');

// Cursos que são referenciados como /curso/ mas só existem como curso.html
// Precisamos criar pasta/index.html copiando de .html
const htmlToPasta = [
  // pages/graduacao/saude/enfermagem.html → pages/graduacao/saude/enfermagem/index.html
  { src: 'pages/graduacao/saude/enfermagem.html', dst: 'pages/graduacao/saude/enfermagem/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
  { src: 'pages/graduacao/saude/farmacia.html', dst: 'pages/graduacao/saude/farmacia/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
  { src: 'pages/graduacao/saude/nutricao.html', dst: 'pages/graduacao/saude/nutricao/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
  { src: 'pages/graduacao/saude/psicologia.html', dst: 'pages/graduacao/saude/psicologia/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
  { src: 'pages/graduacao/tecnologia/analise-desenvolvimento-sistemas.html', dst: 'pages/graduacao/tecnologia/analise-desenvolvimento-sistemas/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
  { src: 'pages/graduacao/engenharia/engenharia-civil.html', dst: 'pages/graduacao/engenharia/engenharia-civil/index.html', fromPrefix: '../../../', toPrefix: '../../../../' },
];

for (const { src, dst, fromPrefix, toPrefix } of htmlToPasta) {
  const srcPath = path.join(projectRoot, src);
  const dstPath = path.join(projectRoot, dst);

  if (!fs.existsSync(srcPath)) {
    console.log(`  ⚠️  Fonte não existe: ${src}`);
    continue;
  }

  // Cria diretório se necessário
  fs.mkdirSync(path.dirname(dstPath), { recursive: true });

  let content = fs.readFileSync(srcPath, 'utf-8');
  // Ajusta o prefix para a profundidade da pasta
  content = content.replaceAll(fromPrefix, toPrefix);

  fs.writeFileSync(dstPath, content, 'utf-8');
  created++;
  console.log(`  ✓ Criado: ${dst}`);
}

// ═══════════════════════════════════════════════════
// PASSO 4: Criar páginas completamente faltantes
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 4: Criando páginas completamente novas que não existem...');

const template = fs.readFileSync(path.join(projectRoot, 'templates/course-page-template.html'), 'utf-8');

function generatePageHTML(courseName, relativePath) {
  const slashCount = (relativePath.match(/\//g) || []).length;
  const depth = slashCount + 1;
  const prefix = '../'.repeat(depth);

  return template
    .replaceAll('NOME_DO_CURSO', courseName)
    .replaceAll('CAMINHO_CANÔNICO', relativePath)
    .replaceAll('../../../../', prefix);
}

// Remove type="module" do template se necessário (será aplicado depois)
function removeModule(html) {
  return html.replace(
    /<script\s+type="module"\s+src="([^"]*components-loader\.js)"/g,
    '<script src="$1"'
  );
}

const newPages = [
  // Páginas faltantes para links de universidades
  { dir: 'pages/graduacao/saude/quanto-ganha-medico', name: 'Quanto Ganha um Médico' },
  { dir: 'pages/carreiras/salarios/quanto-ganha-medico', name: 'Quanto Ganha um Médico' },
];

// Criar apenas o que não existe ainda
for (const { dir, name } of newPages) {
  const fullPath = path.join(projectRoot, dir);
  const indexPath = path.join(fullPath, 'index.html');

  if (fs.existsSync(indexPath)) {
    console.log(`  ⊘ Já existe: ${dir}/index.html`);
    continue;
  }

  fs.mkdirSync(fullPath, { recursive: true });
  let html = generatePageHTML(name, dir);
  html = removeModule(html);
  fs.writeFileSync(indexPath, html, 'utf-8');
  created++;
  console.log(`  ✓ Criado: ${dir}/index.html`);
}

// ═══════════════════════════════════════════════════
// PASSO 5: Corrigir links errados em páginas de universidades
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 5: Corrigindo links errados nas páginas de universidades...');

// Problema: universidades usam ../../pages/... mas estão em pages/universidades/
// ../../pages/ resolve para pages/pages/ que não existe
// Precisa ser ../  + caminho relativo
const uniFiles = [
  'pages/universidades/anhanguera.html',
  'pages/universidades/unime.html',
  'pages/universidades/unopar.html',
];

for (const relFile of uniFiles) {
  const fullPath = path.join(projectRoot, relFile);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // ../../pages/graduacao/... → ../graduacao/...
  content = content.replaceAll('../../pages/graduacao/', '../graduacao/');
  content = content.replaceAll('../../pages/pos-graduacao/', '../pos-graduacao/');
  content = content.replaceAll('../../pages/universidades/', '../');
  content = content.replaceAll('../../universidades/', './');

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    fixed++;
    console.log(`  ✓ ${relFile}`);
  }
}

// Corrigir pages/universidades/anhanguera.html: href="../../universidades/"
// e páginas individuais de uni que usam href="../../universidades/"
const uniWithBadBack = [
  'pages/universidades/anhanguera.html',
  'pages/universidades/unime.html',
  'pages/universidades/unopar.html',
  'pages/universidades/ampli.html',
  'pages/universidades/pitagoras.html',
  'pages/universidades/unic.html',
  'pages/universidades/uniderp.html',
];

for (const relFile of uniWithBadBack) {
  const fullPath = path.join(projectRoot, relFile);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // Links de cursos como .html simples que devem apontar para pasta/index.html
  // ../graduacao/tecnologia/seguranca-informacao.html → ../graduacao/tecnologia/seguranca-informacao/index.html
  content = content.replace(/href="(\.\.\/graduacao\/[^"]+)\.html"/g, (match, p1) => {
    const targetFolder = path.join(projectRoot, 'pages', p1.replace('../', '') + '/index.html');
    if (fs.existsSync(targetFolder)) {
      return `href="${p1}/index.html"`;
    }
    return match; // mantém se a pasta não existir
  });

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    fixed++;
    console.log(`  ✓ ${relFile} (links .html → /index.html)`);
  }
}

// ═══════════════════════════════════════════════════
// PASSO 6: Corrigir pos-graduacao/direito/index.html: href="../../index.html"
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 6: Corrigindo pos-graduacao/direito/index.html...');
{
  const filePath = path.join(projectRoot, 'pages/pos-graduacao/direito/index.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;
    // pages/pos-graduacao/direito/index.html está em depth 3, prefix deve ser ../../../
    // Mas ../../index.html aponta para pages/index.html que não existe
    // Home é ../../index.html → ../../.. = raiz OK?
    // depth 3 = ../../../ → raiz → index.html OK
    // O problema: o link ../../index.html vai 2 níveis = pages/, não raiz
    content = content.replaceAll('href="../../index.html"', 'href="../../../index.html"');
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      fixed++;
      console.log('  ✓ pos-graduacao/direito/index.html corrigido');
    }
  }
}

// ═══════════════════════════════════════════════════
// PASSO 7: Corrigir carreiras/salarios/ → href="../" quebrado
// ═══════════════════════════════════════════════════
console.log('\n🔧 PASSO 7: Verificando pages/carreiras/ ...');
{
  // pages/carreiras/ não existe como index.html
  const carreirasIndex = path.join(projectRoot, 'pages/carreiras/index.html');
  if (!fs.existsSync(carreirasIndex)) {
    // Criar uma página de categoria simples
    const carreirasDir = path.join(projectRoot, 'pages/carreiras');
    fs.mkdirSync(carreirasDir, { recursive: true });

    let html = generatePageHTML('Carreiras', 'pages/carreiras');
    html = removeModule(html);
    fs.writeFileSync(carreirasIndex, html, 'utf-8');
    created++;
    console.log('  ✓ Criado: pages/carreiras/index.html');
  } else {
    console.log('  ⊘ pages/carreiras/index.html já existe');
  }
}

console.log('\n════════════════════════════════════════════');
console.log(`✅ Concluído!`);
console.log(`   ${fixed} arquivos corrigidos`);
console.log(`   ${created} páginas criadas`);
console.log(`   ${errors} erros`);
