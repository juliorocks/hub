import fs from 'fs';
import { buildPage } from './template.js';

// Imagens verificadas HTTP 200 — NENHUMA repetida com o banco existente
const artigos = [
  {
    slug: 'como-pagar-faculdade',
    area: 'guias',
    title: 'Como pagar a faculdade: FIES, ProUni, bolsas e financiamento privado 2026',
    subtitle: 'Guia completo com todas as opções para financiar sua graduação sem endividar demais',
    badge: 'Finanças', badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&h=500&fit=crop',
    imgAlt: 'Estudante calculando custos da faculdade',
    quickAnswer: 'As principais opções para pagar a faculdade são: <strong>ProUni</strong> (bolsa integral ou parcial via ENEM, gratuita), <strong>FIES</strong> (financiamento federal com juros baixos), <strong>bolsas de instituições privadas</strong> (descontos de 30–70%) e <strong>financiamento privado</strong> (Pravaler, ESPM+). Cada uma tem critérios diferentes — conheça antes de escolher.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Como pagar a faculdade' }
    ],
    sidebarLinks: [
      { label: 'FIES: como se preparar', href: 'como-se-preparar-fies.html' },
      { label: 'Bolsas de estudo 2026', href: 'bolsas-de-estudo-2026.html' },
      { label: 'EAD vale a pena?', href: 'ead-vale-a-pena.html' },
      { label: 'Universidades custo-benefício', href: 'universidades-custo-beneficio.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/como-pagar-faculdade.html',
    content: `
      <h2>Panorama: quanto custa uma faculdade no Brasil?</h2>
      <p>A mensalidade de uma graduação privada no Brasil varia de <strong>R$ 400/mês</strong> (tecnólogos EAD) a <strong>R$ 8.000/mês</strong> (Medicina presencial em faculdades de ponta). A maioria dos cursos de bacharelado presencial fica entre R$ 1.200 e R$ 2.800/mês. Saber o custo total antes de ingressar é essencial para não abandonar o curso na metade.</p>

      <h2>Comparativo das principais opções</h2>
      <table>
        <thead><tr><th>Opção</th><th>Quem pode usar</th><th>Desconto ou cobertura</th><th>Paga de volta?</th></tr></thead>
        <tbody>
          <tr><td>ProUni (bolsa integral)</td><td>Renda familiar até 1,5 SM per capita + ENEM</td><td>100% da mensalidade</td><td>Não</td></tr>
          <tr><td>ProUni (bolsa parcial)</td><td>Renda familiar até 3 SM per capita + ENEM</td><td>50% da mensalidade</td><td>Não</td></tr>
          <tr><td>FIES</td><td>Renda familiar até 3 SM per capita + ENEM 450+</td><td>Financia até 100%</td><td>Sim (após formatura)</td></tr>
          <tr><td>Bolsa da faculdade</td><td>Varia por instituição</td><td>30–70% da mensalidade</td><td>Não (desconto direto)</td></tr>
          <tr><td>Pravaler / FIES privado</td><td>Qualquer estudante</td><td>Financia até 100%</td><td>Sim (durante ou após)</td></tr>
        </tbody>
      </table>

      <h2>ProUni: a melhor opção para quem se encaixa</h2>
      <p>O ProUni é o programa de bolsas do governo federal para faculdades privadas. As bolsas são <strong>gratuitas</strong> — você não paga nada de volta. O critério principal é a renda familiar per capita (até 1,5 salário mínimo para bolsa integral) e a nota no ENEM (mínimo de 450 pontos e não ter tirado zero na redação).</p>
      <p>A seleção é feita pelo <strong>SiSU-ProUni</strong> duas vezes por ano (janeiro e julho). Bolsistas podem acumular com estágio remunerado, mas perdem a bolsa se reprovarem em mais de 25% das disciplinas por semestre.</p>

      <h2>FIES: financiamento federal com juros subsidiados</h2>
      <p>O FIES (Fundo de Financiamento Estudantil) financia até 100% da mensalidade com juros de <strong>3,4% ao ano</strong> — muito abaixo do mercado. O pagamento começa 18 meses após a formatura e pode ser parcelado em até 3 vezes o tempo do curso. A modalidade FIES Social tem juros de 0% para as famílias de menor renda.</p>
      <p>Atenção: o número de vagas do FIES é limitado e a demanda é alta. Inscreva-se no primeiro ciclo do ano para ter mais chances.</p>

      <h2>Bolsas das próprias faculdades</h2>
      <p>Redes como Anhanguera, Kroton, Unip e Estácio oferecem descontos de 30% a 70% diretamente, sem precisar do governo. Plataformas como <strong>Quero Bolsa</strong> e <strong>Educa Mais Brasil</strong> intermediam bolsas de centenas de faculdades. O processo é simples: cadastro, prova de seleção ou apresentação do ENEM, e aprovação instantânea em muitos casos.</p>

      <h2>Financiamento privado: Pravaler e outros</h2>
      <p>Para quem não se encaixa no ProUni ou FIES, o financiamento privado é uma alternativa. O Pravaler financia até 100% da mensalidade com taxas a partir de 1,2% ao mês. O pagamento pode ser feito durante ou após o curso. Compare sempre o CET (Custo Efetivo Total) antes de assinar.</p>

      <h2>Estratégia: combinando fontes</h2>
      <p>Muitos estudantes combinam bolsa parcial do ProUni com trabalho part-time para cobrir os 50% restantes. Outra estratégia é ingressar via bolsa da faculdade e tentar transferir para o FIES no semestre seguinte. A chave é não depender de uma única fonte.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Veja bolsas disponíveis agora</h3>
          <p class="affiliate-cta-article__text">Compare descontos de até 70% nas principais faculdades parceiras.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver bolsas na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver bolsas na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Posso ter ProUni e trabalhar ao mesmo tempo?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. O ProUni não proíbe trabalho remunerado. A renda do bolsista não é considerada para manter a bolsa — apenas a renda familiar na época da inscrição. Você pode trabalhar, fazer estágio e receber bolsa ao mesmo tempo.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>O FIES cobre curso EAD?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim, desde 2022 o FIES passou a cobrir cursos EAD credenciados pelo MEC. A faculdade precisa estar cadastrada no programa. Verifique no site do FIES quais instituições e cursos EAD estão habilitados no seu estado.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual a diferença entre ProUni e FIES?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>ProUni é <strong>bolsa</strong> (você não paga de volta). FIES é <strong>financiamento</strong> (você paga após se formar, com juros subsidiados). Ambos exigem ENEM e critérios de renda. Se você se encaixa no ProUni, ele é sempre melhor que o FIES porque não gera dívida.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'salario-por-formacao',
    area: 'guias',
    title: 'Salário por formação: quanto ganha quem tem ensino médio, técnico, graduação e pós 2026',
    subtitle: 'Comparativo real de remuneração por nível de escolaridade e o ROI de cada diploma',
    badge: 'Carreira', badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&h=500&fit=crop',
    imgAlt: 'Profissional analisando salários e formação',
    quickAnswer: 'No Brasil, quem tem <strong>ensino superior</strong> ganha em média <strong>2,4 vezes mais</strong> que quem tem só o ensino médio. A diferença entre pós-graduação e graduação é de <strong>30–80%</strong> dependendo da área. Mas o ROI varia muito: cursos de 2 anos com alto salário inicial podem superar bacharelados de 5 anos em renda acumulada.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Salário por formação' }
    ],
    sidebarLinks: [
      { label: 'Profissões de alta demanda 2026', href: 'profissoes-alta-demanda-2026.html' },
      { label: 'MBA vs Pós-Graduação', href: 'mba-vs-pos-graduacao.html' },
      { label: 'Carreira sem faculdade', href: 'carreira-sem-faculdade.html' },
      { label: 'Quanto tempo leva se formar', href: 'quanto-tempo-leva-se-formar.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/salario-por-formacao.html',
    content: `
      <h2>Quanto o diploma realmente vale?</h2>
      <p>O impacto da formação no salário é real, mas não uniforme. A área escolhida importa mais do que o nível do diploma. Um técnico em eletrônica com 10 anos de experiência pode ganhar mais que um bacharel em Letras recém-formado. Entender o ROI (retorno sobre investimento) de cada formação é essencial antes de escolher.</p>

      <h2>Salário médio por nível de escolaridade no Brasil</h2>
      <table>
        <thead><tr><th>Escolaridade</th><th>Salário médio mensal</th><th>Multiplicador vs ensino médio</th></tr></thead>
        <tbody>
          <tr><td>Ensino fundamental incompleto</td><td>R$ 1.350</td><td>0,7×</td></tr>
          <tr><td>Ensino médio completo</td><td>R$ 1.900</td><td>1×</td></tr>
          <tr><td>Técnico / Tecnólogo</td><td>R$ 2.800 – R$ 4.500</td><td>1,5–2,4×</td></tr>
          <tr><td>Graduação (bacharelado)</td><td>R$ 4.500 – R$ 7.000</td><td>2,4–3,7×</td></tr>
          <tr><td>Pós-graduação lato sensu (especialização)</td><td>R$ 6.000 – R$ 10.000</td><td>3,2–5,3×</td></tr>
          <tr><td>Mestrado</td><td>R$ 7.000 – R$ 14.000</td><td>3,7–7,4×</td></tr>
          <tr><td>Doutorado</td><td>R$ 9.000 – R$ 20.000</td><td>4,7–10,5×</td></tr>
        </tbody>
      </table>

      <h2>ROI por tipo de formação</h2>
      <table>
        <thead><tr><th>Formação</th><th>Custo médio total</th><th>Tempo até mercado</th><th>Aumento salarial médio</th></tr></thead>
        <tbody>
          <tr><td>Técnico (SENAI/SENAC)</td><td>R$ 0 – R$ 8.000</td><td>1,5–2 anos</td><td>+40–80% vs ensino médio</td></tr>
          <tr><td>Tecnólogo EAD</td><td>R$ 5.000 – R$ 15.000</td><td>2,5 anos</td><td>+60–120%</td></tr>
          <tr><td>Bacharelado (4–5 anos)</td><td>R$ 30.000 – R$ 120.000</td><td>4–5 anos</td><td>+100–200%</td></tr>
          <tr><td>Pós-graduação (especialização)</td><td>R$ 8.000 – R$ 25.000</td><td>1–1,5 anos</td><td>+30–80% sobre graduação</td></tr>
          <tr><td>MBA (FGV, Ibmec)</td><td>R$ 20.000 – R$ 60.000</td><td>1–2 anos</td><td>+50–120% sobre graduação</td></tr>
        </tbody>
      </table>

      <h2>Áreas onde a pós-graduação mais compensa</h2>
      <p>Nem toda especialização vale o investimento. As áreas com maior delta salarial entre graduação e pós são:</p>
      <ul>
        <li><strong>Medicina:</strong> especialização via residência aumenta o salário de R$ 8.000 para R$ 20.000–R$ 50.000</li>
        <li><strong>Direito Tributário:</strong> especialização sai de R$ 5.000 para R$ 15.000–R$ 40.000</li>
        <li><strong>TI — Arquitetura de Software:</strong> de R$ 12.000 para R$ 20.000–R$ 35.000</li>
        <li><strong>Administração — MBA executivo:</strong> de R$ 8.000 para R$ 18.000–R$ 35.000</li>
        <li><strong>Enfermagem — UTI/Emergência:</strong> de R$ 3.000 para R$ 6.000–R$ 10.000</li>
      </ul>

      <h2>Áreas onde o diploma importa menos</h2>
      <p>Em algumas carreiras, o portfólio e as certificações superam o diploma formal. Desenvolvimento de software, marketing digital, design e criação de conteúdo são exemplos onde profissionais sem diploma chegam aos mesmos salários de formados, desde que tenham habilidades comprovadas e portfólio sólido.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Quer aumentar sua renda com o diploma certo?</h3>
          <p class="affiliate-cta-article__text">Compare cursos com melhor ROI nas principais faculdades parceiras.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver bolsas na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver bolsas na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale mais fazer especialização ou MBA?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Depende do objetivo. MBA em escola de prestígio (FGV, Ibmec) tem maior impacto para carreira executiva e abre portas em consultorias e grandes corporações. A especialização técnica (em medicina, direito, TI) tem maior impacto direto no salário do profissional especializado. Para gestão, MBA. Para técnica, especialização.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Tecnólogo tem o mesmo salário que bacharel?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Em muitas áreas, sim. TI, logística, gestão de RH e marketing são exemplos onde o tecnólogo tem acesso às mesmas vagas que o bacharel no mercado privado. A diferença aparece em concursos públicos que exigem especificamente "bacharelado" e em algumas multinacionais para cargos de liderança.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'como-estudar-para-concurso',
    area: 'guias',
    title: 'Como estudar para concurso público: guia completo do zero em 2026',
    subtitle: 'Método, organização, materiais e cronograma para passar no concurso que você quer',
    badge: 'Concursos', badgeClass: 'badge badge--orange',
    img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&h=500&fit=crop',
    imgAlt: 'Estudante se preparando para concurso público',
    quickAnswer: 'Para passar em concurso público, o processo tem 4 etapas: <strong>escolha do concurso</strong> (alinhado ao seu perfil), <strong>análise do edital</strong> (matérias com maior peso), <strong>cronograma realista</strong> (6–18 meses de preparação) e <strong>revisão constante</strong> (questões de provas anteriores são o melhor treino). Disciplina supera inteligência.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Como estudar para concurso' }
    ],
    sidebarLinks: [
      { label: 'Produtividade para estudantes', href: 'produtividade-estudantes.html' },
      { label: 'Estudar sozinho para vestibular', href: 'estudar-sozinho-vestibular.html' },
      { label: 'Profissões de alta demanda', href: 'profissoes-alta-demanda-2026.html' },
      { label: 'Soft skills valorizadas', href: 'soft-skills-recrutadores.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/como-estudar-para-concurso.html',
    content: `
      <h2>Por que concurso público ainda vale a pena em 2026?</h2>
      <p>Estabilidade, salário acima da média, benefícios (plano de saúde, aposentadoria, férias), progressão de carreira garantida e, em muitos casos, possibilidade de trabalho híbrido. O salário de entrada de um analista do Banco Central ultrapassa R$ 20.000. Um auditor fiscal federal começa com R$ 21.000. Um juiz federal chega a R$ 35.000. Os concursos de alto impacto ainda são o maior atalho para renda elevada no Brasil.</p>

      <h2>Principais concursos por área e salário</h2>
      <table>
        <thead><tr><th>Concurso</th><th>Escolaridade</th><th>Salário inicial</th><th>Dificuldade</th></tr></thead>
        <tbody>
          <tr><td>Banco Central (analista)</td><td>Graduação</td><td>R$ 20.900</td><td>Muito alta</td></tr>
          <tr><td>Receita Federal (auditor)</td><td>Graduação</td><td>R$ 21.000</td><td>Muito alta</td></tr>
          <tr><td>INSS (técnico)</td><td>Ensino médio</td><td>R$ 5.900</td><td>Alta</td></tr>
          <tr><td>Polícia Federal (delegado)</td><td>Direito</td><td>R$ 23.000</td><td>Muito alta</td></tr>
          <tr><td>TRT/TRF (analista judiciário)</td><td>Graduação</td><td>R$ 13.000</td><td>Alta</td></tr>
          <tr><td>Professor municipal/estadual</td><td>Licenciatura</td><td>R$ 3.500 – R$ 7.000</td><td>Média</td></tr>
          <tr><td>Guarda Municipal</td><td>Ensino médio</td><td>R$ 2.500 – R$ 5.000</td><td>Média</td></tr>
        </tbody>
      </table>

      <h2>Passo a passo: como montar seu plano de estudos</h2>

      <h3>1. Escolha o concurso certo para você</h3>
      <p>Analise: escolaridade exigida, número de vagas, periodicidade do concurso (anual? a cada 3 anos?), salário, local de trabalho e compatibilidade com sua formação. Não tente se preparar para 5 concursos ao mesmo tempo — foco é mais eficiente.</p>

      <h3>2. Leia o edital completamente</h3>
      <p>O edital é a bíblia do concurso. Leia com atenção: matérias cobradas, peso de cada disciplina, número de questões, critérios de desempate. Destaque as disciplinas com maior peso e organize do maior para o menor impacto na nota final.</p>

      <h3>3. Calcule quantas horas você precisa</h3>
      <p>Um concurso de nível médio exige 400–600 horas de estudo. Um de nível superior difícil (Banco Central, Receita) pode exigir 1.500–2.500 horas. Divida o total pelo tempo disponível para saber quantas horas por dia você precisa estudar.</p>

      <h3>4. Monte o cronograma semanal</h3>
      <p>Distribua as matérias ao longo da semana com revisão espaçada: estudar a matéria nova, revisar depois de 1 dia, depois de 7 dias, depois de 30 dias. Use técnicas como Pomodoro (25 min estudo + 5 min pausa) para manter o foco.</p>

      <h3>5. Resolva questões anteriores — muito</h3>
      <p>A resolução de questões de provas anteriores da banca examinadora é o treinamento mais eficaz. Cada banca (CESPE, FCC, FGV, Vunesp) tem um estilo diferente. Após estudar a teoria, resolva pelo menos 200–300 questões por disciplina antes da prova.</p>

      <h2>Recursos gratuitos e pagos que valem</h2>
      <p>Gratuitos: YouTube (Gran Concursos, Estratégia Concursos), provas anteriores no site das bancas, legislação nos sites oficiais. Pagos: plataformas como Gran Concursos, Estratégia e QConcursos oferecem simulados, questões e cursos a partir de R$ 50/mês — geralmente valem o investimento pela economia de tempo.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Quer se qualificar melhor para concursos?</h3>
          <p class="affiliate-cta-article__text">Um diploma pode abrir portas para concursos de nível superior com maiores salários.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver cursos na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver cursos na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quantas horas por dia preciso estudar para concurso?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Para quem trabalha, 3–4 horas diárias são o mínimo viável. Quem estuda em período integral pode fazer 6–8 horas, mas qualidade supera quantidade. Estudar 4 horas focado rende mais que 8 horas disperso. O mais importante é a consistência — todos os dias, sem gaps longos.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quanto tempo antes da prova devo começar a estudar?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Para concursos de nível médio: 6–12 meses. Para concursos de alto nível (Receita Federal, Banco Central, Magistratura): 18–36 meses. Comece assim que o edital sair ou antecipe com o conteúdo de editais anteriores — as matérias mudam pouco entre edições.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Vale fazer cursinho para concurso?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Para concursos de alta complexidade, sim — a estrutura e o suporte aceleram a preparação. Para concursos de nível médio, o material gratuito e plataformas de questões podem ser suficientes. O autodidatismo funciona muito bem em concursos com menos matérias e para quem tem autodisciplina.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'trabalhar-e-estudar-ao-mesmo-tempo',
    area: 'guias',
    title: 'Trabalhar e estudar ao mesmo tempo: como conciliar sem enlouquecer',
    subtitle: 'Estratégias reais de organização, prioridade e sustentabilidade para quem não pode parar de trabalhar',
    badge: 'Vida Acadêmica', badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&h=500&fit=crop',
    imgAlt: 'Estudante trabalhando e estudando ao mesmo tempo',
    quickAnswer: 'Trabalhar e estudar ao mesmo tempo é o modelo de <strong>70% dos estudantes brasileiros</strong>. O segredo está na escolha certa do curso (EAD ou noturno), na gestão de tempo e no controle das prioridades. Não é fácil — mas é completamente viável com o sistema certo.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Trabalhar e estudar ao mesmo tempo' }
    ],
    sidebarLinks: [
      { label: 'EAD vale a pena?', href: 'ead-vale-a-pena.html' },
      { label: 'Produtividade para estudantes', href: 'produtividade-estudantes.html' },
      { label: 'EAD vs presencial', href: 'ead-presencial-diferenca.html' },
      { label: 'Currículo para primeiro emprego', href: 'curriculo-primeiro-emprego.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/trabalhar-e-estudar-ao-mesmo-tempo.html',
    content: `
      <h2>A realidade de quem trabalha e estuda</h2>
      <p>No Brasil, 7 em cada 10 estudantes universitários trabalham enquanto cursam a graduação, segundo dados do IBGE. A maioria enfrenta os mesmos desafios: cansaço após o trabalho, falta de tempo para estudar e sensação constante de estar devendo atenção a todos os lados.</p>
      <p>A boa notícia: é possível conciliar os dois sem comprometer a saúde mental nem o desempenho — mas isso exige estratégia, não apenas força de vontade.</p>

      <h2>Primeiro passo: escolha o formato certo de curso</h2>
      <table>
        <thead><tr><th>Formato</th><th>Ideal para</th><th>Carga semanal de presença</th></tr></thead>
        <tbody>
          <tr><td>EAD puro</td><td>Quem tem horário imprevisível ou trabalho fora do eixo</td><td>0 — 100% online</td></tr>
          <tr><td>Semipresencial</td><td>Quem precisa de alguma estrutura presencial</td><td>2–4 horas/semana</td></tr>
          <tr><td>Presencial noturno</td><td>Quem mora perto da faculdade e trabalha durante o dia</td><td>4–5 noites/semana</td></tr>
          <tr><td>Presencial matutino</td><td>Quem trabalha à tarde/noite (comércio, saúde)</td><td>5 manhãs/semana</td></tr>
        </tbody>
      </table>

      <h2>Como organizar o tempo: o sistema dos 3 blocos</h2>
      <p>Divida seu dia em 3 blocos fixos: <strong>trabalho</strong>, <strong>estudo</strong> e <strong>recuperação</strong>. Não misture. A recuperação (sono, alimentação, lazer mínimo) não é opcional — é o que sustenta os outros dois blocos ao longo de meses e anos.</p>
      <p>Um modelo viável para quem trabalha 8h por dia: acorde 1h mais cedo para estudar (quando o cérebro está mais descansado), use 30–40 min do almoço para revisar flashcards, e estude 1–2h à noite antes de dormir. Total: 2,5–3,5h de estudo diário.</p>

      <h2>Técnicas que funcionam para quem tem pouco tempo</h2>
      <ul>
        <li><strong>Aprendizado ativo:</strong> em vez de reler o material, faça resumos, mapas mentais e resolva exercícios. Aprende mais em menos tempo.</li>
        <li><strong>Repetição espaçada:</strong> revisar o conteúdo em intervalos crescentes (1 dia, 7 dias, 30 dias) fixa muito mais que maratonas de estudo.</li>
        <li><strong>Audiobooks e podcasts:</strong> use deslocamentos e momentos passivos para consumir conteúdo do curso — aulas gravadas podem ser ouvidas no ônibus ou durante a academia.</li>
        <li><strong>Batching:</strong> agrupe tarefas similares. Faça todas as leituras de uma disciplina no mesmo dia em vez de distribuir ao longo da semana.</li>
      </ul>

      <h2>Como conversar com seu empregador</h2>
      <p>Muitas empresas têm programas de apoio à educação (reembolso de mensalidade, horário flexível para estudos). Antes de assumir que não existe, pergunte ao RH. Apresente como benefício para a empresa: seu desenvolvimento profissional retorna como habilidade para o trabalho.</p>

      <h2>Quando é hora de reduzir o ritmo</h2>
      <p>Sinais de alerta: queda significativa no desempenho do trabalho, mais de 3 faltas seguidas na faculdade, insônia crônica, ansiedade constante. Nestes casos, considere trocar para EAD, reduzir a carga horária do trabalho (se possível) ou prorrogar a conclusão do curso. Largá-lo por completo deve ser o último recurso.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Procurando um curso que caiba na sua rotina?</h3>
          <p class="affiliate-cta-article__text">EAD com mensalidades a partir de R$ 80/mês — estude no seu ritmo.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/unopar.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver cursos EAD na Unopar <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/anhanguera.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver cursos na Anhanguera</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>EAD é reconhecido pelo mercado para quem trabalha?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Sim. O diploma EAD de instituição credenciada pelo MEC tem o mesmo valor jurídico que o presencial. O mercado privado, especialmente em TI, negócios e educação, não discrimina a modalidade. Em concursos públicos, o diploma é aceito igualmente.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quantas horas por dia dá para estudar trabalhando 8h?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>De forma sustentável, 2–3 horas diárias. Com sacrifícios temporários (prova chegando), até 5h em dias específicos. Mais que isso por semanas seguidas gera burnout. A consistência de 2h/dia supera as maratonas esporádicas de 8h nos fins de semana.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'linkedin-para-estudantes',
    area: 'guias',
    title: 'LinkedIn para estudantes: como montar um perfil que atrai recrutadores em 2026',
    subtitle: 'Do zero ao perfil completo: o que colocar, como se posicionar e como conseguir o primeiro emprego ou estágio',
    badge: 'Carreira', badgeClass: 'badge badge--blue',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&h=500&fit=crop',
    imgAlt: 'Estudante usando LinkedIn para buscar emprego',
    quickAnswer: 'Um perfil LinkedIn eficaz para estudante tem: <strong>foto profissional</strong>, <strong>headline clara</strong> ("Estudante de X | Buscando estágio em Y"), <strong>resumo com seus diferenciais</strong>, <strong>experiências mesmo que informais</strong> e <strong>conexões relevantes</strong> (professores, colegas, profissionais da área). Perfis completos recebem <strong>40× mais oportunidades</strong> que perfis incompletos.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'LinkedIn para estudantes' }
    ],
    sidebarLinks: [
      { label: 'Currículo para primeiro emprego', href: 'curriculo-primeiro-emprego.html' },
      { label: 'Guia de estágios', href: 'guia-estagios.html' },
      { label: 'Primeira entrevista de emprego', href: 'primeira-entrevista-emprego.html' },
      { label: 'Soft skills valorizadas', href: 'soft-skills-recrutadores.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/linkedin-para-estudantes.html',
    content: `
      <h2>Por que o LinkedIn é obrigatório para estudantes?</h2>
      <p>O LinkedIn tem mais de 70 milhões de usuários no Brasil e é a principal plataforma de recrutamento profissional. Recrutadores buscam candidatos ativamente pela plataforma — não apenas quando há vaga aberta. Um perfil otimizado funciona como um currículo vivo que trabalha para você 24h por dia.</p>
      <p>Para estudantes sem experiência formal, o LinkedIn é ainda mais importante: permite mostrar projetos, habilidades, certificações e a rede de contatos construída durante a faculdade — tudo que um currículo em papel não consegue transmitir.</p>

      <h2>Checklist do perfil completo</h2>
      <table>
        <thead><tr><th>Elemento</th><th>O que colocar</th><th>Impacto no recrutamento</th></tr></thead>
        <tbody>
          <tr><td>Foto profissional</td><td>Rosto visível, fundo neutro, roupa adequada</td><td>Alto — perfis com foto têm 21× mais visualizações</td></tr>
          <tr><td>Headline (título)</td><td>"Estudante de [Curso] | Buscando estágio em [Área]"</td><td>Alto — aparece em todas as buscas</td></tr>
          <tr><td>Resumo (Sobre)</td><td>3–5 linhas: quem você é, o que você busca, seu diferencial</td><td>Alto — primeiro texto que recrutador lê</td></tr>
          <tr><td>Formação</td><td>Curso, faculdade, período (início e previsão de conclusão)</td><td>Médio</td></tr>
          <tr><td>Experiências</td><td>Estágio, IC, trabalho voluntário, freela, projetos de extensão</td><td>Alto</td></tr>
          <tr><td>Habilidades</td><td>Ferramentas, idiomas, competências técnicas relevantes</td><td>Médio</td></tr>
          <tr><td>Certificados</td><td>Cursos online, bootcamps, certificações técnicas</td><td>Médio</td></tr>
          <tr><td>Recomendações</td><td>Pedidas a professores, orientadores ou supervisores de estágio</td><td>Alto</td></tr>
        </tbody>
      </table>

      <h2>Como escrever um headline que funciona</h2>
      <p>O headline é o texto abaixo do seu nome — o mais lido do perfil. Evite o genérico "Estudante de Administração". Prefira algo específico e com palavra-chave de busca: <em>"Estudante de Administração | Análise de dados e Excel avançado | Buscando estágio em Finanças"</em>.</p>
      <p>Use palavras-chave que recrutadores da sua área pesquisam: nomes de ferramentas (Python, Canva, SAP), competências (análise de dados, gestão de projetos, copywriting) e a área-alvo (marketing digital, recursos humanos, logística).</p>

      <h2>O que colocar em "Sobre" sem experiência</h2>
      <p>Escreva na primeira pessoa, de forma direta: "<em>Estou no 3º semestre de Engenharia de Software na UNICAMP. Tenho interesse em desenvolvimento backend (Python/Django) e já contribuí para 2 projetos open source no GitHub. Busco estágio onde possa desenvolver aplicações web escaláveis e aprender com times de engenharia experientes.</em>"</p>

      <h2>Como construir rede de contatos do zero</h2>
      <p>Comece conectando com: professores e coordenadores do curso, colegas de turma, palestrantes de eventos da faculdade, funcionários das empresas que você admira. Ao conectar, sempre mande uma mensagem personalizada de 2–3 linhas explicando por que você quer se conectar.</p>
      <p>Interaja com publicações da sua área: comente com perspectiva própria (não apenas "Ótimo post!"), compartilhe artigos com sua opinião, publique sobre projetos e aprendizados. Consistência cria visibilidade.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Aprimore seu currículo com um diploma reconhecido</h3>
          <p class="affiliate-cta-article__text">Um curso superior ou especialização fortalece seu perfil e atrai mais recrutadores.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver cursos na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver cursos na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Preciso pagar o LinkedIn Premium?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não é necessário para estudantes. O plano gratuito permite criar perfil completo, conectar com profissionais, candidatar-se a vagas e interagir com publicações. O Premium adiciona InMail (mensagem para quem não é contato), insights sobre quem visualizou o perfil e acesso a cursos — útil depois de formado, mas não essencial no início.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Com que frequência postar no LinkedIn?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Para estudante buscando estágio, 1–2 publicações por semana é suficiente. O importante é consistência e qualidade: compartilhe aprendizados do curso, projetos em andamento, certificações concluídas. Evite postar sobre política ou assuntos polêmicos — mantenha o perfil profissional.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'tecnico-ou-faculdade',
    area: 'guias',
    title: 'Técnico ou faculdade: qual escolher em 2026?',
    subtitle: 'Comparativo honesto de tempo, custo, salário e empregabilidade para tomar a melhor decisão',
    badge: 'Educação', badgeClass: 'badge badge--purple',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&h=500&fit=crop',
    imgAlt: 'Estudante decidindo entre curso técnico e faculdade',
    quickAnswer: '<strong>Curso técnico</strong> é ideal para quem quer entrar rápido no mercado (1,5–2 anos) com menor custo. <strong>Faculdade</strong> abre portas para cargos de liderança, salários mais altos no longo prazo e concursos públicos de nível superior. A melhor resposta depende da sua área, pressa e objetivo financeiro.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Técnico ou faculdade' }
    ],
    sidebarLinks: [
      { label: 'EAD vale a pena?', href: 'ead-vale-a-pena.html' },
      { label: 'Salário por formação', href: 'salario-por-formacao.html' },
      { label: 'Quanto tempo leva se formar', href: 'quanto-tempo-leva-se-formar.html' },
      { label: 'Carreira sem faculdade', href: 'carreira-sem-faculdade.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/tecnico-ou-faculdade.html',
    content: `
      <h2>Comparativo direto: técnico vs faculdade</h2>
      <table>
        <thead><tr><th>Critério</th><th>Curso técnico</th><th>Faculdade (bacharelado)</th></tr></thead>
        <tbody>
          <tr><td>Duração</td><td>1,5–2 anos</td><td>4–6 anos</td></tr>
          <tr><td>Custo total médio</td><td>R$ 0–R$ 12.000</td><td>R$ 20.000–R$ 120.000</td></tr>
          <tr><td>Salário inicial</td><td>R$ 1.800–R$ 3.500</td><td>R$ 2.500–R$ 6.000</td></tr>
          <tr><td>Teto salarial</td><td>Limitado sem graduação</td><td>Muito mais alto</td></tr>
          <tr><td>Concurso público nível superior</td><td>Não habilita</td><td>Habilita</td></tr>
          <tr><td>Cargos de liderança</td><td>Dificultado</td><td>Facilitado</td></tr>
          <tr><td>Empregabilidade no início</td><td>Muito alta</td><td>Alta (varia por área)</td></tr>
        </tbody>
      </table>

      <h2>Quando o técnico é a melhor escolha</h2>
      <p>O curso técnico supera a faculdade em situações específicas: quando você precisa de renda rapidamente, quando a área tem forte mercado para técnicos (eletrotécnica, enfermagem, mecânica, contabilidade), quando o custo da faculdade é inviável no momento, ou quando você quer confirmar se gosta da área antes de um investimento maior.</p>
      <p>Técnicos do SENAI e SENAC têm taxa de empregabilidade acima de 80% dentro de 6 meses da formatura. Em áreas como mecatrônica, petróleo e gás e eletrotécnica, técnicos experientes ganham mais que muitos bacharéis.</p>

      <h2>Quando a faculdade é imprescindível</h2>
      <p>Para medicina, direito, engenharia, psicologia, arquitetura e outras profissões regulamentadas, o bacharelado é obrigatório por lei — não há como substituir. Para concursos de nível superior (analistas, auditores, juízes), o diploma universitário é pré-requisito eliminatório. Para liderança em grandes empresas, o mercado ainda exige graduação na maioria dos cargos de gestão.</p>

      <h2>A estratégia do técnico + graduação</h2>
      <p>A combinação mais eficiente para muitos: fazer o técnico primeiro (2 anos), entrar no mercado de trabalho, acumular experiência e renda, e depois fazer a graduação — muitas vezes com custo coberto pela própria empresa (benefício educacional) ou via ProUni/FIES. Esta estratégia é especialmente popular em enfermagem, contabilidade e TI.</p>

      <h2>Técnico pelo SENAI e SENAC: gratuitos e de qualidade</h2>
      <p>SENAI (indústria) e SENAC (comércio e serviços) oferecem cursos técnicos de alta qualidade, com estrutura de laboratórios e conexão com o mercado. Muitos cursos são gratuitos ou subsidiados para baixa renda. A rede tem mais de 2.000 unidades no Brasil e parceria com as principais indústrias do país.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Quer começar a faculdade já?</h3>
          <p class="affiliate-cta-article__text">Veja cursos a partir de R$ 80/mês — presencial e EAD com bolsas disponíveis.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver bolsas na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver bolsas na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Técnico conta como formação para a faculdade?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>O certificado técnico não substitui nem compensa disciplinas da graduação automaticamente. Mas em algumas faculdades, o técnico na mesma área permite solicitar aproveitamento de disciplinas práticas, reduzindo a carga horária total do curso. Consulte a instituição antes de ingressar.</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Qual técnico tem maior salário?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Técnico em petróleo e gás (offshore): R$ 4.000–R$ 8.000. Técnico em segurança do trabalho: R$ 3.000–R$ 6.000. Técnico em eletrotécnica (indústria): R$ 2.800–R$ 5.500. Técnico em enfermagem com especialização em UTI: R$ 2.500–R$ 4.500. A experiência e o setor de atuação impactam mais que a titulação.</p></div>
          </div>
        </div>
      </section>`
  },

  {
    slug: 'renda-extra-para-estudantes',
    area: 'guias',
    title: 'Renda extra para estudantes: 12 formas reais de ganhar dinheiro enquanto estuda',
    subtitle: 'De freela a monitoria: opções com horário flexível, sem precisar abrir mão dos estudos',
    badge: 'Finanças', badgeClass: 'badge badge--green',
    img: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=900&h=500&fit=crop',
    imgAlt: 'Estudante trabalhando remotamente para renda extra',
    quickAnswer: 'As melhores fontes de renda extra para estudantes combinam <strong>horário flexível</strong> com <strong>desenvolvimento de habilidades</strong> do próprio curso. As mais rentáveis: <strong>freela na área do curso</strong> (R$ 500–R$ 3.000/mês), <strong>monitoria universitária</strong> (bolsa de R$ 400–R$ 800), <strong>aulas particulares</strong> (R$ 60–R$ 150/h) e <strong>trabalho remoto part-time</strong>.',
    breadcrumbs: [
      { label: 'Home', href: '../index.html' },
      { label: 'Guias', href: '../guias/' },
      { label: 'Renda extra para estudantes' }
    ],
    sidebarLinks: [
      { label: 'Freela vs CLT', href: 'freelancer-vs-clt.html' },
      { label: 'Trabalhar e estudar ao mesmo tempo', href: 'trabalhar-e-estudar-ao-mesmo-tempo.html' },
      { label: 'Guia de estágios', href: 'guia-estagios.html' },
      { label: 'Currículo para primeiro emprego', href: 'curriculo-primeiro-emprego.html' }
    ],
    canonical: 'https://hubdoestudante.com.br/pages/guias/renda-extra-para-estudantes.html',
    content: `
      <h2>Como escolher a renda extra certa</h2>
      <p>Nem toda renda extra vale a pena para estudante. A melhor opção combina três critérios: <strong>flexibilidade de horário</strong> (para não atrapalhar as aulas), <strong>relação com a área de estudo</strong> (acumula experiência junto com dinheiro) e <strong>potencial de crescimento</strong> (pode virar carreira ou portfólio).</p>

      <h2>12 formas de renda extra ranqueadas</h2>
      <table>
        <thead><tr><th>Opção</th><th>Renda mensal estimada</th><th>Tempo para começar</th><th>Flexibilidade</th></tr></thead>
        <tbody>
          <tr><td>Freela na área do curso (design, TI, redação)</td><td>R$ 500 – R$ 3.000</td><td>1–4 semanas</td><td>Alta</td></tr>
          <tr><td>Aulas particulares (matérias do ensino médio/faculdade)</td><td>R$ 400 – R$ 2.000</td><td>Imediato</td><td>Alta</td></tr>
          <tr><td>Monitoria universitária</td><td>R$ 400 – R$ 800 (bolsa)</td><td>1 semestre</td><td>Média</td></tr>
          <tr><td>Iniciação científica (IC)</td><td>R$ 500 – R$ 1.000 (bolsa PIBIC)</td><td>1 semestre</td><td>Média</td></tr>
          <tr><td>Trabalho remoto part-time</td><td>R$ 1.200 – R$ 3.500</td><td>2–6 semanas</td><td>Alta</td></tr>
          <tr><td>Conteúdo digital (YouTube, Instagram, TikTok)</td><td>R$ 0 – R$ 10.000+</td><td>6–18 meses</td><td>Alta</td></tr>
          <tr><td>Venda de resumos e materiais de estudo</td><td>R$ 200 – R$ 800</td><td>2–4 semanas</td><td>Alta</td></tr>
          <tr><td>Estágio remunerado</td><td>R$ 600 – R$ 2.000</td><td>1–3 meses</td><td>Baixa</td></tr>
          <tr><td>Aplicativos de entrega (iFood, Rappi)</td><td>R$ 800 – R$ 2.500</td><td>Imediato</td><td>Alta</td></tr>
          <tr><td>Tradução e revisão de textos</td><td>R$ 400 – R$ 1.500</td><td>1–2 semanas</td><td>Alta</td></tr>
          <tr><td>Assistente virtual / administrativo remoto</td><td>R$ 800 – R$ 2.000</td><td>2–4 semanas</td><td>Alta</td></tr>
          <tr><td>Pesquisa de mercado / grupos focais</td><td>R$ 100 – R$ 500</td><td>Imediato</td><td>Alta</td></tr>
        </tbody>
      </table>

      <h2>Freela na área do curso: a opção de maior ROI</h2>
      <p>Para estudantes de TI, design, marketing, direito, contabilidade e comunicação, o freela é a melhor renda extra. Além do dinheiro, você constrói portfólio e experiência que valem no currículo. Plataformas: Workana, 99Freelas (nacional) e Upwork, Fiverr (internacional, pagamento em dólar).</p>
      <p>Exemplo: estudante de design que faz 3 logos por mês a R$ 300 cada fatura R$ 900 extras enquanto aprende na prática o que está estudando na teoria.</p>

      <h2>Aulas particulares: renda imediata sem investimento</h2>
      <p>Todo estudante universitário tem conhecimento para ensinar: matérias do ensino médio (matemática, física, química, inglês) e matérias do próprio curso. Plataformas como Superprof, Profes e Edukee conectam professores e alunos. Cobrar R$ 60–R$ 100/h por 2 aulas semanais já gera R$ 480–R$ 800/mês.</p>

      <h2>Monitoria e IC: renda + currículo + network</h2>
      <p>Monitoria universitária e iniciação científica pagam pouco (R$ 400–R$ 1.000/mês) mas têm valor altíssimo no currículo e na rede de contatos. Professores orientadores abrem portas para mestrado, recomendações e indicações profissionais. Se você pensa em pós-graduação, IC é praticamente obrigatória.</p>

      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">Quer aumentar sua renda com uma qualificação?</h3>
          <p class="affiliate-cta-article__text">Uma graduação ou especialização abre acesso a rendas extras melhores remuneradas.</p>
          <div class="affiliate-cta-article__actions">
            <a href="/pages/universidades/anhanguera.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">Ver cursos na Anhanguera <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="/pages/universidades/unopar.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">Ver cursos na Unopar</a>
          </div>
        </div>
      </div>

      <section class="faq-section" aria-labelledby="faq-title">
        <h2 class="faq-section__title" id="faq-title">Perguntas Frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Freela afeta o bolsista do ProUni?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>Não. O ProUni não acompanha a renda do bolsista após a concessão. A renda familiar avaliada é a da época da inscrição. Bolsistas podem trabalhar, fazer freela e ganhar qualquer valor sem perder a bolsa — desde que mantenham o desempenho acadêmico exigido (não reprovar em mais de 25% das disciplinas).</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>Quanto tempo por semana dedicar à renda extra sem prejudicar os estudos?</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>O limite saudável é 15–20 horas semanais de trabalho para quem estuda em período integral. Mais que isso começa a comprometer o desempenho acadêmico. Para cursos noturnos com trabalho diurno, o limite já está sendo usado — a renda extra precisa ser muito flexível (fim de semana, madrugada, sob demanda).</p></div>
          </div>
        </div>
      </section>`
  }
];

// Gera os arquivos HTML
artigos.forEach(artigo => {
  const filePath = `./pages/guias/${artigo.slug}.html`;
  fs.writeFileSync(filePath, buildPage(artigo));
  console.log(`✓ ${artigo.slug}`);
});

console.log('\n✓ 7 artigos gerados com template canônico!');
