#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const REQUIRED_ELEMENTS = {
  '<!DOCTYPE html>': 'DOCTYPE declaration',
  '<html': 'HTML tag',
  '<head>': 'Head tag',
  '<body': 'Body tag',
  'components-loader.js': 'Components loader script',
  'main.js': 'Main script',
  'base.css': 'Base CSS',
  'layout.css': 'Layout CSS',
  'components.css': 'Components CSS',
};

const WARNINGS = {
  'type="module" src="../../assets/js/components-loader.js"': 'Using type="module" on components-loader (file:// incompatible)',
  'type="module" src="../../../assets/js/components-loader.js"': 'Using type="module" on components-loader (file:// incompatible)',
  'type="module" src="../../../../assets/js/components-loader.js"': 'Using type="module" on components-loader (file:// incompatible)',
};

class PageValidator {
  constructor() {
    this.results = {
      total: 0,
      valid: 0,
      warnings: 0,
      errors: 0,
      pages: []
    };
  }

  validatePage(filePath) {
    const relativePath = path.relative(projectRoot, filePath);
    const result = {
      path: relativePath,
      valid: true,
      issues: [],
      warnings: []
    };

    try {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Verificar elementos obrigatórios
      for (const [element, description] of Object.entries(REQUIRED_ELEMENTS)) {
        if (!content.includes(element)) {
          result.issues.push(`Missing: ${description}`);
          result.valid = false;
        }
      }

      // Verificar avisos
      for (const [warning, description] of Object.entries(WARNINGS)) {
        if (content.includes(warning)) {
          result.warnings.push(description);
        }
      }

      // Verificar estrutura de componentes
      if (!content.includes('<script') || !content.includes('components-loader')) {
        result.issues.push('Components loader not properly included');
        result.valid = false;
      }

      // Verificar breadcrumb (para páginas não-raiz)
      if (filePath.includes('pages/') && !content.includes('breadcrumb')) {
        result.warnings.push('Missing breadcrumb navigation');
      }

      // Verificar se tem main content (main tag ou section para layout alternativo)
      if (!content.includes('<main') && !content.includes('id="main') && !content.includes('<section')) {
        result.issues.push('Missing main content area');
        result.valid = false;
      }

      // Verificar viewport meta tag
      if (!content.includes('viewport')) {
        result.issues.push('Missing viewport meta tag');
        result.valid = false;
      }

      // Verificar charset
      if (!content.includes('charset')) {
        result.issues.push('Missing charset meta tag');
        result.valid = false;
      }

      // Validar caminhos relativos (não devem ter caminhos absolutos para assets)
      const absoluteAssetPaths = content.match(/href="\/assets/g) || [];
      if (absoluteAssetPaths.length > 0) {
        result.issues.push(`Found ${absoluteAssetPaths.length} absolute asset paths (use relative paths)`);
        result.valid = false;
      }

      // Verificar se links internos existem (amostra)
      this.validateInternalLinks(filePath, content, result);

    } catch (error) {
      result.issues.push(`Error reading file: ${error.message}`);
      result.valid = false;
    }

    this.results.pages.push(result);
    this.results.total++;

    if (result.valid && result.warnings.length === 0) {
      this.results.valid++;
    } else if (result.valid && result.warnings.length > 0) {
      this.results.warnings++;
    } else {
      this.results.errors++;
    }

    return result;
  }

  validateInternalLinks(filePath, content, result) {
    const fileDir = path.dirname(filePath);

    // Encontra hrefs para arquivos locais (não URLs externas)
    const hrefMatches = content.matchAll(/href="([^"]+\.html[^"]*)"/g);

    for (const match of hrefMatches) {
      let href = match[1];

      // Ignora links externos e anchors
      if (href.startsWith('http') || href.startsWith('#')) continue;

      // Resolve o caminho relativo
      const resolvedPath = path.resolve(fileDir, href);

      // Verifica se o arquivo existe (apenas uma amostra de links)
      if (!fs.existsSync(resolvedPath)) {
        // Ignora alguns erros comuns (links para páginas em desenvolvimento)
        if (!href.includes('anuncie') && !href.includes('contato')) {
          result.warnings.push(`Possible broken link: ${href}`);
        }
      }
    }
  }

  walkPages(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.walkPages(filePath);
      } else if (file.endsWith('.html')) {
        this.validatePage(filePath);
      }
    }
  }

  printReport() {
    console.clear();
    console.log('📊 PAGE VALIDATION REPORT\n');
    console.log(`Total pages: ${this.results.total}`);
    console.log(`✅ Valid: ${this.results.valid}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`❌ Errors: ${this.results.errors}`);

    // Páginas com erros
    const errorPages = this.results.pages.filter(p => p.issues.length > 0);
    if (errorPages.length > 0) {
      console.log(`\n${'='.repeat(60)}`);
      console.log('❌ PAGES WITH ERRORS:');
      console.log('='.repeat(60));
      for (const page of errorPages) {
        console.log(`\n📄 ${page.path}`);
        for (const issue of page.issues) {
          console.log(`   ❌ ${issue}`);
        }
        if (page.warnings.length > 0) {
          for (const warning of page.warnings) {
            console.log(`   ⚠️  ${warning}`);
          }
        }
      }
    }

    // Páginas com avisos
    const warningPages = this.results.pages.filter(p => p.issues.length === 0 && p.warnings.length > 0);
    if (warningPages.length > 0) {
      console.log(`\n${'='.repeat(60)}`);
      console.log('⚠️  PAGES WITH WARNINGS:');
      console.log('='.repeat(60));
      for (const page of warningPages) {
        console.log(`\n📄 ${page.path}`);
        for (const warning of page.warnings) {
          console.log(`   ⚠️  ${warning}`);
        }
      }
    }

    // Resumo final
    console.log(`\n${'='.repeat(60)}`);
    if (this.results.errors === 0) {
      console.log('✅ ALL PAGES VALIDATED SUCCESSFULLY!');
    } else {
      console.log(`❌ ${this.results.errors} pages have errors that need fixing`);
    }
    console.log('='.repeat(60));
  }
}

console.log('🔍 Starting page validation...\n');

const validator = new PageValidator();

// Validar páginas
validator.walkPages(path.join(projectRoot, 'pages'));

// Validar páginas na raiz
const rootPages = ['index.html', 'sobre.html', 'politica-privacidade.html', 'termos-de-uso.html'];
for (const page of rootPages) {
  const filePath = path.join(projectRoot, page);
  if (fs.existsSync(filePath)) {
    validator.validatePage(filePath);
  }
}

// Mostrar relatório
validator.printReport();

// Retornar código de saída baseado em erros
process.exit(validator.results.errors > 0 ? 1 : 0);
