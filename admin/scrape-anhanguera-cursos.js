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

    console.log('Página carregada. Aguardando conteúdo...');
    await page.waitForTimeout(3000);

    // Extract all courses
    const cursos = await page.evaluate(() => {
      const courses = [];

      // Try different selectors to find course elements
      const courseElements = document.querySelectorAll(
        '[class*="curso"], [class*="course"], [class*="card"], a[href*="curso"], a[href*="course"]'
      );

      // Extract course data
      courseElements.forEach((el) => {
        const text = el.textContent?.trim();
        const href = el.getAttribute('href');

        if (text && text.length > 3 && text.length < 200) {
          courses.push({
            name: text,
            url: href
          });
        }
      });

      // Remove duplicates
      const unique = [];
      const seen = new Set();

      courses.forEach((course) => {
        if (!seen.has(course.name)) {
          seen.add(course.name);
          unique.push(course);
        }
      });

      return unique;
    });

    console.log(`\n✓ Encontrados ${cursos.length} cursos`);
    console.log('\n=== CURSOS DA ANHANGUERA ===\n');

    cursos.forEach((curso, index) => {
      console.log(`${index + 1}. ${curso.name}`);
      if (curso.url) console.log(`   URL: ${curso.url}`);
    });

    // Save to JSON
    fs.writeFileSync(
      'cursos-anhanguera.json',
      JSON.stringify(cursos, null, 2)
    );

    console.log('\n✓ Dados salvos em cursos-anhanguera.json');

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await browser.close();
  }
})();
