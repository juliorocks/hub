#!/usr/bin/env node

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'hub-do-estudante-firebase-adminsdk-fbsvc-69ccccc35c.json'), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Article data
const articles = [
  { title: 'EAD vale a pena? O que ninguém te conta antes de se matricular', category: 'guias', slug: 'ead-vale-a-pena', publishDate: '2026-04-19' },
  { title: 'Profissões que a IA não vai substituir (e as que já estão sendo) em 2026', category: 'guias', slug: 'ia-nao-vai-substituir', publishDate: '2026-04-20' },
  { title: 'Profissões do futuro 2026: tendências reais e carreiras com mais demanda', category: 'guias', slug: 'profissoes-do-futuro-2026', publishDate: '2026-04-21' },
  { title: 'Bolsa CNPq e CAPES 2026: como conseguir financiamento para pós-graduação', category: 'guias', slug: 'cnpq-capes-bolsa-pesquisa', publishDate: '2026-04-21' },
  { title: 'Carreira em UX/UI Design: salário, mercado e como começar em 2026', category: 'guias', slug: 'carreira-ux-ui-design', publishDate: '2026-04-21' },
  { title: 'Mestrado vs Doutorado: qual escolher, diferenças e saídas profissionais', category: 'guias', slug: 'mestrado-vs-doutorado', publishDate: '2026-04-21' },
  { title: 'EAD vs Presencial: qual é melhor, diferenças e quando cada um funciona', category: 'guias', slug: 'ead-presencial-diferenca', publishDate: '2026-04-21' },
  { title: 'Primeira entrevista de emprego: dicas, erros comuns e como se preparar', category: 'guias', slug: 'primeira-entrevista-emprego', publishDate: '2026-04-21' },
  { title: 'Gap year vale a pena? Vantagens, desvantagens e como aproveitar bem', category: 'guias', slug: 'gap-year-vale-a-pena', publishDate: '2026-04-21' },
  { title: 'Redação ENEM 2026: estrutura, dicas e como treinar', category: 'enem-2026', slug: 'redacao-enem-2026', publishDate: '2026-04-20' },
  { title: 'Matemática ENEM 2026: conteúdos que mais caem e como estudar', category: 'enem-2026', slug: 'matematica-enem-2026', publishDate: '2026-04-20' },
  { title: 'Ciências Humanas ENEM 2026: o que cai e dicas de estudo', category: 'enem-2026', slug: 'ciencias-humanas-enem-2026', publishDate: '2026-04-20' },
  { title: 'Cronograma de estudos para ENEM 2026: como organizar seus estudos', category: 'enem-2026', slug: 'cronograma-estudos-enem', publishDate: '2026-04-20' },
  { title: 'Como usar SiSU e ProUni 2026: passo a passo para sua inscrição', category: 'enem-2026', slug: 'como-usar-sisu-prouni', publishDate: '2026-04-20' }
];

async function migrate() {
  console.log('🚀 Iniciando migração de artigos...\n');

  // Criar collection se não existir
  try {
    const collectionRef = db.collection('articles');
    const snapshot = await collectionRef.limit(1).get();
    if (snapshot.empty) {
      console.log('📝 Criando collection...');
      // Criar documento dummy para criar a collection
      await collectionRef.doc('_init').set({ init: true });
      await collectionRef.doc('_init').delete();
      console.log('✅ Collection criada\n');
    }
  } catch (e) {
    console.log('ℹ️  Collection já existe ou será criada\n');
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    process.stdout.write(`[${i + 1}/${articles.length}] ${article.slug}... `);

    try {
      const data = {
        title: article.title,
        subtitle: article.title.substring(0, 80),
        publishDate: article.publishDate + 'T00:00:00Z',
        slug: article.slug,
        category: article.category,
        badge: '',
        badgeType: 'guide',
        image: '',
        imageAlt: '',
        imageCaption: '',
        quickAnswer: article.title,
        content: '',
        readTime: 10,
        author: 'Redação Hub do Estudante',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Usar addDoc para deixar Firebase gerar o ID
      const docRef = await db.collection('articles').add(data);
      // Depois atualizar com o slug como campo adicional
      await docRef.update({ docId: docRef.id });
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

migrate().catch(error => {
  console.error('Erro:', error);
  process.exit(1);
});
