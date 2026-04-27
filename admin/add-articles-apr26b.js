/**
 * Insere 7 novos artigos no Firestore (lote 2 — 26/04/2026).
 * Uso: node admin/add-articles-apr26b.js
 */
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(path.join(__dirname, '..', 'firebase-service-account.json'), 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const TODAY = '2026-04-26T00:00:00Z';

// Imagens validadas 200 e únicas (não usadas em nenhum artigo existente)
// 1434873740857 | 1569982175971 | 1497032628192 | 1543286386-713 | 1526628953301
// 1559136555 | 1574634534894 | 1507090960745 | 1551836022 | 1593642632559
// 1524178232363 | 1522071820081 | 1573164713988 | 1558618666

const articles = [

  // ─── GUIAS ────────────────────────────────────────────────────────────────
  {
    slug: 'como-aprender-programacao-do-zero',
    category: 'guias',
    title: 'Como aprender programação do zero em 2026: roteiro completo',
    metaDescription: 'Guia para iniciantes em programação: por onde começar, quais linguagens aprender, recursos gratuitos e o caminho mais rápido para o primeiro emprego na área de tecnologia.',
    excerpt: 'Por onde começar a programar em 2026? Roteiro completo do zero ao primeiro emprego: linguagens, plataformas gratuitas e quanto tempo leva.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&h=500&fit=crop',
    readTime: '8 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Tecnologia',
    publishDate: TODAY,
    quickAnswer: 'Comece com Python ou JavaScript — ambas têm curva de aprendizado suave, alta demanda no mercado e toneladas de material gratuito. Com estudo consistente de 1 a 2 horas por dia, é possível conseguir o primeiro estágio ou freela em 6 a 12 meses.',
    content: `<p>Programação é uma das habilidades mais valiosas do mercado atual — e nunca foi tão acessível aprender. Com uma conexão à internet e disciplina, é possível construir uma carreira sólida partindo do absoluto zero.</p>

<h2>Por qual linguagem começar?</h2>
<p>A escolha da primeira linguagem importa, mas não tanto quanto a consistência. As melhores opções para iniciantes em 2026:</p>
<ul>
  <li><strong>Python:</strong> sintaxe simples, muito usada em ciência de dados, automação e IA. Melhor escolha para quem não sabe por onde começar.</li>
  <li><strong>JavaScript:</strong> linguagem do navegador. Se você quer criar sites ou apps, é por aqui. Também roda no servidor com Node.js.</li>
  <li><strong>SQL:</strong> não é exatamente uma linguagem de programação, mas é exigida em praticamente todas as vagas de tecnologia e dados.</li>
</ul>
<p>Evite começar com C++ ou Java — são poderosas, mas têm curva de aprendizado mais íngreme para iniciantes.</p>

<h2>Roteiro de 6 a 12 meses</h2>
<h3>Meses 1 a 2 — Fundamentos</h3>
<ul>
  <li>Variáveis, tipos de dados, condicionais e loops</li>
  <li>Funções e organização do código</li>
  <li>Lógica de programação (resolva desafios no <strong>HackerRank</strong> ou <strong>Beecrowd</strong>)</li>
</ul>
<h3>Meses 3 a 4 — Projetos práticos</h3>
<ul>
  <li>Construa projetos pequenos: calculadora, lista de tarefas, jogo simples</li>
  <li>Aprenda Git e GitHub — essencial para qualquer desenvolvedor</li>
  <li>Comece a entender APIs e consumo de dados externos</li>
</ul>
<h3>Meses 5 a 6 — Especialização</h3>
<ul>
  <li><strong>Web:</strong> HTML, CSS, React (front-end) ou Node.js/Django (back-end)</li>
  <li><strong>Dados:</strong> Pandas, NumPy, visualização com Matplotlib</li>
  <li><strong>Mobile:</strong> React Native ou Flutter</li>
</ul>
<h3>Meses 7 a 12 — Portfólio e mercado</h3>
<ul>
  <li>Monte 3 projetos reais no GitHub com README bem escrito</li>
  <li>Contribua para projetos open source</li>
  <li>Candidate-se a estágios e freelas no LinkedIn, Trampos e Workana</li>
</ul>

<h2>Recursos gratuitos que realmente funcionam</h2>
<ul>
  <li><strong>freeCodeCamp.org</strong> — currículo estruturado de web dev, totalmente gratuito</li>
  <li><strong>CS50 (Harvard)</strong> — melhor introdução à ciência da computação do mundo, legendado em PT</li>
  <li><strong>The Odin Project</strong> — trilha completa de desenvolvimento web</li>
  <li><strong>Curso em Vídeo (YouTube)</strong> — conteúdo em português, excelente para iniciantes</li>
  <li><strong>Roadmap.sh</strong> — mapas visuais de todas as trilhas de carreira em tech</li>
</ul>

<h2>Quanto tempo até o primeiro emprego?</h2>
<p>Com 1 a 2 horas diárias de estudo focado, a maioria consegue o primeiro estágio ou freela em <strong>6 a 12 meses</strong>. O diferencial não é quanto você estudou, mas o que você construiu. Um portfólio com 3 projetos bem documentados vale mais que 10 certificados.</p>`,
  },

  {
    slug: 'saude-mental-na-faculdade',
    category: 'guias',
    title: 'Saúde mental na faculdade: como lidar com ansiedade e pressão acadêmica',
    metaDescription: 'Guia sobre saúde mental na faculdade: como identificar sinais de esgotamento, estratégias para lidar com ansiedade e onde buscar ajuda gratuita.',
    excerpt: 'Ansiedade, burnout e síndrome do impostor são comuns na faculdade. Veja como identificar os sinais e estratégias práticas para cuidar da sua saúde mental.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&h=500&fit=crop',
    readTime: '7 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Bem-estar',
    publishDate: TODAY,
    quickAnswer: 'Cerca de 80% dos universitários brasileiros relatam algum nível de ansiedade durante a graduação. Os sinais mais comuns de alerta são dificuldade de concentração persistente, insônia frequente, isolamento social e perda de motivação por mais de duas semanas.',
    content: `<p>A faculdade é um dos períodos mais intensos da vida — novas responsabilidades, cobranças acadêmicas, dificuldades financeiras e a pressão de "ter que dar certo". É natural que impacte a saúde mental. O problema é quando os sinais são ignorados por tempo demais.</p>

<h2>Os desafios mais comuns</h2>
<ul>
  <li><strong>Ansiedade de desempenho:</strong> medo de reprovar, de decepcionar família, de não ser bom o suficiente</li>
  <li><strong>Síndrome do impostor:</strong> sentir que não merece estar ali, que é menos capaz que os colegas</li>
  <li><strong>Burnout acadêmico:</strong> esgotamento físico e emocional por excesso de demandas</li>
  <li><strong>Solidão e isolamento:</strong> especialmente em quem se mudou de cidade ou tem dificuldade de se integrar</li>
  <li><strong>Dificuldades financeiras:</strong> um dos maiores fatores de estresse entre universitários brasileiros</li>
</ul>

<h2>Sinais de alerta que merecem atenção</h2>
<p>Fique atento se você perceber:</p>
<ul>
  <li>Dificuldade de concentração persistente (por mais de 2 semanas)</li>
  <li>Insônia frequente ou sono excessivo</li>
  <li>Irritabilidade fora do normal</li>
  <li>Perda de interesse em coisas que antes eram prazerosas</li>
  <li>Pensamentos negativos recorrentes sobre si mesmo</li>
  <li>Faltar aulas com frequência sem motivação clara</li>
</ul>

<h2>Estratégias que funcionam</h2>
<h3>Organize o tempo (mas sem perfeccionismo)</h3>
<p>A sensação de estar sempre atrasado é um dos maiores gatilhos de ansiedade. Use um calendário simples para visualizar prazos e quebre tarefas grandes em partes menores. Progresso pequeno e consistente bate esforço heróico e esporádico.</p>

<h3>Cuide do básico primeiro</h3>
<p>Sono, alimentação e movimento físico são a base da saúde mental. Não adianta técnica de meditação se você está dormindo 4 horas e vivendo de fast food. 30 minutos de caminhada por dia têm efeito comprovado na redução de ansiedade.</p>

<h3>Construa uma rede de suporte</h3>
<p>Converse com colegas — você vai descobrir que a maioria sente o mesmo que você. Grupos de estudo criam senso de pertencimento além de melhorar o desempenho acadêmico.</p>

<h3>Limite o uso de redes sociais</h3>
<p>Comparar sua vida "real" com a vida "destacada" dos outros no Instagram é receita para ansiedade. Defina horários específicos para redes sociais e desative notificações durante o estudo.</p>

<h2>Onde buscar ajuda gratuita</h2>
<ul>
  <li><strong>Serviço de saúde mental da sua universidade:</strong> a maioria das federais e grandes privadas oferece atendimento psicológico gratuito para alunos</li>
  <li><strong>CAPS (Centro de Atenção Psicossocial):</strong> atendimento pelo SUS, gratuito</li>
  <li><strong>CVV (Centro de Valorização da Vida):</strong> 188 ou chat em cvv.org.br — disponível 24h</li>
  <li><strong>Vittude e Zenklub:</strong> plataformas com sessões de baixo custo e às vezes gratuitas</li>
</ul>
<p>Pedir ajuda não é fraqueza. É a decisão mais inteligente que você pode tomar.</p>`,
  },

  {
    slug: 'financas-pessoais-para-estudantes',
    category: 'guias',
    title: 'Finanças pessoais para estudantes: como organizar o dinheiro na faculdade',
    metaDescription: 'Guia de finanças pessoais para universitários: como criar um orçamento, economizar na faculdade, construir reserva de emergência e começar a investir mesmo com pouco.',
    excerpt: 'Como organizar o dinheiro na faculdade? Orçamento simples, dicas de economia, como evitar dívidas e dar os primeiros passos nos investimentos com pouco.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&h=500&fit=crop',
    readTime: '7 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Finanças',
    publishDate: TODAY,
    quickAnswer: 'O primeiro passo é anotar tudo que entra e sai por um mês. A maioria das pessoas subestima gastos com alimentação e lazer em até 40%. Com clareza sobre seus números reais, você consegue montar um orçamento que funciona mesmo com renda baixa.',
    content: `<p>Faculdade e dinheiro curto quase sempre andam juntos. Mas quem aprende a organizar as finanças cedo leva uma enorme vantagem na vida adulta — não só financeira, mas também em saúde mental.</p>

<h2>Passo 1: entenda onde seu dinheiro vai</h2>
<p>Antes de qualquer estratégia, registre todos os seus gastos por 30 dias. Use um app simples (Mobills, Organizze ou até uma planilha do Google) ou anote no bloco de notas do celular. Sem esse diagnóstico, qualquer orçamento vai falhar.</p>

<h2>O orçamento 50-30-20 adaptado para estudantes</h2>
<ul>
  <li><strong>50% — necessidades:</strong> moradia, alimentação básica, transporte, material escolar</li>
  <li><strong>30% — estilo de vida:</strong> lazer, saídas, assinaturas, roupas</li>
  <li><strong>20% — futuro:</strong> reserva de emergência ou investimentos</li>
</ul>
<p>Se sua renda é muito baixa, o 20% pode começar em 5% ou 10%. O hábito importa mais que o valor.</p>

<h2>Como economizar sendo universitário</h2>
<ul>
  <li><strong>Restaurante universitário (RU):</strong> se sua faculdade tem, use. A economia é significativa</li>
  <li><strong>Compras em grupo:</strong> dividir mercado com colegas reduz custos e desperdício</li>
  <li><strong>Meia-entrada e descontos estudantis:</strong> carteirinha ativa dá desconto em cinema, teatro, shows e até restaurantes</li>
  <li><strong>Livros:</strong> biblioteca, PDF legal, grupos de compartilhamento ou edições anteriores mais baratas</li>
  <li><strong>Transporte:</strong> passe estudantil, caronas combinadas, bicicleta</li>
  <li><strong>Assinaturas:</strong> use planos estudantis (Spotify, Adobe, Microsoft 365 têm preços especiais)</li>
</ul>

<h2>Como evitar dívidas</h2>
<p>Cartão de crédito mal usado é a armadilha número 1 dos universitários. Regras simples:</p>
<ul>
  <li>Nunca pague o mínimo — pague sempre o total</li>
  <li>O limite do cartão não é uma extensão da sua renda</li>
  <li>Se não tem o dinheiro agora, não compre parcelado "sem juros" (o custo já está embutido no preço)</li>
  <li>Cheque especial tem juros altíssimos — evite a todo custo</li>
</ul>

<h2>Primeiros passos nos investimentos</h2>
<p>Mesmo com R$ 50 ou R$ 100 por mês, é possível começar. Prioridades:</p>
<ol>
  <li><strong>Reserva de emergência:</strong> 3 a 6 meses de gastos em uma conta com liquidez diária (Tesouro Selic ou CDB com liquidez diária)</li>
  <li><strong>Tesouro Direto:</strong> a partir de R$ 30, seguro e com retorno superior à poupança</li>
  <li><strong>Fundos de renda fixa:</strong> aporte mínimo baixo, simples de operar</li>
</ol>
<p>Quem investe R$ 200/mês começando aos 20 anos acumula quase 4 vezes mais do que quem começa aos 30 — o tempo é o maior aliado dos juros compostos.</p>`,
  },

  {
    slug: 'como-estudar-para-concurso-publico',
    category: 'guias',
    title: 'Como estudar para concurso público: método, tempo e organização',
    metaDescription: 'Guia completo para se preparar para concurso público: como montar cronograma, quais matérias priorizar, melhores materiais e dicas para manter a disciplina.',
    excerpt: 'Método, cronograma e disciplina: o guia completo para quem quer passar em concurso público em 2026 sem desperdiçar tempo e energia.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=500&fit=crop',
    readTime: '8 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Concursos',
    publishDate: TODAY,
    quickAnswer: 'A maior causa de reprovação não é falta de inteligência — é estudar sem método. Resolução de questões anteriores deve representar pelo menos 50% do tempo de estudo. Quem faz mais questões passa mais, independente de quantas horas passou lendo apostilas.',
    content: `<p>Concurso público é uma das formas mais sólidas de construir estabilidade financeira no Brasil. Mas exige estratégia — não basta estudar muito, é preciso estudar certo.</p>

<h2>Antes de começar: escolha bem o concurso</h2>
<p>Não estude "para concurso" de forma genérica. Escolha uma área e um cargo específico. Os critérios para decidir:</p>
<ul>
  <li>Compatibilidade com sua formação (alguns exigem diploma de curso específico)</li>
  <li>Frequência de abertura de vagas — concursos com muita vaga abrem mais vezes</li>
  <li>Remuneração e benefícios do cargo</li>
  <li>Estilo de prova — objetiva, discursiva, com prova de títulos</li>
</ul>

<h2>Entenda o edital como sua bíblia</h2>
<p>O edital é o documento mais importante. Nele estão:</p>
<ul>
  <li>Todas as matérias cobradas e seus pesos</li>
  <li>Número de questões por disciplina</li>
  <li>Requisitos de formação e documentação</li>
  <li>Datas e etapas do processo</li>
</ul>
<p>Leia o edital do último concurso para o mesmo cargo. A maioria mantém o mesmo formato por anos.</p>

<h2>Monte um cronograma realista</h2>
<p>Distribua as matérias proporcionalmente ao peso na prova. Se Português representa 20% das questões, dedique 20% do seu tempo de estudo a ela.</p>
<p>Regra de ouro: <strong>consistência bate intensidade</strong>. Estudar 2 horas por dia todos os dias é mais eficaz do que 8 horas no fim de semana.</p>

<h2>O método que mais aprova: questões</h2>
<p>Candidatos aprovados resolvem, em média, entre 3.000 e 10.000 questões antes da prova. O ciclo correto é:</p>
<ol>
  <li>Estude o conteúdo brevemente (20% do tempo)</li>
  <li>Resolva questões do assunto recém-estudado (50% do tempo)</li>
  <li>Revise os erros e entenda o raciocínio (30% do tempo)</li>
</ol>
<p>Use plataformas como <strong>QConcursos</strong>, <strong>Estratégia Concursos</strong> ou <strong>Gran Cursos</strong>. Muitas têm plano gratuito com centenas de questões.</p>

<h2>Matérias que aparecem em quase todo concurso</h2>
<ul>
  <li>Português (língua portuguesa e interpretação de texto)</li>
  <li>Raciocínio lógico e matemático</li>
  <li>Noções de informática</li>
  <li>Direito Constitucional e Administrativo (para cargos públicos em geral)</li>
  <li>Conhecimentos específicos do cargo</li>
</ul>

<h2>Como manter a disciplina a longo prazo</h2>
<ul>
  <li>Estude no mesmo horário todos os dias — crie um ritual</li>
  <li>Use a técnica Pomodoro: 25 min de foco, 5 min de pausa</li>
  <li>Registre o tempo estudado diariamente — o progresso visível motiva</li>
  <li>Encontre um grupo de estudos presencial ou online</li>
  <li>Tenha uma data-alvo clara — "quero passar até dezembro de 2026"</li>
</ul>`,
  },

  // ─── CARREIRAS / SALÁRIOS ────────────────────────────────────────────────
  {
    slug: 'quanto-ganha-designer-grafico',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Designer Gráfico em 2026?',
    metaDescription: 'Salário do designer gráfico em 2026: médias por nível, diferenças entre CLT e freela, especialidades mais rentáveis e mercado de trabalho.',
    excerpt: 'Salário do designer gráfico em 2026: do júnior ao sênior, CLT vs freela, e quais especialidades pagam mais no mercado atual.',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=900&h=500&fit=crop',
    readTime: '5 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O salário médio do designer gráfico CLT no Brasil em 2026 é de R$ 3.500 a R$ 7.000. Freelancers com portfólio sólido e clientes recorrentes podem faturar R$ 8.000 a R$ 20.000 mensais. A especialização em UI/UX, motion design ou branding premium eleva significativamente a remuneração.',
    content: `<p>O design gráfico é uma das profissões criativas com maior demanda no mercado digital atual. A remuneração varia muito conforme especialização, experiência e modalidade de trabalho.</p>

<h2>Salário por nível de experiência (CLT)</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Nível</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Experiência</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Estagiário</td><td style="padding:.75rem;border:1px solid #e5e7eb">0–1 ano</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 1.000–R$ 1.800</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Júnior</td><td style="padding:.75rem;border:1px solid #e5e7eb">1–3 anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.500–R$ 4.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Pleno</td><td style="padding:.75rem;border:1px solid #e5e7eb">3–5 anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.000–R$ 6.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Sênior</td><td style="padding:.75rem;border:1px solid #e5e7eb">5+ anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 6.500–R$ 12.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Diretor de Arte</td><td style="padding:.75rem;border:1px solid #e5e7eb">8+ anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 10.000–R$ 20.000</td></tr>
  </tbody>
</table>

<h2>Freelancer: quanto é possível ganhar?</h2>
<p>Designers que trabalham de forma autônoma definem seus próprios preços. Tabela de referência do mercado:</p>
<ul>
  <li><strong>Identidade visual completa:</strong> R$ 2.000 a R$ 15.000 (varia pelo porte do cliente)</li>
  <li><strong>Social media mensal:</strong> R$ 800 a R$ 3.500/mês por cliente</li>
  <li><strong>Landing page / peça publicitária:</strong> R$ 500 a R$ 3.000 por peça</li>
  <li><strong>Motion design (vídeo 15s–30s):</strong> R$ 1.500 a R$ 8.000</li>
</ul>
<p>Um freela com 3 a 5 clientes fixos consegue superar facilmente um salário CLT sênior.</p>

<h2>Especialidades mais valorizadas em 2026</h2>
<ul>
  <li><strong>UI/UX Design:</strong> intersecção com tech — salários chegam a R$ 15.000 em empresas de produto</li>
  <li><strong>Motion Design e After Effects:</strong> conteúdo em vídeo explodiu a demanda</li>
  <li><strong>Design de marca (branding):</strong> nicho premium, poucos especialistas</li>
  <li><strong>Design para e-commerce:</strong> alta demanda com crescimento do setor</li>
  <li><strong>Design thinking / UX Research:</strong> cada vez mais exigido em grandes empresas</li>
</ul>

<h2>Ferramentas que o mercado exige</h2>
<p>Dominar as ferramentas certas faz diferença no salário. As mais valorizadas:</p>
<ul>
  <li>Figma (obrigatório para UI/UX)</li>
  <li>Adobe Illustrator e Photoshop</li>
  <li>After Effects (para motion)</li>
  <li>Canva Pro (para agências de social media)</li>
</ul>`,
  },

  {
    slug: 'quanto-ganha-analista-rh',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Analista de RH em 2026?',
    metaDescription: 'Salário do analista de RH em 2026: médias por especialidade, diferenças entre pequenas e grandes empresas, e as áreas de RH mais bem remuneradas.',
    excerpt: 'Salário do analista de RH em 2026 por especialidade: recrutamento, T&D, HRBP e mais. Veja o que separa os profissionais de maior remuneração na área.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&h=500&fit=crop',
    readTime: '5 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O analista de RH ganha em média R$ 3.500 a R$ 6.500 mensais no Brasil em 2026. A área de People Analytics, HRBP (HR Business Partner) e Remuneração & Benefícios são as especialidades mais bem pagas, podendo chegar a R$ 12.000 em grandes empresas.',
    content: `<p>Recursos Humanos passou por uma transformação profunda na última década. O "RH burocrático" cedeu espaço para uma área estratégica e orientada a dados — e a remuneração acompanhou essa mudança.</p>

<h2>Salário médio por nível</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Cargo</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Assistente de RH</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.000–R$ 3.200</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Analista de RH Júnior</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.000–R$ 4.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Analista de RH Pleno</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.500–R$ 7.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Analista de RH Sênior</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 7.000–R$ 12.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">HRBP / Gerente</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 10.000–R$ 20.000</td></tr>
  </tbody>
</table>

<h2>Especialidades e salários</h2>
<ul>
  <li><strong>Recrutamento e Seleção:</strong> R$ 3.500–R$ 8.000. Com foco em tech, salários sobem 20 a 30%</li>
  <li><strong>T&D (Treinamento e Desenvolvimento):</strong> R$ 4.000–R$ 9.000</li>
  <li><strong>Remuneração e Benefícios:</strong> R$ 5.000–R$ 12.000 — exige conhecimento técnico de folha e legislação</li>
  <li><strong>People Analytics:</strong> R$ 6.000–R$ 15.000 — o nicho mais valorizado, exige SQL e Excel avançado</li>
  <li><strong>HRBP (HR Business Partner):</strong> R$ 8.000–R$ 18.000 — posição estratégica, trabalha diretamente com lideranças</li>
</ul>

<h2>O que diferencia um analista de RH bem remunerado</h2>
<ul>
  <li><strong>Dados:</strong> profissionais que sabem trabalhar com métricas de RH (turnover, absenteísmo, NPS de colaboradores) têm salários 30 a 50% acima da média</li>
  <li><strong>Tech:</strong> experiência com ATS (sistemas de recrutamento), HRIS e ferramentas de BI</li>
  <li><strong>Inglês:</strong> obrigatório em multinacionais e startups</li>
  <li><strong>Visão de negócio:</strong> RH estratégico que entende o impacto das pessoas nos resultados financeiros</li>
</ul>

<h2>Mercado de trabalho</h2>
<p>O setor de tecnologia e as startups são os que mais pagam para profissionais de RH em 2026. Empresas de tech com mais de 200 funcionários costumam ter equipes de People dedicadas com remunerações acima da média do mercado.</p>`,
  },

  {
    slug: 'quanto-ganha-nutricionista',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Nutricionista em 2026?',
    metaDescription: 'Salário do nutricionista em 2026: médias por área de atuação, diferenças entre clínica, esporte, indústria e setor público, e como crescer na carreira.',
    excerpt: 'Salário do nutricionista em 2026 por área de atuação: clínica, esportiva, hospitalar, indústria alimentícia e mais. Veja onde estão as maiores remunerações.',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=900&h=500&fit=crop',
    readTime: '5 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O nutricionista no Brasil ganha em média R$ 3.500 a R$ 7.000 mensais com vínculo empregatício. Profissionais liberais com consultório próprio e clientela consolidada faturam R$ 8.000 a R$ 20.000. Nutrição esportiva e clínica para emagrecimento são as especialidades com maior demanda privada.',
    content: `<p>A nutrição é uma das profissões da saúde com maior crescimento de demanda no Brasil — e também uma das que mais varia em remuneração dependendo da área de atuação escolhida.</p>

<h2>Salário por área de atuação</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Área</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio (CLT)</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Nutrição Clínica (ambulatório)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 6.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Nutrição Hospitalar</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.000–R$ 8.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Nutrição Esportiva</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.000–R$ 9.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Indústria de Alimentos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 5.000–R$ 10.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Nutrição Escolar / UAN</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 6.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Setor Público (concurso)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 5.000–R$ 12.000</td></tr>
  </tbody>
</table>

<h2>Consultório próprio: o maior potencial</h2>
<p>A maioria dos nutricionistas que mais fatura trabalha de forma autônoma. Os valores de consulta variam:</p>
<ul>
  <li><strong>Consulta de avaliação:</strong> R$ 200 a R$ 600</li>
  <li><strong>Acompanhamento mensal:</strong> R$ 300 a R$ 800/mês por paciente</li>
  <li><strong>Assessoria online:</strong> R$ 150 a R$ 400/mês por cliente</li>
</ul>
<p>Um consultório com 30 a 50 pacientes ativos pode gerar R$ 10.000 a R$ 25.000 mensais.</p>

<h2>Especialidades com maior demanda em 2026</h2>
<ul>
  <li><strong>Nutrição esportiva:</strong> crescimento exponencial com popularização de academias e esportes</li>
  <li><strong>Nutrição comportamental:</strong> abordagem que une nutrição e psicologia alimentar — altíssima demanda</li>
  <li><strong>Nutrição funcional:</strong> foco em prevenção de doenças crônicas</li>
  <li><strong>Nutrição materno-infantil:</strong> nicho bem remunerado com clientela fidelizada</li>
  <li><strong>Nutrição e longevidade:</strong> tendência crescente com o envelhecimento da população</li>
</ul>

<h2>Como crescer na carreira</h2>
<ul>
  <li>Especialização ou residência em áreas específicas (amplamente ofertadas pelo CFN)</li>
  <li>Presença digital: nutricionistas com forte presença no Instagram e YouTube constroem autoridade e atraem pacientes online</li>
  <li>Concursos públicos: NASF, hospitais universitários e prefeituras oferecem vagas com boas remunerações</li>
  <li>Indústria alimentícia: P&D, rotulagem e qualidade são áreas que exigem nutricionistas e pagam bem</li>
</ul>

<h2>Registro profissional</h2>
<p>O registro no <strong>CRN</strong> (Conselho Regional de Nutricionistas) é obrigatório para exercer a profissão. O processo é feito após a colação de grau com diploma em mãos.</p>`,
  },
];

// Checa duplicatas por slug+category
const colRef = db.collection('articles');
let inserted = 0, skipped = 0;

for (const art of articles) {
  const existing = await colRef
    .where('slug', '==', art.slug)
    .where('category', '==', art.category)
    .get();

  if (!existing.empty) {
    console.log(`  ⏭  já existe: ${art.slug}`);
    skipped++;
    continue;
  }

  await colRef.add({ ...art, updatedAt: new Date().toISOString() });
  console.log(`  ✅ inserido: ${art.slug}`);
  inserted++;
}

console.log(`\n🎉 ${inserted} inseridos, ${skipped} ignorados`);
process.exit(0);
