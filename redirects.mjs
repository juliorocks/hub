/**
 * redirects.mjs — mapa de 301 para consolidar páginas duplicadas.
 *
 * Fase 2 da remediação AdSense "conteúdo de baixo valor": o site tinha 2–4 URLs
 * servindo o mesmo curso. Aqui cada duplicata aponta para a versão canônica
 * (a com mais conteúdo / melhor estrutura).
 *
 * Chave e valor são caminhos servidos (/pages/...). O middleware em server.js
 * também aceita a variante sem "index.html" e sem barra final.
 */

// loser  ->  winner  (ambos como caminho /pages/.../arquivo.html ou /pages/.../ )
const RAW = {
  // ---- Graduação: Medicina ----
  '/pages/graduacao/saude/medicina.html':              '/pages/graduacao/saude/curso-de-medicina.html',
  '/pages/graduacao/saude/medicina/index.html':        '/pages/graduacao/saude/curso-de-medicina.html',
  '/pages/graduacao/saude/medicina-guia/index.html':   '/pages/graduacao/saude/curso-de-medicina.html',

  // ---- Graduação: Direito ----
  '/pages/graduacao/direito/index.html':               '/pages/graduacao/direito/direito.html',
  '/pages/graduacao/humanas/direito/index.html':       '/pages/graduacao/direito/direito.html',
  '/pages/graduacao/humanas/direito-guia/index.html':  '/pages/graduacao/direito/direito.html',

  // ---- Graduação: Engenharia Civil ----
  '/pages/graduacao/engenharia/engenharia-civil/index.html':        '/pages/graduacao/engenharia/engenharia-civil.html',
  '/pages/graduacao/engenharias/engenharia-civil/index.html':       '/pages/graduacao/engenharia/engenharia-civil.html',
  '/pages/graduacao/engenharias/engenharia-civil-guia/index.html':  '/pages/graduacao/engenharia/engenharia-civil.html',

  // ---- Graduação: Arquitetura e Urbanismo ----
  '/pages/graduacao/engenharia/arquitetura-urbanismo/index.html':   '/pages/graduacao/humanas/arquitetura-urbanismo/index.html',
  '/pages/graduacao/engenharias/arquitetura-urbanismo/index.html':  '/pages/graduacao/humanas/arquitetura-urbanismo/index.html',

  // ---- Graduação: Administração ----
  '/pages/graduacao/negocios/administracao/index.html':  '/pages/graduacao/negocios/administracao.html',
  '/pages/graduacao/administracao/index.html':           '/pages/graduacao/negocios/administracao.html',

  // ---- Graduação: Ciências Contábeis / Contabilidade ----
  '/pages/graduacao/negocios/ciencias-contabeis.html':              '/pages/graduacao/negocios/ciencias-contabeis-guia/index.html',
  '/pages/graduacao/negocios/ciencias-contabeis/index.html':        '/pages/graduacao/negocios/ciencias-contabeis-guia/index.html',
  '/pages/graduacao/administracao/ciencias-contabeis/index.html':   '/pages/graduacao/negocios/ciencias-contabeis-guia/index.html',
  '/pages/graduacao/negocios/contabilidade/index.html':             '/pages/graduacao/negocios/ciencias-contabeis-guia/index.html',

  // ---- Graduação: Gestão de RH ----
  '/pages/graduacao/negocios/gestao-rh.html':                       '/pages/graduacao/negocios/gestao-recursos-humanos/index.html',
  '/pages/graduacao/administracao/gestao-recursos-humanos/index.html': '/pages/graduacao/negocios/gestao-recursos-humanos/index.html',

  // ---- Graduação: Logística ----
  '/pages/graduacao/negocios/logistica.html':                       '/pages/graduacao/negocios/logistica/index.html',
  '/pages/graduacao/administracao/logistica/index.html':            '/pages/graduacao/negocios/logistica/index.html',

  // ---- Graduação: Marketing ----
  '/pages/graduacao/negocios/marketing.html':                       '/pages/graduacao/negocios/marketing/index.html',
  '/pages/graduacao/administracao/marketing/index.html':            '/pages/graduacao/negocios/marketing/index.html',

  // ---- Graduação: Saúde ----
  '/pages/graduacao/saude/enfermagem/index.html':      '/pages/graduacao/saude/enfermagem.html',
  '/pages/graduacao/saude/farmacia.html':              '/pages/graduacao/saude/farmacia-guia/index.html',
  '/pages/graduacao/saude/farmacia/index.html':        '/pages/graduacao/saude/farmacia-guia/index.html',
  '/pages/graduacao/saude/nutricao.html':              '/pages/graduacao/saude/nutricao-guia/index.html',
  '/pages/graduacao/saude/nutricao/index.html':        '/pages/graduacao/saude/nutricao-guia/index.html',
  '/pages/graduacao/saude/odontologia.html':           '/pages/graduacao/saude/odontologia/index.html',
  '/pages/graduacao/saude/psicologia/index.html':      '/pages/graduacao/saude/psicologia.html',
  '/pages/graduacao/humanas/psicologia-guia/index.html': '/pages/graduacao/saude/psicologia.html',
  '/pages/graduacao/saude/educacao-fisica.html':       '/pages/graduacao/saude/educacao-fisica/index.html',

  // ---- Graduação: Humanas / Educação ----
  '/pages/graduacao/educacao/pedagogia/index.html':    '/pages/graduacao/humanas/pedagogia/index.html',

  // ---- Graduação: Tecnologia ----
  '/pages/graduacao/tecnologia/analise-desenvolvimento-sistemas/index.html': '/pages/graduacao/tecnologia/analise-desenvolvimento-sistemas.html',
  '/pages/graduacao/tecnologia/ciencia-da-computacao/index.html':            '/pages/graduacao/tecnologia/ciencia-computacao/index.html',
  '/pages/graduacao/tecnologia/desenvolvimento-web/index.html':              '/pages/graduacao/tecnologia/desenvolvimento-web-fullstack/index.html',
  '/pages/graduacao/tecnologia/seguranca-informacao/index.html':             '/pages/graduacao/tecnologia/ciberseguranca/index.html',

  // ---- Pós-graduação ----
  '/pages/pos-graduacao/pos-direito.html':                                   '/pages/pos-graduacao/direito/index.html',
  '/pages/pos-graduacao/especializacao-saude.html':                          '/pages/pos-graduacao/especializacao/mba-gestao-saude/index.html',
  '/pages/pos-graduacao/especializacao/saude/index.html':                    '/pages/pos-graduacao/especializacao/mba-gestao-saude/index.html',
  '/pages/pos-graduacao/mba/mba-saude/index.html':                           '/pages/pos-graduacao/especializacao/mba-gestao-saude/index.html',
  '/pages/pos-graduacao/mba/mba-saude-gestao-hospitalar/index.html':         '/pages/pos-graduacao/especializacao/mba-gestao-saude/index.html',
  '/pages/pos-graduacao/mba/mba-financas-corporativas/index.html':           '/pages/pos-graduacao/especializacao/mba-financas-corporativas/index.html',
  '/pages/pos-graduacao/especializacao/mba-financas/index.html':             '/pages/pos-graduacao/especializacao/mba-financas-corporativas/index.html',
  '/pages/pos-graduacao/especializacao/mba-gestao-pessoas/index.html':       '/pages/pos-graduacao/especializacao/gestao-pessoas/index.html',
  '/pages/pos-graduacao/mba/mba-gestao-pessoas/index.html':                  '/pages/pos-graduacao/especializacao/gestao-pessoas/index.html',
  '/pages/pos-graduacao/mba/mba-gestao-projetos/index.html':                 '/pages/pos-graduacao/especializacao/gestao-projetos/index.html',
  '/pages/pos-graduacao/especializacao/mba-marketing/index.html':            '/pages/pos-graduacao/especializacao/marketing-digital/index.html',
  '/pages/pos-graduacao/mba/mba-marketing-digital/index.html':               '/pages/pos-graduacao/especializacao/marketing-digital/index.html',
  '/pages/pos-graduacao/mba/mba-gestao-empresarial/index.html':              '/pages/pos-graduacao/mba-gestao-negocios.html',
  '/pages/pos-graduacao/mba/mba-gestao-financeira/index.html':               '/pages/pos-graduacao/mba-gestao-negocios.html',

  // ---- Páginas-índice vazias (0–25 palavras) → hub real da seção ----
  '/pages/graduacao/cursos-humanas/index.html':      '/pages/graduacao/index.html',
  '/pages/graduacao/cursos-negocios/index.html':     '/pages/graduacao/index.html',
  '/pages/graduacao/cursos-saude/index.html':        '/pages/graduacao/index.html',
  '/pages/graduacao/cursos-tecnologia/index.html':   '/pages/graduacao/index.html',
  '/pages/graduacao/humanas/index.html':             '/pages/graduacao/index.html',
  '/pages/graduacao/engenharia/index.html':          '/pages/graduacao/index.html',
  '/pages/graduacao/engenharias/index.html':         '/pages/graduacao/index.html',
  '/pages/graduacao/negocios/index.html':            '/pages/graduacao/index.html',
  '/pages/graduacao/educacao/index.html':            '/pages/graduacao/index.html',
  '/pages/graduacao/tecnologia/index.html':          '/pages/graduacao/index.html',
  '/pages/graduacao/saude/index.html':               '/pages/graduacao/index.html',
  '/pages/pos-graduacao/mba/index.html':             '/pages/pos-graduacao/index.html',
  '/pages/pos-graduacao/especializacao/index.html':  '/pages/pos-graduacao/index.html',
};

// Expande cada entrada para as variantes /x/index.html, /x/ e /x
function expand(map) {
  const out = {};
  for (const [from, to] of Object.entries(map)) {
    out[from] = to;
    if (from.endsWith('/index.html')) {
      const dir = from.slice(0, -'index.html'.length); // .../
      out[dir] = to;                    // /x/
      out[dir.slice(0, -1)] = to;       // /x
    }
  }
  return out;
}

export const REDIRECTS = expand(RAW);

// Alvos canônicos (destinos) — usado para gerar sitemap / rel=canonical.
export const CANONICAL_TARGETS = [...new Set(Object.values(RAW))];
