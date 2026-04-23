import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Acessando site da Anhanguera...');
    await page.goto('https://www.anhanguera.com/cursos/?utm_campaign=home-graduacao&utm_medium=header&utm_source=site-aedu', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('Aguardando conteúdo...');
    await page.waitForTimeout(5000);

    // Get page HTML
    const html = await page.content();

    // Save HTML to file to inspect
    fs.writeFileSync('anhanguera-page.html', html);

    console.log('✓ HTML salvo em anhanguera-page.html');
    console.log(`Tamanho: ${html.length} bytes`);

    // Get text content
    const text = await page.evaluate(() => document.body.innerText);
    console.log('\n=== CONTEÚDO TEXT (PRIMEIRAS 2000 CHARS) ===\n');
    console.log(text.substring(0, 2000));

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await browser.close();
  }
})();
