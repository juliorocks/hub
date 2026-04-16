#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (filepath.endsWith('.html')) {
      callback(filepath);
    }
  });
}

function fixComponentsLoader(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Remover type="module" de components-loader.js apenas
    content = content.replace(
      /<script type="module" src="(.+?components-loader\.js)"><\/script>/g,
      '<script src="$1"><\/script>'
    );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✓ Corrigido: ${path.relative(projectRoot, filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Erro em ${filePath}:`, error.message);
    return false;
  }
}

console.log('Removendo type="module" de components-loader.js...\n');

let fixed = 0;
let skipped = 0;

// Processar pages/
walkDir(path.join(projectRoot, 'pages'), (filePath) => {
  if (fixComponentsLoader(filePath)) {
    fixed++;
  } else {
    skipped++;
  }
});

// Processar raiz
const rootFiles = ['index.html', 'sobre.html', 'politica-privacidade.html', 'termos-de-uso.html'];
rootFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    if (fixComponentsLoader(filePath)) {
      fixed++;
    } else {
      skipped++;
    }
  }
});

console.log(`\n✓ Concluído! ${fixed} arquivos corrigidos, ${skipped} inalterados.`);
