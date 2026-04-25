/**
 * Reconstrói assets/data/search-index.json a partir do Firestore.
 * Mantém as entradas estáticas de cursos/universidades e adiciona todos os artigos.
 * Uso: node admin/rebuild-search-index.js
 */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(path.join(__dirname, '..', 'firebase-service-account.json'), 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

// Mantém entradas estáticas que NÃO são artigos (cursos, universidades, pós, carreiras)
const STATIC_INDEX_PATH = path.join(__dirname, '..', 'assets', 'data', 'search-index.json');
const existing = JSON.parse(readFileSync(STATIC_INDEX_PATH, 'utf8'));
const staticEntries = existing.filter(e => e.type !== 'artigo');

// Mapeia categoria do artigo → emoji, cor e label
const CATEGORY_META = {
  'guias':              { emoji: '📚', color: '#7c3aed', label: 'Guias' },
  'enem-2026':          { emoji: '📝', color: '#0ea5e9', label: 'ENEM 2026' },
  'carreiras/salarios': { emoji: '💼', color: '#f59e0b', label: 'Carreiras & Salários' },
  'default':            { emoji: '📄', color: '#6b7280', label: 'Artigo' },
};

// Gera URL do artigo a partir da categoria e slug
function articleUrl(category, slug) {
  if (category === 'guias')              return `/pages/guias/${slug}`;
  if (category === 'enem-2026')          return `/pages/enem-2026/${slug}`;
  if (category === 'carreiras/salarios') return `/pages/carreiras/salarios/${slug}`;
  return `/pages/${category}/${slug}`;
}

const snap = await db.collection('articles').get();
const articleEntries = [];

snap.forEach(doc => {
  const a = doc.data();
  if (!a.slug || !a.title) return;

  const meta = CATEGORY_META[a.category] || CATEGORY_META['default'];

  // Gera keywords a partir do título e excerpt (com versão sem acento para busca)
  const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const rawText = a.title + ' ' + (a.excerpt || '');
  const words = rawText.toLowerCase()
    .replace(/[^\wÀ-ÿ\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3)
    .slice(0, 8);
  const wordsNorm = words.map(normalize).filter(w => !words.includes(w));

  articleEntries.push({
    type: 'artigo',
    area: a.category || 'geral',
    areaLabel: meta.label,
    areaColor: meta.color,
    title: a.title,
    excerpt: a.excerpt || a.metaDescription || '',
    keywords: [...new Set([...words, ...wordsNorm])],
    url: articleUrl(a.category, a.slug),
    emoji: meta.emoji,
    image: a.image || null,
    publishDate: a.publishDate || null,
  });
});

const finalIndex = [...staticEntries, ...articleEntries];

writeFileSync(STATIC_INDEX_PATH, JSON.stringify(finalIndex, null, 2), 'utf8');

console.log(`✅ search-index.json reconstruído`);
console.log(`   Entradas estáticas: ${staticEntries.length}`);
console.log(`   Artigos do Firestore: ${articleEntries.length}`);
console.log(`   Total: ${finalIndex.length}`);

process.exit(0);
