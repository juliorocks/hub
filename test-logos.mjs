import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const testPages = [
  {
    name: 'UNIC',
    url: 'file:///c:/Users/ojuli/MELHORES%20CURSOS/pages/universidades/unic.html',
    expectedLogoSrc: '../../../assets/images/universidades/unic-logo.png'
  },
  {
    name: 'Pitágoras',
    url: 'file:///c:/Users/ojuli/MELHORES%20CURSOS/pages/universidades/pitagoras.html',
    expectedLogoSrc: '../../../assets/images/universidades/pitagoras-logo.png'
  },
  {
    name: 'Uniderp',
    url: 'file:///c:/Users/ojuli/MELHORES%20CURSOS/pages/universidades/uniderp.html',
    expectedLogoSrc: '../../../assets/images/universidades/uniderp-logo.png'
  }
];

async function runTests() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n========================================');
  console.log('TESTE DE LOGOS - PÁGINAS DE UNIVERSIDADES');
  console.log('========================================\n');

  const results = {
    passed: [],
    failed: []
  };

  for (const testPage of testPages) {
    console.log(`\n>>> Testando: ${testPage.name}`);
    console.log(`    URL: ${testPage.url}\n`);

    try {
      // Coletar erros de console
      const consoleMessages = [];
      page.on('console', msg => {
        consoleMessages.push({
          type: msg.type(),
          text: msg.text()
        });
      });

      // Navegar para a página
      await page.goto(testPage.url, { waitUntil: 'networkidle' });

      // Teste 1: Logo carregando na seção hero
      console.log('  [TESTE 1] Logo carregando na seção hero');
      const logoImage = page.locator('img.institution-hero__logo');
      const isVisible = await logoImage.isVisible({ timeout: 5000 }).catch(() => false);

      if (isVisible) {
        console.log('    ✓ Logo está visível na seção hero');
      } else {
        throw new Error('Logo não está visível na seção hero');
      }

      // Teste 2: Verificar src correto
      console.log('  [TESTE 2] Verificar caminho da imagem');
      const srcAttribute = await logoImage.getAttribute('src');
      if (srcAttribute === testPage.expectedLogoSrc) {
        console.log(`    ✓ Caminho correto: ${srcAttribute}`);
      } else {
        throw new Error(`Caminho incorreto. Esperado: ${testPage.expectedLogoSrc}, Obtido: ${srcAttribute}`);
      }

      // Teste 3: Alt text
      console.log('  [TESTE 3] Verificar atributo alt');
      const altText = await logoImage.getAttribute('alt');
      if (altText && altText.includes('Logo')) {
        console.log(`    ✓ Alt text correto: "${altText}"`);
      } else {
        throw new Error(`Alt text faltando ou incorreto: "${altText}"`);
      }

      // Teste 4: Dimensões
      console.log('  [TESTE 4] Verificar dimensões');
      const width = await logoImage.getAttribute('width');
      const height = await logoImage.getAttribute('height');
      if (width && height) {
        console.log(`    ✓ Dimensões definidas: ${width}x${height}px`);
      } else {
        throw new Error('Dimensões não definidas');
      }

      // Teste 5: Imagem carregada completamente
      console.log('  [TESTE 5] Verificar se imagem está completamente carregada');
      const isImageLoaded = await page.evaluate(async () => {
        const img = document.querySelector('img.institution-hero__logo');
        return img && img.complete && img.naturalHeight > 0;
      });
      if (isImageLoaded) {
        console.log('    ✓ Imagem está completamente carregada');
      } else {
        throw new Error('Imagem não está completamente carregada');
      }

      // Teste 6: Tamanho natural da imagem
      console.log('  [TESTE 6] Verificar tamanho natural (não é 0x0)');
      const dimensions = await page.evaluate(() => {
        const img = document.querySelector('img.institution-hero__logo');
        return {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth: img.offsetWidth,
          displayHeight: img.offsetHeight
        };
      });

      if (dimensions.naturalWidth > 0 && dimensions.naturalHeight > 0) {
        console.log(`    ✓ Tamanho natural: ${dimensions.naturalWidth}x${dimensions.naturalHeight}px`);
        console.log(`    ✓ Tamanho exibido: ${dimensions.displayWidth}x${dimensions.displayHeight}px`);
      } else {
        throw new Error(`Tamanho natural inválido: ${dimensions.naturalWidth}x${dimensions.naturalHeight}px`);
      }

      // Teste 7: Nenhum placeholder ou ícone quebrado
      console.log('  [TESTE 7] Verificar ausência de placeholders ou ícones quebrados');
      const classes = await logoImage.getAttribute('class');
      if (!classes.includes('broken') && !classes.includes('placeholder') && !classes.includes('error')) {
        console.log('    ✓ Sem classes de erro ou placeholder');
      } else {
        throw new Error(`Classes inválidas encontradas: ${classes}`);
      }

      // Teste 8: Verificar se está visível (não hidden)
      console.log('  [TESTE 8] Verificar se está visível (não hidden)');
      const isHidden = await page.evaluate(() => {
        const img = document.querySelector('img.institution-hero__logo');
        const style = window.getComputedStyle(img);
        return style.display === 'none' || style.visibility === 'hidden';
      });
      if (!isHidden) {
        console.log('    ✓ Logo não está oculto (display e visibility corretos)');
      } else {
        throw new Error('Logo está oculto (display:none ou visibility:hidden)');
      }

      // Teste 9: Sem erros de console
      console.log('  [TESTE 9] Verificar erros de console');
      const errorMessages = consoleMessages.filter(msg => msg.type === 'error');
      const imageErrors = errorMessages.filter(msg =>
        msg.text.toLowerCase().includes('image') ||
        msg.text.toLowerCase().includes('logo') ||
        msg.text.toLowerCase().includes('404') ||
        msg.text.toLowerCase().includes('failed to load')
      );

      if (imageErrors.length === 0) {
        console.log('    ✓ Nenhum erro de console relacionado a imagens');
      } else {
        console.log('    ✗ Erros de console encontrados:');
        imageErrors.forEach(err => {
          console.log(`      - ${err.text}`);
        });
        throw new Error(`Erros de console: ${imageErrors.map(e => e.text).join('; ')}`);
      }

      console.log(`\n  ✓ TODOS OS TESTES PASSARAM PARA ${testPage.name.toUpperCase()}`);
      results.passed.push(testPage.name);

    } catch (error) {
      console.log(`\n  ✗ TESTE FALHOU: ${error.message}`);
      results.failed.push({
        name: testPage.name,
        error: error.message
      });
    }

    // Limpar listeners
    page.removeAllListeners('console');
  }

  await browser.close();

  // Relatório final
  console.log('\n\n========================================');
  console.log('RELATÓRIO FINAL');
  console.log('========================================\n');

  console.log(`Testes Passados: ${results.passed.length}/${testPages.length}`);
  if (results.passed.length > 0) {
    results.passed.forEach(name => {
      console.log(`  ✓ ${name}`);
    });
  }

  if (results.failed.length > 0) {
    console.log(`\nTestes Falhados: ${results.failed.length}/${testPages.length}`);
    results.failed.forEach(item => {
      console.log(`  ✗ ${item.name}`);
      console.log(`    Motivo: ${item.error}`);
    });
  }

  console.log('\n========================================\n');

  process.exit(results.failed.length > 0 ? 1 : 0);
}

runTests().catch(console.error);
