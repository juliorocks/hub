#!/usr/bin/env node
// Corrige TODOS os links internos com trailing slash (pasta/) → (pasta/index.html)
// Necessário para protocolo file:// que não serve index.html automaticamente
// Também corrige links com ../../../pages/ que são paths errados

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

let totalFixed = 0;
let totalFiles = 0;

function getAllHtmlFiles(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) files.push(...getAllHtmlFiles(full));
    else if (item.endsWith('.html')) files.push(full);
  }
  return files;
}

const allFiles = getAllHtmlFiles(path.join(projectRoot, 'pages'));
// Também inclui o index.html raiz
if (fs.existsSync(path.join(projectRoot, 'index.html'))) {
  allFiles.push(path.join(projectRoot, 'index.html'));
}

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // 1. Converte href="pasta/" → href="pasta/index.html"
  // Padrão: href="qualquer/coisa/" onde o que vem antes da última / é um segmento de path
  // NÃO converter: href="../" href="../../" href="./" href="/" (navegação de nível)
  // CONVERTER: href="saude/" href="../saude/" href="../../saude/enfermagem/" etc.

  // Regex: href=" seguido de qualquer path que termina com / que NÃO seja só ../
  // Garante que tem pelo menos um segmento de nome antes do /
  content = content.replace(
    /href="((?:\.\.\/)*(?:[^"./][^"/]*\/)+)"/g,
    (match, p1) => {
      // Verifica se é apenas navegação de nível (só ../../../)
      if (/^(\.\.\/)+$/.test(p1)) return match;
      // Verifica se é ./
      if (p1 === './') return match;
      return `href="${p1}index.html"`;
    }
  );

  // 2. Corrige links com ../../../pages/ ou ../../pages/ que são paths errados
  // Esses estão em curso-de-medicina.html que usa caminhos absolutos incorretos
  // ../../../pages/graduacao/saude/ → (relativo correto da localização do arquivo)
  // Vamos substituir por paths relativos corretos baseados na localização do arquivo

  // Para curso-de-medicina.html em pages/graduacao/saude/:
  // ../../../pages/graduacao/ → ../  (volta para graduacao/)
  // ../../../pages/carreiras/ → ../../carreiras/
  const relFromProject = path.relative(projectRoot, path.dirname(filePath));
  const parts = relFromProject.replace(/\\/g, '/').split('/');

  // Calcula o número de níveis acima para chegar na raiz do projeto
  const depthFromRoot = parts.length;
  const toRoot = '../'.repeat(depthFromRoot);

  // Substitui ../../../pages/ (3 níveis + pages/) por path relativo correto
  // Detecta o padrão e calcula quantos ../ existem
  content = content.replace(
    /href="((?:\.\.\/)+)pages\/([^"]+)"/g,
    (match, dots, rest) => {
      // Conta os ../ do link
      const dotCount = (dots.match(/\.\.\//g) || []).length;
      // O link vai dotCount níveis acima e depois entra em pages/
      // Se estamos em pages/X/Y/ (depth 3), ../../../ vai para raiz, depois pages/ vai de volta pra pages/
      // Isso cria um loop: deveria ser apenas relativo direto
      // Correto: remover o pages/ e ajustar os dots
      // De: href="../../../pages/graduacao/saude/" (de dentro de pages/graduacao/saude/)
      // Para: href="../" ou href="./saude/" etc.

      // Calcula path atual
      const currentDir = path.dirname(filePath).replace(/\\/g, '/');
      const projectRootNorm = projectRoot.replace(/\\/g, '/');
      const relDir = currentDir.replace(projectRootNorm + '/', '');

      // Resolve o link com os dots originais
      const resolved = path.resolve(path.dirname(filePath), dots + 'pages/' + rest).replace(/\\/g, '/');
      // Caminho relativo do arquivo atual para o destino
      const relPath = path.relative(path.dirname(filePath), resolved).replace(/\\/g, '/');

      return `href="${relPath}"`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalFixed++;
    console.log(`✓ ${path.relative(projectRoot, filePath)}`);
  }
  totalFiles++;
}

console.log(`\n✅ ${totalFixed}/${totalFiles} arquivos corrigidos`);
