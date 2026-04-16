#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const brokenPages = [];
const workingPages = [];

function findAllLinks(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = [];

    // Encontra todos os href
    const hrefMatches = content.matchAll(/href="([^"]+)"/g);

    for (const match of hrefMatches) {
      let href = match[1];

      // Ignora links externos, anchors e assets
      if (href.startsWith('http') || href.startsWith('#') || href.includes('assets') || href.includes('fonts.googleapis')) {
        continue;
      }

      links.push(href);
    }

    return links;
  } catch (error) {
    return [];
  }
}

function resolveLink(baseDir, href) {
  // Resolve o caminho relativo
  let resolvedPath = path.resolve(baseDir, href);

  // Se apontar para pasta, procura index.html
  if (!resolvedPath.endsWith('.html')) {
    const indexPath = path.join(resolvedPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return { exists: true, resolvedPath: indexPath, original: href };
    }
    // Senão, trata como arquivo HTML mesmo sem extensão
    if (!resolvedPath.endsWith('/')) {
      resolvedPath += '.html';
    }
  }

  return { exists: fs.existsSync(resolvedPath), resolvedPath, original: href };
}

function walkPages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkPages(filePath);
    } else if (file.endsWith('.html')) {
      const fileDir = path.dirname(filePath);
      const links = findAllLinks(filePath);
      const relativePath = path.relative(projectRoot, filePath);

      for (const href of links) {
        const resolved = resolveLink(fileDir, href);

        if (!resolved.exists) {
          brokenPages.push({
            source: relativePath,
            link: href,
            resolvedTo: path.relative(projectRoot, resolved.resolvedPath)
          });
        } else {
          workingPages.push({
            source: relativePath,
            link: href
          });
        }
      }
    }
  }
}

console.log('🔍 Analisando TODOS os links em tempo real...\n');

walkPages(path.join(projectRoot, 'pages'));

// Analisar raiz
const rootPages = ['index.html', 'sobre.html', 'politica-privacidade.html', 'termos-de-uso.html'];
for (const page of rootPages) {
  const filePath = path.join(projectRoot, page);
  if (fs.existsSync(filePath)) {
    const links = findAllLinks(filePath);
    for (const href of links) {
      const resolved = resolveLink(projectRoot, href);
      if (!resolved.exists) {
        brokenPages.push({
          source: page,
          link: href,
          resolvedTo: path.relative(projectRoot, resolved.resolvedPath)
        });
      }
    }
  }
}

// Agrupar links quebrados por tipo
const brokenByType = {};
for (const broken of brokenPages) {
  const courseName = broken.link.replace(/\//g, ' ').replace(/\.html/g, '').trim();
  if (!brokenByType[courseName]) {
    brokenByType[courseName] = [];
  }
  brokenByType[courseName].push(broken.source);
}

console.log('📊 RESULTADO DA ANÁLISE:\n');
console.log(`✓ Links válidos: ${workingPages.length}`);
console.log(`✗ Links quebrados: ${brokenPages.length}`);

if (brokenPages.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('❌ PÁGINAS E CURSOS FALTANTES:\n');

  const uniqueBroken = {};
  for (const broken of brokenPages) {
    if (!uniqueBroken[broken.link]) {
      uniqueBroken[broken.link] = broken.resolvedTo;
    }
  }

  const sortedBroken = Object.entries(uniqueBroken).sort();

  for (const [link, resolved] of sortedBroken) {
    const count = brokenPages.filter(b => b.link === link).length;
    console.log(`  ${link}`);
    console.log(`    → Procurado em: ${resolved}`);
    console.log(`    → Referenciado por ${count} página(s)\n`);
  }

  console.log('='.repeat(80));
  console.log('\n📋 PÁGINAS A CRIAR:\n');

  const pagesToCreate = [];
  for (const link of Object.keys(uniqueBroken)) {
    // Extrai o caminho e nome
    if (link.includes('pages/')) {
      pagesToCreate.push(link);
    }
  }

  for (const page of pagesToCreate.sort()) {
    console.log(`  • ${page}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n⚠️  Total de ${pagesToCreate.length} páginas/cursos precisam ser criados`);
} else {
  console.log('\n✅ Todos os links estão funcionando!');
}
