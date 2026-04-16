import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'file:///c:/Users/ojuli/MELHORES%20CURSOS';
const SCREENSHOTS_DIR = '/c/Users/ojuli/MELHORES CURSOS/test-screenshots';
const REPORTS_DIR = '/c/Users/ojuli/MELHORES CURSOS/test-reports';

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(REPORTS_DIR, { recursive: true });

const PAGES = [
  { name: 'HOME', path: '/', file: 'index.html' },
  { name: 'SOBRE', path: '/sobre.html', file: 'sobre.html' },
  { name: 'PRIVACIDADE', path: '/politica-privacidade.html', file: 'politica-privacidade.html' },
  { name: 'TERMOS', path: '/termos-de-uso.html', file: 'termos-de-uso.html' },
  { name: 'UNIVERSIDADES', path: '/pages/universidades/', file: 'pages/universidades/index.html' },
  { name: 'ANHANGUERA', path: '/pages/universidades/anhanguera.html', file: 'pages/universidades/anhanguera.html' },
  { name: 'UNOPAR', path: '/pages/universidades/unopar.html', file: 'pages/universidades/unopar.html' },
  { name: 'UNIME', path: '/pages/universidades/unime.html', file: 'pages/universidades/unime.html' },
  { name: 'UNIC', path: '/pages/universidades/unic.html', file: 'pages/universidades/unic.html' },
  { name: 'PITAGORAS', path: '/pages/universidades/pitagoras.html', file: 'pages/universidades/pitagoras.html' },
  { name: 'UNIDERP', path: '/pages/universidades/uniderp.html', file: 'pages/universidades/uniderp.html' },
  { name: 'AMPLI', path: '/pages/universidades/ampli.html', file: 'pages/universidades/ampli.html' },
  { name: 'GRADUACAO', path: '/pages/graduacao/', file: 'pages/graduacao/index.html' },
  { name: 'POS-GRADUACAO', path: '/pages/pos-graduacao/', file: 'pages/pos-graduacao/index.html' },
  { name: 'CARREIRAS', path: '/pages/carreiras/salarios/', file: 'pages/carreiras/salarios/index.html' },
];

const results = [];

async function checkImages(page) {
  const errors = [];
  const images = await page.$$eval('img', (imgs) =>
    imgs.map((img) => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
    }))
  );

  for (const img of images) {
    if (!img.complete || img.naturalWidth === 0) {
      errors.push(`Imagem nao carregada: ${img.src}`);
    }
  }
  return errors;
}

async function checkLayout(page) {
  const errors = [];
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  if (overflow) {
    errors.push('Layout quebrado: overflow horizontal');
  }
  return errors;
}

async function checkLogo(page) {
  const errors = [];
  const logos = await page.$$eval('img[class*="logo"]', (imgs) =>
    imgs.map((img) => ({
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
    }))
  ).catch(() => []);

  for (const logo of logos) {
    if (!logo.complete || logo.naturalWidth === 0) {
      errors.push(`Logo nao carregada: ${logo.src}`);
    }
  }
  return errors;
}

async function takeScreenshot(page, name, index) {
  try {
    const filename = `${String(index).padStart(2, '0')}-${name.replace(/\s/g, '-').toLowerCase()}.png`;
    const filepath = path.join(SCREENSHOTS_DIR, filename);
    await page.screenshot({ path: filepath, fullPage: true });
    return filepath;
  } catch (e) {
    return null;
  }
}

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });

  console.log('\n' + '='.repeat(80));
  console.log('TESTE VISUAL - PORTAL MELHORES CURSOS');
  console.log('='.repeat(80) + '\n');

  for (let i = 0; i < PAGES.length; i++) {
    const config = PAGES[i];
    const page = await context.newPage();

    try {
      const url = `${BASE_URL}${config.path}`;
      console.log(`[${i + 1}/${PAGES.length}] ${config.name}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle' });
      } catch (e) {
        // ignore
      }

      await page.waitForTimeout(1000);

      const errors = [];
      errors.push(...(await checkImages(page)));
      errors.push(...(await checkLayout(page)));
      errors.push(...(await checkLogo(page)));

      const screenshot = await takeScreenshot(page, config.name, i + 1);

      results.push({
        index: i + 1,
        page: config.name,
        url: url,
        file: config.file,
        screenshot: screenshot,
        errors: errors,
      });

      if (errors.length > 0) {
        console.log(`  Erros: ${errors.length}`);
      } else {
        console.log(`  OK`);
      }
    } catch (error) {
      console.log(`  ERRO: ${error.message.substring(0, 50)}`);
      results.push({
        index: i + 1,
        page: config.name,
        url: `${BASE_URL}${config.path}`,
        file: config.file,
        screenshot: null,
        errors: [error.message],
      });
    } finally {
      await page.close();
    }
  }

  await context.close();
  await browser.close();

  const jsonPath = path.join(REPORTS_DIR, 'relatorio-visual.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`\nRelatorio salvo: ${jsonPath}`);

  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  console.log(`\nTotal de erros: ${totalErrors}`);
}

runTests().catch(console.error);
