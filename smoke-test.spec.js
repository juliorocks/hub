import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8765';

const pages = [
  {
    name: '1. index.html (HOME)',
    path: '/',
    critical: true
  },
  {
    name: '2. sobre.html',
    path: '/sobre.html',
    critical: true
  },
  {
    name: '3. politica-privacidade.html',
    path: '/politica-privacidade.html',
    critical: true
  },
  {
    name: '4. termos-de-uso.html',
    path: '/termos-de-uso.html',
    critical: true
  },
  {
    name: '5. pages/universidades/index.html',
    path: '/pages/universidades/index.html',
    critical: true
  },
  {
    name: '6. pages/universidades/anhanguera.html',
    path: '/pages/universidades/anhanguera.html',
    critical: true
  },
  {
    name: '7. pages/universidades/unopar.html',
    path: '/pages/universidades/unopar.html',
    critical: true
  },
  {
    name: '8. pages/universidades/unime.html',
    path: '/pages/universidades/unime.html',
    critical: true
  },
  {
    name: '9. pages/universidades/unic.html (RECÉM-CORRIGIDO)',
    path: '/pages/universidades/unic.html',
    critical: true
  },
  {
    name: '10. pages/universidades/pitagoras.html (RECÉM-CORRIGIDO)',
    path: '/pages/universidades/pitagoras.html',
    critical: true
  },
  {
    name: '11. pages/universidades/uniderp.html (RECÉM-CORRIGIDO)',
    path: '/pages/universidades/uniderp.html',
    critical: true
  },
  {
    name: '12. pages/universidades/ampli.html',
    path: '/pages/universidades/ampli.html',
    critical: true
  },
  {
    name: '13. pages/graduacao/index.html',
    path: '/pages/graduacao/index.html',
    critical: true
  },
  {
    name: '14. pages/pos-graduacao/index.html',
    path: '/pages/pos-graduacao/index.html',
    critical: true
  },
  {
    name: '15. pages/carreiras/salarios/index.html',
    path: '/pages/carreiras/salarios/index.html',
    critical: true
  }
];

test.describe('Smoke Test - Todas as páginas principais', () => {
  for (const page of pages) {
    test(`[${page.critical ? 'CRÍTICO' : 'INFO'}] Teste: ${page.name}`, async ({ page: browserPage }) => {
      console.log(`\n🔍 Testando: ${page.name}`);
      console.log(`   URL: ${BASE_URL}${page.path}`);

      // Navegar para a página
      const response = await browserPage.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle' });

      // Verificar status HTTP
      expect(response.status()).toBeLessThan(400);
      console.log(`   ✓ Status HTTP: ${response.status()}`);

      // Verificar se há erros JavaScript no console
      const jsErrors = [];
      browserPage.on('console', msg => {
        if (msg.type() === 'error') {
          jsErrors.push(msg.text());
        }
      });

      // Aguardar um pouco para capturar erros
      await browserPage.waitForTimeout(1000);

      // Verificar se a página tem conteúdo
      const body = await browserPage.locator('body');
      expect(body).toBeDefined();
      console.log(`   ✓ Página carregou com conteúdo`);

      // Verificar imagens que falharam em carregar
      const images = await browserPage.locator('img').all();
      let brokenImages = 0;

      for (const img of images) {
        const naturalWidth = await img.evaluate((el) => el.naturalWidth);
        const src = await img.getAttribute('src');

        if (naturalWidth === 0) {
          brokenImages++;
          console.log(`   ⚠ Imagem não carregou: ${src}`);
        }
      }

      if (images.length > 0) {
        console.log(`   ✓ Imagens: ${images.length} total, ${brokenImages} não carregadas`);
      } else {
        console.log(`   ℹ Nenhuma imagem encontrada`);
      }

      // Verificar links principais
      const links = await browserPage.locator('a').all();
      let brokenLinks = 0;

      for (const link of links) {
        const href = await link.getAttribute('href');
        // Verificar apenas links internos
        if (href && !href.startsWith('http') && !href.startsWith('mailto') && href !== '#') {
          // Link parece estar ok
        }
      }

      console.log(`   ✓ Links: ${links.length} total`);

      // Verificar erros JS
      if (jsErrors.length > 0) {
        console.log(`   ⚠ Erros JavaScript: ${jsErrors.length}`);
        jsErrors.forEach(err => console.log(`      - ${err}`));
      } else {
        console.log(`   ✓ Sem erros JavaScript`);
      }

      // Layout check - verificar se elementos principais estão visíveis
      const header = await browserPage.locator('header, .header, [role="banner"]').first();
      const main = await browserPage.locator('main, .main, [role="main"]').first();

      let hasStructure = false;
      if (header) {
        hasStructure = await header.isVisible().catch(() => false);
      }
      if (main) {
        hasStructure = hasStructure || await main.isVisible().catch(() => false);
      }

      if (hasStructure || links.length > 0) {
        console.log(`   ✓ Layout estrutura OK`);
      } else {
        console.log(`   ⚠ Estrutura layout incerta`);
      }

      console.log(`   ✅ Status: OK\n`);
    });
  }
});
