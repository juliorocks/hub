# ✅ Checklist para Criar Nova Página

Sempre siga este checklist ao criar uma nova página no portal.

## 1. Copiar Template
```bash
# Para página genérica:
cp templates/page-template.html pages/sua-categoria/sua-pagina.html

# Para página de curso:
cp templates/course-page-template.html pages/graduacao/sua-area/seu-curso/index.html
```

## 2. Estrutura HTML
- [ ] `<!DOCTYPE html>` e `<html lang="pt-BR">`
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] `<title>` preenchido com `| Melhores Cursos`
- [ ] `<meta name="description">` preenchido (máx 160 caracteres)
- [ ] `<link rel="canonical">` com URL correta
- [ ] `<meta name="robots" content="index, follow">`

## 3. Open Graph
- [ ] `og:type` (article, website, etc)
- [ ] `og:title`
- [ ] `og:description`
- [ ] `og:url`
- [ ] `og:site_name` = "Melhores Cursos"

## 4. Schema.org
- [ ] Schema apropriado para o tipo de página (Article, ItemList, CollegeOrUniversity, etc)
- [ ] JSON-LD bem formatado
- [ ] Para artigos: headline, datePublished, author, publisher
- [ ] Para listas: ItemList com numberOfItems e itemListElement

## 5. CSS
- [ ] `assets/css/base.css` ✓
- [ ] `assets/css/layout.css` ✓
- [ ] `assets/css/components.css` ✓
- [ ] `assets/css/listing.css` (se for listagem)
- [ ] `assets/css/article.css` (se for artigo)
- [ ] `assets/css/responsive.css` ✓

## 6. Caminhos Relativos
- [ ] Contar profundidade da pasta
- [ ] Usar `../../assets/` para `pages/categoria/`
- [ ] Usar `../../../assets/` para `pages/categoria/subcategoria/`
- [ ] **NUNCA** usar caminhos absolutos (`/assets/...`)

## 7. Scripts JS
```html
<script type="module" src="CAMINHO_RELATIVO/assets/js/components-loader.js"></script>
<script type="module" src="CAMINHO_RELATIVO/assets/js/main.js"></script>
```
- [ ] `components-loader.js` PRIMEIRO
- [ ] `main.js` SEGUNDO
- [ ] Caminhos relativos corretos

## 8. Conteúdo HTML
- [ ] **NÃO adicione** `<header class="site-header">`
- [ ] **NÃO adicione** `<footer class="site-footer">`
- [ ] Breadcrumb (recomendado)
- [ ] Conteúdo principal em `<main>`
- [ ] Use classes BEM para CSS (`.component__element--modifier`)

## 9. Links Internos
- [ ] Links para home: `./index.html` ou `../../index.html`
- [ ] Links para categorias: `../../pages/...` ou `../../../pages/...`
- [ ] **NÃO** começar com `/`

## 10. Imagens
- [ ] URLs de imagens otimizadas (Unsplash, etc)
- [ ] `alt` descritivo em todas as imagens
- [ ] Para `<img>` usar caminhos relativos ou URLs externas

## 11. FAQ (se aplicável)
```html
<div class="faq-list" itemscope itemtype="https://schema.org/FAQPage">
  <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <button class="faq-question" aria-expanded="false">
      <span itemprop="name">Pergunta?</span>
      <svg class="faq-icon" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
    <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">Resposta aqui</p>
    </div>
  </div>
</div>
```
- [ ] Estrutura HTML correta
- [ ] Schema.org FAQPage incluído
- [ ] CSS vai animar automaticamente

## 12. Classes CSS Comuns
```html
<!-- Container padrão -->
<div class="container">...</div>

<!-- Badge -->
<span class="badge badge--green">EAD</span>
<span class="badge badge--blue">Presencial</span>

<!-- Botão -->
<button class="btn btn--primary btn--lg">Texto</button>

<!-- Card -->
<a href="#" class="card">
  <div class="card__image"></div>
  <div class="card__body">
    <h3 class="card__title">Título</h3>
    <p class="card__excerpt">Resumo</p>
  </div>
</a>
```

## 13. Mobile/Responsividade
- [ ] Testado em celular (width 375px)
- [ ] Testado em tablet (width 768px)
- [ ] Testado em desktop (width 1024px+)
- [ ] `<meta name="viewport">` presente
- [ ] CSS responsivo automaticamente incluído

## 14. Acessibilidade
- [ ] `aria-expanded` em elementos interativos
- [ ] `aria-label` em botões sem texto
- [ ] `role` apropriado (banner, navigation, main, etc)
- [ ] Alt text em imagens
- [ ] Contraste de cores adequado

## 15. Performance
- [ ] Imagens otimizadas (não > 500KB)
- [ ] Lazy loading ativado automaticamente
- [ ] Sem CSS inline (use `<link>`)
- [ ] Sem scripts síncronos (`type="module"`)

## 16. Verificação Final
- [ ] `<body>` tem classe `page-wrapper`
- [ ] Scripts no final do body
- [ ] Sem erros de console (F12)
- [ ] Links funcionam em navegação
- [ ] Logo clicável volta para home

## Exemplo Rápido

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Curso | Melhores Cursos</title>
  <meta name="description" content="Descrição do curso...">
  <link rel="canonical" href="https://www.melhorescursos.com.br/...">
  <link rel="stylesheet" href="../../assets/css/base.css">
  <link rel="stylesheet" href="../../assets/css/layout.css">
  <link rel="stylesheet" href="../../assets/css/components.css">
  <link rel="stylesheet" href="../../assets/css/listing.css">
  <link rel="stylesheet" href="../../assets/css/responsive.css">
</head>
<body class="page-wrapper">
  <!-- Conteúdo aqui -->
  <script type="module" src="../../assets/js/components-loader.js"></script>
  <script type="module" src="../../assets/js/main.js"></script>
</body>
</html>
```

---

**Dúvidas?** Veja `ARQUITETURA.md` para documentação completa.
