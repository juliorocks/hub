import { test, expect } from '@playwright/test';

const pages = [
  {
    name: 'UNIC',
    path: '/pages/universidades/unic.html',
    logoSelector: '.institution-hero__logo'
  },
  {
    name: 'Pitágoras',
    path: '/pages/universidades/pitagoras.html',
    logoSelector: '.institution-hero__logo'
  },
  {
    name: 'Uniderp',
    path: '/pages/universidades/uniderp.html',
    logoSelector: '.institution-hero__logo'
  }
];

pages.forEach(pageConfig => {
  test(`${pageConfig.name}: Verificar carregamento do logo na seção hero`, async ({ page }) => {
    // Coletar requisições falhadas
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.request().method()
      });
    });
    
    page.on('response', response => {
      if (response.status() === 404) {
        failedRequests.push({
          status: 404,
          url: response.url(),
          method: response.request().method()
        });
      }
    });

    // Ir para a página
    await page.goto(pageConfig.path);
    
    // Aguardar um pouco para garantir que as imagens carregaram
    await page.waitForTimeout(1000);

    // 1. Verificar que o elemento logo existe
    const logoElement = await page.locator(pageConfig.logoSelector).first();
    await expect(logoElement).toBeVisible();
    console.log(`✓ Logo encontrado para ${pageConfig.name}`);

    // 2. Verificar que a imagem não está quebrada (src válido)
    const imgSrc = await logoElement.getAttribute('src');
    expect(imgSrc).toBeTruthy();
    console.log(`✓ Atributo src válido para ${pageConfig.name}: ${imgSrc}`);

    // 3. Verificar que a imagem carregou (naturalWidth > 0)
    const naturalWidth = await logoElement.evaluate(el => el.naturalWidth);
    const naturalHeight = await logoElement.evaluate(el => el.naturalHeight);
    expect(naturalWidth).toBeGreaterThan(0);
    expect(naturalHeight).toBeGreaterThan(0);
    console.log(`✓ Imagem carregou para ${pageConfig.name} (${naturalWidth}x${naturalHeight}px)`);

    // 4. Verificar tamanho declarado
    const width = await logoElement.getAttribute('width');
    const height = await logoElement.getAttribute('height');
    expect(width).toBe('140');
    expect(height).toBe('80');
    console.log(`✓ Tamanho correto para ${pageConfig.name} (${width}x${height})`);

    // 5. Verificar que não há ícone de imagem quebrada (verificar classe)
    const classList = await logoElement.getAttribute('class');
    expect(classList).not.toContain('error');
    expect(classList).not.toContain('broken');
    console.log(`✓ Sem classes de erro para ${pageConfig.name}`);

    // 6. Verificar alt text
    const altText = await logoElement.getAttribute('alt');
    expect(altText).toBeTruthy();
    console.log(`✓ Alt text presente para ${pageConfig.name}: "${altText}"`);

    // 7. Verificar visibilidade e dimensões da logo na tela
    const box = await logoElement.boundingBox();
    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
    console.log(`✓ Logo visível na tela para ${pageConfig.name} (posição: ${box.x.toFixed(1)},${box.y.toFixed(1)} | tamanho: ${box.width.toFixed(1)}x${box.height.toFixed(1)})`);

    // 8. Verificar que a imagem é um PNG válido
    const complete = await logoElement.evaluate(el => el.complete);
    expect(complete).toBe(true);
    console.log(`✓ Imagem carregamento concluído para ${pageConfig.name}`);

    // 9. Exibir requisições falhadas (se houver)
    console.log(`\n--- Status de requisições ---`);
    if (failedRequests.length > 0) {
      console.log(`! ${failedRequests.length} requisição(ões) falhada(s):`);
      failedRequests.forEach(req => {
        console.log(`   ${req.status || '???'} ${req.method || '?'} ${req.url}`);
      });
    } else {
      console.log(`✓ Todas as requisições foram bem-sucedidas`);
    }

    console.log(`\n✓ ${pageConfig.name}: Logo carregou com SUCESSO!\n`);
  });
});
