import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:8765';

const pages = [
  { name: '1. index.html (HOME)', path: '/' },
  { name: '2. sobre.html', path: '/sobre.html' },
  { name: '3. politica-privacidade.html', path: '/politica-privacidade.html' },
  { name: '4. termos-de-uso.html', path: '/termos-de-uso.html' },
  { name: '5. pages/universidades/index.html', path: '/pages/universidades/index.html' },
  { name: '6. pages/universidades/anhanguera.html', path: '/pages/universidades/anhanguera.html' },
  { name: '7. pages/universidades/unopar.html', path: '/pages/universidades/unopar.html' },
  { name: '8. pages/universidades/unime.html', path: '/pages/universidades/unime.html' },
  { name: '9. pages/universidades/unic.html (RECÉM-CORRIGIDO)', path: '/pages/universidades/unic.html' },
  { name: '10. pages/universidades/pitagoras.html (RECÉM-CORRIGIDO)', path: '/pages/universidades/pitagoras.html' },
  { name: '11. pages/universidades/uniderp.html (RECÉM-CORRIGIDO)', path: '/pages/universidades/uniderp.html' },
  { name: '12. pages/universidades/ampli.html', path: '/pages/universidades/ampli.html' },
  { name: '13. pages/graduacao/index.html', path: '/pages/graduacao/index.html' },
  { name: '14. pages/pos-graduacao/index.html', path: '/pages/pos-graduacao/index.html' },
  { name: '15. pages/carreiras/salarios/index.html', path: '/pages/carreiras/salarios/index.html' }
];

// Criar diretório de screenshots
const screenshotsDir = path.join(process.cwd(), 'smoke-test-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Smoke Test Visual - Todas as páginas principais', () => {
  for (const page of pages) {
    test(`${page.name}`, async ({ page: browserPage }) => {
      const response = await browserPage.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' });

      // Salvar screenshot
      const safeFileName = page.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const screenshotPath = path.join(screenshotsDir, `${safeFileName}.png`);

      await browserPage.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`✓ Screenshot salvo: ${screenshotPath}`);

      // Assertions
      expect(response.status()).toBeLessThan(400);
    });
  }
});
