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

const newArticles = [
  { title: 'Bolsas de Estudo 2026: Guia Completo de Oportunidades e Como Se Inscrever', slug: 'bolsas-estudo-2026', category: 'guias', publishDate: '2026-04-22' },
  { title: 'Profissões em Alta Demanda 2026: Carreiras com Maior Demanda e Melhores Salários', slug: 'profissoes-alta-demanda-2026', category: 'guias', publishDate: '2026-04-22' },
  { title: 'Como Se Preparar Para FIES 2026: Guia Prático com Requisitos e Documentação', slug: 'como-se-preparar-fies', category: 'guias', publishDate: '2026-04-22' },
  { title: 'MBA vs Pós-Graduação: Qual Escolher? Diferenças, Custos e Benefícios', slug: 'mba-vs-pos-graduacao', category: 'guias', publishDate: '2026-04-22' },
  { title: 'Guia Completo de Estágios 2026: Como Conseguir, Direitos e Dicas Práticas', slug: 'guia-estagios', category: 'guias', publishDate: '2026-04-22' },
  { title: 'Migração de Carreira: Como Mudar de Profissão com Sucesso em 2026', slug: 'migracao-carreira', category: 'guias', publishDate: '2026-04-22' },
  { title: 'Cursos Online Mais Procurados 2026: Tendências e Melhores Plataformas', slug: 'cursos-online-procurados-2026', category: 'guias', publishDate: '2026-04-22' }
];

function extractImageFromHtml(html) {
  const match = html.match(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/);
  return match ? match[1] : '';
}

function extractContentFromHtml(html) {
  const match = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (!match) return '';
  return match[1];
}

async function addArticles() {
  console.log('🚀 Adicionando 7 novos artigos ao Firestore...\n');

  let success = 0;
  let failed = 0;

  for (const article of newArticles) {
    try {
      const filePath = path.join(__dirname, '..', 'pages', 'guias', article.slug + '.html');

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Arquivo não encontrado: ${article.slug}.html`);
        failed++;
        continue;
      }

      const html = fs.readFileSync(filePath, 'utf8');
      const image = extractImageFromHtml(html);
      const content = extractContentFromHtml(html);

      process.stdout.write(`[${success + failed + 1}/7] ${article.slug}... `);

      const data = {
        title: article.title,
        subtitle: article.title.substring(0, 80),
        publishDate: article.publishDate + 'T00:00:00Z',
        slug: article.slug,
        category: article.category,
        badge: '',
        badgeType: 'guide',
        image: image || '',
        imageAlt: article.title,
        imageCaption: '',
        quickAnswer: article.title,
        content: content || '',
        readTime: 10,
        author: 'Redação Hub do Estudante',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await db.collection('articles').add(data);
      console.log('✅');
      success++;
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

addArticles().catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});
