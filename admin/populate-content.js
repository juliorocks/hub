#!/usr/bin/env node

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'hub-do-estudante-firebase-adminsdk-fbsvc-69ccccc35c.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const articleMapping = [
  { slug: 'cnpq-capes-bolsa-pesquisa', file: 'cnpq-capes-bolsa-pesquisa.html', folder: 'guias' },
  { slug: 'carreira-ux-ui-design', file: 'carreira-ux-ui-design.html', folder: 'guias' },
  { slug: 'mestrado-vs-doutorado', file: 'mestrado-vs-doutorado.html', folder: 'guias' },
  { slug: 'ead-presencial-diferenca', file: 'ead-presencial-diferenca.html', folder: 'guias' },
  { slug: 'primeira-entrevista-emprego', file: 'primeira-entrevista-emprego.html', folder: 'guias' },
  { slug: 'gap-year-vale-a-pena', file: 'gap-year-vale-a-pena.html', folder: 'guias' },
  { slug: 'ead-vale-a-pena', file: 'ead-vale-a-pena.html', folder: 'guias' },
  { slug: 'ia-nao-vai-substituir', file: 'ia-nao-vai-substituir.html', folder: 'guias' },
  { slug: 'profissoes-do-futuro-2026', file: 'profissoes-do-futuro-2026.html', folder: 'guias' },
  { slug: 'redacao-enem-2026', file: 'redacao-enem-2026.html', folder: 'enem-2026' },
  { slug: 'matematica-enem-2026', file: 'matematica-enem-2026.html', folder: 'enem-2026' },
  { slug: 'ciencias-humanas-enem-2026', file: 'ciencias-humanas-enem-2026.html', folder: 'enem-2026' },
  { slug: 'cronograma-estudos-enem', file: 'cronograma-estudos-enem.html', folder: 'enem-2026' },
  { slug: 'como-usar-sisu-prouni', file: 'como-usar-sisu-prouni.html', folder: 'enem-2026' }
];

function extractImageFromHtml(html) {
  const match = html.match(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/);
  return match ? match[1] : '';
}

function extractContentFromHtml(html) {
  const match = html.match(/<article[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
  if (!match) {
    const altMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (!altMatch) return '';
    return altMatch[1];
  }
  return match[1];
}

async function populateArticles() {
  console.log('🚀 Iniciando população de conteúdo...\n');

  let success = 0;
  let failed = 0;

  for (const article of articleMapping) {
    try {
      const filePath = path.join(__dirname, '..', 'pages', article.folder, article.file);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Arquivo não encontrado: ${article.file}`);
        failed++;
        continue;
      }

      const html = fs.readFileSync(filePath, 'utf8');
      const image = extractImageFromHtml(html);
      const content = extractContentFromHtml(html);

      process.stdout.write(`[${success + failed + 1}/14] ${article.slug}... `);

      const snapshot = await db.collection('articles')
        .where('slug', '==', article.slug)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await db.collection('articles').doc(docId).update({
          image: image || '',
          content: content || '',
          updatedAt: new Date().toISOString()
        });
        console.log('✅');
        success++;
      } else {
        console.log('❌ (não encontrado no Firestore)');
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${error.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Sucesso: ${success}`);
  console.log(`❌ Falhados: ${failed}`);
  console.log('='.repeat(50));

  process.exit(0);
}

populateArticles().catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});
