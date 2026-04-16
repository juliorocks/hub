#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const MISSING_COURSES = [
  // Graduação - Administração
  { dir: 'pages/graduacao/negocios/administracao', name: 'Administração' },
  { dir: 'pages/graduacao/negocios/ciencias-contabeis', name: 'Ciências Contábeis' },
  { dir: 'pages/graduacao/negocios/gestao-recursos-humanos', name: 'Gestão de Recursos Humanos' },
  { dir: 'pages/graduacao/negocios/logistica', name: 'Logística' },
  { dir: 'pages/graduacao/negocios/marketing', name: 'Marketing' },

  // Graduação - Educação
  { dir: 'pages/graduacao/educacao/pedagogia', name: 'Pedagogia' },

  // Graduação - Engenharias
  { dir: 'pages/graduacao/engenharia/arquitetura-urbanismo', name: 'Arquitetura e Urbanismo' },
  { dir: 'pages/graduacao/engenharia/engenharia-producao', name: 'Engenharia de Produção' },

  // Graduação - Humanas
  { dir: 'pages/graduacao/humanas/servico-social', name: 'Serviço Social' },

  // Graduação - Saúde
  { dir: 'pages/graduacao/saude/medicina', name: 'Medicina' },
  { dir: 'pages/graduacao/saude/odontologia', name: 'Odontologia' },
  { dir: 'pages/graduacao/saude/medicina-veterinaria', name: 'Medicina Veterinária' },
  { dir: 'pages/graduacao/saude/educacao-fisica', name: 'Educação Física' },
  { dir: 'pages/graduacao/saude/medicina-vs-enfermagem', name: 'Medicina vs Enfermagem' },

  // Graduação - Tecnologia
  { dir: 'pages/graduacao/tecnologia/seguranca-informacao', name: 'Segurança da Informação' },
  { dir: 'pages/graduacao/tecnologia/sistemas-informacao', name: 'Sistemas de Informação' },

  // Pós-Graduação - MBA
  { dir: 'pages/pos-graduacao/mba/mba-gestao-empresarial', name: 'MBA em Gestão Empresarial' },
  { dir: 'pages/pos-graduacao/mba/mba-gestao-financeira', name: 'MBA em Gestão Financeira' },
  { dir: 'pages/pos-graduacao/mba/mba-saude', name: 'MBA em Saúde' },

  // Pós-Graduação - Especialização
  { dir: 'pages/pos-graduacao/especializacao/gestao-pessoas', name: 'Especialização em Gestão de Pessoas' },
  { dir: 'pages/pos-graduacao/especializacao/saude', name: 'Especialização em Saúde' },
  { dir: 'pages/pos-graduacao/direito', name: 'Pós-Graduação em Direito' },
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

function createCourse(courseConfig) {
  const fullPath = path.join(projectRoot, courseConfig.dir);
  const indexPath = path.join(fullPath, 'index.html');

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Diretório criado: ${courseConfig.dir}`);
  }

  const html = generatePageHTML(courseConfig.name, courseConfig.dir);
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✓ Página criada: ${courseConfig.dir}/index.html`);
}

console.log('📚 Criando todas as páginas de cursos faltantes...\n');

let count = 0;
for (const course of MISSING_COURSES) {
  try {
    createCourse(course);
    count++;
  } catch (error) {
    console.error(`✗ Erro ao criar ${course.dir}:`, error.message);
  }
}

console.log(`\n✅ Concluído! ${count}/${MISSING_COURSES.length} páginas criadas.`);
