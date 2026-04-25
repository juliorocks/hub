/**
 * Atribui imagens Unsplash para artigos sem imagem no Firestore.
 * Uso: node admin/fix-missing-images.js
 */
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(path.join(__dirname, '..', 'firebase-service-account.json'), 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

// Imagens por slug (específicas) ou por categoria (fallback)
const IMAGE_BY_SLUG = {
  // enem-2026
  'matematica-enem-2026':           'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=500&fit=crop',
  'ciencias-humanas-enem-2026':     'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&h=500&fit=crop',
  'redacao-enem-2026':              'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=500&fit=crop',
  'cronograma-estudos-enem':        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&h=500&fit=crop',
  'como-usar-sisu-prouni':          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=500&fit=crop',
  // carreiras/salarios
  'quanto-ganha-administrador':     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop',
  'quanto-ganha-advogado':          'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=900&h=500&fit=crop',
  'quanto-ganha-analista-marketing':'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop',
  'quanto-ganha-arquiteto':         'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=500&fit=crop',
  'quanto-ganha-arquiteto-dados':   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop',
  'quanto-ganha-cientista-dados':   'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=500&fit=crop',
  'quanto-ganha-contador':          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&h=500&fit=crop',
  'quanto-ganha-dentista':          'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&h=500&fit=crop',
  'quanto-ganha-desenvolvedor':     'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=500&fit=crop',
  'quanto-ganha-economista':        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=500&fit=crop',
  'quanto-ganha-enfermeiro':        'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&h=500&fit=crop',
  'quanto-ganha-engenheiro-civil':  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=500&fit=crop',
  'quanto-ganha-engenheiro-eletrico':'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&h=500&fit=crop',
  'quanto-ganha-engenheiro-mecanico':'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=900&h=500&fit=crop',
  'quanto-ganha-farmaceutico':      'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=900&h=500&fit=crop',
  'quanto-ganha-fisioterapeuta':    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&h=500&fit=crop',
  'quanto-ganha-juiz':              'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=900&h=500&fit=crop',
  'quanto-ganha-medico':            'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&h=500&fit=crop',
  'quanto-ganha-nutricionista':     'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=500&fit=crop',
  'quanto-ganha-piloto':            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&h=500&fit=crop',
  'quanto-ganha-professor-universitario': 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&h=500&fit=crop',
  'quanto-ganha-promotor':          'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=900&h=500&fit=crop',
  'quanto-ganha-psicologo':         'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&h=500&fit=crop',
  'quanto-ganha-veterinario':       'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=900&h=500&fit=crop',
};

const IMAGE_BY_CATEGORY = {
  'enem-2026':        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=500&fit=crop',
  'guias':            'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&h=500&fit=crop',
  'carreiras/salarios':'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop',
};

async function validateUrl(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok;
  } catch { return false; }
}

const snap = await db.collection('articles').get();
let updated = 0, skipped = 0;

for (const docSnap of snap.docs) {
  const a = docSnap.data();
  if (a.image) { skipped++; continue; }

  const img = IMAGE_BY_SLUG[a.slug] || IMAGE_BY_CATEGORY[a.category];
  if (!img) { console.log(`  ⚠️  sem imagem mapeada: ${a.slug}`); skipped++; continue; }

  const ok = await validateUrl(img);
  if (!ok) { console.log(`  ❌ imagem inválida: ${a.slug} → ${img}`); skipped++; continue; }

  await docSnap.ref.update({ image: img, updatedAt: new Date().toISOString() });
  console.log(`  ✅ ${a.slug}`);
  updated++;
}

console.log(`\n🎉 ${updated} atualizados, ${skipped} ignorados`);
process.exit(0);
