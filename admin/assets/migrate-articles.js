// Script para migrar artigos HTML existentes para Firestore
// Executa uma única vez para popular o banco de dados

let db;
const articlesData = []; // Will be populated with article data from HTML files

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Wait for Firebase
    await new Promise(resolve => {
      const checkFirebase = setInterval(() => {
        if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
          clearInterval(checkFirebase);
          resolve();
        }
      }, 100);
      setTimeout(() => clearInterval(checkFirebase), 5000);
    });

    db = firebase.firestore();

    // Show migration UI
    showMigrationUI();
  } catch (error) {
    console.error('Firebase error:', error);
    alert('Erro ao inicializar Firebase');
  }
});

function showMigrationUI() {
  const container = document.body;
  container.innerHTML = `
    <div style="max-width: 800px; margin: 2rem auto; font-family: sans-serif; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h1>🔄 Migrar Artigos para Firestore</h1>
      <p>Este script importará os artigos HTML existentes para o banco de dados Firebase.</p>

      <div id="status" style="margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 4px; min-height: 100px; font-family: monospace; font-size: 0.9rem; white-space: pre-wrap; overflow-y: auto; max-height: 300px;"></div>

      <button id="start-migration" style="padding: 0.75rem 1.5rem; background: #38bdf8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600;">
        Iniciar Migração
      </button>

      <button id="test-parse" style="padding: 0.75rem 1.5rem; background: #888; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600; margin-left: 1rem;">
        Testar Parse
      </button>
    </div>
  `;

  document.getElementById('start-migration').addEventListener('click', startMigration);
  document.getElementById('test-parse').addEventListener('click', testParse);
}

function log(message) {
  const status = document.getElementById('status');
  status.textContent += message + '\n';
  status.scrollTop = status.scrollHeight;
}

async function testParse() {
  log('📋 Testando extração de dados dos artigos...\n');

  // Artigos conhecidos para testar
  const testArticles = [
    {
      path: '../pages/guias/ead-vale-a-pena.html',
      category: 'guias',
      slug: 'ead-vale-a-pena'
    },
    {
      path: '../pages/guias/ia-nao-vai-substituir.html',
      category: 'guias',
      slug: 'ia-nao-vai-substituir'
    }
  ];

  for (const article of testArticles) {
    try {
      const response = await fetch(article.path);
      if (!response.ok) {
        log(`❌ Não encontrado: ${article.path}`);
        continue;
      }

      const html = await response.text();
      const data = parseArticleHTML(html, article.category, article.slug);

      log(`✅ ${article.slug}`);
      log(`   Título: ${data.title}`);
      log(`   Categoria: ${data.category}`);
      log(`   Data: ${data.publishDate}`);
      log('');
    } catch (error) {
      log(`❌ Erro ao processar ${article.path}: ${error.message}`);
    }
  }
}

async function startMigration() {
  log('🚀 Iniciando migração de artigos...\n');

  const articlesToMigrate = [
    // Guias
    { path: '../pages/guias/ead-vale-a-pena.html', category: 'guias', slug: 'ead-vale-a-pena' },
    { path: '../pages/guias/ia-nao-vai-substituir.html', category: 'guias', slug: 'ia-nao-vai-substituir' },
    { path: '../pages/guias/profissoes-do-futuro-2026.html', category: 'guias', slug: 'profissoes-do-futuro-2026' },
    { path: '../pages/guias/cnpq-capes-bolsa-pesquisa.html', category: 'guias', slug: 'cnpq-capes-bolsa-pesquisa' },
    { path: '../pages/guias/carreira-ux-ui-design.html', category: 'guias', slug: 'carreira-ux-ui-design' },
    { path: '../pages/guias/mestrado-vs-doutorado.html', category: 'guias', slug: 'mestrado-vs-doutorado' },
    { path: '../pages/guias/ead-presencial-diferenca.html', category: 'guias', slug: 'ead-presencial-diferenca' },
    { path: '../pages/guias/primeira-entrevista-emprego.html', category: 'guias', slug: 'primeira-entrevista-emprego' },
    { path: '../pages/guias/gap-year-vale-a-pena.html', category: 'guias', slug: 'gap-year-vale-a-pena' },

    // ENEM 2026
    { path: '../pages/enem-2026/redacao-enem-2026.html', category: 'enem-2026', slug: 'redacao-enem-2026' },
    { path: '../pages/enem-2026/matematica-enem-2026.html', category: 'enem-2026', slug: 'matematica-enem-2026' },
    { path: '../pages/enem-2026/ciencias-humanas-enem-2026.html', category: 'enem-2026', slug: 'ciencias-humanas-enem-2026' },
    { path: '../pages/enem-2026/cronograma-estudos-enem.html', category: 'enem-2026', slug: 'cronograma-estudos-enem' },
    { path: '../pages/enem-2026/como-usar-sisu-prouni.html', category: 'enem-2026', slug: 'como-usar-sisu-prouni' }
  ];

  let success = 0;
  let failed = 0;

  for (const article of articlesToMigrate) {
    try {
      const response = await fetch(article.path);
      if (!response.ok) {
        log(`⏭️  Pulando (não encontrado): ${article.slug}`);
        failed++;
        continue;
      }

      const html = await response.text();
      const data = parseArticleHTML(html, article.category, article.slug);

      // Salvar no Firestore
      await db.collection('articles').add(data);
      log(`✅ Migrado: ${article.slug}`);
      success++;
    } catch (error) {
      log(`❌ Erro: ${article.slug} - ${error.message}`);
      failed++;
    }

    // Delay para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  log('\n' + '='.repeat(50));
  log(`✅ Concluído: ${success} artigos salvos`);
  log(`❌ Falhados: ${failed}`);
  log('='.repeat(50));
  log('\n💡 Você pode voltar ao painel de admin agora!');
}

function parseArticleHTML(html, category, slug) {
  // Extrair título
  const titleMatch = html.match(/<h1[^>]*class="article-hero__title"[^>]*>(.*?)<\/h1>/s);
  const title = titleMatch ? titleMatch[1].trim() : 'Artigo Sem Título';

  // Extrair subtítulo
  const subtitleMatch = html.match(/<p[^>]*class="article-hero__subtitle"[^>]*>(.*?)<\/p>/s);
  const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

  // Extrair data
  const dateMatch = html.match(/<time[^>]*datetime="([^"]*)"[^>]*>/);
  const publishDate = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];

  // Extrair badge
  const badgeMatch = html.match(/<span[^>]*class="content-type-badge[^"]*"[^>]*>(.*?)<\/span>/);
  const badge = badgeMatch ? badgeMatch[1].trim() : '';

  // Extrair badge type
  let badgeType = 'guide';
  const badgeClassMatch = html.match(/<span[^>]*class="content-type-badge([^"]*)"[^>]*>/);
  if (badgeClassMatch) {
    if (badgeClassMatch[1].includes('enem')) badgeType = 'enem';
    else if (badgeClassMatch[1].includes('finance')) badgeType = 'finance';
    else if (badgeClassMatch[1].includes('job')) badgeType = 'job';
  }

  // Extrair tempo de leitura
  const readTimeMatch = html.match(/(\d+)\s*min\s+de\s+leitura/);
  const readTime = readTimeMatch ? parseInt(readTimeMatch[1]) : 10;

  // Extrair imagem hero
  const imageMatch = html.match(/<img[^>]*src="([^"]*unsplash[^"]*)"[^>]*alt="([^"]*)"[^>]*>/);
  const image = imageMatch ? imageMatch[1] : '';
  const imageAlt = imageMatch ? imageMatch[2] : '';

  // Extrair legenda da imagem
  const captionMatch = html.match(/<figcaption>(.*?)<\/figcaption>/s);
  const imageCaption = captionMatch ? captionMatch[1].trim() : '';

  // Extrair quick answer
  const quickAnswerMatch = html.match(/<p[^>]*class="quick-answer__text"[^>]*>(.*?)<\/p>/s);
  const quickAnswer = quickAnswerMatch ? quickAnswerMatch[1].trim() : '';

  // Extrair conteúdo principal (simplificado - pega tudo entre article-content divs)
  const contentMatch = html.match(/<div[^>]*class="article-content"[^>]*id="article-content"[^>]*>(.*?)<\/div>\s*<\/article>/s);
  const content = contentMatch ? contentMatch[1].trim() : '';

  // Extrair autor
  const authorMatch = html.match(/<strong>([^<]*Redação[^<]*)<\/strong>/);
  const author = authorMatch ? authorMatch[1].trim() : 'Redação Hub do Estudante';

  return {
    title,
    slug,
    category,
    badge,
    badgeType,
    subtitle,
    image,
    imageAlt,
    imageCaption,
    quickAnswer,
    content,
    readTime,
    publishDate: publishDate + 'T00:00:00Z',
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
