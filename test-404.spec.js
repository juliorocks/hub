import { test } from '@playwright/test';

test.describe('Investigar 404', () => {
  test('Requisições com erro na UNIC', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.method()
      });
    });

    await page.goto('/pages/universidades/unic.html');
    await page.waitForTimeout(1500);

    console.log('\n=== Requisições falhadas ===');
    failedRequests.forEach(req => {
      console.log(`${req.method} ${req.url}`);
    });
  });
});
