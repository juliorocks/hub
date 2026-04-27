import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(path.join(__dirname, '..', 'firebase-service-account.json'), 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const existing = await db.collection('articles')
  .where('slug', '==', 'quanto-ganha-publicitario')
  .where('category', '==', 'carreiras/salarios')
  .get();

if (!existing.empty) { console.log('já existe'); process.exit(0); }

await db.collection('articles').add({
  slug: 'quanto-ganha-publicitario',
  category: 'carreiras/salarios',
  title: 'Quanto ganha um Publicitário em 2026?',
  metaDescription: 'Salário do publicitário em 2026: médias por cargo, agências vs empresas, áreas mais rentáveis e como crescer na carreira de publicidade e propaganda.',
  excerpt: 'Salário do publicitário em 2026: redator, diretor de arte, atendimento, mídia e planejamento. Agências vs empresas e quais cargos pagam mais.',
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop',
  readTime: '5 min de leitura',
  badgeType: 'salario',
  badgeLabel: 'Salários',
  badgeTag: 'Carreiras',
  publishDate: '2026-04-26T00:00:00Z',
  quickAnswer: 'O salário do publicitário varia muito por função. Redatores e diretores de arte júnior ganham R$ 2.500 a R$ 4.000. Profissionais de mídia programática e planejamento sênior chegam a R$ 10.000 a R$ 18.000. O setor de marketing digital paga acima da média das agências tradicionais.',
  content: `<p>A publicidade é uma das carreiras mais criativas — e também mais amplas — do mercado. Um "publicitário" pode ser redator, diretor de arte, planejador, executivo de contas, especialista em mídia ou gestor de tráfego. Cada função tem seu próprio mercado e remuneração.</p>

<h2>Salário por função</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Função</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Júnior</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Sênior</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Redator</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.500–R$ 4.000</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 6.000–R$ 12.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Diretor de Arte</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.500–R$ 4.500</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 7.000–R$ 15.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Atendimento / Executivo de Contas</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.000–R$ 3.500</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 6.000–R$ 12.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Planejamento / Estratégia</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 5.500</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 8.000–R$ 18.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Mídia programática / digital</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.000–R$ 5.000</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 8.000–R$ 16.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Gestor de Tráfego (freela/PJ)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.000–R$ 5.000</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 8.000–R$ 25.000+</td></tr>
  </tbody>
</table>

<h2>Agência vs empresa (in-house)</h2>
<p>Agências costumam pagar menos, mas oferecem variedade de projetos e aprendizado acelerado. Empresas com time de marketing interno (in-house) geralmente remuneram melhor e oferecem mais estabilidade.</p>
<ul>
  <li><strong>Startups de tecnologia:</strong> melhor remuneração, equity e benefícios</li>
  <li><strong>Grandes varejistas e bancos:</strong> times robustos, salários competitivos</li>
  <li><strong>Agências independentes:</strong> remuneração menor, mas portfólio rico</li>
  <li><strong>Holdings de comunicação (WPP, Publicis):</strong> estrutura grande, possibilidade de carreira internacional</li>
</ul>

<h2>Gestor de tráfego: o cargo que mais cresceu</h2>
<p>Com o boom do marketing digital, gestores de tráfego pago (Google Ads, Meta Ads) se tornaram um dos profissionais mais procurados. Freelancers com 5 a 10 clientes faturam facilmente R$ 15.000 a R$ 30.000 mensais. A barreira de entrada é baixa — cursos de 3 a 6 meses já preparam para o mercado.</p>

<h2>Como crescer na carreira</h2>
<ul>
  <li>Especialize-se em uma área: criação, mídia programática, dados ou estratégia de marca</li>
  <li>Monte um portfólio digital com cases e resultados reais (não só peças bonitas)</li>
  <li>Certificações do Google, Meta e HubSpot são valorizadas e gratuitas</li>
  <li>Inglês é praticamente obrigatório para agências globais e startups</li>
  <li>Aprenda a medir resultados: ROAS, CPL, CPA — quem fala de dados tem salário maior</li>
</ul>`,
  updatedAt: new Date().toISOString(),
});

console.log('✅ inserido: quanto-ganha-publicitario');
process.exit(0);
