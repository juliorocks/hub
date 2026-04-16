# Arquitetura do Portal Melhores Cursos

## 📐 Estrutura de Componentes

### Header e Footer Dinâmicos
O site usa um sistema de **injeção de componentes** para manter header e footer únicos e reutilizáveis:

- **Header e Footer são injetados automaticamente** via `assets/js/components-loader.js`
- **Não adicione header/footer em arquivos HTML** - o script cuida disso
- Funciona em qualquer profundidade de pasta (calcula caminhos automaticamente)

### Caminho dos Scripts
Todas as páginas devem **sempre** terminar com:

```html
<!-- JS - SEMPRE NESTA ORDEM -->
<script type="module" src="CAMINHO_RELATIVO/assets/js/components-loader.js"></script>
<script type="module" src="CAMINHO_RELATIVO/assets/js/main.js"></script>
```

## 📄 Criando Novas Páginas

### 1. Usar o Template
Copie `templates/page-template.html` como base:

```bash
cp templates/page-template.html pages/sua-categoria/sua-pagina.html
```

### 2. Estrutura HTML Mínima
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título | Melhores Cursos</title>
  <meta name="description" content="Descrição">
  
  <!-- CSS (sempre necessário) -->
  <link rel="stylesheet" href="../../assets/css/base.css">
  <link rel="stylesheet" href="../../assets/css/layout.css">
  <link rel="stylesheet" href="../../assets/css/components.css">
  <link rel="stylesheet" href="../../assets/css/listing.css">
  <link rel="stylesheet" href="../../assets/css/responsive.css">
</head>
<body class="page-wrapper">

  <!-- ❌ NÃO ADICIONE HEADER/FOOTER AQUI -->
  
  <!-- SEU CONTEÚDO -->
  <section>
    <div class="container">
      <!-- Seu HTML aqui -->
    </div>
  </section>

  <!-- ✅ SEMPRE TERMINAR COM ISTO -->
  <script type="module" src="../../assets/js/components-loader.js"></script>
  <script type="module" src="../../assets/js/main.js"></script>
</body>
</html>
```

### 3. Caminhos Relativos
Conte quantos níveis de pasta sua página tem e ajuste os `../../`:

| Localização | Caminho para /assets |
|-----------|-------------------|
| `index.html` | `./assets/` |
| `pages/graduacao/index.html` | `../../assets/` |
| `pages/graduacao/saude/psicologia.html` | `../../../assets/` |
| `pages/carreiras/salarios/index.html` | `../../../assets/` |

## 🎨 CSS Disponível

### Arquivos de Estilo
- `assets/css/base.css` - Variáveis, tipografia, cores
- `assets/css/layout.css` - Grid, container, header, footer
- `assets/css/components.css` - Cards, botões, badges, tabelas, FAQ
- `assets/css/listing.css` - Listas de categorias
- `assets/css/institution.css` - Páginas de universidades
- `assets/css/article.css` - Páginas de artigos
- `assets/css/responsive.css` - Media queries

### Classes Principais
```html
<!-- Container padrão (max-width, center) -->
<div class="container">...</div>

<!-- Card de artigo -->
<a href="#" class="card">
  <div class="card__image"></div>
  <div class="card__body">
    <h3 class="card__title">Título</h3>
    <p class="card__excerpt">Resumo</p>
  </div>
</a>

<!-- Card de instituição -->
<a href="#" class="institution-card" data-group="cogna">
  <div class="institution-card__header"></div>
  <div class="institution-card__body">
    <h2 class="institution-card__name">Nome</h2>
    <p class="institution-card__desc">Descrição</p>
  </div>
</a>

<!-- Botão -->
<button class="btn btn--primary btn--lg">Clique aqui</button>

<!-- Badge -->
<span class="badge badge--green">EAD</span>
```

## 🔧 JavaScript Disponível

### Módulos Carregados Automaticamente
- `initMegaMenu()` - Menu responsivo
- `initSearch()` - Busca
- `initAffiliate()` - Tracking de cliques afiliados
- `initAnalytics()` - Analytics
- `initLazyLoad()` - Lazy loading de imagens
- `initFAQ()` - Accordions de FAQ
- `initTOC()` - Índice de conteúdo

### Usando FAQ (Sanfona)
```html
<div class="faq-list">
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">
      <span>Pergunta?</span>
      <svg class="faq-icon" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <div class="faq-answer">
      <p>Resposta aqui</p>
    </div>
  </div>
</div>
```

## 🚀 Boas Práticas

### ✅ Faça
- Use caminhos relativos (`../../`)
- Sempre inclua `components-loader.js` antes de `main.js`
- Use classes BEM para CSS
- Adicione schema.org markup para SEO
- Use imagens otimizadas (Unsplash, etc)

### ❌ Evite
- Não adicione header/footer inline
- Não use caminhos absolutos (`/assets/...`)
- Não modifique `components-loader.js` ou `main.js`
- Não use em-dashes (`—`) nas páginas

## 📊 Schema.org Markup

### Para Páginas de Artigos
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Título",
  "description": "Descrição",
  "image": "URL da imagem",
  "author": { "@type": "Organization", "name": "Melhores Cursos" },
  "datePublished": "2026-04-12",
  "articleBody": "Conteúdo aqui"
}
</script>
```

### Para Páginas de Listagem
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Item 1", "url": "..." },
    ...
  ]
}
</script>
```

## 📝 Checklist para Nova Página

- [ ] Baseada em `templates/page-template.html`
- [ ] SEM header/footer inline
- [ ] Caminhos relativos corretos para `/assets/`
- [ ] Scripts no final: `components-loader.js` + `main.js`
- [ ] Meta tags preenchidas (title, description)
- [ ] Schema.org markup adicionado
- [ ] Testada em múltiplas profundidades de pasta
- [ ] Links de navegação funcionam
- [ ] Imagens otimizadas

---

**Última atualização**: 12/04/2026
