import fs from 'fs';
import path from 'path';

const coursesData = {
  saude: [
    {
      slug: 'medicina',
      title: 'Medicina - Bacharelado',
      subtitle: 'Profissão com maior prestígio e demanda no mercado de saúde',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 5.000 - R$ 8.000', senior: 'R$ 15.000+' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Medicina é o curso de maior prestígio entre os de saúde. Demanda constante de profissionais. Exige dedicação total durante os estudos. Após formação, oportunidades em hospitais, clínicas, consultório próprio e pesquisa. Especialidades variam muito em salário: cirurgião ganha mais que clínico geral.',
      content: `
      <h2>Por que escolher Medicina?</h2>
      <p>Prestígio profissional, demanda constante, possibilidade de consultório próprio, salários altos. Impacto direto na vida das pessoas.</p>

      <h2>O que você vai estudar?</h2>
      <p>Anatomia, Fisiologia, Patologia, Farmacologia, Cirurgia, Clínica Médica, Pediatria, Obstetrícia, Especialidades.</p>

      <h2>Mercado de Trabalho</h2>
      <p>Sempre em alta demanda. Trabalho remoto limitado. Especialistas ganham muito mais. Consultório próprio é viável após alguns anos de experiência.</p>

      <h2>Salários por Especialidade</h2>
      <ul>
        <li>Cirurgião: R$ 20.000+</li>
        <li>Cardiologista: R$ 15.000 - R$ 25.000</li>
        <li>Neurologista: R$ 12.000 - R$ 20.000</li>
        <li>Clínico Geral: R$ 5.000 - R$ 10.000</li>
      </ul>

      <h2>Desafios</h2>
      <p>Curso muito puxado, exigência de dedicação total, plantões noturnos, responsabilidade alta, depressão comum entre estudantes.</p>
      `
    },
    {
      slug: 'enfermagem',
      title: 'Enfermagem - Bacharelado',
      subtitle: 'Profissão fundamental com mercado sempre aquecido',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 2.500 - R$ 3.500', senior: 'R$ 6.000 - R$ 10.000' },
      image: 'photo-1631217b5f1d8b5b5f5f5f5f',
      description: 'Enfermagem é fundamental no sistema de saúde. Trabalha em hospitais, clínicas, home care, UPA. Mercado aquecido com demanda crescente. Possibilidade de especializações lucrativas.',
      content: `
      <h2>Por que escolher Enfermagem?</h2>
      <p>Profissão essencial, mercado sempre em alta, oportunidades de especialização, possibilidade de trabalho em diversos ambientes.</p>

      <h2>Áreas de Atuação</h2>
      <ul>
        <li>Hospital e Clínicas</li>
        <li>Home Care e Cuidados Domiciliares</li>
        <li>Saúde Pública e Programas de Saúde</li>
        <li>UTI e Emergência</li>
        <li>Consultório e Clínica Privada</li>
      </ul>

      <h2>Especializações com Maior Salário</h2>
      <p>UTI: R$ 4.500 - R$ 7.000 | Home Care: R$ 3.500 - R$ 6.000 | Urgência/Emergência: R$ 4.000 - R$ 6.500</p>

      <h2>Mercado 2026</h2>
      <p>Envelhecimento da população aumenta demanda. Telemedicina abre oportunidades. Profissionais bem qualificados conseguem emprego facilmente.</p>
      `
    },
    {
      slug: 'odontologia',
      title: 'Odontologia - Bacharelado',
      subtitle: 'Profissão estável com possibilidade de consultório próprio',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 3.000 - R$ 5.000', senior: 'R$ 10.000+' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Odontologia é profissão estável com bom retorno. Muitos consultórios próprios. Demanda contínua de pacientes. Especialidades como ortodontia e implantologia ganham muito.',
      content: `
      <h2>Por que escolher Odontologia?</h2>
      <p>Estabilidade profissional, possibilidade de consultório próprio, demanda contínua, especialidades bem remuneradas.</p>

      <h2>Especialidades Principais</h2>
      <ul>
        <li>Ortodontia: R$ 8.000 - R$ 15.000</li>
        <li>Implantologia: R$ 7.000 - R$ 14.000</li>
        <li>Endodontia: R$ 6.000 - R$ 12.000</li>
        <li>Periodontia: R$ 5.000 - R$ 10.000</li>
      </ul>

      <h2>Mercado Atual</h2>
      <p>Crescimento de clínicas de estética odontológica. Alinhadores (Invisalign) crescem muito. Consultório particular mais lucrativo que clínica.</p>

      <h2>Investimento Inicial</h2>
      <p>Montagem de consultório custa R$ 20.000 - R$ 50.000. ROI em 2-3 anos com boa base de pacientes.</p>
      `
    },
    {
      slug: 'farmacia',
      title: 'Farmácia - Bacharelado',
      subtitle: 'Curso com múltiplas possibilidades de atuação',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 2.800 - R$ 4.000', senior: 'R$ 7.000 - R$ 12.000' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Farmácia oferece múltiplas áreas: indústria farmacêutica, farmácias de varejo, hospitais, pesquisa, cosmetologia. Mercado diverso com boas oportunidades.',
      content: `
      <h2>Áreas de Atuação</h2>
      <ul>
        <li>Indústria Farmacêutica: R$ 5.000 - R$ 10.000</li>
        <li>Farmácias (gerenciamento): R$ 4.000 - R$ 7.000</li>
        <li>Hospital e Clínicas: R$ 3.500 - R$ 6.000</li>
        <li>Pesquisa e Desenvolvimento: R$ 6.000 - R$ 12.000</li>
        <li>Cosmetologia: R$ 4.000 - R$ 9.000</li>
      </ul>

      <h2>Especializações em Alta Demanda</h2>
      <p>Farmacovigilância, Análises Clínicas, Cosmetologia, Cannabis medicinal, Nutrição e Saúde.</p>

      <h2>Tendências 2026</h2>
      <p>Telemedicina com prescrição remota. Cannabis medicinal em expansão. Personalized medicine crescendo.</p>
      `
    },
    {
      slug: 'nutricao',
      title: 'Nutrição - Bacharelado',
      subtitle: 'Profissão em crescimento com mercado de wellness expandindo',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.000 - R$ 3.000', senior: 'R$ 5.000 - R$ 8.000' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Nutrição cresce com expansão do mercado de wellness. Consultas particulares, nutrição esportiva, consultoria para empresas, hospitais. Consultório próprio viável.',
      content: `
      <h2>Especialidades com Maior Ganho</h2>
      <ul>
        <li>Nutrição Esportiva: R$ 4.000 - R$ 8.000</li>
        <li>Nutrição Clínica: R$ 3.500 - R$ 7.000</li>
        <li>Consultório Particular: R$ 3.000 - R$ 7.000</li>
        <li>Nutrição Estética: R$ 3.000 - R$ 6.000</li>
      </ul>

      <h2>Mercado em Expansão</h2>
      <p>Wellness crescendo. Apps e consultas online expandindo. Nutrição preventiva em alta demanda. Empresas buscando programas de saúde.</p>

      <h2>Diferenciais</h2>
      <p>Pós-graduação em especialidade específica aumenta salário. Certificações internacionais (ISSN, ASPEN) valem muito.</p>
      `
    },
    {
      slug: 'fisioterapia',
      title: 'Fisioterapia - Bacharelado',
      subtitle: 'Profissão estável com múltiplas oportunidades de especialização',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 2.200 - R$ 3.500', senior: 'R$ 5.000 - R$ 9.000' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Fisioterapia oferece consultório próprio, trabalho em clínicas, esporte, reabilitação. Especializações como esportes e neurologia ganham mais.',
      content: `
      <h2>Especializações Principais</h2>
      <ul>
        <li>Fisioterapia Esportiva: R$ 5.000 - R$ 9.000</li>
        <li>Neurologia: R$ 4.500 - R$ 8.000</li>
        <li>Ortopedia: R$ 4.000 - R$ 7.500</li>
        <li>Clínica Geral: R$ 2.500 - R$ 4.500</li>
      </ul>

      <h2>Mercado para Profissionais</h2>
      <p>Clubes de futebol, equipes de atletismo, clínicas, hospitais, consultório próprio, academia, programas de reabilitação.</p>

      <h2>ROI Consultório Próprio</h2>
      <p>Investimento: R$ 10.000 - R$ 25.000. Retorno: 2-3 anos com boa reputação.</p>
      `
    },
    {
      slug: 'psicologia',
      title: 'Psicologia - Bacharelado',
      subtitle: 'Mercado em crescimento com múltiplas áreas de atuação',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.000 - R$ 3.000', senior: 'R$ 5.000 - R$ 10.000' },
      image: 'photo-1576091160550-2173dba999ef',
      description: 'Psicologia oferece clínica, organizacional, esporte, educação, consultoria. Mercado crescendo especialmente em saúde mental e RH.',
      content: `
      <h2>Áreas de Atuação e Salários</h2>
      <ul>
        <li>Clínica Particular: R$ 4.000 - R$ 10.000</li>
        <li>RH Corporativo: R$ 3.500 - R$ 8.000</li>
        <li>Psicologia Esportiva: R$ 3.000 - R$ 7.000</li>
        <li>Educação e Escolas: R$ 2.500 - R$ 5.000</li>
      </ul>

      <h2>Tendências 2026</h2>
      <p>Saúde mental em alta demanda. Psicoterapia online crescendo. Empresas buscando psicólogos organizacionais. Consultório particular muito procurado.</p>

      <h2>Diferencial Importante</h2>
      <p>Título de psicólogo requer registro no CRP. Pós em terapia específica (TCC, Psicodrama, Psicanálise) aumenta muito a demanda e salário.</p>
      `
    }
  ],
  tecnologia: [
    {
      slug: 'engenharia-de-software',
      title: 'Engenharia de Software - Bacharelado',
      subtitle: 'Profissão com maior demanda e melhores salários em tecnologia',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 4.000 - R$ 6.000', senior: 'R$ 12.000 - R$ 20.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Engenharia de Software tem altíssima demanda. Trabalho em startups, big techs, bancos. Crescimento de carreira rápido. Salários altos desde o início.',
      content: `
      <h2>Por que escolher Engenharia de Software?</h2>
      <p>Maior demanda do mercado, salários altos, crescimento rápido de carreira, oportunidade de trabalho remoto nacional/internacional.</p>

      <h2>O que você aprende</h2>
      <p>Algoritmos, Estruturas de Dados, Programação, Arquitetura de Software, Design Patterns, Metodologias Ágeis, Banco de Dados, Segurança.</p>

      <h2>Especialidades em Alta Demanda</h2>
      <ul>
        <li>Backend/Full Stack: R$ 6.000 - R$ 12.000</li>
        <li>DevOps/Cloud: R$ 7.000 - R$ 15.000</li>
        <li>AI/Machine Learning: R$ 8.000 - R$ 18.000</li>
        <li>Mobile: R$ 5.000 - R$ 10.000</li>
      </ul>

      <h2>Mercado 2026</h2>
      <p>IA generativa criando novas oportunidades. Trabalho remoto consolidado. Profissionais especializados ganham muito mais.</p>
      `
    },
    {
      slug: 'engenharia-computacao',
      title: 'Engenharia da Computação - Bacharelado',
      subtitle: 'Mais técnico que software, com foco em hardware e sistemas',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 4.500 - R$ 6.500', senior: 'R$ 13.000 - R$ 22.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Engenharia de Computação é mais técnica. Hardware, sistemas embarcados, IoT, processadores. Salários competem com software em especialidades.',
      content: `
      <h2>Diferença para Engenharia de Software</h2>
      <p>Mais teoria, mais hardware, mais matemática. Sistemas embarcados, processadores, redes. Menos vagas que software mas salários similares.</p>

      <h2>Áreas de Atuação</h2>
      <ul>
        <li>Sistemas Embarcados: R$ 6.000 - R$ 12.000</li>
        <li>IoT e Dispositivos: R$ 5.500 - R$ 11.000</li>
        <li>Redes e Infraestrutura: R$ 5.000 - R$ 10.000</li>
        <li>Pesquisa: R$ 4.000 - R$ 8.000</li>
      </ul>

      <h2>Mercado</h2>
      <p>IoT em crescimento. Automação industrial em alta. Dispositivos inteligentes crescem. Especialização importa muito.</p>
      `
    },
    {
      slug: 'ciencia-computacao',
      title: 'Ciência da Computação - Bacharelado',
      subtitle: 'Mais teórico, com foco em IA, ML e pesquisa',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 4.000 - R$ 6.000', senior: 'R$ 12.000 - R$ 20.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Ciência da Computação é mais teórica. IA, Machine Learning, pesquisa. Universidades federais oferecem com excelência. Salários top tier.',
      content: `
      <h2>Por que escolher Ciência da Computação?</h2>
      <p>Curso mais teórico e robusto. Melhor base para IA/ML. Oportunidade de pesquisa e doutorado. Salários entre os mais altos.</p>

      <h2>Especialidades Principais</h2>
      <ul>
        <li>Machine Learning/IA: R$ 8.000 - R$ 18.000</li>
        <li>Data Science: R$ 7.000 - R$ 15.000</li>
        <li>Pesquisa Acadêmica: R$ 6.000 - R$ 12.000</li>
        <li>Desenvolvimento: R$ 5.000 - R$ 10.000</li>
      </ul>

      <h2>Recomendação</h2>
      <p>Faça em universidade federal se possível. Pesquisa em iniciação científica abre portas. Doutorado aumenta muito o salário.</p>
      `
    },
    {
      slug: 'analise-desenvolvimento-sistemas',
      title: 'Análise e Desenvolvimento de Sistemas - Tecnólogo',
      subtitle: 'Formação mais rápida, altamente procurada no mercado',
      duration: '4 semestres (2 anos)',
      salary: { initial: 'R$ 3.000 - R$ 4.500', senior: 'R$ 8.000 - R$ 15.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Análise de Sistemas é mais rápido que engenharia. Muito procurado por empresas. Portfólio vale mais que diploma. Entrada rápida no mercado.',
      content: `
      <h2>Por que escolher (em vez de Engenharia)?</h2>
      <p>Tempo: 2 anos vs 5. Custo menor. Entrada rápida no mercado. Portfólio importa mais que diploma.</p>

      <h2>Vantagens</h2>
      <ul>
        <li>Formação rápida e prática</li>
        <li>Acessível (mais barato)</li>
        <li>Muito procurado por empresas</li>
        <li>Pode fazer graduação depois</li>
      </ul>

      <h2>Mercado</h2>
      <p>Mesmos trabalhos de engenheiro. Startups preferem formação prática. Bootcamp ainda compete por alunos e salários iniciais.</p>

      <h2>Dica</h2>
      <p>Faça o tecnólogo e melhore seu portfólio enquanto estuda. Trabalhe como desenvolvedor enquanto faz licenciatura/bacharelado depois.</p>
      `
    },
    {
      slug: 'devops',
      title: 'DevOps - Tecnólogo',
      subtitle: 'Especialidade muito procurada com altíssimos salários',
      duration: '4 semestres (2 anos)',
      salary: { initial: 'R$ 4.500 - R$ 6.000', senior: 'R$ 12.000 - R$ 18.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'DevOps é altamente procurado. CI/CD, Docker, Kubernetes. Crescimento de carreira absurdo. Salários competem com engenharia de software.',
      content: `
      <h2>Por que DevOps cresce tanto?</h2>
      <p>Profissionais especializados raros. Demanda real das empresas. Salários muito altos. Mercado expandindo continuamente.</p>

      <h2>O que você aprende</h2>
      <p>Docker, Kubernetes, CI/CD (Jenkins, GitLab), Cloud (AWS, Azure, GCP), Terraform, Ansible, Monitoramento (Prometheus, Grafana).</p>

      <h2>Mercado 2026</h2>
      <ul>
        <li>Iniciante: R$ 4.500 - R$ 6.000</li>
        <li>Pleno: R$ 7.000 - R$ 10.000</li>
        <li>Senior: R$ 12.000 - R$ 18.000</li>
      </ul>

      <h2>Diferencial</h2>
      <p>Certificações (CKA, AWS Solutions Architect) aumentam muito o valor. Vários jobs remotos internacionais pagam em dólar.</p>
      `
    },
    {
      slug: 'ciberseguranca',
      title: 'Cibersegurança - Tecnólogo',
      subtitle: 'Profissão em crescimento com demanda crescente',
      duration: '4 semestres (2 anos)',
      salary: { initial: 'R$ 4.000 - R$ 6.000', senior: 'R$ 12.000 - R$ 20.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Cibersegurança cresce com aumento de ataques. Pentest, análise de vulnerabilidades, compliance. Certificações valem muito (CEH, OSCP).',
      content: `
      <h2>Áreas de Atuação</h2>
      <ul>
        <li>Pentesting: R$ 7.000 - R$ 15.000</li>
        <li>Análise de Vulnerabilidades: R$ 6.000 - R$ 12.000</li>
        <li>SOC (Security Operations Center): R$ 4.500 - R$ 8.000</li>
        <li>Compliance: R$ 5.000 - R$ 10.000</li>
      </ul>

      <h2>Certificações Importantes</h2>
      <p>CEH (Certified Ethical Hacker): aumenta salário em 30-50%. OSCP: aumenta muito. CompTIA Security+: requisito mínimo.</p>

      <h2>Mercado</h2>
      <p>Demanda crescendo. Ataques crescendo. LGPD aumentou demanda. Consultoria de segurança paga muito bem.</p>
      `
    },
    {
      slug: 'desenvolvimento-web',
      title: 'Desenvolvimento Web - Tecnólogo',
      subtitle: 'Muitas vagas, bootcamps competem, portfólio é tudo',
      duration: '4 semestres (2 anos)',
      salary: { initial: 'R$ 2.500 - R$ 4.000', senior: 'R$ 8.000 - R$ 15.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Web Development é muito procurado. Front-end, Back-end, Full Stack. Muitas vagas e bootcamps competindo. Portfólio é o mais importante.',
      content: `
      <h2>Especialidades</h2>
      <ul>
        <li>Front-end (React, Vue, Angular): R$ 4.000 - R$ 10.000</li>
        <li>Back-end (Node, Python, Java): R$ 4.500 - R$ 12.000</li>
        <li>Full Stack: R$ 5.000 - R$ 13.000</li>
      </ul>

      <h2>Bootcamp vs Tecnólogo</h2>
      <p>Bootcamp: 3-6 meses, R$ 15-40k. Tecnólogo: 2 anos, R$ 30-60k. Ambos viáveis. Portfólio e experiência importam mais que diploma.</p>

      <h2>Mercado Saturado?</h2>
      <p>Muitas vagas, sim. Mas profissionais bons são sempre raros. Diferencie com projetos práticos, GitHub forte, e especialização.</p>
      `
    },
    {
      slug: 'desenvolvimento-mobile',
      title: 'Desenvolvimento Mobile - Tecnólogo',
      subtitle: 'Demanda alta em Apps nativas e multiplataforma',
      duration: '4 semestres (2 anos)',
      salary: { initial: 'R$ 3.000 - R$ 4.500', senior: 'R$ 9.000 - R$ 16.000' },
      image: 'photo-1517694712202-14dd9538aa97',
      description: 'Mobile Development oferece iOS, Android, React Native, Flutter. Demanda alta de apps. Startups sempre buscam desenvolvedores mobile.',
      content: `
      <h2>Tecnologias Principais</h2>
      <ul>
        <li>React Native/Flutter: R$ 4.000 - R$ 10.000</li>
        <li>iOS nativo (Swift): R$ 5.000 - R$ 12.000</li>
        <li>Android nativo (Kotlin): R$ 4.500 - R$ 11.000</li>
      </ul>

      <h2>Mercado</h2>
      <p>Apps crescem sempre. Startups fund levantam e buscam mobile devs. E-commerce, SaaS, tudo precisa de mobile.</p>

      <h2>Diferencial</h2>
      <p>Portfolio com apps publicados na App Store/Google Play. Alguns projetos próprios. Conhecimento de Firebase, APIs, performance.</p>
      `
    }
  ],
  humanas: [
    {
      slug: 'direito',
      title: 'Direito - Bacharelado',
      subtitle: 'Profissão tradicional com mercado estável e salários bons',
      duration: '10 semestres (5 anos)',
      salary: { initial: 'R$ 3.000 - R$ 5.000', senior: 'R$ 10.000 - R$ 20.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Direito é profissão tradicional. Advocacia, magistratura, consultoria, empresa. OAB é obrigatória. Salários variam muito por especialidade.'
    },
    {
      slug: 'jornalismo',
      title: 'Jornalismo - Bacharelado',
      subtitle: 'Mercado em transformação com novas oportunidades digitais',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.000 - R$ 3.500', senior: 'R$ 5.000 - R$ 10.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Jornalismo está em transformação. Mídia digital, podcasts, redes sociais abrem oportunidades. Salários menores em jornais, mas agências digitais crescem.'
    },
    {
      slug: 'publicidade-propaganda',
      title: 'Publicidade e Propaganda - Bacharelado',
      subtitle: 'Profissão criativa com demanda em marketing digital',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 4.000', senior: 'R$ 6.000 - R$ 12.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Publicidade oferece agências, empresas, marketing digital, empreendedorismo. Criatividade e portfólio importam muito.'
    },
    {
      slug: 'relacoes-internacionais',
      title: 'Relações Internacionais - Bacharelado',
      subtitle: 'Profissão para quem sonha trabalhar no exterior',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 4.000', senior: 'R$ 7.000 - R$ 14.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Relações Internacionais oferece carreira diplomática, ONG, empresas multinacionais, organizações internacionais.'
    },
    {
      slug: 'historia',
      title: 'História - Bacharelado/Licenciatura',
      subtitle: 'Profissão com foco em pesquisa ou ensino',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.000 - R$ 3.000', senior: 'R$ 4.500 - R$ 8.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'História oferece ensino (professor), pesquisa (universidade), curadoria (museus). Demanda é menor mas mercado existe.'
    },
    {
      slug: 'filosofia',
      title: 'Filosofia - Bacharelado/Licenciatura',
      subtitle: 'Profissão para pensadores e pesquisadores',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 1.800 - R$ 2.800', senior: 'R$ 4.000 - R$ 7.500' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Filosofia é mais para pesquisa e docência. Demanda pequena. Mais indicado para quem quer fazer mestrado/doutorado.'
    },
    {
      slug: 'sociologia',
      title: 'Sociologia - Bacharelado',
      subtitle: 'Análise da sociedade com aplicações em pesquisa',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.000 - R$ 3.200', senior: 'R$ 5.000 - R$ 9.000' },
      image: 'photo-1589519160732-57fc498494f8',
      description: 'Sociologia oferece pesquisa, consultoria, ONG, instituições governamentais. Análise social em alta demanda.'
    }
  ],
  negocios: [
    {
      slug: 'administracao',
      title: 'Administração - Bacharelado',
      subtitle: 'Curso versátil com alta demanda no mercado',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 4.000', senior: 'R$ 7.000 - R$ 14.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'Administração é versátil. Empresas, startups, governo, consultoria. Especializações em RH, Finanças, Marketing aumentam salário.'
    },
    {
      slug: 'contabilidade',
      title: 'Ciências Contábeis - Bacharelado',
      subtitle: 'Profissão estável com demanda constante',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 3.800', senior: 'R$ 6.000 - R$ 12.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'Contabilidade é estável. Escritórios, empresas, consultoria, governo. CRC é obrigatória. Especialista em impostos ganha muito.'
    },
    {
      slug: 'economia',
      title: 'Ciências Econômicas - Bacharelado',
      subtitle: 'Para quem gosta de análise e números',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.800 - R$ 4.500', senior: 'R$ 8.000 - R$ 16.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'Economia oferece pesquisa, governo, bancos, consultoria. Estatísticas e análise são cruciais. Salários maiores em instituições financeiras.'
    },
    {
      slug: 'gestao-recursos-humanos',
      title: 'Gestão de Recursos Humanos - Bacharelado',
      subtitle: 'Profissão crescente com mercado aquecido',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 3.800', senior: 'R$ 6.000 - R$ 12.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'RH cresce com importância de gestão de pessoas. Recrutamento, T&D, cultura. Consultoria em RH paga bem.'
    },
    {
      slug: 'marketing',
      title: 'Marketing - Bacharelado',
      subtitle: 'Profissão criativa com foco em digital',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 4.000', senior: 'R$ 7.000 - R$ 14.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'Marketing oferece agências, empresas, startups, empreendedorismo. Marketing digital em alta demanda.'
    },
    {
      slug: 'logistica',
      title: 'Logística - Bacharelado',
      subtitle: 'Profissão com mercado forte em e-commerce',
      duration: '8 semestres (4 anos)',
      salary: { initial: 'R$ 2.500 - R$ 3.800', senior: 'R$ 6.000 - R$ 11.000' },
      image: 'photo-1552664730-d307ca884978',
      description: 'Logística cresce com e-commerce. Supply chain é essencial. Gestão de armazém, transportes, distribuição crescem.'
    }
  ]
};

const imageMap = {
  'photo-1589519160732-57fc498494f8': 'photo-1589519160732-57fc498494f8',
  'photo-1552664730-d307ca884978': 'photo-1552664730-d307ca884978',
  'photo-1576091160550-2173dba999ef': 'photo-1576091160550-2173dba999ef',
  'photo-1517694712202-14dd9538aa97': 'photo-1517694712202-14dd9538aa97'
};

function generateHTML(area, course) {
  const imageId = course.image || imageMap[area];
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${course.subtitle} em 2026. Salários, mercado de trabalho, especialidades e oportunidades.">
  <meta name="keywords" content="${course.title}, curso, mercado de trabalho, salário, carreira">
  <title>${course.title} 2026 - Guia Completo</title>
  <link rel="canonical" href="https://hubdoestudante.com.br/pages/graduacao/${area}/${course.slug}/index.html">
  <meta property="og:title" content="${course.title}">
  <meta property="og:url" content="https://hubdoestudante.com.br/pages/graduacao/${area}/${course.slug}/index.html">
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      "name": "${course.title}",
      "description": "${course.description}",
      "url": "https://hubdoestudante.com.br/pages/graduacao/${area}/${course.slug}/index.html",
      "educationalLevel": "higher education",
      "author": {"@type": "Organization", "name": "Hub do Estudante"},
      "datePublished": "${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}"
    }
  </script>
</head>
<body>
  <article class="article-content">
    <header class="article-hero">
      <div class="article-hero__meta">
        <span class="content-type-badge content-type-badge--guide">Graduação</span>
        <span class="badge badge--blue">${course.title}</span>
      </div>
      <h1 class="article-hero__title">${course.title} 2026</h1>
      <p class="article-hero__subtitle">${course.subtitle}</p>
      <div class="article-hero__byline">
        <span>Por <strong>Redação Hub do Estudante</strong></span>
        <span>·</span>
        <time datetime="${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}">${now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
      </div>
      <img src="https://images.unsplash.com/${imageId}?w=900&h=500&fit=crop" alt="${course.subtitle}">
    </header>

    <div class="article-body">
      <h2>Informações Principais</h2>
      <p><strong>Duração:</strong> ${course.duration}</p>
      <p><strong>Salário Inicial:</strong> ${course.salary.initial}</p>
      <p><strong>Salário Senior:</strong> ${course.salary.senior}</p>

      <h2>Sobre o Curso</h2>
      <p>${course.description}</p>

      ${course.content || ''}
    </div>
  </article>
</body>
</html>`;
}

// Create directories and files
Object.entries(coursesData).forEach(([area, courses]) => {
  courses.forEach(course => {
    const dirPath = `./pages/graduacao/${area}/${course.slug}`;
    const filePath = `${dirPath}/index.html`;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const html = generateHTML(area, course);
    fs.writeFileSync(filePath, html);
    console.log(`✓ Criado: ${filePath}`);
  });
});

console.log('\n✓ Todas as páginas de cursos foram criadas com sucesso!');
