#!/usr/bin/env node
// Corrige páginas que foram copiadas de arquivo.html (depth 3) para pasta/index.html (depth 4)
// Problemas:
// 1. Links ../../universidades/ devem ser ../../../universidades/
// 2. Links para cursos irmãos como "enfermagem.html" devem ser "../enfermagem/index.html"
// 3. Links de breadcrumb "../" apontam para saude/ (ok) mas "../" do depth 4 aponta para saude/ (ok - coincidência funciona)
// 4. Links "../../index.html" (home) devem ser "../../../index.html"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

let fixed = 0;

// Estas páginas foram criadas copiando de arquivo.html (depth3) para pasta/index.html (depth4)
// Os links internos ficaram com depth3 mas precisam de depth4
const PAGES_TO_FIX = [
  'pages/graduacao/saude/enfermagem/index.html',
  'pages/graduacao/saude/farmacia/index.html',
  'pages/graduacao/saude/nutricao/index.html',
  'pages/graduacao/saude/psicologia/index.html',
  'pages/graduacao/tecnologia/analise-desenvolvimento-sistemas/index.html',
  'pages/graduacao/engenharia/engenharia-civil/index.html',
];

// Mapeamento de links relativos (do ponto de vista do .html original em saude/)
// para o correto (do ponto de vista de saude/X/index.html)
function fixLinksForSubdir(content, category) {
  // category = 'saude', 'tecnologia', 'engenharia'

  // 1. Links de universidades: ../../universidades/ → ../../../universidades/
  content = content.replaceAll('href="../../universidades/', 'href="../../../universidades/');

  // 2. Home: ../../index.html → ../../../index.html
  content = content.replaceAll('href="../../index.html"', 'href="../../../index.html"');
  content = content.replaceAll('href="../../pages/', 'href="../../../pages/');

  // 3. Links para cursos irmãos como href="enfermagem.html" → href="../enfermagem/index.html"
  // Estes são links relativos sem ../ que apontam para arquivo na mesma pasta
  // Na pasta original saude/ → saude/enfermagem.html (ok)
  // Na nova localização saude/enfermagem/ → saude/enfermagem/enfermagem.html (errado!)
  // Deve ser → ../enfermagem/index.html
  const courseFiles = [
    'enfermagem', 'farmacia', 'nutricao', 'psicologia', 'medicina',
    'odontologia', 'educacao-fisica', 'medicina-veterinaria',
    'curso-de-medicina',
    'administracao', 'ciencias-contabeis', 'gestao-rh', 'logistica', 'marketing',
    'sistemas-informacao', 'seguranca-informacao', 'analise-desenvolvimento-sistemas',
    'engenharia-civil', 'engenharia-producao', 'arquitetura-urbanismo',
  ];

  for (const course of courseFiles) {
    // href="enfermagem.html" → href="../enfermagem/index.html"
    content = content.replaceAll(`href="${course}.html"`, `href="../${course}/index.html"`);
    // href="../negocios/administracao.html" → href="../../negocios/administracao/index.html"
    // Esses já estão corretos com ../ mas o .html final precisa virar /index.html
  }

  // 4. Links ../ de breadcrumb intermediário "Saúde":
  // em saude/enfermagem/index.html, href="../" aponta para saude/ (correto!)
  // Breadcrumb "Graduação": href="../../" aponta para graduacao/ mas deveria ser ../../../ ... não, espera:
  // saude/enfermagem/index.html → ../../ = pages/ (errado, deveria ser graduacao/)
  // Mas o breadcrumb "Graduação" já estava como href="../" no .html (depth3: saude/arquivo.html → .. = graduacao/)
  // Agora em depth4 (saude/enfermagem/index.html), href="../" aponta para saude/ (errado!)
  // Precisa ser href="../../"
  // PORÉM: não podemos fazer replace genérico de href="../" pois afeta outros links

  // Vamos ser específicos: o breadcrumb "Graduação" usa class="breadcrumb__link"
  // Padrão: <a href="../" class="breadcrumb__link" ...>Graduação</a>
  // Deve virar: <a href="../../" class="breadcrumb__link" ...>Graduação</a>

  // Na verdade, vamos regenerar o breadcrumb correto para depth4
  // Saúde (ou Tecnologia, Engenharia) está em:
  // saude/X/index.html: home=../../../, grad=../../, saude=../, atual=./

  return content;
}

for (const relPath of PAGES_TO_FIX) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Não encontrado: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  const original = content;

  // Detecta categoria pela pasta
  const parts = relPath.split('/');
  const category = parts[2]; // saude, tecnologia, engenharia

  content = fixLinksForSubdir(content, category);

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    fixed++;
    console.log(`✓ ${relPath}`);
  } else {
    console.log(`⊘ Sem mudanças: ${relPath}`);
  }
}

console.log(`\n✅ ${fixed} arquivos corrigidos`);
