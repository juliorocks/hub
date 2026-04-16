import { test, expect } from '@playwright/test';

test('Debug - Verificar caminhos de imagem', async ({ page }) => {
  // UNIC
  await page.goto('file:///c:/Users/ojuli/MELHORES%20CURSOS/pages/universidades/unic.html');
  
  // Verificar o src da imagem
  const img = page.locator('.institution-hero__logo').first();
  const src = await img.getAttribute('src');
  console.log('UNIC logo src:', src);
  
  // Tentar resolver o caminho
  const resolvedPath = await img.evaluate(el => {
    console.log('Elemento:', el);
    console.log('src:', el.src);
    console.log('currentSrc:', el.currentSrc);
    console.log('naturalWidth:', el.naturalWidth);
    console.log('complete:', el.complete);
    console.log('error:', el.error);
    return {
      src: el.src,
      complete: el.complete,
      naturalWidth: el.naturalWidth
    };
  });
  
  console.log('Resolved:', resolvedPath);
});
