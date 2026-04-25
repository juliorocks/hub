import fs from 'fs';
import path from 'path';
import { buildPage } from './template.js';

// Imagens validadas HTTP 200 e não usadas em nenhuma outra página
// Testadas em: 2026-04-25
const articles = [
  {
    slug: 'como-financiar-pos-graduacao',
    outputPath: 'pages/guias/como-financiar-pos-graduacao.html',
    area: 'posgraduacao',
    title: 'Como financiar uma pós-graduação em 2026: bolsas, FIES e parcelamento',
    subtitle: 'Guia completo com todas as opções para pagar o MBA ou especialização sem comprometer o orçamento',
    badge: 'Guia Financeiro',
    badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&h=500&fit=crop',
    imgAlt: 'Pessoa calculando finanças para investir em pós-graduação',
    quickAnswer: 'Para financiar uma pós-graduação em 2026, as principais opções são: <strong>FIES Pós-Graduação</strong> (juros de 3,5% a.a.), <strong>bolsas de universidades</strong> (até 50% de desconto), <strong>parcelamento direto</strong> com a instituição e <strong>financiamento bancário</strong>. Um MBA EAD pode sair por R$ 400–R$ 600/mês parcelado.',
    date: '2026-04-25',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/como-financiar-pos-graduacao.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '#' },
      { label: 'Como financiar pós-graduação' },
    ],
    sidebarLinks: [
      { label: 'MBA em Marketing Digital', href: '../pos-graduacao/mba/mba-marketing-digital/index.html' },
      { label: 'MBA em Gestão Empresarial', href: '../pos-graduacao/mba/mba-gestao-empresarial/index.html' },
      { label: 'MBA vs Pós-graduação: qual escolher?', href: 'mba-vs-pos-graduacao.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>FIES Pós-Graduação: o que é e como funciona</h2>
      <p>O FIES (Fundo de Financiamento Estudantil) tem uma modalidade específica para pós-graduação stricto sensu (mestrado e doutorado) oferecida por instituições privadas. Em 2026, o programa financia até 100% das mensalidades com juros de <strong>3,5% ao ano</strong> — bem abaixo do mercado.</p>
      <p>Para lato sensu (MBA e especializações), o FIES não se aplica diretamente, mas algumas instituições usam o FIES Empresa, que negocia com empregadores.</p>

      <h2>Comparativo das opções de financiamento</h2>
      <table>
        <thead><tr><th>Modalidade</th><th>Juros</th><th>Carência</th><th>Para quem</th></tr></thead>
        <tbody>
          <tr><td>FIES Pós (stricto sensu)</td><td>3,5% a.a.</td><td>Durante o curso</td><td>Mestrado e doutorado</td></tr>
          <tr><td>Parcelamento da instituição</td><td>0% a 12% a.a.</td><td>Sem carência</td><td>Todos os cursos</td></tr>
          <tr><td>Financiamento bancário (CEF)</td><td>6,5–9% a.a.</td><td>6–12 meses</td><td>Todos os cursos</td></tr>
          <tr><td>Bolsa mérito/parceria empresa</td><td>Gratuito</td><td>Sem carência</td><td>Funcionários elegíveis</td></tr>
          <tr><td>ProUni (apenas graduação)</td><td>Não se aplica</td><td>Não se aplica</td><td>Só graduação</td></tr>
        </tbody>
      </table>

      <h2>Bolsas em universidades privadas</h2>
      <p>Anhanguera, Unopar e Uniderp oferecem regularmente descontos de <strong>30% a 50%</strong> em MBA EAD. O processo é simples: o desconto é aplicado automaticamente no ato da matrícula via portal. Em 2026, um MBA que custaria R$ 1.200/mês pode sair por R$ 600/mês.</p>

      <h2>Pedir ao empregador para pagar</h2>
      <p>Esta é a opção mais vantajosa e subutilizada. Muitas empresas têm verba de desenvolvimento de funcionários (PDI — Plano de Desenvolvimento Individual). Como negociar:</p>
      <ul>
        <li>Mostre como o MBA impacta diretamente sua função</li>
        <li>Proponha um acordo de permanência (stay bonus) por 1–2 anos após conclusão</li>
        <li>Negocie pelo menos 50% do custo como benefício não tributável</li>
      </ul>

      <h2>Simulação de custo real de um MBA EAD</h2>
      <table>
        <thead><tr><th>Cenário</th><th>Mensalidade original</th><th>Com desconto 50%</th><th>Total 18 meses</th></tr></thead>
        <tbody>
          <tr><td>MBA sem desconto</td><td>R$ 800</td><td>R$ 800</td><td>R$ 14.400</td></tr>
          <tr><td>MBA com bolsa universidade</td><td>R$ 800</td><td>R$ 400</td><td>R$ 7.200</td></tr>
          <tr><td>MBA pago pela empresa</td><td>R$ 800</td><td>R$ 0</td><td>R$ 0</td></tr>
        </tbody>
      </table>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Posso usar o FGTS para pagar pós-graduação?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. O FGTS só pode ser usado para compra de imóvel, aposentadoria ou em casos de demissão sem justa causa. Não há previsão legal para uso em educação.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>MBA pago pela empresa dá imposto de renda?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Se o pagamento for direto da empresa para a instituição (sem passar pelo salário do funcionário), é isento de IR e encargos sociais — tanto para empresa quanto para o funcionário.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale a pena fazer um empréstimo pessoal para pagar MBA?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Depende da taxa. Com consignado (funcionário público ou CLT) em torno de 1,5–2% a.m., pode ser viável se o MBA resultar em aumento salarial que cubra o custo. Empréstimo pessoal comum (5–8% a.m.) raramente compensa.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'salario-de-engenheiro-no-brasil',
    outputPath: 'pages/guias/salario-de-engenheiro-no-brasil.html',
    area: 'graduacao',
    title: 'Salário de engenheiro no Brasil em 2026: por especialidade e nível de experiência',
    subtitle: 'Quanto ganha um engenheiro civil, elétrico, de software, mecânico e de produção — dados atualizados',
    badge: 'Carreiras',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=900&h=500&fit=crop',
    imgAlt: 'Engenheiro analisando projeto em tablet em obra de construção',
    quickAnswer: 'O salário médio de engenheiro no Brasil em 2026 varia de <strong>R$ 5.500 (júnior)</strong> a <strong>R$ 25.000 (sênior)</strong>. Engenharia de Software lidera com médias de <strong>R$ 12.000–R$ 30.000</strong>. Engenharia Civil tem maior volume de vagas. O bônus de pós-graduação pode aumentar o salário em 20–40%.',
    date: '2026-04-25',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/salario-de-engenheiro-no-brasil.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Carreiras', href: '../carreiras/index.html' },
      { label: 'Salário de Engenheiro' },
    ],
    sidebarLinks: [
      { label: 'Engenharia — guia do curso', href: '../graduacao/engenharia/index.html' },
      { label: 'MBA Engenharia de Software', href: '../pos-graduacao/mba/mba-engenharia-software/index.html' },
      { label: 'Profissões de alta demanda 2026', href: 'profissoes-alta-demanda-2026.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>Salários por especialidade de engenharia</h2>
      <table>
        <thead><tr><th>Especialidade</th><th>Júnior</th><th>Pleno</th><th>Sênior</th></tr></thead>
        <tbody>
          <tr><td>Engenharia de Software</td><td>R$ 7.000</td><td>R$ 14.000</td><td>R$ 25.000</td></tr>
          <tr><td>Engenharia Civil</td><td>R$ 4.500</td><td>R$ 8.000</td><td>R$ 16.000</td></tr>
          <tr><td>Engenharia Elétrica</td><td>R$ 5.000</td><td>R$ 9.500</td><td>R$ 18.000</td></tr>
          <tr><td>Engenharia Mecânica</td><td>R$ 4.800</td><td>R$ 9.000</td><td>R$ 17.000</td></tr>
          <tr><td>Engenharia de Produção</td><td>R$ 4.500</td><td>R$ 8.500</td><td>R$ 15.000</td></tr>
          <tr><td>Engenharia Química</td><td>R$ 5.200</td><td>R$ 10.000</td><td>R$ 19.000</td></tr>
          <tr><td>Engenharia de Petróleo</td><td>R$ 8.000</td><td>R$ 16.000</td><td>R$ 30.000</td></tr>
        </tbody>
      </table>

      <h2>Fatores que mais influenciam o salário</h2>
      <p><strong>1. Setor de atuação:</strong> Petróleo e gás, financeiro e tecnologia pagam 40–80% acima da média. Construção civil e setor público pagam abaixo.</p>
      <p><strong>2. Localização:</strong> São Paulo e Rio de Janeiro pagam 25–35% a mais que outras capitais. Remote first para Engenharia de Software elimina essa diferença.</p>
      <p><strong>3. Pós-graduação:</strong> MBA ou especialização acrescenta em média R$ 2.000–R$ 5.000/mês ao salário de engenheiros com 5+ anos de experiência.</p>
      <p><strong>4. Certificações:</strong> PMP (gestão de projetos), CREA em dia, AWS/Azure para engenheiros de software — cada uma pode valer 10–20% de aumento.</p>

      <h2>Engenharia de Software: o salário que mudou o mercado</h2>
      <p>Com a digitalização acelerada pós-pandemia, engenheiros de software com experiência em Cloud, DevOps e IA estão sendo contratados com salários de <strong>R$ 20.000–R$ 35.000</strong> no regime CLT — e ainda mais como PJ. Empresas de fora do Brasil contratando em reais oferecem R$ 15.000–R$ 25.000 remotamente.</p>

      <h2>Vale a pena cursar engenharia em 2026?</h2>
      <p>Sim, especialmente para quem tem perfil analítico. O CREA registrou crescimento de 8% nas carteiras ativas em 2025. Infraestrutura, energias renováveis e construção civil puxam a demanda. Para maximizar salário, combine engenharia com domínio de software ou gestão de projetos.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Engenheiro precisa de registro no CREA para trabalhar?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim para funções de responsabilidade técnica (assinar projetos, laudos, ARTs). Para cargos administrativos ou de TI, o CREA não é obrigatório — mas diferencia o profissional.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual engenharia tem mais vagas no Brasil em 2026?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Engenharia Civil (volume), Engenharia de Software (crescimento mais rápido) e Engenharia Elétrica (energia renovável). As três juntas representam 60% das vagas abertas para engenheiros no Brasil.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'como-passar-no-enem-estudando-sozinho',
    outputPath: 'pages/enem-2026/como-passar-no-enem-estudando-sozinho.html',
    area: 'graduacao',
    title: 'Como passar no ENEM 2026 estudando sozinho: plano de 6 meses comprovado',
    subtitle: 'Estratégia completa para tirar mais de 700 pontos sem cursinho — com cronograma, materiais gratuitos e técnicas de memorização',
    badge: 'ENEM 2026',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=500&fit=crop',
    imgAlt: 'Estudante concentrado estudando com caderno e computador para o ENEM',
    quickAnswer: 'É possível passar no ENEM 2026 estudando sozinho com <strong>3–4 horas diárias</strong> por <strong>6 meses</strong>. Use o Khan Academy (gratuito e oficial do MEC), resolva as 10 últimas provas, priorize as matérias com mais questões (Matemática e Linguagens) e mantenha consistência acima de intensidade.',
    date: '2026-04-25',
    readTime: '10 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/enem-2026/como-passar-no-enem-estudando-sozinho.html',
    breadcrumbs: [
      { label: 'Home', href: '../../index.html' },
      { label: 'ENEM 2026', href: 'index.html' },
      { label: 'Estudar sozinho para o ENEM' },
    ],
    sidebarLinks: [
      { label: 'Cronograma de estudos ENEM', href: 'cronograma-estudos-enem.html' },
      { label: 'Redação ENEM 2026', href: 'redacao-enem-2026.html' },
      { label: 'Como usar SISU e ProUni', href: 'como-usar-sisu-prouni.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>O plano de 6 meses para o ENEM</h2>
      <p>Estudar sozinho para o ENEM exige disciplina acima de tudo. O segredo não é estudar mais horas — é estudar de forma inteligente. Este plano divide os 6 meses em 3 fases:</p>

      <h2>Fase 1 (Meses 1–2): Base e diagnóstico</h2>
      <ul>
        <li>Faça a prova do ENEM do ano anterior completa, sem consultar nada</li>
        <li>Identifique os 5 temas onde errou mais</li>
        <li>Estude o básico de cada matéria no Khan Academy (gratuito)</li>
        <li>Meta: 2h de estudo nos dias de semana, 3h no sábado</li>
      </ul>

      <h2>Fase 2 (Meses 3–4): Foco nas áreas de maior peso</h2>
      <table>
        <thead><tr><th>Área</th><th>Questões</th><th>Horas semanais recomendadas</th></tr></thead>
        <tbody>
          <tr><td>Matemática e Tecnologias</td><td>45</td><td>6h</td></tr>
          <tr><td>Linguagens e Códigos</td><td>45 + Redação</td><td>5h</td></tr>
          <tr><td>Ciências Humanas</td><td>45</td><td>4h</td></tr>
          <tr><td>Ciências da Natureza</td><td>45</td><td>4h</td></tr>
        </tbody>
      </table>

      <h2>Fase 3 (Meses 5–6): Simulados e revisão</h2>
      <ul>
        <li>Um simulado completo por semana (use provas anteriores do INEP)</li>
        <li>Revise apenas os erros — não releia o que já sabe</li>
        <li>Treine redação: 2 por semana, corrija com a grade do ENEM</li>
        <li>Na última semana: apenas revisão leve e descanso</li>
      </ul>

      <h2>Materiais gratuitos que funcionam</h2>
      <table>
        <thead><tr><th>Material</th><th>Melhor para</th><th>Acesso</th></tr></thead>
        <tbody>
          <tr><td>Khan Academy Brasil</td><td>Matemática e Ciências</td><td>Gratuito</td></tr>
          <tr><td>Brasil Escola</td><td>Humanas e Natureza</td><td>Gratuito</td></tr>
          <tr><td>Descomplica (básico)</td><td>Videoaulas de revisão</td><td>Gratuito (limitado)</td></tr>
          <tr><td>Provas INEP (site oficial)</td><td>Simulados reais</td><td>Gratuito</td></tr>
          <tr><td>Guia de Redação ENEM</td><td>Competências da redação</td><td>Gratuito (PDF INEP)</td></tr>
        </tbody>
      </table>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quantas horas por dia preciso estudar para o ENEM?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Com 6 meses, 3–4 horas diárias são suficientes para quem estuda com foco. Mais importante que a quantidade é a consistência: estudar todos os dias por 2h supera estudar 8h uma vez por semana.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quanto tempo antes do ENEM devo começar a estudar?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>O ideal é 6–12 meses antes. Com menos de 3 meses, foque apenas em simulados e nas matérias onde já tem base — não tente aprender tudo do zero.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale a pena pagar cursinho para o ENEM?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>O cursinho ajuda quem precisa de estrutura e disciplina externa. Para quem é autodisciplinado, os materiais gratuitos disponíveis hoje (Khan Academy, provas anteriores, YouTube) são suficientes para tirar 700+ pontos.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'mercado-de-trabalho-ti-2026',
    outputPath: 'pages/guias/mercado-de-trabalho-ti-2026.html',
    area: 'graduacao',
    title: 'Mercado de trabalho em TI 2026: vagas, salários e as tecnologias mais valorizadas',
    subtitle: 'O setor de tecnologia no Brasil em 2026 — quais profissões estão em alta, quanto pagam e como entrar',
    badge: 'Tecnologia',
    badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=500&fit=crop',
    imgAlt: 'Desenvolvedor de software trabalhando com múltiplos monitores e código',
    quickAnswer: 'Em 2026, TI segue como o setor com mais vagas abertas no Brasil — mais de <strong>70.000 posições não preenchidas</strong>. Os cargos mais pagos são <strong>Engenheiro de IA/ML</strong> (R$ 18.000–R$ 40.000), <strong>Cloud Architect</strong> (R$ 20.000–R$ 35.000) e <strong>Cybersecurity Engineer</strong> (R$ 15.000–R$ 28.000).',
    date: '2026-04-25',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/mercado-de-trabalho-ti-2026.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '#' },
      { label: 'Mercado de TI 2026' },
    ],
    sidebarLinks: [
      { label: 'MBA Engenharia de Software', href: '../pos-graduacao/mba/mba-engenharia-software/index.html' },
      { label: 'Especialização Data Science e IA', href: '../pos-graduacao/especializacao/data-science-ia/index.html' },
      { label: 'Profissões do futuro 2026', href: 'profissoes-do-futuro-2026.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>O cenário do mercado de TI no Brasil em 2026</h2>
      <p>O Brasil tem um déficit estrutural de profissionais de tecnologia. A Brasscom projeta que entre 2023 e 2027 serão necessários <strong>800.000 novos profissionais de TI</strong> — e as universidades formam apenas metade disso por ano. Isso cria uma janela de oportunidade única para quem entra agora.</p>

      <h2>Cargos mais demandados e salários em 2026</h2>
      <table>
        <thead><tr><th>Cargo</th><th>Júnior</th><th>Pleno</th><th>Sênior</th></tr></thead>
        <tbody>
          <tr><td>Engenheiro de IA/ML</td><td>R$ 10.000</td><td>R$ 20.000</td><td>R$ 40.000</td></tr>
          <tr><td>Cloud Architect (AWS/Azure/GCP)</td><td>R$ 9.000</td><td>R$ 18.000</td><td>R$ 35.000</td></tr>
          <tr><td>Cybersecurity Engineer</td><td>R$ 8.000</td><td>R$ 15.000</td><td>R$ 28.000</td></tr>
          <tr><td>DevOps / SRE</td><td>R$ 8.000</td><td>R$ 15.000</td><td>R$ 27.000</td></tr>
          <tr><td>Desenvolvedor Full Stack</td><td>R$ 5.000</td><td>R$ 11.000</td><td>R$ 22.000</td></tr>
          <tr><td>Data Engineer</td><td>R$ 7.000</td><td>R$ 13.000</td><td>R$ 24.000</td></tr>
          <tr><td>Product Manager (Tech)</td><td>R$ 8.000</td><td>R$ 16.000</td><td>R$ 30.000</td></tr>
        </tbody>
      </table>

      <h2>Tecnologias mais valorizadas em 2026</h2>
      <p>Segundo dados do Stack Overflow Survey e LinkedIn Jobs Brasil 2026, as tecnologias com mais vagas e maior salário são:</p>
      <ul>
        <li><strong>IA e LLMs:</strong> Python, LangChain, fine-tuning de modelos — salários 50% acima da média</li>
        <li><strong>Cloud:</strong> AWS (lidera), Azure (cresce em enterprise), GCP (IA nativa)</li>
        <li><strong>Containers e orquestração:</strong> Kubernetes, Docker — requisito em 70% das vagas sênior</li>
        <li><strong>TypeScript:</strong> substituiu JavaScript puro como padrão de mercado</li>
        <li><strong>Cybersecurity:</strong> Zero Trust, SASE — regulamentação LGPD aumenta demanda</li>
      </ul>

      <h2>Como entrar em TI em 2026 sem experiência</h2>
      <p>O caminho mais rápido é através de bootcamps (3–6 meses) focados em desenvolvimento web ou análise de dados. Empresas como iFood, Nubank e Mercado Livre têm programas de estágio e trainee específicos para quem vem de bootcamp — sem exigir diploma de TI.</p>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Precisa de diploma de TI para trabalhar na área?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não obrigatoriamente. A maioria das empresas de tecnologia contrata por habilidades técnicas comprovadas (portfólio, GitHub, certificações). O diploma ajuda em cargos de gestão e em empresas tradicionais.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Trabalhar remoto para empresa gringa vale a pena?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Para desenvolvedores sênior com inglês fluente, sim. Salários de USD 3.000–6.000/mês em reais equivalem a R$ 15.000–30.000 — com a vantagem de trabalhar de qualquer cidade do Brasil.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'direito-vale-a-pena',
    outputPath: 'pages/guias/direito-vale-a-pena.html',
    area: 'graduacao',
    title: 'Direito vale a pena em 2026? Mercado, salários e as especialidades mais lucrativas',
    subtitle: 'Análise honesta sobre o curso de Direito — empregabilidade, tempo de retorno e quais áreas pagam mais',
    badge: 'Guia do Curso',
    badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&h=500&fit=crop',
    imgAlt: 'Livros de direito e martelo de juiz sobre mesa de escritório',
    quickAnswer: 'Direito vale a pena para quem se especializa e passa na OAB. Advogados especialistas em Direito Tributário, Digital e Societário ganham <strong>R$ 15.000–R$ 50.000</strong>. O mercado é competitivo — há <strong>1,3 milhão de advogados</strong> no Brasil — mas a demanda por especialistas qualificados segue alta.',
    date: '2026-04-25',
    readTime: '9 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/direito-vale-a-pena.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Graduação', href: '../graduacao/index.html' },
      { label: 'Direito vale a pena?' },
    ],
    sidebarLinks: [
      { label: 'Curso de Direito', href: '../graduacao/direito/index.html' },
      { label: 'Especialização Direito Tributário', href: '../pos-graduacao/especializacao/direito-tributario/index.html' },
      { label: 'MBA vs Pós-graduação', href: 'mba-vs-pos-graduacao.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>O panorama do Direito no Brasil em 2026</h2>
      <p>O Brasil tem a maior quantidade de advogados por habitante do mundo — <strong>1,3 milhão de inscritos na OAB</strong> para 215 milhões de habitantes. A concorrência é real, mas isso não significa que Direito não vale a pena: significa que generalistas enfrentam dificuldade enquanto especialistas têm alta demanda.</p>

      <h2>Áreas de Direito mais lucrativas em 2026</h2>
      <table>
        <thead><tr><th>Especialidade</th><th>Salário CLT (sênior)</th><th>Honorários (autônomo)</th></tr></thead>
        <tbody>
          <tr><td>Direito Tributário</td><td>R$ 20.000–R$ 40.000</td><td>R$ 500–R$ 2.000/hora</td></tr>
          <tr><td>Direito Societário / M&A</td><td>R$ 18.000–R$ 35.000</td><td>% sobre operação</td></tr>
          <tr><td>Direito Digital e LGPD</td><td>R$ 15.000–R$ 30.000</td><td>R$ 300–R$ 1.500/hora</td></tr>
          <tr><td>Compliance</td><td>R$ 15.000–R$ 28.000</td><td>R$ 250–R$ 1.000/hora</td></tr>
          <tr><td>Direito do Trabalho</td><td>R$ 8.000–R$ 18.000</td><td>% sobre causa</td></tr>
          <tr><td>Direito Penal</td><td>R$ 6.000–R$ 20.000</td><td>Variável por caso</td></tr>
        </tbody>
      </table>

      <h2>A OAB: o filtro que define o mercado</h2>
      <p>Sem aprovação na OAB, não é possível advogar no Brasil. O exame tem taxa de reprovação histórica de <strong>80–85%</strong> — o que naturalmente filtra os profissionais. Quem passa e se especializa tem muito menos concorrência do que os números brutos sugerem.</p>

      <h2>Direito Digital: a especialidade que mais cresce</h2>
      <p>A LGPD (Lei Geral de Proteção de Dados) criou uma demanda explosiva por advogados especialistas em privacidade, cybersecurity legal e contratos de software. Em 2025, o número de vagas para advogados de Direito Digital cresceu 120% — e há menos de 5.000 especialistas formados no país.</p>

      <h2>Quando Direito não vale a pena</h2>
      <ul>
        <li>Se você quer resultado rápido — Direito exige 5 anos de graduação + OAB + especialização</li>
        <li>Se não gosta de ler e escrever muito — a profissão é essencialmente textual</li>
        <li>Se quer alta renda sem especialização — generalistas enfrentam tabelamento e concorrência brutal</li>
      </ul>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual a área de Direito mais fácil de se emprego?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Compliance e Direito do Trabalho têm maior volume de vagas CLT. Para quem quer emprego estável logo após a OAB, essas duas áreas oferecem mais oportunidades em empresas de médio e grande porte.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Direito EAD tem o mesmo valor que presencial?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>O diploma tem o mesmo valor legal. O que difere é o networking e a reputação da instituição — importantes para quem quer grandes escritórios. Para a OAB e mercado geral, o diploma EAD de instituição credenciada é equivalente.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'intercambio-pos-graduacao-exterior',
    outputPath: 'pages/guias/intercambio-pos-graduacao-exterior.html',
    area: 'posgraduacao',
    title: 'Pós-graduação no exterior em 2026: como fazer, custos e bolsas disponíveis',
    subtitle: 'Guia para brasileiros que querem fazer mestrado ou MBA fora do Brasil — programas, bolsas e custo real',
    badge: 'Guia Internacional',
    badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=500&fit=crop',
    imgAlt: 'Estudante internacional em campus universitário com mochila',
    quickAnswer: 'Um mestrado no exterior custa entre <strong>USD 20.000 e USD 80.000</strong> por ano (EUA, UK, Canadá). Bolsas disponíveis para brasileiros: <strong>CAPES/CNPq</strong> (ciências), <strong>Fulbright</strong> (EUA), <strong>Chevening</strong> (UK) e <strong>bolsas internas das universidades</strong>. Portugal é a opção mais acessível: cursos a partir de EUR 3.000/ano.',
    date: '2026-04-25',
    readTime: '10 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/intercambio-pos-graduacao-exterior.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '#' },
      { label: 'Pós-graduação no Exterior' },
    ],
    sidebarLinks: [
      { label: 'Pós-graduação no exterior', href: 'pos-graduacao-exterior.html' },
      { label: 'MBA em Marketing Digital', href: '../pos-graduacao/mba/mba-marketing-digital/index.html' },
      { label: 'Mestrado vs Doutorado', href: 'mestrado-vs-doutorado.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>Por que fazer pós-graduação no exterior?</h2>
      <p>Um diploma de mestrado ou MBA de uma universidade estrangeira de prestígio abre portas no mercado global e pode aumentar o salário em <strong>30–80%</strong> no retorno ao Brasil. Além disso, a experiência internacional é cada vez mais valorizada por empresas multinacionais e startups globais.</p>

      <h2>Comparativo de destinos para brasileiros</h2>
      <table>
        <thead><tr><th>País</th><th>Custo anual (tuition)</th><th>Idioma</th><th>Visto</th></tr></thead>
        <tbody>
          <tr><td>EUA (top 50)</td><td>USD 30.000–USD 80.000</td><td>Inglês</td><td>F-1 (difícil)</td></tr>
          <tr><td>Reino Unido</td><td>GBP 15.000–GBP 35.000</td><td>Inglês</td><td>Student Visa</td></tr>
          <tr><td>Canadá</td><td>CAD 15.000–CAD 40.000</td><td>Inglês/Francês</td><td>Study Permit</td></tr>
          <tr><td>Portugal</td><td>EUR 3.000–EUR 8.000</td><td>Português</td><td>Visto D4 (fácil)</td></tr>
          <tr><td>Alemanha (público)</td><td>EUR 0–EUR 3.000 (taxas)</td><td>Alemão/Inglês</td><td>Visto de estudante</td></tr>
          <tr><td>Espanha</td><td>EUR 5.000–EUR 15.000</td><td>Espanhol</td><td>Visto de estudante</td></tr>
        </tbody>
      </table>

      <h2>Bolsas para brasileiros em 2026</h2>
      <table>
        <thead><tr><th>Bolsa</th><th>Destino</th><th>Área</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>CAPES / CNPq</td><td>Qualquer país</td><td>Ciências e pesquisa</td><td>USD 2.000/mês + mensalidade</td></tr>
          <tr><td>Fulbright</td><td>EUA</td><td>Todas</td><td>Mensalidade + custo de vida</td></tr>
          <tr><td>Chevening</td><td>Reino Unido</td><td>Liderança</td><td>Mensalidade + voo + custo de vida</td></tr>
          <tr><td>Erasmus Mundus</td><td>Europa</td><td>Todas</td><td>EUR 1.400/mês + mensalidade</td></tr>
          <tr><td>Bolsas internas das universidades</td><td>Variável</td><td>Todas</td><td>20–100% da mensalidade</td></tr>
        </tbody>
      </table>

      <h2>Portugal: o atalho mais acessível</h2>
      <p>Para brasileiros, Portugal oferece a combinação mais vantajosa: sem barreira de idioma, visto D4 com processo relativamente simples, custo de vida baixo para Europa e diplomas reconhecidos em todo o bloco da UE. Universidades como Nova SBE, ISCTE e Porto têm rankings internacionais respeitados.</p>

      <h2>Cronograma para aplicar em 2026</h2>
      <ul>
        <li><strong>Jan–Mar:</strong> Pesquisa de programas, preparação de IELTS/TOEFL</li>
        <li><strong>Abr–Jun:</strong> Cartas de recomendação, statement of purpose, candidaturas</li>
        <li><strong>Jul–Set:</strong> Respostas das universidades, solicitação de bolsas</li>
        <li><strong>Out–Dez:</strong> Visto, moradia, preparação para partida em Jan/Fev 2027</li>
      </ul>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Diploma de pós-graduação do exterior é reconhecido no Brasil?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Lato sensu (MBA, especialização) não precisa de revalidação — é reconhecido automaticamente. Stricto sensu (mestrado, doutorado) precisa de revalidação pela CAPES/MEC para uso em concursos públicos e docência, mas é aceito no mercado privado sem revalidação.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quanto custa viver em Portugal como estudante?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Em Lisboa: EUR 900–EUR 1.400/mês (moradia compartilhada + alimentação + transporte). No Porto: EUR 700–EUR 1.100/mês. Com a desvalorização do euro frente ao real, o custo em reais equivale a R$ 4.000–R$ 8.000/mês — viável com bolsa parcial ou poupança prévia.</p></div>
          </div>
        </div>
      </section>`
  },
  {
    slug: 'como-montar-curriculo-2026',
    outputPath: 'pages/guias/como-montar-curriculo-2026.html',
    area: 'carreiras',
    title: 'Como montar um currículo que passa pelo ATS em 2026 (com exemplos)',
    subtitle: 'O guia definitivo para criar um currículo que supera os filtros automáticos e chama atenção dos recrutadores',
    badge: 'Carreiras',
    badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=500&fit=crop',
    imgAlt: 'Pessoa montando currículo profissional no computador',
    quickAnswer: '<strong>70% dos currículos são descartados por sistemas ATS</strong> antes de chegar a um humano. Para passar: use palavras-chave da vaga, formato simples (sem colunas ou tabelas), PDF com texto selecionável, e destaque resultados quantificados — não apenas responsabilidades.',
    date: '2026-04-25',
    readTime: '8 min de leitura',
    canonical: 'https://hubdoestudante.com.br/pages/guias/como-montar-curriculo-2026.html',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Carreiras', href: '../carreiras/index.html' },
      { label: 'Como montar currículo 2026' },
    ],
    sidebarLinks: [
      { label: 'LinkedIn para estudantes', href: 'linkedin-para-estudantes.html' },
      { label: 'Primeira entrevista de emprego', href: 'primeira-entrevista-emprego.html' },
      { label: 'Soft skills valorizadas', href: 'soft-skills-recrutadores.html' },
    ],
    courseSlug: null,
    courseName: null,
    content: `
      <h2>O que é ATS e por que seu currículo é rejeitado</h2>
      <p>ATS (Applicant Tracking System) é o software que 98% das empresas médias e grandes usam para filtrar currículos antes de qualquer humano vê-los. O sistema lê seu PDF, extrai informações e pontua seu currículo com base nas palavras-chave da vaga. Se sua pontuação for baixa, você é descartado automaticamente.</p>

      <h2>Erros que eliminam currículos no ATS</h2>
      <table>
        <thead><tr><th>Erro</th><th>Por que é eliminado</th><th>Solução</th></tr></thead>
        <tbody>
          <tr><td>Layout em colunas</td><td>ATS lê linha por linha, embaralha as colunas</td><td>Layout de coluna única</td></tr>
          <tr><td>Foto no currículo</td><td>ATS não processa imagens</td><td>Remova a foto</td></tr>
          <tr><td>Tabelas HTML complexas</td><td>Extração de texto falha</td><td>Texto simples com marcadores</td></tr>
          <tr><td>Fontes decorativas</td><td>OCR não reconhece</td><td>Arial, Calibri ou Georgia</td></tr>
          <tr><td>Habilidades sem contexto</td><td>Sem match com palavras-chave</td><td>Use as exatas palavras da vaga</td></tr>
        </tbody>
      </table>

      <h2>Estrutura ideal do currículo em 2026</h2>
      <p><strong>1. Resumo profissional (3–4 linhas):</strong> Quem você é, sua especialidade e o que busca. Inclua as 2–3 palavras-chave mais importantes da vaga.</p>
      <p><strong>2. Experiência profissional:</strong> Cargo, empresa, período. Para cada posição, 2–4 bullets com resultados quantificados. Ex: "Reduzi o churn em 18% em 6 meses através de..." — não "Responsável por reduzir o churn".</p>
      <p><strong>3. Formação:</strong> Curso, instituição, ano de conclusão. Pós-graduação vem antes da graduação.</p>
      <p><strong>4. Habilidades técnicas:</strong> Lista simples com as ferramentas e tecnologias — use as mesmas palavras da descrição da vaga.</p>

      <h2>Como personalizar para cada vaga (sem refazer tudo)</h2>
      <ul>
        <li>Copie a descrição da vaga e cole no WordCloud — as palavras maiores são as mais importantes</li>
        <li>Verifique se essas palavras aparecem no seu resumo e habilidades</li>
        <li>Ajuste o resumo profissional para cada candidatura (leva 5 minutos)</li>
        <li>Use o mesmo título do cargo da vaga no seu resumo</li>
      </ul>

      <h2>Ferramentas gratuitas para testar seu currículo</h2>
      <table>
        <thead><tr><th>Ferramenta</th><th>O que faz</th></tr></thead>
        <tbody>
          <tr><td>Jobscan.co</td><td>Compara seu currículo com a vaga e dá match score</td></tr>
          <tr><td>Resume Worded</td><td>Análise geral de qualidade do currículo</td></tr>
          <tr><td>Canva (templates simples)</td><td>Layout limpo e compatível com ATS</td></tr>
        </tbody>
      </table>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Currículo deve ter foto no Brasil?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. Em 2026, a tendência no Brasil segue o padrão internacional — sem foto. Foto não agrega informação profissional e prejudica a leitura do ATS. Só inclua se a vaga pedir explicitamente.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quantas páginas deve ter o currículo?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>1 página para quem tem menos de 5 anos de experiência. 2 páginas para profissionais sênior. Nunca 3 páginas — se precisar de 3, está colocando informação irrelevante.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Devo colocar pretensão salarial no currículo?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não, a menos que a empresa exija. Informar o salário antes da entrevista limita seu poder de negociação. Se perguntado, dê uma faixa — não um número fixo.</p></div>
          </div>
        </div>
      </section>`
  },
];

function generate() {
  let count = 0;
  articles.forEach(article => {
    const { outputPath, ...pageData } = article;
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, buildPage(pageData));
    console.log(`✓ ${outputPath}`);
    count++;
  });
  console.log(`\n✓ ${count} artigos gerados com sucesso!`);
}

generate();
