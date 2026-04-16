import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:8765';
const screenshotsDir = './smoke-test-screenshots';

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const pages = [
  { name: '01-HOME', path: '/' },
  { name: '02-sobre', path: '/sobre.html' },
  { name: '03-privacidade', path: '/politica-privacidade.html' },
  { name: '04-termos', path: '/termos-de-uso.html' },
  { name: '05-universidades', path: '/pages/universidades/index.html' },
  { name: '06-anhanguera', path: '/pages/universidades/anhanguera.html' },
  { name: '07-unopar', path: '/pages/universidades/unopar.html' },
  { name: '08-unime', path: '/pages/universidades/unime.html' },
  { name: '09-unic', path: '/pages/universidades/unic.html' },
  { name: '10-pitagoras', path: '/pages/universidades/pitagoras.html' },
  { name: '11-uniderp', path: '/pages/universidades/uniderp.html' },
  { name: '12-ampli', path: '/pages/universidades/ampli.html' },
  { name: '13-graduacao', path: '/pages/graduacao/index.html' },
  { name: '14-pos-graduacao', path: '/pages/pos-graduacao/index.html' },
  { name: '15-salarios', path: '/pages/carreiras/salarios/index.html' }
];

(async () => {
  const browser = await chromium.launch();

  for (const page of pages) {
    try {
      const browserPage = await browser.newPage();
      await browserPage.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' });
      
      const screenshotPath = path.join(screenshotsDir, `${page.name}.png`);
      await browserPage.screenshot({ path: screenshotPath, fullPage: true });
      
      console.log(`✓ ${page.name}: ${screenshotPath}`);
      await browserPage.close();
    } catch (error) {
      console.error(`✗ ${page.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\nScreenshots salvos em:', screenshotsDir);
})();
