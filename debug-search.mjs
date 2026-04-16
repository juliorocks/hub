import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const p = await ctx.newPage();
const logs = [];
p.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
p.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.click('#hero-search');
await p.type('#hero-search', 'me', { delay: 100 });
await p.waitForTimeout(2500); // espera fetch + fuse

const state = await p.evaluate(() => {
  const input = document.getElementById('hero-search');
  const dropdown = document.querySelector('#hero-search ~ .search-results, .home-hero__search .search-results');
  return {
    value: input?.value,
    dropdownExists: !!dropdown,
    dropdownClass: dropdown?.className,
    dropdownHTML: dropdown?.innerHTML?.substring(0, 200),
  };
});
console.log('STATE:', JSON.stringify(state, null, 2));
console.log('LOGS:', logs.join('\n'));
await browser.close();
