#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Arquivos alias que precisam ter seus caminhos relativos ajustados
const FIXES = {
  'pages/graduacao/negocios/ciencias-contabeis.html': { targetDepth: 3, currentDepth: 2 }, // ../../../ → ../../
  'pages/graduacao/negocios/gestao-rh.html': { targetDepth: 3, currentDepth: 2 },
  'pages/graduacao/negocios/marketing.html': { targetDepth: 3, currentDepth: 2 },
  'pages/graduacao/negocios/logistica.html': { targetDepth: 3, currentDepth: 2 },
  'pages/graduacao/saude/educacao-fisica.html': { targetDepth: 3, currentDepth: 2 },
  'pages/graduacao/saude/medicina.html': { targetDepth: 3, currentDepth: 2 },
  'pages/graduacao/saude/odontologia.html': { targetDepth: 3, currentDepth: 2 },
  'pages/pos-graduacao/mba-gestao-negocios.html': { targetDepth: 3, currentDepth: 2 },
  'pages/pos-graduacao/pos-direito.html': { targetDepth: 3, currentDepth: 2 },
  'pages/pos-graduacao/especializacao-saude.html': { targetDepth: 3, currentDepth: 2 },
};

console.log('🔧 Corrigindo caminhos relativos nos aliases...\n');

let fixed = 0;

for (const [filePath, depths] of Object.entries(FIXES)) {
  const fullPath = path.join(projectRoot, filePath);

  try {
    let content = fs.readFileSync(fullPath, 'utf-8');
    const original = content;

    // Substituir caminhos relativos
    // Os arquivos foram criados com ../../../../ porque apontam para index.html em pasta
    // Mas o arquivo .html simples está um nível acima, então precisa ../../

    // Trocar ../../../../ por ../../
    content = content.replace(/href="\.\.\/\.\.\\/g, 'href="../../');

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`✓ Corrigido: ${filePath}`);
      fixed++;
    }
  } catch (error) {
    console.error(`✗ Erro ao corrigir ${filePath}:`, error.message);
  }
}

console.log(`\n✅ Concluído! ${fixed} arquivos ajustados.`);
