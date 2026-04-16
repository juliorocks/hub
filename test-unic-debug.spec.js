import { test } from '@playwright/test';

test.describe('Debug UNIC', () => {
  test('Encontrar requisição 404', async ({ page }) => {
    const responses = [];
    
    page.on('response', response => {
      responses.push({
        status: response.status(),
        url: response.url()
      });
    });

    await page.goto('/pages/universidades/unic.html');
    await page.waitForTimeout(2000);

    console.log('\n=== Todas as requisições ===');
    responses.forEach(resp => {
      if (resp.status !== 200 && resp.status !== 304) {
        console.log(`${resp.status} ${resp.url}`);
      }
    });
    
    const failures = responses.filter(r => r.status >= 400);
    if (failures.length === 0) {
      console.log('(Nenhuma falha encontrada)');
    }
  });
});
