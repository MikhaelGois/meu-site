# 🚀 Instruções de Deploy

## Local Testing (Atual)

O servidor local já está rodando:
```bash
http://localhost:8000
```

Para parar o servidor:
- Feche o terminal de background ou pressione `Ctrl+C`

Para reiniciar:
```bash
cd C:\Users\MBalieroDG\Desktop\dev\meu-site
python -m http.server 8000
```

---

## Deploy para Netlify (Recomendado)

### Opção 1: Drag & Drop
1. Acesse [Netlify](https://app.netlify.com)
2. Faça login ou crie uma conta
3. Arraste a pasta `meu-site` para o editor Netlify
4. Seu site estará live em ~1 minuto

### Opção 2: Git Push
1. Inicialize git (se não feito):
   ```bash
   cd C:\Users\MBalieroDG\Desktop\dev\meu-site
   git init
   git add .
   git commit -m "Initial SPA migration with effects"
   ```

2. Criar repo no GitHub (ou GitLab)

3. Conectar Netlify ao repo:
   ```
   1. Acesse Netlify
   2. New site from Git
   3. Selecione GitHub/GitLab
   4. Autorize
   5. Selecione seu repo
   6. Deploy settings (padrão OK)
   7. Clique "Deploy site"
   ```

---

## Deploy para Vercel

1. Acesse [Vercel](https://vercel.com)
2. Faça login com GitHub
3. Clique "New Project"
4. Importe seu repo
5. Padrões OK → Deploy

---

## Deploy para GitHub Pages

1. Crie um repo `seu-usuario.github.io`
2. Push `index.html` + `assets/`, `styles/`, `scripts/`
3. Site estará em `https://seu-usuario.github.io`

---

## Otimizações Pré-Deploy

### Remover backups (opcional)
```bash
rm -r backup/              # ou Delete folder em Windows Explorer
```

### Remover arquivos antigos (opcional)
```bash
del about.html
del portfolio.html
del contato.html
```

### Minimizar CSS/JS (opcional)
Instale e execute:
```bash
npm install -g csso-cli uglify-js
csso styles/style.css -o styles/style.min.css
uglifyjs scripts/main.js -o scripts/main.min.js
```

Depois atualize `index.html`:
```html
<link rel="stylesheet" href="./styles/style.min.css">
<script src="./scripts/main.min.js"></script>
```

---

## Verificação Pré-Deploy

- [ ] `index.html` tem todas as 4 seções (#home, #about, #projects, #contact)
- [ ] Images em `assets/optimized/` existem e estão em WebP
- [ ] `scripts/main.js` contém SPA suite (IntersectionObserver, parallax, etc.)
- [ ] Testar localmente: navegação, scroll, slider, mobile menu
- [ ] Lighthouse score ≥85 (rodar no DevTools)
- [ ] Sem console errors

---

## Troubleshooting

### Imagens não carregam após deploy
- Verifique que `assets/optimized/` foi incluído no upload
- Fallback PNG em `assets/` existe?
- Teste com `loading="lazy"` removido temporariamente

### Menu mobile não funciona
- Verificar `scripts/main.js` foi uploaded
- DevTools → Console → erro JS?

### Slider não centra
- Verificar `styles/portfolio-slider.css` carregado
- Desativar cache do browser (Ctrl+Shift+R)

### Parallax lento
- Browser antigo? Verificar `prefers-reduced-motion`
- Desativar outras extensões de browser

---

## Analytics & SEO

Após deploy, adicionar em `index.html` <head>:

### Google Analytics
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sitemap (gerar com ferramenta online)
1. Acesse [XML-Sitemaps.com](https://www.xml-sitemaps.com)
2. Enter: `seu-site.netlify.app`
3. Baixe `sitemap.xml`
4. Faça upload em `meu-site/`

### robots.txt
Crie `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://seu-site.netlify.app/sitemap.xml
```

---

## Customizações Pós-Deploy

### Mudar cores
Edit `styles/style.css`:
```css
:root {
  --bg: #1e1e1e;          /* dark bg */
  --text: #dcdcdc;        /* light text */
  --accent-a: #00bcd4;    /* teal */
  --accent-b: #ff9f7f;    /* peach */
}
```

### Adicionar seção
1. Add em `index.html`:
   ```html
   <section id="nova-secao" class="section container">
     <h1 class="section-title">Título</h1>
     <!-- Conteúdo -->
   </section>
   ```
2. Update nav em `<header>`:
   ```html
   <a class="nav-link" href="#nova-secao">Link</a>
   ```
3. JS detecta automaticamente via IntersectionObserver

---

**🎉 Deploy pronto!**
