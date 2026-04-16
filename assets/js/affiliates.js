/**
 * affiliates.js — Hub do Estudante
 * =====================================================
 * CONFIGURAÇÃO CENTRAL DE AFILIADOS
 * =====================================================
 * Quando receber os links reais, substitua os "#" pelos
 * URLs de afiliado de cada instituição.
 *
 * Este é o ÚNICO arquivo que precisa ser editado para
 * atualizar links em todo o portal.
 *
 * Importação nos outros módulos:
 *   import { AFFILIATES, getAffiliateUrl, getCoursesByInstitution } from './affiliates.js';
 */

// =====================================================
// 1. CONFIGURAÇÃO DAS INSTITUIÇÕES
// =====================================================

export const AFFILIATES = {

  anhanguera: {
    id:          'anhanguera',
    name:        'Anhanguera',
    slug:        'anhanguera',
    group:       'Cogna Educação',
    logo:        'https://logodownload.org/wp-content/uploads/2018/07/universidade-anhanguera-logo.png',
    url:         '/universidades/anhanguera/',
    affiliateUrl: '#',          // ← SUBSTITUIR pelo link de afiliado real
    utmCampaign: 'anhanguera',
    color:       '#003DA5',
    modalidades: ['EAD', 'Presencial', 'Semipresencial'],
    description: 'Uma das maiores redes de ensino superior do Brasil, com cursos em diversas áreas do conhecimento.',
    courses: [
      // Graduação — Saúde
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'enfermagem' },
      { name: 'Farmácia',               area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial',  slug: 'farmacia' },
      { name: 'Fisioterapia',           area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'Presencial',  slug: 'fisioterapia' },
      { name: 'Nutrição',               area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'nutricao' },
      { name: 'Odontologia',            area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial',  slug: 'odontologia' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial',  slug: 'psicologia' },
      { name: 'Educação Física',        area: 'saude',          nivel: 'graduacao', duracao: '3 anos',   modalidade: 'EAD',        slug: 'educacao-fisica' },
      // Graduação — Tecnologia
      { name: 'Análise e Des. de Sistemas', area: 'tecnologia', nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',       slug: 'analise-desenvolvimento-sistemas' },
      { name: 'Ciência da Computação',  area: 'tecnologia',     nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'ciencia-da-computacao' },
      { name: 'Engenharia de Software', area: 'tecnologia',     nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'engenharia-de-software' },
      { name: 'Sistemas de Informação', area: 'tecnologia',     nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'sistemas-de-informacao' },
      // Graduação — Negócios
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'administracao' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'ciencias-contabeis' },
      { name: 'Gestão de RH',           area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',        slug: 'gestao-recursos-humanos' },
      { name: 'Marketing',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',        slug: 'marketing' },
      { name: 'Logística',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',        slug: 'logistica' },
      // Graduação — Direito/Humanas
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial',  slug: 'direito' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'pedagogia' },
      { name: 'Letras',                 area: 'humanas',        nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',        slug: 'letras' },
      // Pós-graduação
      { name: 'MBA Gestão Empresarial', area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',        slug: 'mba-gestao-empresarial' },
      { name: 'Pós em Gestão de Pessoas', area: 'especializacao', nivel: 'pos',     duracao: '1 ano',    modalidade: 'EAD',        slug: 'pos-gestao-pessoas' },
    ]
  },

  unopar: {
    id:          'unopar',
    name:        'UNOPAR',
    slug:        'unopar',
    group:       'Cogna Educação',
    logo:        'https://blog.unopar.com.br/wp-content/uploads/2020/09/Unopar_Positivo_Horizontal-1024x615.png',
    url:         '/universidades/unopar/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'unopar',
    color:       '#E30613',
    modalidades: ['EAD', 'Semipresencial'],
    description: 'Pioneira no ensino a distância no Brasil, a UNOPAR oferece centenas de cursos EAD com excelente custo-benefício.',
    courses: [
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'administracao' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'pedagogia' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'enfermagem' },
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD', slug: 'direito' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'ciencias-contabeis' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD', slug: 'psicologia' },
      { name: 'Educação Física',        area: 'saude',          nivel: 'graduacao', duracao: '3 anos',   modalidade: 'EAD', slug: 'educacao-fisica' },
      { name: 'Análise e Des. de Sistemas', area: 'tecnologia', nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'analise-desenvolvimento-sistemas' },
      { name: 'Engenharia Civil',       area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD', slug: 'engenharia-civil' },
      { name: 'Nutrição',               area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'nutricao' },
      { name: 'Gestão de RH',           area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'gestao-recursos-humanos' },
      { name: 'Marketing',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'marketing' },
      { name: 'Farmácia',               area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD', slug: 'farmacia' },
      { name: 'Arquitetura e Urbanismo',area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD', slug: 'arquitetura-urbanismo' },
      { name: 'Serviço Social',         area: 'humanas',        nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'servico-social' },
      { name: 'MBA Gestão Financeira',  area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD', slug: 'mba-gestao-financeira' },
      { name: 'Pós em Docência EAD',    area: 'especializacao', nivel: 'pos',       duracao: '1 ano',    modalidade: 'EAD', slug: 'pos-docencia-ead' },
    ]
  },

  unime: {
    id:          'unime',
    name:        'UNIME',
    slug:        'unime',
    group:       'Ampli / Cogna',
    logo:        'https://ava-legado.ampli.com.br/static/media/unime.ea290d1f.png',
    url:         '/universidades/unime/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'unime',
    color:       '#0057A8',
    modalidades: ['EAD', 'Presencial'],
    description: 'Centro Universitário UniFTC com cursos presenciais e EAD de qualidade no Nordeste e em todo o Brasil.',
    courses: [
      { name: 'Medicina',               area: 'saude',          nivel: 'graduacao', duracao: '6 anos',   modalidade: 'Presencial', slug: 'medicina' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'enfermagem' },
      { name: 'Odontologia',            area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'odontologia' },
      { name: 'Fisioterapia',           area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'Presencial', slug: 'fisioterapia' },
      { name: 'Farmácia',               area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'farmacia' },
      { name: 'Nutrição',               area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'nutricao' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'psicologia' },
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD',       slug: 'direito' },
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'administracao' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'pedagogia' },
      { name: 'MBA em Saúde',           area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',       slug: 'mba-saude' },
    ]
  },

  unic: {
    id:          'unic',
    name:        'UNIC',
    slug:        'unic',
    group:       'Ânima Educação',
    logo:        'https://formamaisbrasil.com.br/wp-content/uploads/2025/05/unic.png',
    url:         '/universidades/unic/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'unic',
    color:       '#006633',
    modalidades: ['EAD', 'Presencial'],
    description: 'Universidade de Cuiabá — referência no Centro-Oeste com cursos presenciais e EAD reconhecidos pelo MEC.',
    courses: [
      { name: 'Medicina',               area: 'saude',          nivel: 'graduacao', duracao: '6 anos',   modalidade: 'Presencial', slug: 'medicina' },
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD',       slug: 'direito' },
      { name: 'Engenharia Civil',       area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'engenharia-civil' },
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'administracao' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'psicologia' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'enfermagem' },
      { name: 'Arquitetura e Urbanismo',area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'arquitetura-urbanismo' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'ciencias-contabeis' },
      { name: 'Educação Física',        area: 'saude',          nivel: 'graduacao', duracao: '3 anos',   modalidade: 'EAD',       slug: 'educacao-fisica' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'pedagogia' },
      { name: 'MBA Gestão de Negócios', area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',       slug: 'mba-gestao-negocios' },
    ]
  },

  pitagoras: {
    id:          'pitagoras',
    name:        'Pitágoras',
    slug:        'pitagoras',
    group:       'Cogna Educação',
    logo:        'https://blog.pitagoras.com.br/wp-content/uploads/2025/10/logo-pitagoras.png',
    url:         '/universidades/pitagoras/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'pitagoras',
    color:       '#FF6B00',
    modalidades: ['EAD', 'Presencial', 'Semipresencial'],
    description: 'Faculdade Pitágoras — excelência em ensino superior com forte presença em Minas Gerais e EAD em todo o Brasil.',
    courses: [
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'administracao' },
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'direito' },
      { name: 'Engenharia Civil',       area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'engenharia-civil' },
      { name: 'Engenharia de Produção', area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'EAD',       slug: 'engenharia-de-producao' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'psicologia' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'enfermagem' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'ciencias-contabeis' },
      { name: 'Análise e Des. de Sistemas', area: 'tecnologia', nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',       slug: 'analise-desenvolvimento-sistemas' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'pedagogia' },
      { name: 'Marketing',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',       slug: 'marketing' },
      { name: 'Gestão de RH',           area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD',       slug: 'gestao-recursos-humanos' },
      { name: 'Arquitetura e Urbanismo',area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'arquitetura-urbanismo' },
      { name: 'MBA Gestão Estratégica', area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',       slug: 'mba-gestao-estrategica' },
    ]
  },

  uniderp: {
    id:          'uniderp',
    name:        'UNIDERP',
    slug:        'uniderp',
    group:       'Cogna Educação',
    logo:        'https://vaidebolsa-cdn.s3.amazonaws.com/assets/img/cogna/logo-uniderp.png',
    url:         '/universidades/uniderp/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'uniderp',
    color:       '#00539B',
    modalidades: ['EAD', 'Presencial'],
    description: 'Universidade Anhanguera-Uniderp — referência em Campo Grande e no Centro-Oeste com cursos presenciais e EAD.',
    courses: [
      { name: 'Direito',                area: 'direito',        nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'direito' },
      { name: 'Medicina Veterinária',   area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'medicina-veterinaria' },
      { name: 'Agronomia',              area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'agronomia' },
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'administracao' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'enfermagem' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'ciencias-contabeis' },
      { name: 'Engenharia Civil',       area: 'engenharias',    nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'engenharia-civil' },
      { name: 'Psicologia',             area: 'saude',          nivel: 'graduacao', duracao: '5 anos',   modalidade: 'Presencial', slug: 'psicologia' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'pedagogia' },
      { name: 'Nutrição',               area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD',       slug: 'nutricao' },
      { name: 'Educação Física',        area: 'saude',          nivel: 'graduacao', duracao: '3 anos',   modalidade: 'EAD',       slug: 'educacao-fisica' },
      { name: 'MBA Agronegócio',        area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',       slug: 'mba-agronegocio' },
      { name: 'MBA Direito Empresarial',area: 'mba',            nivel: 'pos',       duracao: '1,5 anos', modalidade: 'EAD',       slug: 'mba-direito-empresarial' },
    ]
  },

  ampli: {
    id:          'ampli',
    name:        'Ampli',
    slug:        'ampli',
    group:       'Cogna Educação',
    logo:        'https://images.educamaisbrasil.com.br/content/superior/instituicao/logo/g/ampli.png',
    url:         '/universidades/ampli/',
    affiliateUrl: '#',          // ← SUBSTITUIR
    utmCampaign: 'ampli',
    color:       '#7B2D8B',
    modalidades: ['EAD'],
    description: 'Ampli — ensino superior 100% EAD com as mensalidades mais acessíveis do Brasil e modelo de aprendizagem inovador.',
    courses: [
      { name: 'Administração',          area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'administracao' },
      { name: 'Pedagogia',              area: 'educacao',       nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'pedagogia' },
      { name: 'Ciências Contábeis',     area: 'administracao',  nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'ciencias-contabeis' },
      { name: 'Gestão de RH',           area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'gestao-recursos-humanos' },
      { name: 'Marketing',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'marketing' },
      { name: 'Análise e Des. de Sistemas', area: 'tecnologia', nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'analise-desenvolvimento-sistemas' },
      { name: 'Logística',              area: 'administracao',  nivel: 'graduacao', duracao: '2,5 anos', modalidade: 'EAD', slug: 'logistica' },
      { name: 'Serviço Social',         area: 'humanas',        nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'servico-social' },
      { name: 'Letras — Português',     area: 'humanas',        nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'letras-portugues' },
      { name: 'Educação Física',        area: 'saude',          nivel: 'graduacao', duracao: '3 anos',   modalidade: 'EAD', slug: 'educacao-fisica' },
      { name: 'Enfermagem',             area: 'saude',          nivel: 'graduacao', duracao: '4 anos',   modalidade: 'EAD', slug: 'enfermagem' },
    ]
  }

};

// =====================================================
// 2. FUNÇÕES UTILITÁRIAS
// =====================================================

/**
 * Retorna o URL de afiliado com UTMs automáticos.
 * @param {string} institutionId — ID da instituição (ex: 'anhanguera')
 * @param {string} courseSlug    — Slug do curso (ex: 'enfermagem')
 * @param {string} position      — Posição do clique (ex: 'in-article', 'sidebar')
 */
export function getAffiliateUrl(institutionId, courseSlug = '', position = 'body') {
  const inst = AFFILIATES[institutionId];
  if (!inst) return '#';
  if (inst.affiliateUrl === '#') return '#';

  try {
    const url = new URL(inst.affiliateUrl);
    url.searchParams.set('utm_source',   'hub-do-estudante');
    url.searchParams.set('utm_medium',   'referral');
    url.searchParams.set('utm_campaign', inst.utmCampaign);
    url.searchParams.set('utm_content',  position);
    if (courseSlug) url.searchParams.set('utm_term', courseSlug);
    return url.toString();
  } catch {
    return inst.affiliateUrl;
  }
}

/**
 * Retorna todos os cursos de uma instituição, opcionalmente filtrados por área ou nível.
 * @param {string} institutionId
 * @param {Object} filters — { area, nivel, modalidade }
 */
export function getCoursesByInstitution(institutionId, filters = {}) {
  const inst = AFFILIATES[institutionId];
  if (!inst) return [];

  return inst.courses.filter(course => {
    if (filters.area      && course.area      !== filters.area)      return false;
    if (filters.nivel     && course.nivel     !== filters.nivel)     return false;
    if (filters.modalidade && course.modalidade !== filters.modalidade) return false;
    return true;
  });
}

/**
 * Retorna todas as instituições que oferecem um determinado curso (por slug).
 * @param {string} courseSlug — ex: 'enfermagem'
 */
export function getInstitutionsByCourse(courseSlug) {
  return Object.values(AFFILIATES).filter(inst =>
    inst.courses.some(c => c.slug === courseSlug)
  );
}

/**
 * Retorna lista de todas as instituições como array.
 */
export function getAllInstitutions() {
  return Object.values(AFFILIATES);
}

/**
 * Retorna todos os cursos únicos de todas as instituições.
 * Deduplicados por slug, com lista de quais instituições oferecem cada um.
 */
export function getAllCoursesWithInstitutions() {
  const map = {};

  Object.values(AFFILIATES).forEach(inst => {
    inst.courses.forEach(course => {
      if (!map[course.slug]) {
        map[course.slug] = { ...course, institutions: [] };
      }
      map[course.slug].institutions.push({
        id:   inst.id,
        name: inst.name,
        logo: inst.logo,
        url:  inst.url,
        affiliateUrl: inst.affiliateUrl,
        utmCampaign:  inst.utmCampaign,
      });
    });
  });

  return Object.values(map);
}
