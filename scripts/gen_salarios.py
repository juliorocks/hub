import os, sys

BASE = os.path.join(os.path.dirname(__file__), '..', 'pages', 'carreiras', 'salarios')

TEMPLATE = open(os.path.join(BASE, 'quanto-ganha-medico.html'), encoding='utf-8').read()

# Template simplificado para geração rápida
def make_page(title, breadcrumb, quick_answer, cargo_rows, vinculo_rows, estado_rows,
              progressao, infobox_title, infobox_text, cta_title, cta_text,
              univ1_slug, univ1_label, univ2_slug, univ2_label,
              faq1q, faq1a, faq2q, faq2a, tags_html, sidebar_links_html):
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Hub do Estudante</title>
  <meta name="description" content="{title} - dados atualizados 2026 com faixas salariais, progressao de carreira e mercado de trabalho no Brasil.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="../../../assets/css/base.css">
  <link rel="stylesheet" href="../../../assets/css/layout.css">
  <link rel="stylesheet" href="../../../assets/css/components.css">
  <link rel="stylesheet" href="../../../assets/css/article.css">
  <link rel="stylesheet" href="../../../assets/css/responsive.css">
</head>
<body class="page-wrapper" data-area="carreiras">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item"><a href="../../../index.html" class="breadcrumb__link">Home</a></li>
        <li class="breadcrumb__item"><a href="../../index.html" class="breadcrumb__link">Carreiras</a></li>
        <li class="breadcrumb__item breadcrumb__item--current">{breadcrumb}</li>
      </ol>
    </div>
  </nav>
  <main class="layout-main container" id="main-content">
    <article class="article-body">
      <header class="article-hero">
        <div class="article-hero__meta">
          <span class="content-type-badge content-type-badge--salary">Salario</span>
          <span class="badge badge--green">Dados 2026</span>
        </div>
        <h1 class="article-hero__title">{title}</h1>
        <div class="article-hero__byline">
          <span>Por <strong>Redacao Hub do Estudante</strong></span>
          <span>&middot;</span><time datetime="2026-04-16">16 de abril de 2026</time>
          <span>&middot;</span><span>7 min de leitura</span>
        </div>
      </header>
      <div class="quick-answer">
        <div class="quick-answer__label">Resposta rapida</div>
        <p class="quick-answer__text">{quick_answer}</p>
      </div>
      <nav class="toc" aria-label="Indice" id="toc"><div class="toc__title">Neste artigo</div><ol class="toc__list" id="toc-list"></ol></nav>
      <div class="article-content" id="article-content">
        <h2>Salario por cargo e nivel</h2>
        <table><thead><tr><th>Cargo</th><th>Faixa salarial mensal</th></tr></thead><tbody>{cargo_rows}</tbody></table>
        <h2>Salario por tipo de vinculo</h2>
        <table><thead><tr><th>Vinculo</th><th>Faixa salarial</th><th>Detalhes</th></tr></thead><tbody>{vinculo_rows}</tbody></table>
        <h2>Salario por estado</h2>
        <table><thead><tr><th>Estado / Regiao</th><th>Salario medio</th></tr></thead><tbody>{estado_rows}</tbody></table>
        <h2>Progressao de carreira</h2>
        <ul>{progressao}</ul>
        <div class="infobox infobox--tip">
          <div class="infobox__title">{infobox_title}</div>
          <p>{infobox_text}</p>
        </div>
      </div>
      <div class="affiliate-cta-article">
        <div class="affiliate-cta-article__content">
          <h3 class="affiliate-cta-article__title">{cta_title}</h3>
          <p class="affiliate-cta-article__text">{cta_text}</p>
          <div class="affiliate-cta-article__actions">
            <a href="../../universidades/{univ1_slug}.html" class="btn btn--affiliate btn--lg" rel="noopener sponsored">{univ1_label} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <a href="../../universidades/{univ2_slug}.html" class="btn btn--secondary btn--lg" rel="noopener sponsored">{univ2_label}</a>
          </div>
        </div>
      </div>
      <section class="faq-section">
        <h2 class="faq-section__title">Perguntas frequentes</h2>
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>{faq1q}</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>{faq1a}</p></div>
          </div>
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false"><span>{faq2q}</span><svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></button>
            <div class="faq-answer"><p>{faq2a}</p></div>
          </div>
        </div>
      </section>
      <div class="article-tags">
        <span class="article-tags__label">Tags:</span>{tags_html}
      </div>
    </article>
    <aside class="sidebar">
      <div class="sidebar-widget">
        <h3 class="sidebar-widget__title">Outros salarios</h3>
        <ul class="sidebar-links">{sidebar_links_html}</ul>
      </div>
    </aside>
  </main>
  <script src="../../../assets/js/components-loader.js"></script>
  <script type="module" src="../../../assets/js/main.js"></script>
</body>
</html>"""

ESTADO = lambda sp, rj, df, sul, ne: f'<tr><td>Sao Paulo</td><td>{sp}</td></tr><tr><td>Rio de Janeiro</td><td>{rj}</td></tr><tr><td>Distrito Federal</td><td>{df}</td></tr><tr><td>Sul do Brasil</td><td>{sul}</td></tr><tr><td>Norte e Nordeste</td><td>{ne}</td></tr>'
TR = lambda c,f: f'<tr><td>{c}</td><td>{f}</td></tr>'
TRV = lambda v,f,d: f'<tr><td>{v}</td><td>{f}</td><td>{d}</td></tr>'
LI = lambda b,t: f'<li><strong>{b}:</strong> {t}</li>'
TAG = lambda t: f'<a href="#" onclick="return false" class="tag">{t}</a>'
SL = lambda f,n: f'<li><a href="{f}" class="sidebar-link">{n}</a></li>'

PAGES = [
  ('quanto-ganha-economista.html', dict(
    title='Quanto ganha um Economista em 2026?', breadcrumb='Salario do Economista',
    quick_answer='O salario medio de um economista no Brasil e de <strong>R$ 7.000 a R$ 12.000/mes</strong>. No setor financeiro os salarios chegam a <strong>R$ 20.000 ou mais</strong>. Carreira publica federal (Banco Central, BNDES) chega a <strong>R$ 25.000/mes</strong>.',
    cargo_rows=''.join([TR('Assistente/Analista Jr.','R$ 3.500 a R$ 5.500'),TR('Analista Pleno','R$ 6.000 a R$ 9.000'),TR('Analista Senior','R$ 9.000 a R$ 15.000'),TR('Economista no Banco Central','R$ 18.000 a R$ 25.000'),TR('Economista no BNDES/IPEA','R$ 15.000 a R$ 22.000'),TR('Economista Chefe (banco privado)','R$ 20.000 a R$ 40.000')]),
    vinculo_rows=''.join([TRV('CLT (bancos e financas)','R$ 6.000 a R$ 20.000','Bonus anual ate 100% do salario'),TRV('Concurso Federal (BC, BNDES)','R$ 15.000 a R$ 25.000','Estabilidade e beneficios solidos'),TRV('Consultoria/PJ','R$ 8.000 a R$ 30.000','Projetos de analise economica'),TRV('Docencia universitaria','R$ 5.000 a R$ 15.000','Exige mestrado ou doutorado')]),
    estado_rows=ESTADO('R$ 10.000 a R$ 18.000','R$ 9.000 a R$ 16.000','R$ 12.000 a R$ 22.000','R$ 7.000 a R$ 13.000','R$ 4.500 a R$ 9.000'),
    progressao=''.join([LI('Recem-formado','R$ 3.500 a R$ 5.500 como assistente'),LI('Pleno (3-5 anos)','R$ 6.000 a R$ 9.000'),LI('Senior','R$ 9.000 a R$ 15.000'),LI('Carreira publica federal','R$ 18.000 a R$ 25.000 apos concurso do BC ou BNDES'),LI('Economista Chefe','R$ 25.000 a R$ 50.000 em grandes bancos')]),
    infobox_title='Tendencia 2026: Economia de Dados',
    infobox_text='Economistas com Python, R e econometria sao os mais valorizados. A combinacao com Ciencia de Dados abriu vagas em fintechs com salarios 30 a 50% acima da media da categoria.',
    cta_title='Quer estudar com bolsa?', cta_text='Anhanguera e Ampli oferecem Economia e Administracao EAD com bolsas de ate 50%.',
    univ1_slug='anhanguera', univ1_label='Ver bolsas na Anhanguera', univ2_slug='ampli', univ2_label='Ver na Ampli',
    faq1q='Vale a pena fazer Economia no Brasil?', faq1a='Sim, especialmente para carreira em bancos, consultorias e servico publico federal. Os concursos do Banco Central e BNDES estao entre os mais bem remunerados do pais.',
    faq2q='Economista pode trabalhar em banco?', faq2a='Sim. O setor financeiro e um dos maiores empregadores. Bancos como Itau, Bradesco, BTG e Nubank contratam economistas para analise macro, risco de credito e estrategia.',
    tags_html=''.join([TAG('Salario Economista'),TAG('Economia'),TAG('Banco Central'),TAG('BNDES')]),
    sidebar_links_html=''.join([SL('quanto-ganha-administrador.html','Salario do Administrador'),SL('quanto-ganha-contador.html','Salario do Contador'),SL('quanto-ganha-advogado.html','Salario do Advogado')])
  )),
  ('quanto-ganha-professor-universitario.html', dict(
    title='Quanto ganha um Professor Universitario em 2026?', breadcrumb='Salario do Professor Universitario',
    quick_answer='Professor em universidade federal ganha de <strong>R$ 4.800 a R$ 22.000/mes</strong> dependendo da titulacao. Em IES privadas, a media e de <strong>R$ 3.500 a R$ 8.000/mes</strong>.',
    cargo_rows=''.join([TR('Professor Substituto/Horista','R$ 1.500 a R$ 3.500'),TR('Professor Auxiliar (privada)','R$ 3.000 a R$ 5.500'),TR('Professor Assistente (federal)','R$ 4.800 a R$ 7.500'),TR('Professor Adjunto (federal)','R$ 7.000 a R$ 12.000'),TR('Professor Associado','R$ 10.000 a R$ 16.000'),TR('Professor Titular','R$ 14.000 a R$ 22.000')]),
    vinculo_rows=''.join([TRV('IES Privada (CLT)','R$ 3.000 a R$ 8.000','Pagamento por hora-aula ou mensalista'),TRV('Federal (concurso)','R$ 4.800 a R$ 22.000','Regime de dedicacao exclusiva'),TRV('Estadual (concurso)','R$ 4.000 a R$ 14.000','Varia muito por estado'),TRV('Conteudista EAD','R$ 2.000 a R$ 5.000','Criacao de materiais online')]),
    estado_rows=ESTADO('R$ 5.000 a R$ 14.000','R$ 5.000 a R$ 13.000','R$ 7.000 a R$ 18.000','R$ 5.000 a R$ 13.000','R$ 3.500 a R$ 10.000'),
    progressao=''.join([LI('Mestrando/Horista','R$ 1.500 a R$ 3.500'),LI('Mestre (privada)','R$ 3.500 a R$ 6.000'),LI('Doutor recém-concursado (federal)','R$ 7.000 a R$ 10.000'),LI('Adjunto/Associado (10+ anos)','R$ 10.000 a R$ 18.000'),LI('Titular com dedicacao exclusiva','R$ 14.000 a R$ 22.000')]),
    infobox_title='Tendencia 2026: EAD e professores-tutores',
    infobox_text='O crescimento do EAD abriu vagas de professores-tutores com R$ 2.000 a R$ 5.000/mes. Professores que criam cursos online pelo modelo de receita compartilhada podem gerar renda passiva significativa.',
    cta_title='Quer se preparar para a docencia universitaria?', cta_text='Anhanguera e Ampli oferecem pos-graduacao em Docencia EAD com certificado reconhecido.',
    univ1_slug='anhanguera', univ1_label='Ver pos em Docencia EAD', univ2_slug='ampli', univ2_label='Ver na Ampli',
    faq1q='Precisa de doutorado para ser professor universitario?', faq1a='Em universidades federais, o doutorado e praticamente obrigatorio para concurso. Em IES privadas, o mestrado ja abre portas, especialmente para cursos EAD e tecnologicos.',
    faq2q='Professor universitario tem estabilidade?', faq2a='Em universidades federais sim, apos estagio probatorio de 3 anos. Em IES privadas nao ha estabilidade, mas o mercado e amplo com o crescimento do EAD.',
    tags_html=''.join([TAG('Salario Professor'),TAG('Docencia'),TAG('Carreira Academica'),TAG('EAD')]),
    sidebar_links_html=''.join([SL('quanto-ganha-administrador.html','Salario do Administrador'),SL('quanto-ganha-economista.html','Salario do Economista'),SL('quanto-ganha-psicologo.html','Salario do Psicologo')])
  )),
  ('quanto-ganha-desenvolvedor.html', dict(
    title='Quanto ganha um Desenvolvedor de Software em 2026?', breadcrumb='Salario do Desenvolvedor',
    quick_answer='Desenvolvedor junior ganha <strong>R$ 3.500 a R$ 6.000/mes</strong>. Senior chega a <strong>R$ 11.000 a R$ 20.000</strong>. Remoto para empresas internacionais pode chegar a <strong>R$ 30.000 a R$ 50.000/mes</strong>.',
    cargo_rows=''.join([TR('Dev Junior (0-2 anos)','R$ 3.500 a R$ 6.000'),TR('Dev Pleno (2-5 anos)','R$ 6.000 a R$ 11.000'),TR('Dev Senior (5+ anos)','R$ 11.000 a R$ 20.000'),TR('Tech Lead','R$ 15.000 a R$ 25.000'),TR('Arquiteto de Software','R$ 18.000 a R$ 35.000'),TR('Dev Mobile Senior','R$ 10.000 a R$ 22.000'),TR('Dev Full-Stack Senior','R$ 12.000 a R$ 22.000')]),
    vinculo_rows=''.join([TRV('CLT (empresa nacional)','R$ 5.000 a R$ 18.000','Beneficios e bonus semestral'),TRV('CLT (empresa internacional remoto)','R$ 10.000 a R$ 30.000','Salario em BRL ou USD'),TRV('PJ (freelance/contratos)','R$ 8.000 a R$ 35.000','Sem beneficios, maior liquido')]),
    estado_rows=ESTADO('R$ 8.000 a R$ 20.000','R$ 7.000 a R$ 17.000','R$ 8.000 a R$ 18.000','R$ 7.000 a R$ 18.000','R$ 4.500 a R$ 12.000'),
    progressao=''.join([LI('Junior (0-2 anos)','R$ 3.500 a R$ 6.000, aprendizado intenso'),LI('Pleno (2-5 anos)','R$ 6.000 a R$ 11.000, entrega autonoma'),LI('Senior (5+ anos)','R$ 11.000 a R$ 20.000, mentora juniores'),LI('Tech Lead','R$ 15.000 a R$ 25.000, gestao tecnica'),LI('Empresa gringa remoto','R$ 20.000 a R$ 50.000')]),
    infobox_title='Tendencia 2026: IA e desenvolvimento',
    infobox_text='Devs que dominam integracao com LLMs (OpenAI, Claude, Gemini) e RAG estao recebendo 40 a 70% acima da media. A capacidade de usar IA como copiloto de codigo e hoje requisito nas principais empresas de tecnologia.',
    cta_title='Quer entrar na area de tecnologia?', cta_text='Anhanguera e Ampli oferecem ADS e Engenharia de Software EAD com bolsas de ate 60%.',
    univ1_slug='anhanguera', univ1_label='Ver cursos de TI na Anhanguera', univ2_slug='ampli', univ2_label='Ver na Ampli',
    faq1q='Qual linguagem da mais dinheiro no Brasil?', faq1a='Em 2026, Python (dados/IA), JavaScript/TypeScript (web) e Kotlin/Swift (mobile) sao as mais valorizadas. Java ainda domina bancos e grandes empresas.',
    faq2q='Dev junior consegue emprego sem experiencia?', faq2a='Sim, mas exige portfolio. Projetos no GitHub, um app real ou contribuicoes open-source fazem a diferenca. Bootcamps de 6 a 12 meses tambem abrem portas.',
    tags_html=''.join([TAG('Salario Desenvolvedor'),TAG('Tecnologia'),TAG('Programacao'),TAG('Tech')]),
    sidebar_links_html=''.join([SL('quanto-ganha-cientista-dados.html','Salario do Cientista de Dados'),SL('quanto-ganha-engenheiro-civil.html','Salario do Engenheiro Civil'),SL('quanto-ganha-administrador.html','Salario do Administrador')])
  )),
  ('quanto-ganha-cientista-dados.html', dict(
    title='Quanto ganha um Cientista de Dados em 2026?', breadcrumb='Salario do Cientista de Dados',
    quick_answer='Cientista de dados pleno ganha <strong>R$ 8.000 a R$ 14.000/mes</strong>. Senior chega a <strong>R$ 22.000</strong>. Engenheiros de IA/ML chegam a <strong>R$ 40.000</strong> e remoto internacional pode ultrapassar <strong>R$ 45.000/mes</strong>.',
    cargo_rows=''.join([TR('Analista de Dados Jr.','R$ 4.000 a R$ 7.000'),TR('Cientista de Dados Pleno','R$ 8.000 a R$ 14.000'),TR('Cientista de Dados Senior','R$ 14.000 a R$ 22.000'),TR('Engenheiro de Machine Learning','R$ 15.000 a R$ 28.000'),TR('Engenheiro de IA/LLMs','R$ 18.000 a R$ 40.000'),TR('Head de Dados/CDO','R$ 25.000 a R$ 50.000')]),
    vinculo_rows=''.join([TRV('CLT (empresa nacional)','R$ 7.000 a R$ 20.000','Bonus e stock options em startups'),TRV('Remoto (empresa internacional)','R$ 15.000 a R$ 45.000','Salario em USD convertido'),TRV('PJ/Freelance','R$ 10.000 a R$ 35.000','Consultorias de dados e analytics')]),
    estado_rows=ESTADO('R$ 10.000 a R$ 22.000','R$ 9.000 a R$ 18.000','R$ 10.000 a R$ 20.000','R$ 9.000 a R$ 18.000','R$ 5.000 a R$ 12.000'),
    progressao=''.join([LI('Analista Junior','R$ 4.000 a R$ 7.000, SQL e Python basico'),LI('Cientista Pleno','R$ 8.000 a R$ 14.000, modelos ML em producao'),LI('Senior','R$ 14.000 a R$ 22.000, lideranca de projetos'),LI('Engenheiro ML/IA','R$ 18.000 a R$ 40.000, MLOps e deploy'),LI('Head/CDO','R$ 25.000 a R$ 50.000')]),
    infobox_title='Tendencia 2026: IA Generativa e LLMs',
    infobox_text='Cientistas que dominam fine-tuning de LLMs, RAG e engenharia de prompts sao os mais cobiçados. A demanda supera a oferta em todas as faixas salariais do mercado brasileiro.',
    cta_title='Quer entrar na area de dados?', cta_text='Cursos de Data Science e ADS nas melhores universidades parceiras com bolsas de ate 60%.',
    univ1_slug='anhanguera', univ1_label='Ver cursos de TI', univ2_slug='ampli', univ2_label='Ver na Ampli',
    faq1q='Precisa de faculdade para ser cientista de dados?', faq1a='Nao obrigatoriamente. Estatistica, Matematica e Computacao sao as graduacoes mais comuns, mas bootcamps e certificacoes Google, AWS e Databricks tambem sao aceitos pelo mercado.',
    faq2q='Python ou R para ciencia de dados?', faq2a='Python e a escolha dominante em 2026, especialmente para ML em producao. R ainda e popular em pesquisa academica. Saber os dois e diferencial, mas Python e a prioridade.',
    tags_html=''.join([TAG('Ciencia de Dados'),TAG('Machine Learning'),TAG('Data Science'),TAG('IA')]),
    sidebar_links_html=''.join([SL('quanto-ganha-desenvolvedor.html','Salario do Desenvolvedor'),SL('quanto-ganha-economista.html','Salario do Economista'),SL('quanto-ganha-engenheiro-civil.html','Salario do Engenheiro Civil')])
  )),
  ('quanto-ganha-analista-marketing.html', dict(
    title='Quanto ganha um Analista de Marketing em 2026?', breadcrumb='Salario do Analista de Marketing',
    quick_answer='Analista de marketing pleno ganha <strong>R$ 4.500 a R$ 7.000/mes</strong>. Gerentes chegam a <strong>R$ 18.000</strong>. Especialistas em trafego pago e performance ganham <strong>R$ 7.000 a R$ 15.000/mes</strong>.',
    cargo_rows=''.join([TR('Assistente de Marketing','R$ 1.800 a R$ 3.000'),TR('Analista Jr.','R$ 2.800 a R$ 4.500'),TR('Analista Pleno','R$ 4.500 a R$ 7.000'),TR('Analista Senior/Especialista','R$ 7.000 a R$ 12.000'),TR('Gerente de Marketing','R$ 10.000 a R$ 18.000'),TR('Diretor de Marketing (CMO)','R$ 18.000 a R$ 40.000'),TR('Growth Hacker Senior','R$ 9.000 a R$ 18.000')]),
    vinculo_rows=''.join([TRV('CLT (empresa nacional)','R$ 3.000 a R$ 14.000','Beneficios e bonus por metas'),TRV('Agencia de publicidade','R$ 2.500 a R$ 10.000','Variedade de clientes e projetos'),TRV('Freelance/PJ','R$ 4.000 a R$ 20.000','Gestao de trafego, conteudo e CRM')]),
    estado_rows=ESTADO('R$ 5.000 a R$ 14.000','R$ 4.500 a R$ 12.000','R$ 5.000 a R$ 13.000','R$ 4.000 a R$ 11.000','R$ 2.500 a R$ 7.000'),
    progressao=''.join([LI('Assistente (0-1 ano)','R$ 1.800 a R$ 3.000'),LI('Jr. (1-3 anos)','R$ 2.800 a R$ 4.500'),LI('Pleno (3-5 anos)','R$ 4.500 a R$ 7.000'),LI('Senior (5+ anos)','R$ 7.000 a R$ 12.000'),LI('Gerente','R$ 10.000 a R$ 18.000'),LI('CMO/Diretor','R$ 18.000 a R$ 40.000')]),
    infobox_title='Tendencia 2026: Marketing de Performance e IA',
    infobox_text='Profissionais com Google Ads, Meta Ads e dominio de IA para criacao de conteudo recebem 40% acima da media. Marketing orientado por dados (analytics, CRO, SEO tecnico) e a habilidade mais buscada em 2026.',
    cta_title='Quer se especializar em marketing?', cta_text='Anhanguera e Unopar oferecem Marketing e Gestao Digital EAD com certificado reconhecido.',
    univ1_slug='anhanguera', univ1_label='Ver cursos de Marketing', univ2_slug='unopar', univ2_label='Ver na Unopar',
    faq1q='Marketing Digital tem bom salario?', faq1a='Sim. Especialistas em trafego pago (Google/Meta Ads) e SEO ganham R$ 7.000 a R$ 15.000/mes. Quem trabalha por performance pode ganhar muito mais.',
    faq2q='E possivel trabalhar em marketing como freelancer?', faq2a='Sim, e uma das areas com mais oportunidades para freelancers. Gestao de redes sociais, trafego pago e email marketing sao muito demandados por pequenas e medias empresas.',
    tags_html=''.join([TAG('Marketing Digital'),TAG('Publicidade'),TAG('Growth'),TAG('Trafego Pago')]),
    sidebar_links_html=''.join([SL('quanto-ganha-administrador.html','Salario do Administrador'),SL('quanto-ganha-economista.html','Salario do Economista'),SL('quanto-ganha-desenvolvedor.html','Salario do Desenvolvedor')])
  )),
  ('quanto-ganha-piloto.html', dict(
    title='Quanto ganha um Piloto de Aviao em 2026?', breadcrumb='Salario do Piloto de Aviao',
    quick_answer='Co-piloto ganha <strong>R$ 7.000 a R$ 12.000/mes</strong>. Comandante nacional chega a <strong>R$ 18.000 a R$ 30.000</strong>. Pilotos em voos internacionais e cargueiros chegam a <strong>R$ 45.000/mes</strong>.',
    cargo_rows=''.join([TR('Co-piloto (Primeiro Oficial)','R$ 7.000 a R$ 12.000'),TR('Comandante (regional)','R$ 12.000 a R$ 20.000'),TR('Comandante (aviacao nacional)','R$ 18.000 a R$ 30.000'),TR('Comandante (aviacao executiva)','R$ 15.000 a R$ 35.000'),TR('Piloto de Carga/Internacional','R$ 20.000 a R$ 45.000'),TR('Instrutor de Voo','R$ 5.000 a R$ 12.000')]),
    vinculo_rows=''.join([TRV('CLT (companhia aerea)','R$ 9.000 a R$ 30.000','Diarias, hora de voo e beneficios'),TRV('Aviacao executiva (PJ)','R$ 12.000 a R$ 35.000','Maior disponibilidade exigida'),TRV('Militar (Forca Aerea)','R$ 10.000 a R$ 25.000','Estabilidade e beneficios solidos')]),
    estado_rows='<tr><td>Sao Paulo (Guarulhos/Congonhas)</td><td>R$ 15.000 a R$ 35.000</td></tr><tr><td>Rio de Janeiro</td><td>R$ 14.000 a R$ 30.000</td></tr><tr><td>Aviacao regional (interior)</td><td>R$ 9.000 a R$ 18.000</td></tr><tr><td>Internacional</td><td>R$ 25.000 a R$ 60.000</td></tr>',
    progressao=''.join([LI('Formacao (PPL, CPL, IFR)','Custo de R$ 150.000 a R$ 350.000'),LI('Co-piloto Junior','R$ 7.000 a R$ 10.000 nas primeiras horas de voo'),LI('Primeiro Oficial Pleno (2.000+ horas)','R$ 10.000 a R$ 18.000'),LI('Comandante (5.000+ horas)','R$ 18.000 a R$ 45.000')]),
    infobox_title='Tendencia 2026: escassez de pilotos',
    infobox_text='O Brasil e o mundo vivem escassez de pilotos comerciais. LATAM e Gol estao expandindo frotas. Quem inicia a formacao agora pode ser comandante em 8 a 12 anos com salarios acima de R$ 25.000.',
    cta_title='Quer explorar carreiras na aviacao?', cta_text='Veja guias de formacao superior e carreiras relacionadas no Hub do Estudante.',
    univ1_slug='anhanguera', univ1_label='Ver cursos superiores', univ2_slug='ampli', univ2_label='Ver na Ampli',
    faq1q='Quanto custa se tornar piloto no Brasil?', faq1a='A formacao completa (PPL, IFR, CPL e hora-de-voo) custa entre R$ 150.000 e R$ 350.000. Ha financiamentos especificos e o programa de cadetes da FAB, que e gratuito.',
    faq2q='Piloto comercial ganha quanto em voos internacionais?', faq2a='Pilotos em voos transoceanicos ganham entre R$ 25.000 e R$ 60.000/mes, com diarias no exterior. E uma das carreiras mais bem remuneradas do pais.',
    tags_html=''.join([TAG('Piloto'),TAG('Aviacao Civil'),TAG('Forca Aerea'),TAG('Carreira')]),
    sidebar_links_html=''.join([SL('quanto-ganha-medico.html','Salario do Medico'),SL('quanto-ganha-juiz.html','Salario do Juiz'),SL('quanto-ganha-engenheiro-eletrico.html','Salario do Engenheiro Eletrico')])
  )),
]

for fname, kwargs in PAGES:
    fpath = os.path.join(BASE, fname)
    if os.path.exists(fpath):
        print(f'Ja existe: {fname}')
        continue
    html = make_page(**kwargs)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Criado: {fname}')

print('DONE')
