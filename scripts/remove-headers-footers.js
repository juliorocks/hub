#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function removeHeaderFooter(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Remove <header class="site-header">...</header>
  content = content.replace(
    /<header class="site-header"[^>]*>[\s\S]*?<\/header>/,
    ''
  );

  // Remove <footer class="site-footer">[\s\S]*?<\/footer>
  content = content.replace(
    /<footer class="site-footer"[^>]*>[\s\S]*?<\/footer>/,
    ''
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ ${path.relative(projectRoot, filePath)}`);
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        count += processDirectory(fullPath);
      }
    } else if (file.endsWith('.html')) {
      if (removeHeaderFooter(fullPath)) count++;
    }
  }

  return count;
}

console.log('Removendo headers e footers antigos...\n');
const removed = processDirectory(projectRoot);
console.log(`\nRemovidos de ${removed} arquivos!`);
