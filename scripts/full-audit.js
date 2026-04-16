#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const errors = [];
const warnings = [];
const ok = [];

function log(type, msg) {
  if (type === 'error') errors.push(msg);
  else if (type === 'warn') warnings.push(msg);
  else ok.push(msg);
}

// Coleta todos os arquivos HTML
function getAllHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extrai todos os links href internos de um HTML
function extractInternalLinks(html, sourceFile) {
  const links = [];
  const hrefRegex = /href="([^"#?]+)"/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];
    // Pular externos, âncoras, mailto, tel, assets
    if (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto') || href.startsWith('tel')) continue;
    if (href.startsWith('/assets/') || href.includes('.css') || href.includes('.js') || href.includes('.png') || href.includes('.jpg') || href.includes('.svg') || href.includes('.ico') || href.includes('.webp')) continue;
    if (href === '/' || href === '#') continue;
    links.push(href);
  }
  return links;
}

// Resolve um link relativo para path absoluto
function resolveLink(sourceFile, href) {
  const sourceDir = path.dirname(sourceFile);
  const resolved = path.resolve(sourceDir, href);
  return resolved;
}

// Verifica se um link existe
function linkExists(resolved) {
  if (fs.existsSync(resolved)) {
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      return fs.existsSync(path.join(resolved, 'index.html'));
    }
    return true;
  }
  return false;
}

// Verifica se components-loader.js está incluído sem type="module"
function checkComponentsLoader(html, filePath) {
  if (!html.includes('components-loader.js')) {
    return { ok: false, msg: 'Sem components-loader.js' };
  }
  // Verifica se type="module" está especificamente na tag do components-loader
  if (/type="module"[^>]*components-loader\.js|components-loader\.js[^>]*type="module"/.test(html) ||
      /<script\s+type="module"\s+src="[^"]*components-loader\.js"/.test(html)) {
    return { ok: false, msg: 'components-loader.js com type="module" (quebra no file://)' };
  }
  return { ok: true };
}

// Verifica se o path prefix está correto para o arquivo
function checkPathPrefix(html, filePath) {
  // Calcula o path prefix esperado
  const relFromPages = path.relative(path.join(projectRoot, 'pages'), filePath);
  const parts = relFromPages.split(path.sep).filter(p => p && !p.endsWith('.html'));
  const depth = parts.length + 1;
  const expectedPrefix = '../'.repeat(depth);

  // Verifica se o components-loader usa o prefix correto
  const loaderMatch = html.match(/src="(\.\.\/)*assets\/js\/components-loader\.js"/);
  if (!loaderMatch) {
    // Tenta outro padrão
    const loaderMatch2 = html.match(/src="([^"]*components-loader\.js)"/);
    if (loaderMatch2) {
      const actualSrc = loaderMatch2[1];
      const resolvedLoader = path.resolve(path.dirname(filePath), actualSrc);
      if (!fs.existsSync(resolvedLoader)) {
        return { ok: false, msg: `components-loader.js não encontrado: src="${actualSrc}" → ${resolvedLoader}` };
      }
    }
    return { ok: true };
  }

  const actualPrefix = loaderMatch[1] ? loaderMatch[1].repeat(loaderMatch[0].match(/\.\.\//g)?.length || 0) : '';
  // Verifica o src completo
  const srcMatch = html.match(/src="((?:\.\.\/)+)assets\/js\/components-loader\.js"/);
  if (srcMatch) {
    const actualDots = srcMatch[1];
    if (actualDots !== expectedPrefix) {
      return { ok: false, msg: `Path prefix incorreto: tem "${actualDots}" mas deveria ter "${expectedPrefix}" (depth=${depth})` };
    }
  }
  return { ok: true };
}

// MAIN
console.log('🔍 Iniciando auditoria completa...\n');

const allFiles = getAllHtmlFiles(path.join(projectRoot, 'pages'));
console.log(`Total de páginas encontradas: ${allFiles.length}\n`);

for (const filePath of allFiles) {
  const relPath = path.relative(projectRoot, filePath);
  const html = fs.readFileSync(filePath, 'utf-8');

  // 1. Verificar components-loader
  const loaderCheck = checkComponentsLoader(html, filePath);
  if (!loaderCheck.ok) {
    log('error', `[LOADER] ${relPath}: ${loaderCheck.msg}`);
  }

  // 2. Verificar path prefix do components-loader
  const prefixCheck = checkPathPrefix(html, filePath);
  if (!prefixCheck.ok) {
    log('error', `[PREFIX] ${relPath}: ${prefixCheck.msg}`);
  }

  // 3. Verificar links internos
  const links = extractInternalLinks(html, filePath);
  for (const href of links) {
    const resolved = resolveLink(filePath, href);
    if (!linkExists(resolved)) {
      log('error', `[LINK QUEBRADO] ${relPath}: href="${href}" → ${path.relative(projectRoot, resolved)}`);
    }
  }
}

// Relatório
console.log('═══════════════════════════════════════════════════════\n');
if (errors.length === 0) {
  console.log('✅ Nenhum erro encontrado!\n');
} else {
  console.log(`❌ ${errors.length} ERROS ENCONTRADOS:\n`);

  // Agrupa por tipo
  const loaderErrors = errors.filter(e => e.includes('[LOADER]'));
  const prefixErrors = errors.filter(e => e.includes('[PREFIX]'));
  const linkErrors = errors.filter(e => e.includes('[LINK QUEBRADO]'));

  if (loaderErrors.length > 0) {
    console.log(`\n--- PROBLEMAS DE COMPONENTS-LOADER (${loaderErrors.length}) ---`);
    loaderErrors.forEach(e => console.log('  ' + e));
  }

  if (prefixErrors.length > 0) {
    console.log(`\n--- PROBLEMAS DE PATH PREFIX (${prefixErrors.length}) ---`);
    prefixErrors.forEach(e => console.log('  ' + e));
  }

  if (linkErrors.length > 0) {
    console.log(`\n--- LINKS QUEBRADOS (${linkErrors.length}) ---`);
    linkErrors.forEach(e => console.log('  ' + e));
  }
}

console.log(`\n📊 Resumo: ${allFiles.length} páginas auditadas | ${errors.length} erros | ${warnings.length} avisos`);
