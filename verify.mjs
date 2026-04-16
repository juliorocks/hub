import { chromium } from 'playwright';
import fs from 'fs';
const browser = await chromium.launch();
const out = 'c:/Users/ojuli/MELHORES CURSOS/verify-shots';
fs.mkdirSync(out, { recursive: true });

const d = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const dp = await d.newPage();
await dp.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
await dp.waitForTimeout(600);
await dp.click('#header-search-input');
await dp.type('#header-search-input', 'med', { delay: 70 });
await dp.waitForTimeout(1200);

const dd = await dp.evaluate(() => {
  const el = document.getElementById('search-results-dropdown');
  return { cls: el?.className, items: el?.querySelectorAll('.search-item').length };
});
console.log('header dd:', dd);

await dp.screenshot({ path: `${out}/desktop-header-med.png` });

await dp.click('#header-search-input', { clickCount: 3 });
await dp.type('#header-search-input', 'uni', { delay: 70 });
await dp.waitForTimeout(1200);
await dp.screenshot({ path: `${out}/desktop-header-uni.png` });

await dp.close(); await d.close();

// Mobile hero
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const mp = await m.newPage();
await mp.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
await mp.waitForTimeout(500);
await mp.click('#hero-search');
await mp.type('#hero-search', 'med', { delay: 70 });
await mp.waitForTimeout(1200);
await mp.screenshot({ path: `${out}/mobile-search.png` });
await mp.close(); await m.close();

await browser.close();
console.log('done');
