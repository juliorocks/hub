#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const FINAL_PAGES = [
  { dir: 'pages/graduacao/administracao/ciencias-contabeis', name: 'Ciências Contábeis' },
  { dir: 'pages/graduacao/administracao/gestao-recursos-humanos', name: 'Gestão de Recursos Humanos' },
  { dir: 'pages/graduacao/administracao/logistica', name: 'Logística' },
  { dir: 'pages/graduacao/administracao/marketing', name: 'Marketing' },
  { dir: 'pages/graduacao/engenharias/arquitetura-urbanismo', name: 'Arquitetura e Urbanismo' },
  { dir: 'pages/graduacao/engenharias/engenharia-civil', name: 'Engenharia Civil' },
];

function generatePageHTML(courseName, relativePath) {
  const template = fs.readFileSync(path.join(projectRoot, 'templates/course-page-template.html'), 'utf-8');

  return template
    .replaceAll('NOME_DO_CURSO', courseName)
    .replaceAll('CAMINHO_CANÔNICO', relativePath)
    .replaceAll('../../../../', adjustPathPrefix(relativePath));
}

function adjustPathPrefix(relativePath) {
  const slashCount = (relativePath.match(/\//g) || []).length;
  const depth = slashCount + 1;
  return '../'.repeat(depth);
}

function createPage(pageConfig) {
  const fullPath = path.join(projectRoot, pageConfig.dir);
  const indexPath = path.join(fullPath, 'index.html');

  const html = generatePageHTML(pageConfig.name, pageConfig.dir);
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✓ ${pageConfig.dir}/index.html`);
}

console.log('📚 Criando últimas páginas faltantes...\n');

let count = 0;
for (const page of FINAL_PAGES) {
  try {
    createPage(page);
    count++;
  } catch (error) {
    console.error(`✗ Erro: ${error.message}`);
  }
}

console.log(`\n✅ ${count}/${FINAL_PAGES.length} páginas criadas`);
