import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
await p.click('#hero-search');
await p.type('#hero-search', 'med', { delay: 60 });
await p.waitForTimeout(900);
const info = await p.evaluate(() => {
  const dd = document.querySelector('.home-hero__search .search-results');
  const hero = document.querySelector('.home-hero');
  const rect = dd?.getBoundingClientRect();
  return {
    ddVisible: dd?.classList.contains('is-visible'),
    ddRect: rect ? { top: rect.top, bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right } : null,
    heroOverflow: getComputedStyle(hero).overflow,
    ddZIndex: getComputedStyle(dd).zIndex,
    ddPos: getComputedStyle(dd).position,
    innerCount: dd?.querySelectorAll('.search-item').length
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
