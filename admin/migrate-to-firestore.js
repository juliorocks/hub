/**
 * Migração: HTMLs estáticos → Firestore
 *
 * Uso:
 *   node admin/migrate-to-firestore.js
 *
 * Requer firebase-service-account.json na raiz do projeto.
 * Não sobrescreve documentos já existentes com o mesmo slug+category.
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// --- Firebase Admin init ---
const saPath = path.join(ROOT, 'firebase-service-account.json');
if (!existsSync(saPath)) {
  console.error('❌ firebase-service-account.json não encontrado em', ROOT);
  console.error('   Baixe em: Firebase Console → Configurações do projeto → Contas de serviço → Gerar nova chave privada');
  process.exit(1);
}
const sa = JSON.parse(readFileSync(saPath, 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

// --- Helpers de parsing HTML ---
function extractMeta(html, name) {
  const m = html.match(new RegExp(`<meta name="${name}"[^>]*content="([^"]*)"`, 'i'))
           || html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"`, 'i'));
  return m ? m[1].trim() : '';
}

function extractTag(html, tag, cls) {
  const re = cls
    ? new RegExp(`<${tag}[^>]*class="[^"]*${cls}[^"]*"[^>]*>(.*?)</${tag}>`, 'si')
    : new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'si');
  const m = html.match(re);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : '';
}

function extractOgTitle(html) {
  const m = html.match(/property="og:title"\s+content="([^"]*)"/i)
          || html.match(/content="([^"]*)"\s+property="og:title"/i);
  return m ? m[1].trim() : '';
}

function extractContent(html) {
  const m = html.match(/<div[^>]*class="article-content"[^>]*id="article-content"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i)
          || html.match(/<div[^>]*id="article-content"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
  if (!m) return '';
  return m[1].trim();
}

function extractQuickAnswer(html) {
  const m = html.match(/<p[^>]*class="quick-answer__text"[^>]*>([\s\S]*?)<\/p>/i);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').trim();
}

function extractImage(html) {
  const m = html.match(/<header[^>]*class="article-hero"[^>]*>[\s\S]*?<img\s+src="([^"]+)"/i);
  return m ? m[1].trim() : '';
}

function extractDate(html) {
  const m = html.match(/datePublished":"([^"]+)"/);
  return m ? m[1].trim() : new Date().toISOString().split('T')[0];
}

function extractReadTime(html) {
  const m = html.match(/(\d+)\s*min\s*de\s*leitura/i);
  return m ? `${m[1]} min de leitura` : '5 min de leitura';
}

function extractBadge(html) {
  const m = html.match(/class="content-type-badge content-type-badge--(\w+)"[^>]*>([^<]+)</i);
  return m ? { type: m[1].trim(), label: m[2].trim() } : { type: 'guide', label: '' };
}

function extractBadgeTag(html) {
  const m = html.match(/class="badge badge--green"[^>]*>([^<]+)</i);
  return m ? m[1].trim() : '';
}

function extractSubtitle(html) {
  const m = html.match(/<p[^>]*class="article-hero__subtitle"[^>]*>([^<]+)</i);
  return m ? m[1].trim() : '';
}

function slugFromFilename(filename) {
  return filename.replace(/\.html$/, '');
}

// --- Mapeamento de pastas para categoria Firestore ---
const SOURCES = [
  { dir: path.join(ROOT, 'pages', 'guias'),                   category: 'guias' },
  { dir: path.join(ROOT, 'pages', 'enem-2026'),               category: 'enem-2026' },
  { dir: path.join(ROOT, 'pages', 'carreiras', 'salarios'),   category: 'carreiras/salarios' },
];

// --- Execução ---
let inserted = 0, skipped = 0, errors = 0;

for (const { dir, category } of SOURCES) {
  if (!existsSync(dir)) { console.log(`⚠️  Pasta não encontrada: ${dir}`); continue; }

  const files = readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');
  console.log(`\n📂 ${category} — ${files.length} arquivos`);

  for (const file of files) {
    const slug = slugFromFilename(file);
    try {
      // Checa se já existe
      const existing = await db.collection('articles')
        .where('slug', '==', slug).where('category', '==', category).limit(1).get();
      if (!existing.empty) {
        console.log(`  ⏭  já existe: ${slug}`);
        skipped++;
        continue;
      }

      const html  = readFileSync(path.join(dir, file), 'utf8');
      const title = extractOgTitle(html)
                  || extractTag(html, 'h1', 'article-hero__title')
                  || slug;
      const badge = extractBadge(html);

      const data = {
        slug,
        category,
        title,
        subtitle:        extractSubtitle(html),
        metaDescription: extractMeta(html, 'description'),
        image:           extractImage(html),
        publishDate:     extractDate(html) + 'T00:00:00Z',
        readTime:        extractReadTime(html),
        badgeType:       badge.type,
        badgeLabel:      badge.label,
        badgeTag:        extractBadgeTag(html),
        quickAnswer:     extractQuickAnswer(html),
        content:         extractContent(html),
        createdAt:       new Date().toISOString(),
        updatedAt:       new Date().toISOString(),
      };

      await db.collection('articles').add(data);
      console.log(`  ✅ ${slug}`);
      inserted++;
    } catch (e) {
      console.error(`  ❌ ${slug}: ${e.message}`);
      errors++;
    }
  }
}

console.log(`\n🎉 Migração concluída: ${inserted} inseridos, ${skipped} ignorados, ${errors} erros`);
process.exit(0);
