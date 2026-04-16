#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function addComponentsLoaderToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Verifica se já tem components-loader
  if (content.includes('components-loader.js')) {
    console.log(`✓ ${path.relative(projectRoot, filePath)} - já tem`);
    return;
  }

  // Verifica se tem main.js
  if (!content.includes('main.js')) {
    return;
  }

  // Tenta adicionar components-loader antes de main.js
  const mainMatch = content.match(/<script[^>]*src="([^"]*main\.js)"[^>]*><\/script>/);

  if (mainMatch) {
    const mainPath = mainMatch[1];
    const componentsPath = mainPath.replace('main.js', 'components-loader.js');
    const newScript = `<script type="module" src="${componentsPath}"></script>\n  ${mainMatch[0]}`;

    content = content.replace(mainMatch[0], newScript);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${path.relative(projectRoot, filePath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.html')) {
      addComponentsLoaderToFile(fullPath);
    }
  }
}

console.log('Adicionando components-loader.js...\n');
processDirectory(projectRoot);
console.log('\nConcluído!');
