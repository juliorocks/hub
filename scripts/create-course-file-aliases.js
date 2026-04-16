#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Mapeia arquivo .html simples para pasta com index.html
const ALIASES = {
  'pages/graduacao/negocios/ciencias-contabeis.html': 'pages/graduacao/negocios/ciencias-contabeis/index.html',
  'pages/graduacao/negocios/gestao-rh.html': 'pages/graduacao/negocios/gestao-recursos-humanos/index.html',
  'pages/graduacao/negocios/marketing.html': 'pages/graduacao/negocios/marketing/index.html',
  'pages/graduacao/negocios/logistica.html': 'pages/graduacao/negocios/logistica/index.html',
  'pages/graduacao/saude/educacao-fisica.html': 'pages/graduacao/saude/educacao-fisica/index.html',
  'pages/graduacao/saude/medicina.html': 'pages/graduacao/saude/medicina/index.html',
  'pages/graduacao/saude/odontologia.html': 'pages/graduacao/saude/odontologia/index.html',
  'pages/pos-graduacao/mba-gestao-negocios.html': 'pages/pos-graduacao/mba/mba-gestao-empresarial/index.html',
  'pages/pos-graduacao/pos-direito.html': 'pages/pos-graduacao/direito/index.html',
  'pages/pos-graduacao/especializacao-saude.html': 'pages/pos-graduacao/especializacao/saude/index.html',
};

console.log('🔗 Criando aliases de arquivos .html para pastas...\n');

let created = 0;

for (const [aliasPath, targetPath] of Object.entries(ALIASES)) {
  const fullPath = path.join(projectRoot, aliasPath);
  const fullTargetPath = path.join(projectRoot, targetPath);

  // Verifica se o arquivo alvo existe
  if (!fs.existsSync(fullTargetPath)) {
    console.log(`⚠️  Arquivo alvo não encontrado: ${targetPath}`);
    continue;
  }

  // Cria redirecionamento HTML que carrega o index.html da pasta
  // Estratégia: criar um arquivo .html que imediatamente redireciona
  // Mas para evitar problemas, vamos simplesmente copiar o conteúdo do index.html

  try {
    const content = fs.readFileSync(fullTargetPath, 'utf-8');
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Criado: ${aliasPath}`);
    created++;
  } catch (error) {
    console.error(`✗ Erro ao criar ${aliasPath}:`, error.message);
  }
}

console.log(`\n✅ Concluído! ${created}/${Object.keys(ALIASES).length} aliases criados.`);
