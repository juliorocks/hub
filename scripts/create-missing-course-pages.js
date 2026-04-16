#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Mapa de URLs faltantes para serem criadas
const MISSING_COURSES = [
  // Negócios/Administração
  { dir: 'pages/graduacao/negocios/ciencias-contabeis', name: 'Ciências Contábeis' },
  { dir: 'pages/graduacao/negocios/gestao-recursos-humanos', name: 'Gestão de Recursos Humanos' },
  { dir: 'pages/graduacao/negocios/logistica', name: 'Logística' },
  { dir: 'pages/graduacao/negocios/marketing', name: 'Marketing' },

  // Saúde
  { dir: 'pages/graduacao/saude/educacao-fisica', name: 'Educação Física' },
  { dir: 'pages/graduacao/saude/fisioterapia', name: 'Fisioterapia' },

  // Tecnologia
  { dir: 'pages/graduacao/tecnologia/ciencia-da-computacao', name: 'Ciência da Computação' },
  { dir: 'pages/graduacao/tecnologia/engenharia-de-software', name: 'Engenharia de Software' },

  // Pós-graduação
  { dir: 'pages/pos-graduacao/especializacao/gestao-pessoas', name: 'Especialização em Gestão de Pessoas' },
  { dir: 'pages/pos-graduacao/mba/mba-gestao-empresarial', name: 'MBA em Gestão Empresarial' },
];

function generatePageHTML(courseName, relativePath) {
  const template = fs.readFileSync(path.join(projectRoot, 'templates/course-page-template.html'), 'utf-8');

  return template
    .replaceAll('NOME_DO_CURSO', courseName)
    .replaceAll('CAMINHO_CANÔNICO', relativePath)
    .replaceAll('../../../../', adjustPathPrefix(relativePath));
}

function adjustPathPrefix(relativePath) {
  const depth = (relativePath.match(/\//g) || []).length;
  return '../'.repeat(depth + 1);
}

function createCourse(courseConfig) {
  const fullPath = path.join(projectRoot, courseConfig.dir);
  const indexPath = path.join(fullPath, 'index.html');

  // Criar diretório se não existir
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Diretório criado: ${courseConfig.dir}`);
  }

  // Gerar e escrever arquivo
  const html = generatePageHTML(courseConfig.name, courseConfig.dir);
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✓ Página criada: ${courseConfig.dir}/index.html`);
}

console.log('Criando páginas de cursos faltantes...\n');

let count = 0;
for (const course of MISSING_COURSES) {
  try {
    createCourse(course);
    count++;
  } catch (error) {
    console.error(`✗ Erro ao criar ${course.dir}:`, error.message);
  }
}

console.log(`\nConcluído! ${count}/${MISSING_COURSES.length} páginas criadas.`);
