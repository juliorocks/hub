import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const logs = [];
p.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
p.on('pageerror', e => logs.push(`[ERR] ${e.message}`));
await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);

// Patch: adicionar listener manualmente para testar
await p.evaluate(() => {
  const inp = document.getElementById('header-search-input');
  if (inp) {
    inp.dispatchEvent(new Event('input'));
    console.log('dispatched input event, value:', inp.value);
  }
});
console.log('LOGS:', logs.join('\n'));
await browser.close();
