#!/usr/bin/env node
// Corrige os arquivos .html que são aliases (depth 3) mas têm links de depth 4
// Esses arquivos estão em pages/graduacao/X/curso.html
// Depth: negocios/ciencias-contabeis.html = 3 níveis dentro de pages/
// Home: ../../../index.html
// Universidades: ../../universidades/index.html (não ../../pages/universidades/ que aponta para pages/pages/)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

let fixed = 0;

// Arquivos alias depth 3 com links errados de depth 4
const FILES = [
  'pages/graduacao/negocios/ciencias-contabeis.html',
  'pages/graduacao/negocios/gestao-rh.html',
  'pages/graduacao/negocios/logistica.html',
  'pages/graduacao/negocios/marketing.html',
  'pages/graduacao/saude/educacao-fisica.html',
  'pages/graduacao/saude/medicina.html',
  'pages/graduacao/saude/odontologia.html',
];

for (const relPath of FILES) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Não encontrado: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // 1. Home: ../../index.html → ../../../index.html
  content = content.replaceAll('href="../../index.html"', 'href="../../../index.html"');

  // 2. Universidades: ../../pages/universidades/index.html → ../../universidades/index.html
  content = content.replaceAll('href="../../pages/universidades/index.html"', 'href="../../universidades/index.html"');
  content = content.replaceAll('href="../../pages/universidades/"', 'href="../../universidades/index.html"');

  // 3. Assets com prefix errado: ../../assets/ → ../../../assets/
  // Já foi corrigido em passo anterior, mas vamos garantir
  // Depth 3 precisa de ../../../ para chegar na raiz
  content = content.replaceAll('href="../../assets/', 'href="../../../assets/');
  content = content.replaceAll('src="../../assets/', 'src="../../../assets/');

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    fixed++;
    console.log(`✓ ${relPath}`);
  } else {
    console.log(`⊘ Sem mudanças: ${relPath}`);
  }
}

console.log(`\n✅ ${fixed} arquivos corrigidos`);
