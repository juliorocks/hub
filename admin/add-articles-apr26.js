/**
 * Insere 7 novos artigos no Firestore.
 * Uso: node admin/add-articles-apr26.js
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

const articles = [
  // ─── GUIAS ────────────────────────────────────────────────────────────────
  {
    slug: 'como-conseguir-primeiro-estagio',
    category: 'guias',
    title: 'Como conseguir o primeiro estágio: guia completo 2026',
    metaDescription: 'Passo a passo para conquistar o primeiro estágio: onde procurar vagas, como montar o currículo, o que esperar da entrevista e os direitos do estagiário.',
    excerpt: 'Passo a passo para conquistar o primeiro estágio: onde procurar vagas, como montar o currículo, o que esperar da entrevista e seus direitos.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=500&fit=crop',
    readTime: '7 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Carreira',
    publishDate: TODAY,
    quickAnswer: 'Cadastre-se em plataformas como Vagas.com, LinkedIn e Indeed, deixe o currículo objetivo com máximo 1 página, e busque vagas no portal da sua própria faculdade — muitas empresas preferem recrutar diretamente lá.',
    content: `<p>Conseguir o primeiro estágio é um dos maiores desafios para quem está começando a vida profissional. A boa notícia: com as estratégias certas, é totalmente possível — mesmo sem experiência anterior.</p>

<h2>Onde procurar vagas de estágio</h2>
<p>As melhores fontes para encontrar estágios em 2026 são:</p>
<ul>
  <li><strong>Portal da sua faculdade:</strong> a maioria das universidades tem convênios com empresas e publica vagas exclusivas para alunos</li>
  <li><strong>LinkedIn:</strong> crie um perfil completo e ative a opção "Open to Work"</li>
  <li><strong>Vagas.com, Indeed e Catho:</strong> plataformas com filtro específico para estágio</li>
  <li><strong>Nube e CIEE:</strong> agências especializadas em estágio com milhares de vagas cadastradas</li>
  <li><strong>Site direto das empresas:</strong> muitas grandes empresas têm programas de estágio próprios com inscrições abertas o ano todo</li>
</ul>

<h2>Como montar o currículo para o primeiro estágio</h2>
<p>Sem experiência formal, o segredo é valorizar o que você tem:</p>
<ul>
  <li>Trabalhos voluntários e projetos acadêmicos</li>
  <li>Cursos extracurriculares e certificações online</li>
  <li>Habilidades técnicas relevantes para a vaga (Excel, programação, design)</li>
  <li>Idiomas — mesmo nível básico vale mencionar</li>
  <li>Atividades em entidades estudantis, grupos de pesquisa ou atléticas</li>
</ul>
<p>Mantenha o currículo em <strong>uma página</strong>, use fonte clara e evite informações desnecessárias como foto, estado civil ou RG.</p>

<h2>Como se preparar para a entrevista</h2>
<p>Recrutadores sabem que é seu primeiro emprego — não vão cobrar experiência que você não tem. O que avaliam é:</p>
<ul>
  <li><strong>Motivação real:</strong> por que você quer estagiar nessa empresa especificamente?</li>
  <li><strong>Vontade de aprender:</strong> demonstre curiosidade e abertura a feedback</li>
  <li><strong>Postura profissional:</strong> pontualidade, atenção e comunicação clara</li>
  <li><strong>Conhecimento básico da empresa:</strong> pesquise o ramo, produtos e missão antes da entrevista</li>
</ul>

<h2>Direitos do estagiário</h2>
<p>O estágio é regulado pela <strong>Lei nº 11.788/2008</strong>. Seus principais direitos:</p>
<ul>
  <li>Bolsa-auxílio obrigatória (exceto estágios obrigatórios curriculares)</li>
  <li>Auxílio-transporte</li>
  <li>Recesso remunerado de 30 dias ao ano (proporcional)</li>
  <li>Jornada máxima de 6h/dia (estágio não obrigatório)</li>
  <li>Seguro contra acidentes pessoais pago pela empresa</li>
</ul>

<h2>Dicas para se destacar</h2>
<p>Candidatos que se destacam geralmente fazem mais do que o mínimo: personalizam a carta de apresentação para cada vaga, fazem perguntas inteligentes ao final da entrevista e acompanham o processo com um e-mail de agradecimento. Pequenos gestos que a maioria ignora.</p>`,
  },

  {
    slug: 'inteligencia-emocional-no-trabalho',
    category: 'guias',
    title: 'Inteligência emocional no trabalho: por que é mais importante que o QI',
    metaDescription: 'Entenda o que é inteligência emocional, como ela impacta sua carreira e como desenvolvê-la para crescer profissionalmente em 2026.',
    excerpt: 'Inteligência emocional é a habilidade mais valorizada pelas empresas em 2026. Veja como desenvolver a sua e usá-la para crescer na carreira.',
    image: 'https://images.unsplash.com/photo-1531496730074-83b68571d5b5?w=900&h=500&fit=crop',
    readTime: '6 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Carreira',
    publishDate: TODAY,
    quickAnswer: 'Inteligência emocional (IE) é a capacidade de reconhecer, entender e gerenciar suas próprias emoções e as dos outros. Estudos da Harvard Business Review mostram que ela responde por 58% do desempenho profissional em todos os tipos de cargo.',
    content: `<p>Em um mercado cada vez mais automatizado, as habilidades puramente técnicas estão perdendo espaço para as chamadas <em>soft skills</em>. E a rainha delas é a inteligência emocional.</p>

<h2>O que é inteligência emocional</h2>
<p>O conceito foi popularizado pelo psicólogo Daniel Goleman e se divide em 5 componentes:</p>
<ul>
  <li><strong>Autoconsciência:</strong> reconhecer suas próprias emoções e como elas afetam suas decisões</li>
  <li><strong>Autorregulação:</strong> controlar impulsos e agir com calma sob pressão</li>
  <li><strong>Motivação intrínseca:</strong> trabalhar por objetivos internos, não só por dinheiro ou status</li>
  <li><strong>Empatia:</strong> entender o ponto de vista e as emoções dos colegas</li>
  <li><strong>Habilidades sociais:</strong> construir relacionamentos, liderar e resolver conflitos</li>
</ul>

<h2>Por que importa mais do que o QI</h2>
<p>Um estudo da TalentSmart com mais de 1 milhão de pessoas mostrou que <strong>90% dos profissionais de alto desempenho têm alta inteligência emocional</strong>. Já entre os de baixo desempenho, apenas 20% apresentam essa característica.</p>
<p>Profissionais com alta IE são melhores em trabalhar sob pressão, liderar equipes, negociar e se adaptar a mudanças — habilidades que nenhuma IA substitui facilmente.</p>

<h2>Como desenvolver sua inteligência emocional</h2>
<h3>1. Pratique a autoconsciência</h3>
<p>Reserve 5 minutos ao final do dia para refletir: quais situações me tiraram do sério? Por quê? O diário emocional é uma ferramenta simples e muito eficaz.</p>

<h3>2. Pause antes de reagir</h3>
<p>Quando sentir raiva, frustração ou ansiedade, espere 6 segundos antes de responder. Esse intervalo rompe o piloto automático emocional.</p>

<h3>3. Peça feedback honesto</h3>
<p>Pergunte a colegas e líderes como você reage em situações de conflito ou pressão. É difícil, mas revelador.</p>

<h3>4. Desenvolva empatia ativa</h3>
<p>Em conversas, tente realmente entender o ponto de vista do outro antes de formular sua resposta. Perguntas abertas ajudam: "O que você quis dizer com isso?" ou "Como você está se sentindo sobre essa situação?"</p>

<h2>No ambiente de trabalho</h2>
<p>Profissionais com alta IE tendem a:</p>
<ul>
  <li>Receber promoções mais rápido</li>
  <li>Ter menor taxa de turnover</li>
  <li>Ser escolhidos para liderar projetos importantes</li>
  <li>Ganhar em média 29 mil dólares a mais por ano (segundo a TalentSmart)</li>
</ul>
<p>A inteligência emocional não é dom — é habilidade. E habilidade se treina.</p>`,
  },

  {
    slug: 'como-escolher-pos-graduacao',
    category: 'guias',
    title: 'Como escolher a pós-graduação certa: MBA, especialização ou mestrado?',
    metaDescription: 'Guia completo para escolher entre MBA, especialização lato sensu e mestrado: diferenças, custos, tempo e qual é melhor para sua carreira.',
    excerpt: 'MBA, especialização ou mestrado? Guia prático para escolher a pós-graduação certa para sua carreira e não desperdiçar tempo nem dinheiro.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&h=500&fit=crop',
    readTime: '8 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Pós-Graduação',
    publishDate: TODAY,
    quickAnswer: 'Se você quer crescer no mercado corporativo, o MBA é a melhor escolha. Se quer se aprofundar numa área técnica específica, prefira especialização. Se tem interesse em pesquisa ou carreira acadêmica, o mestrado é o caminho certo.',
    content: `<p>Depois de alguns anos de mercado, a dúvida bate: é hora de fazer uma pós? E qual? MBA, especialização e mestrado são opções muito diferentes — e escolher errado pode custar caro em tempo e dinheiro.</p>

<h2>Especialização lato sensu</h2>
<p>É o modelo mais comum no Brasil. Dura entre 6 e 18 meses, geralmente no formato EAD ou semipresencial. O foco é <strong>aplicação prática</strong> em uma área específica.</p>
<ul>
  <li><strong>Duração:</strong> 360 horas mínimas (exigência do MEC)</li>
  <li><strong>Custo médio:</strong> R$ 200 a R$ 800/mês</li>
  <li><strong>Ideal para:</strong> quem quer se especializar em uma área sem sair do emprego</li>
  <li><strong>Exemplos:</strong> Especialização em Gestão de Pessoas, Direito Tributário, Marketing Digital</li>
</ul>

<h2>MBA</h2>
<p>O MBA (Master of Business Administration) é tecnicamente uma especialização lato sensu com foco em gestão e negócios. No Brasil, é o mais valorizado pelo mercado corporativo.</p>
<ul>
  <li><strong>Duração:</strong> 12 a 24 meses</li>
  <li><strong>Custo médio:</strong> R$ 500 a R$ 3.000/mês (varia muito)</li>
  <li><strong>Diferencial:</strong> networking com outros profissionais, cases reais, visão estratégica</li>
  <li><strong>Ideal para:</strong> quem quer crescer para cargos de gestão e liderança</li>
</ul>
<p>Atenção: no Brasil, MBA não é stricto sensu — não conta como pós-graduação acadêmica para concursos que exigem mestrado.</p>

<h2>Mestrado</h2>
<p>É uma pós-graduação stricto sensu, com foco em pesquisa e produção científica. Exige dedicação intensa e culmina em uma dissertação.</p>
<ul>
  <li><strong>Duração:</strong> 2 anos (em média)</li>
  <li><strong>Custo:</strong> mestrado em universidades públicas é gratuito; privadas cobram R$ 1.000 a R$ 5.000/mês</li>
  <li><strong>Bolsas:</strong> CAPES e CNPq oferecem bolsas para mestrandos em universidades públicas</li>
  <li><strong>Ideal para:</strong> quem quer carreira acadêmica, pesquisa ou concursos públicos que exigem pós stricto sensu</li>
</ul>

<h2>Como decidir</h2>
<p>Faça essas três perguntas antes de escolher:</p>
<ol>
  <li><strong>Qual é meu objetivo?</strong> Promoção → MBA. Aprofundamento técnico → especialização. Carreira acadêmica → mestrado.</li>
  <li><strong>Quanto tempo tenho?</strong> Se está trabalhando, especialização EAD é mais viável. Mestrado presencial exige mais disponibilidade.</li>
  <li><strong>Qual é meu orçamento?</strong> FIES não cobre pós-graduação. Verifique se a empresa onde trabalha tem política de reembolso educacional.</li>
</ol>

<h2>Dica final</h2>
<p>Pesquise o <strong>Ranking Universitário Folha</strong> e o <strong>Conceito Capes</strong> (para stricto sensu) antes de escolher a instituição. Uma especialização bem reconhecida pelo mercado vale muito mais que um MBA caro de baixa reputação.</p>`,
  },

  {
    slug: 'networking-para-estudantes',
    category: 'guias',
    title: 'Networking para estudantes: como construir uma rede profissional do zero',
    metaDescription: 'Aprenda a fazer networking sendo estudante: como usar o LinkedIn, participar de eventos, abordar profissionais e transformar conexões em oportunidades reais.',
    excerpt: 'Você não precisa esperar se formar para construir uma rede profissional. Veja como fazer networking sendo estudante e abrir portas ainda na faculdade.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&h=500&fit=crop',
    readTime: '6 min de leitura',
    badgeType: 'guia',
    badgeLabel: 'Guia',
    badgeTag: 'Carreira',
    publishDate: TODAY,
    quickAnswer: 'Comece pelo LinkedIn: complete seu perfil, conecte-se com colegas e professores, e interaja com conteúdos da sua área. Depois, participe de eventos, feiras e grupos do setor. Networking não é pedir favor — é construir relações genuínas ao longo do tempo.',
    content: `<p>"Networking" parece intimidador, mas é simples: trata-se de conhecer pessoas, manter relacionamentos e, eventualmente, se ajudar. E quanto antes você começar, melhor.</p>

<h2>Por que networking importa para estudantes</h2>
<p>Segundo pesquisa da LinkedIn, <strong>70% das vagas não são publicadas</strong> — são preenchidas por indicação. Sua rede profissional é, muitas vezes, mais importante que seu currículo.</p>

<h2>LinkedIn: por onde começar</h2>
<p>O LinkedIn é a rede profissional mais usada no Brasil. Para estudantes:</p>
<ul>
  <li>Preencha 100% do perfil: foto profissional, headline clara ("Estudante de Administração | Foco em Marketing Digital")</li>
  <li>Liste projetos acadêmicos, trabalhos voluntários e certificações</li>
  <li>Conecte-se com professores, colegas, ex-alunos da sua faculdade e palestrantes de eventos</li>
  <li>Publique conteúdo sobre o que você está aprendendo — mesmo sendo estudante</li>
  <li>Comente posts de profissionais que você admira com algo substantivo (não apenas "ótimo post!")</li>
</ul>

<h2>Networking presencial</h2>
<p>Eventos são ouro para estudantes. Procure:</p>
<ul>
  <li>Semanas acadêmicas e congressos da sua área na faculdade</li>
  <li>Feiras de estágio e emprego (muitas são gratuitas)</li>
  <li>Meetups e eventos de startups (Sympla e Eventbrite têm muitos gratuitos)</li>
  <li>Associações profissionais — CRA, CRP, CREA costumam ter eventos abertos a estudantes</li>
</ul>

<h2>Como abordar profissionais sem parecer invasivo</h2>
<p>O maior medo de quem está começando. A fórmula que funciona:</p>
<ol>
  <li><strong>Contextualize:</strong> "Vi seu post sobre tendências em UX e fez muito sentido para mim como estudante de Design"</li>
  <li><strong>Seja específico:</strong> "Tenho uma dúvida sobre como é a transição de estágio para júnior na sua área"</li>
  <li><strong>Respeite o tempo:</strong> uma pergunta objetiva tem mais chance de resposta do que um pedido genérico de "mentoria"</li>
</ol>
<p>Profissionais que publicam conteúdo geralmente querem trocar conhecimento. A maioria responde quando a abordagem é genuína.</p>

<h2>Mantenha as conexões aquecidas</h2>
<p>Networking não é colecionar contatos — é manter relações. Comente um post de vez em quando, compartilhe um artigo relevante, parabenize conquistas. Quando surgir uma oportunidade, você já estará na mente das pessoas certas.</p>`,
  },

  // ─── CARREIRAS / SALÁRIOS ────────────────────────────────────────────────
  {
    slug: 'quanto-ganha-arquiteto-urbanista',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Arquiteto e Urbanista em 2026?',
    metaDescription: 'Salário do arquiteto e urbanista em 2026: média salarial por especialidade e experiência, mercado de trabalho e como aumentar sua renda na área.',
    excerpt: 'Salário do arquiteto e urbanista em 2026: da carreira recém-formada até o sênior. Veja médias por especialidade e como crescer na área.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&h=500&fit=crop',
    readTime: '5 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O salário médio do arquiteto e urbanista no Brasil em 2026 é de R$ 5.500 a R$ 8.000 por mês com carteira assinada. Profissionais autônomos com clientela estabelecida podem faturar R$ 15.000 a R$ 40.000 mensais dependendo do porte dos projetos.',
    content: `<p>A arquitetura é uma das profissões que mais variam em remuneração no Brasil — a diferença entre um recém-formado e um sênior com carteira de clientes pode ser de 5 a 10 vezes. Entender esse mercado é fundamental antes de escolher ou planejar a carreira.</p>

<h2>Salário por nível de experiência (CLT)</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Nível</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Experiência</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Estagiário</td><td style="padding:.75rem;border:1px solid #e5e7eb">0–1 ano</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 1.200–R$ 2.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Júnior</td><td style="padding:.75rem;border:1px solid #e5e7eb">1–3 anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.000–R$ 5.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Pleno</td><td style="padding:.75rem;border:1px solid #e5e7eb">3–6 anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 5.500–R$ 9.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Sênior</td><td style="padding:.75rem;border:1px solid #e5e7eb">6+ anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 9.000–R$ 18.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Diretor / Sócio</td><td style="padding:.75rem;border:1px solid #e5e7eb">10+ anos</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 18.000–R$ 35.000+</td></tr>
  </tbody>
</table>

<h2>Autônomo vs. CLT</h2>
<p>A maioria dos arquitetos trabalha de forma autônoma (PJ ou MEI). A renda varia muito, mas projetos de alto padrão pagam:</p>
<ul>
  <li><strong>Projeto residencial simples:</strong> R$ 8.000 a R$ 30.000 por projeto</li>
  <li><strong>Projeto comercial médio:</strong> R$ 20.000 a R$ 80.000</li>
  <li><strong>Acompanhamento de obra:</strong> R$ 2.500 a R$ 8.000/mês</li>
  <li><strong>Consultoria em interiores:</strong> R$ 150 a R$ 400/hora</li>
</ul>

<h2>Especialidades mais rentáveis</h2>
<ul>
  <li><strong>Arquitetura de interiores:</strong> alta demanda de clientes pessoa física</li>
  <li><strong>BIM (Building Information Modeling):</strong> profissionais com essa certificação ganham 30% a mais</li>
  <li><strong>Arquitetura sustentável e LEED:</strong> mercado em crescimento acelerado</li>
  <li><strong>Gestão de obras e projetos:</strong> próxima do setor de engenharia, com remuneração maior</li>
  <li><strong>Arquitetura hospitalar:</strong> nicho técnico e bem remunerado</li>
</ul>

<h2>Mercado de trabalho</h2>
<p>O Brasil tem mais de 200 mil arquitetos registrados no CAU. A concorrência é alta nas grandes cidades, mas profissionais com portfólio sólido, presença digital e especialização não ficam parados.</p>
<p>A tendência de 2026 é o <strong>boom da construção sustentável</strong> e do <strong>retrofit</strong> (reforma de edificações antigas), abrindo novas frentes de trabalho.</p>`,
  },

  {
    slug: 'quanto-ganha-professor',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Professor em 2026? (Educação Básica e Superior)',
    metaDescription: 'Salário de professor em 2026 por nível de ensino: educação infantil, fundamental, médio e superior. Diferenças entre rede pública e privada e como aumentar a renda.',
    excerpt: 'Salário de professor em 2026: da educação infantil ao ensino superior, rede pública e privada. Veja as médias reais e como crescer na carreira docente.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=500&fit=crop',
    readTime: '6 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O salário de professor varia muito pelo nível de ensino e tipo de rede. Na rede pública, professores do ensino básico ganham R$ 4.500 a R$ 9.000 (com especialização e adicional de tempo). No ensino superior privado, a média é R$ 3.500 a R$ 8.000 mensais.',
    content: `<p>A carreira docente no Brasil é ampla e muito diversificada em remuneração. Entender as diferenças entre rede pública e privada, e entre os níveis de ensino, é essencial para planejar sua trajetória.</p>

<h2>Salário por nível de ensino (rede privada)</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Nível</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio mensal</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Educação Infantil</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.000–R$ 3.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Ensino Fundamental I</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.500–R$ 4.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Ensino Fundamental II e Médio</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.000–R$ 5.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Ensino Superior (graduação)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 8.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Pós-Graduação / MBA</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 5.000–R$ 15.000</td></tr>
  </tbody>
</table>

<h2>Rede pública: piso e teto</h2>
<p>Na rede pública municipal e estadual, a referência é o <strong>Piso Salarial Nacional do Magistério</strong>, atualizado anualmente pelo MEC. Em 2026, o piso é de aproximadamente <strong>R$ 4.580</strong> para 40h semanais com nível médio (magistério).</p>
<p>Com licenciatura e pós-graduação, o salário pode chegar a R$ 9.000 a R$ 14.000 dependendo do estado e do tempo de serviço.</p>
<p>Professores federais (EBTT e Magistério Superior) seguem tabela própria do MEC — iniciantes ganham cerca de R$ 6.400 e podem chegar a R$ 18.000 com dedicação exclusiva e titulação de doutor.</p>

<h2>Como aumentar a renda como professor</h2>
<ul>
  <li><strong>Pós-graduação e mestrado:</strong> títulos elevam a faixa salarial na rede pública e abrem portas no ensino superior</li>
  <li><strong>Aulas particulares:</strong> R$ 80 a R$ 250/hora dependendo do nível e matéria</li>
  <li><strong>Cursos online:</strong> plataformas como Hotmart, Udemy e Coursera permitem escalar a renda sem limite de horas</li>
  <li><strong>Preparatórios e cursinho:</strong> professores de ENEM e concursos são muito bem pagos</li>
  <li><strong>Produção de material didático:</strong> apostilas, videoaulas e e-books</li>
</ul>

<h2>Vale a pena ser professor?</h2>
<p>Depende de onde e como. Na rede pública com concurso aprovado, a estabilidade e os benefícios (plano de saúde, aposentadoria integral em alguns estados) tornam a carreira muito atrativa. Na rede privada, a remuneração é mais baixa, mas a flexibilidade é maior.</p>
<p>Para quem combina sala de aula com produção de conteúdo digital, a renda pode facilmente ultrapassar R$ 20.000 mensais.</p>`,
  },

  {
    slug: 'quanto-ganha-assistente-social',
    category: 'carreiras/salarios',
    title: 'Quanto ganha um Assistente Social em 2026?',
    metaDescription: 'Salário do assistente social em 2026: médias por setor, direitos da categoria, áreas de atuação e perspectivas de crescimento na carreira.',
    excerpt: 'Salário do assistente social em 2026 por setor: saúde, CRAS, CREAS, empresas e ONGs. Veja as médias reais e as melhores oportunidades na área.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&h=500&fit=crop',
    readTime: '5 min de leitura',
    badgeType: 'salario',
    badgeLabel: 'Salários',
    badgeTag: 'Carreiras',
    publishDate: TODAY,
    quickAnswer: 'O salário do assistente social no Brasil em 2026 é de R$ 3.500 a R$ 7.500 mensais, com variação pelo setor. No setor público (CRAS, CREAS, hospitais públicos), a média é de R$ 4.500 a R$ 9.000 com benefícios. A carga horária regulamentada é de 30h semanais.',
    content: `<p>O Serviço Social é uma das profissões regulamentadas com maior variedade de campos de atuação no Brasil — de hospitais a empresas, de ONGs ao sistema judiciário. A remuneração varia consideravelmente dependendo do setor.</p>

<h2>Salário médio por setor</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
  <thead><tr style="background:#f3f4f6">
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Setor</th>
    <th style="padding:.75rem;text-align:left;border:1px solid #e5e7eb">Salário médio</th>
  </tr></thead>
  <tbody>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">CRAS / CREAS (municipal)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 6.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Hospital público / SUS</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.000–R$ 8.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Hospital privado</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 3.500–R$ 6.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Empresas (RH / compliance)</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 4.000–R$ 7.500</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">Judiciário / Ministério Público</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 6.000–R$ 12.000</td></tr>
    <tr><td style="padding:.75rem;border:1px solid #e5e7eb">ONGs e terceiro setor</td><td style="padding:.75rem;border:1px solid #e5e7eb">R$ 2.500–R$ 5.000</td></tr>
  </tbody>
</table>

<h2>Carga horária e direitos</h2>
<p>A Lei 12.317/2010 estabelece a <strong>jornada de 30 horas semanais</strong> para assistentes sociais, sem redução salarial. Esse é um direito garantido pela categoria e deve constar no contrato.</p>
<p>O registro no <strong>CRESS</strong> (Conselho Regional de Serviço Social) é obrigatório para exercer a profissão.</p>

<h2>Áreas de atuação em crescimento</h2>
<ul>
  <li><strong>Saúde mental:</strong> com a expansão dos CAPS e políticas de saúde mental pós-pandemia</li>
  <li><strong>Recursos Humanos e ESG:</strong> empresas com programas de responsabilidade social contratam assistentes sociais para gerir benefícios e programas internos</li>
  <li><strong>Perícia social (INSS):</strong> perito social do INSS é um dos cargos mais bem pagos — exige concurso</li>
  <li><strong>Assistência judiciária:</strong> Defensoria Pública e Ministério Público contratam para avaliações socioeconômicas</li>
</ul>

<h2>Como crescer na carreira</h2>
<ul>
  <li>Pós-graduação em áreas específicas (Saúde Mental, Direitos Humanos, Políticas Públicas)</li>
  <li>Concursos públicos federais e estaduais — as melhores remunerações estão no setor público</li>
  <li>Pesquisa e docência — mestrado e doutorado abrem a carreira acadêmica</li>
</ul>`,
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

  await colRef.add({
    ...art,
    updatedAt: new Date().toISOString(),
  });
  console.log(`  ✅ inserido: ${art.slug}`);
  inserted++;
}

console.log(`\n🎉 ${inserted} inseridos, ${skipped} ignorados`);
process.exit(0);
