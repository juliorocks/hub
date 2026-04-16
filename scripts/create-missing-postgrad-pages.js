#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Páginas de MBA a criar
const MBA_PAGES = [
  { dir: 'pages/pos-graduacao/mba/mba-gestao-projetos', name: 'MBA em Gestão de Projetos' },
  { dir: 'pages/pos-graduacao/mba/mba-gestao-pessoas', name: 'MBA em Gestão de Pessoas' },
  { dir: 'pages/pos-graduacao/mba/mba-marketing-digital', name: 'MBA em Marketing Digital' },
  { dir: 'pages/pos-graduacao/mba/mba-engenharia-software', name: 'MBA em Engenharia de Software' },
  { dir: 'pages/pos-graduacao/mba/mba-financas-corporativas', name: 'MBA em Finanças Corporativas' },
  { dir: 'pages/pos-graduacao/mba/mba-saude-gestao-hospitalar', name: 'MBA em Saúde / Gestão Hospitalar' },
];

// Páginas de Especialização a criar
const ESPECIALIZACAO_PAGES = [
  { dir: 'pages/pos-graduacao/especializacao/direito-tributario', name: 'Especialização em Direito Tributário' },
  { dir: 'pages/pos-graduacao/especializacao/residencia-medica', name: 'Residência Médica / Especialização Clínica' },
  { dir: 'pages/pos-graduacao/especializacao/data-science-ia', name: 'Especialização em Data Science / IA' },
  { dir: 'pages/pos-graduacao/especializacao/bim-construcao', name: 'Especialização em BIM / Construção' },
  { dir: 'pages/pos-graduacao/especializacao/logistica-supply-chain', name: 'Especialização em Logística e Supply Chain' },
  { dir: 'pages/pos-graduacao/especializacao/docencia-ead', name: 'Especialização em Docência para EAD' },
];

function generatePageHTML(pageName, relativePath) {
  const template = fs.readFileSync(path.join(projectRoot, 'templates/course-page-template.html'), 'utf-8');

  return template
    .replaceAll('NOME_DO_CURSO', pageName)
    .replaceAll('CAMINHO_CANÔNICO', relativePath)
    .replaceAll('../../../../', adjustPathPrefix(relativePath));
}

function adjustPathPrefix(relativePath) {
  // Conta quantas barras tem no path
  // Exemplo: pages/pos-graduacao/mba/mba-gestao-projetos = 3 barras
  // Cada barra = 1 nível de profundidade
  // Precisa voltar: mba-gestao-projetos/ -> mba/ -> pos-graduacao/ -> pages/ -> root
  // = profundidade + 1 (para sair de pages)
  const slashCount = (relativePath.match(/\//g) || []).length;
  const depth = slashCount + 1;
  return '../'.repeat(depth);
}

function createPage(pageConfig) {
  const fullPath = path.join(projectRoot, pageConfig.dir);
  const indexPath = path.join(fullPath, 'index.html');

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Diretório criado: ${pageConfig.dir}`);
  }

  const html = generatePageHTML(pageConfig.name, pageConfig.dir);
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✓ Página criada: ${pageConfig.dir}/index.html`);
}

console.log('Criando páginas de pós-graduação faltantes...\n');

let count = 0;

console.log('📚 Criando páginas de MBA:');
for (const page of MBA_PAGES) {
  try {
    createPage(page);
    count++;
  } catch (error) {
    console.error(`✗ Erro ao criar ${page.dir}:`, error.message);
  }
}

console.log('\n📖 Criando páginas de Especialização:');
for (const page of ESPECIALIZACAO_PAGES) {
  try {
    createPage(page);
    count++;
  } catch (error) {
    console.error(`✗ Erro ao criar ${page.dir}:`, error.message);
  }
}

const totalPages = MBA_PAGES.length + ESPECIALIZACAO_PAGES.length;
console.log(`\n✓ Concluído! ${count}/${totalPages} páginas criadas.`);
