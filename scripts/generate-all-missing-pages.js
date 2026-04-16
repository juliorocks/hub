#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function findAllCardLinks(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = [];

    // Encontra todos os href em tags <a> com class="card"
    // Trata variações: <a ... class="card" ... href=""> ou <a ... href="" ... class="card">
    const pattern = /<a\s+[^>]*(?:class="card"[^>]*href="|href="[^"]*"[^>]*class="card")[^>]*href="([^"]+)"/g;
    const altPattern = /<a[^>]*href="([^"]+)"[^>]*class="card"[^>]*>/g;
    const simplePattern = /<a\s+[^>]*class="card"[^>]*>/g;

    // Tenta encontrar hrefs em cards
    for (const cardMatch of content.matchAll(simplePattern)) {
      const cardTag = cardMatch[0];
      const hrefMatch = cardTag.match(/href="([^"]+)"/);
      if (hrefMatch) {
        const href = hrefMatch[1];
        if (!href.startsWith('http') && !href.startsWith('#') && !href.includes('assets')) {
          links.push(href);
        }
      }
    }

    return links;
  } catch (error) {
    return [];
  }
}

function resolvePagePath(baseDir, href) {
  // Resolve href relativo ao diretório base
  const fullPath = path.resolve(baseDir, href);
  const relativePath = path.relative(projectRoot, fullPath);

  return {
    fullPath,
    relativePath,
    exists: fs.existsSync(fullPath),
    isDirectory: fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
  };
}

function extractPageName(href) {
  // Extrai o nome da página do href
  // Exemplo: "cursos/medicina.html" -> "Medicina"
  // Exemplo: "especializacao/data-science-ia/" -> "Data Science / IA"

  const filename = path.basename(href, '.html') || path.basename(href, '/');

  // Converte kebab-case para Title Case
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generatePageHTML(pageName, relativePath) {
  const template = fs.readFileSync(path.join(projectRoot, 'templates/course-page-template.html'), 'utf-8');

  return template
    .replaceAll('NOME_DO_CURSO', pageName)
    .replaceAll('CAMINHO_CANÔNICO', relativePath)
    .replaceAll('../../../../', adjustPathPrefix(relativePath));
}

function adjustPathPrefix(relativePath) {
  const slashCount = (relativePath.match(/\//g) || []).length;
  const depth = slashCount + 1;
  return '../'.repeat(depth);
}

function createMissingPage(pageInfo) {
  const { fullPath, relativePath, href, pageName } = pageInfo;

  // Se é um diretório, criar index.html dentro
  let targetPath = fullPath;
  if (!fullPath.endsWith('.html')) {
    targetPath = path.join(fullPath, 'index.html');
  }

  // Criar diretório se não existir
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Gerar e escrever arquivo
  const html = generatePageHTML(pageName, relativePath.replace(/\\index\.html$/, '').replace(/\\/g, '/'));
  fs.writeFileSync(targetPath, html, 'utf-8');

  return {
    path: path.relative(projectRoot, targetPath),
    name: pageName
  };
}

console.log('🔍 Analisando páginas com cards...\n');

const pagesDir = path.join(projectRoot, 'pages');
const missingPages = [];
const foundPages = [];

function walkPages(dir, baseDir = pagesDir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkPages(filePath, baseDir);
    } else if (file.endsWith('.html')) {
      const links = findAllCardLinks(filePath);

      if (links.length > 0) {
        const pageDir = path.dirname(filePath);
        console.log(`📄 ${path.relative(projectRoot, filePath)}`);

        for (const href of links) {
          const resolved = resolvePagePath(pageDir, href);

          if (!resolved.exists) {
            const pageName = extractPageName(href);
            missingPages.push({
              href,
              pageName,
              fullPath: resolved.fullPath,
              relativePath: resolved.relativePath,
              sourceFile: path.relative(projectRoot, filePath)
            });
            console.log(`  ❌ Link não encontrado: ${href} (${pageName})`);
          } else {
            console.log(`  ✓ ${href}`);
            foundPages.push(href);
          }
        }
      }
    }
  }
}

walkPages(pagesDir);

console.log(`\n📊 Resumo:`);
console.log(`  ✓ Páginas encontradas: ${foundPages.length}`);
console.log(`  ❌ Páginas faltantes: ${missingPages.length}`);

if (missingPages.length > 0) {
  console.log(`\n📝 Criando ${missingPages.length} páginas faltantes...\n`);

  let created = 0;
  for (const pageInfo of missingPages) {
    try {
      const result = createMissingPage(pageInfo);
      console.log(`✓ Criada: ${result.path}`);
      created++;
    } catch (error) {
      console.error(`✗ Erro ao criar ${pageInfo.relativePath}:`, error.message);
    }
  }

  console.log(`\n✅ Concluído! ${created}/${missingPages.length} páginas criadas.`);
} else {
  console.log(`\n✅ Nenhuma página faltante! Todas as páginas referenciadas existem.`);
}
