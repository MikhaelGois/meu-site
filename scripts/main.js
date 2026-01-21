// Landing Page - Simplified JavaScript
document.addEventListener('DOMContentLoaded', function(){
  // Dynamic year
  const yearEls = document.querySelectorAll('#year, #year-about, #year-portfolio, #year-contact');
  const y = new Date().getFullYear();
  yearEls.forEach(el=>{ if(el) el.textContent = y });

  // Form submit handler with validation feedback
  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      console.log('Contato enviado:', Object.fromEntries(data.entries()));
      alert('✅ Mensagem enviada com sucesso! Responderei em breve.');
      form.reset();
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Slider/gallery JS removed — portfolio moved to GitHub (no slider on landing page)
// Menu hamburger toggle (uses current markup: .menu-toggle, .nav, .nav-link)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('open');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.site-header') && nav.classList.contains('open')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });

        // Marcar link ativo com base na página atual
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageMap = {
            'index.html': './index.html',
            'about.html': './about.html',
            'portfolio.html': './portfolio.html',
            'contato.html': './contato.html',
            '': './index.html'
        };
        const activePage = pageMap[currentPage] || pageMap[''];
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === activePage) link.classList.add('active'); else link.classList.remove('active');
        });
    }
});

// SPA enhancements: reveal on scroll, lazy-load images, active nav on scroll, hash handling, and light parallax
document.addEventListener('DOMContentLoaded', function(){
    // ensure images use native lazy loading
    document.querySelectorAll('img').forEach(img => { if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy') });

    // mark main sections as revealable
    document.querySelectorAll('main section, .hero, .home-cta').forEach(el => el.classList.add('reveal'));

    if('IntersectionObserver' in window){
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => io.observe(el));

        // update active nav link based on section visibility
        const sections = document.querySelectorAll('main section[id]');
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = document.querySelector('.nav-link[href="#'+id+'"]');
                if(link) link.classList.toggle('active', entry.isIntersecting);
            });
        }, { threshold: 0.55 });
        sections.forEach(s => navObserver.observe(s));
    } else {
        // fallback: reveal all immediately
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }

    // handle deep links on page load
    if(window.location.hash){
        const target = document.querySelector(window.location.hash);
        if(target) setTimeout(()=> target.scrollIntoView({ behavior: 'smooth' }), 60);
    }

    // lightweight parallax for hero media
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        const heroMedia = document.querySelector('.hero-media');
        if(heroMedia){
            let ticking = false;
            function onScroll(){
                if(!ticking){
                    ticking = true;
                    requestAnimationFrame(()=>{
                        const sc = window.scrollY;
                        const offset = Math.min(40, sc * 0.08);
                        heroMedia.style.transform = 'translateY(' + offset + 'px)';
                        ticking = false;
                    });
                }
            }
            window.addEventListener('scroll', onScroll, { passive: true });
        }
    }

    // close mobile nav when clicking anchor links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
        a.addEventListener('click', function(){
            const nav = document.querySelector('.nav');
            nav && nav.classList.remove('open');
            const menuToggle = document.querySelector('.menu-toggle');
});
    });
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                        // Re-trigger reveal animation
                        card.classList.remove('is-visible');
                        setTimeout(() => card.classList.add('is-visible'), 50);
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.classList.remove('hidden');
                            card.classList.remove('is-visible');
                            setTimeout(() => card.classList.add('is-visible'), 50);
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }
});

// Project Modal System
const projectsList = [
    { name: 'Calculator', folder: 'calculator', icon: '🧮', category: 'app', desc: 'Calculadora com operações básicas' },
    { name: 'Quiz App', folder: 'quiz-app', icon: '📝', category: 'app', desc: 'App interativo com pontuação' },
    { name: 'Rock Paper Scissors', folder: 'rock-paper-scissors', icon: '✊', category: 'game', desc: 'Jogo clássico vs computador' },
    { name: 'Note App', folder: 'note-app', icon: '📔', category: 'app', desc: 'Anotações com salvamento local' },
    { name: 'Stopwatch', folder: 'stopwatch', icon: '⏱️', category: 'app', desc: 'Cronômetro com laps' },
    { name: 'QR Reader', folder: 'qr-reader', icon: '📱', category: 'tool', desc: 'Leitor e gerador de QR' },
    { name: 'Weather App', folder: 'weather-app', icon: '🌤️', category: 'app', desc: 'Previsão em tempo real' },
    { name: 'Ecommerce', folder: 'ecommerce', icon: '🛒', category: 'website', desc: 'Loja virtual completa' },
    { name: 'Landing Page', folder: 'landing-page', icon: '🚀', category: 'website', desc: 'Página moderna e responsiva' },
    { name: 'Password Generator', folder: 'password-generator', icon: '🔐', category: 'tool', desc: 'Gerador de senhas seguras' },
    { name: 'Tic Tac Toe', folder: 'tic-tac-toe', icon: '❌', category: 'game', desc: 'Jogo da velha para 2 jogadores' },
    { name: 'Link Shortener', folder: 'link-shortener', icon: '🔗', category: 'tool', desc: 'Encurtador com rastreamento' },
    { name: 'Portfolio', folder: 'portfolio', icon: '💼', category: 'website', desc: 'Site profissional responsivo' },
    { name: 'Drawing App', folder: 'drawing-app', icon: '🎨', category: 'app', desc: 'Canvas com ferramentas' },
    { name: 'Food Order', folder: 'food-order', icon: '🍕', category: 'website', desc: 'Pedidos online para restaurante' },
    { name: 'Meme Generator', folder: 'meme-generator', icon: '😂', category: 'app', desc: 'Cria memes customizáveis' },
    { name: 'Movie App', folder: 'movie-app', icon: '🎬', category: 'app', desc: 'Catálogo com TMDB API' },
    { name: 'Chat App', folder: 'chat-app', icon: '💬', category: 'app', desc: 'Chat em tempo real' },
    { name: 'Twitter Clone', folder: 'twitter-clone', icon: '🐦', category: 'clone', desc: 'Interface do Twitter' },
    { name: 'Survey App', folder: 'survey-app', icon: '📊', category: 'app', desc: 'Criador de pesquisas' },
    { name: 'E-Book Site', folder: 'ebook-site', icon: '📚', category: 'website', desc: 'Biblioteca digital' },
    { name: 'Instagram Clone', folder: 'instagram-clone', icon: '📷', category: 'clone', desc: 'Feed e stories' },
    { name: 'WhatsApp Clone', folder: 'whatsapp-clone', icon: '📱', category: 'clone', desc: 'Mensagens em tempo real' },
    { name: 'Netflix Clone', folder: 'netflix-clone', icon: '🎬', category: 'clone', desc: 'Carrossel de filmes' },
    { name: 'File Sharing', folder: 'file-sharing', icon: '📤', category: 'tool', desc: 'Compartilhamento P2P' },
    { name: 'Parallax Website', folder: 'parallax-website', icon: '🌄', category: 'website', desc: 'Efeitos parallax' },
    { name: 'Job Search', folder: 'job-search', icon: '💼', category: 'website', desc: 'Portal de empregos' },
    { name: 'Pinterest Clone', folder: 'pinterest-clone', icon: '📌', category: 'clone', desc: 'Layout Masonry' },
    { name: 'Dating App', folder: 'dating-app', icon: '💕', category: 'app', desc: 'Sistema de match' },
    { name: 'Social Media Dashboard', folder: 'social-media-dashboard', icon: '📊', category: 'app', desc: 'Análise de redes' },
    { name: 'Tracker App', folder: 'tracker-app', icon: '📈', category: 'app', desc: 'Rastreador de hábitos' },
    { name: 'Memory Game', folder: 'memory-game', icon: '🧠', category: 'game', desc: 'Jogo da memória' },
    { name: 'Giphy Clone', folder: 'giphy-clone', icon: '🎭', category: 'clone', desc: 'Busca de GIFs' },
    { name: 'User Activity Tracker', folder: 'user-activity-tracker', icon: '👤', category: 'app', desc: 'Monitoramento de atividade' },
    { name: 'Stock Trading', folder: 'stock-trading', icon: '📈', category: 'app', desc: 'Simulador de ações' },
    { name: 'Chess Game', folder: 'chess-game', icon: '♟️', category: 'game', desc: 'Xadrez completo' },
    { name: 'Music Player', folder: 'music-player', icon: '🎵', category: 'app', desc: 'Player com playlist' },
    { name: 'To-Do List', folder: 'todo-list', icon: '✅', category: 'app', desc: 'Tarefas com prioridades' },
    { name: 'Random User API', folder: 'random-user-api', icon: '👥', category: 'api', desc: 'Perfis aleatórios' },
    { name: 'Typing Speed Test', folder: 'typing-speed-test', icon: '⌨️', category: 'tool', desc: 'Teste de digitação' }
];

function openProjectModal(projectFolder) {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const selector = document.getElementById('project-selector');
    
    if (selector.options.length === 1) {
        projectsList.forEach(project => {
            const option = document.createElement('option');
            option.value = project.folder;
            option.textContent = `${project.icon} ${project.name}`;
            selector.appendChild(option);
        });
    }
    
    // clear any existing srcdoc to avoid resolution confusion, then navigate
    try { iframe.srcdoc = ''; iframe.removeAttribute('srcdoc'); } catch(e){}
    iframe.src = `./projects/${projectFolder}/`;
    selector.value = projectFolder;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside modal-content
    modal.addEventListener('click', closeProjectModalOnClickOutside);
}

function closeProjectModalOnClickOutside(event) {
    const modal = event.currentTarget;
    const modalContent = modal.querySelector('.modal-content');
    if (event.target === modal) {
        closeProjectModal();
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    modal.classList.remove('active');
    try { iframe.src = ''; iframe.srcdoc = ''; } catch(e){}
    document.body.style.overflow = '';
    modal.removeEventListener('click', closeProjectModalOnClickOutside);
}

window.closeProjectModal = closeProjectModal;

function switchProject(projectFolder) {
    if (!projectFolder) return;
    console.log('switchProject called ->', projectFolder);
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    // Use absolute URL to avoid relative resolution issues
    const base = window.location.origin.replace(/\/$/, '');
    const urlDir = `${base}/projects/${projectFolder}/`;
    const urlIndex = `${urlDir}index.html`;

    // remove any srcdoc to ensure navigation works reliably
    try { iframe.srcdoc = ''; iframe.removeAttribute('srcdoc'); } catch(e){}

    // attach a load handler to detect successful navigations
    const onLoad = () => {
        console.log('iframe loaded ->', iframe.contentWindow.location.href);
        iframe.removeEventListener('load', onLoad);
        clearTimeout(loadFailTimer);
    };

    iframe.addEventListener('load', onLoad);

    // try directory URL first, then index.html fallback
    iframe.src = urlDir;

    // fallback timer: if iframe doesn't load within 2.5s, try explicit index.html
    const loadFailTimer = setTimeout(() => {
        console.warn('iframe load timeout, retrying with explicit index.html ->', urlIndex);
        iframe.src = urlIndex;
        // give another 3s before showing a friendly error inside the iframe
        const finalTimer = setTimeout(() => {
            console.error('iframe failed to load project:', projectFolder);
            // show user-friendly error inside iframe as srcdoc
            iframe.srcdoc = `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Arial;padding:28px;background:#081024;color:#e6eef8;"><h2>Erro ao carregar o projeto</h2><p>Não foi possível abrir <strong>${projectFolder}</strong>. Verifique se a pasta <code>/projects/${projectFolder}/</code> existe e contém um <code>index.html</code>.</p><p>Tente executar o servidor local (ex.: <code>python -m http.server 8000</code>) e recarregar a página.</p></body></html>`;
        }, 3000);
    }, 2500);

    // Ensure modal stays open and background locked
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.switchProject = switchProject;

// Open the projects gallery page inside the modal (loads projects/index.html)
function openProjectsGallery() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const selector = document.getElementById('project-selector');

    // populate selector once
    if (selector && selector.options.length === 1) {
        projectsList.forEach(project => {
            const option = document.createElement('option');
            option.value = project.folder;
            option.textContent = `${project.icon} ${project.name}`;
            selector.appendChild(option);
        });
    }

    // Build an inlined gallery HTML and inject via srcdoc so iframe shows projects immediately
    const cardsHtml = projectsList.map(p => {
           return `<div class="card" data-category="${p.category}" data-folder="${p.folder}"><div class="card-icon">${p.icon}</div><div class="card-name">${p.name}</div><div class="card-desc">${p.desc}</div></div>`;
    }).join('');

    const galleryHtml = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="${window.location.origin}/"><title>Galeria</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;background:#081024;color:#e6eef8;margin:0;padding:18px}h2{margin:0 0 12px}.filters{display:flex;gap:8px;margin:12px 0 18px;flex-wrap:wrap}.filter-btn{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);color:#dfe9fb;padding:8px 12px;border-radius:20px;cursor:pointer;font-size:0.95rem;transition:all 0.2s}.filter-btn:hover{background:rgba(255,255,255,0.08)}.filter-btn.active{background:linear-gradient(90deg,#6c63ff,#9b5cff);color:#fff;border-color:transparent;box-shadow:0 6px 18px rgba(107,71,255,0.18)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}.card{background:rgba(255,255,255,0.03);padding:12px;border-radius:8px;text-align:center;transition:all 0.2s;cursor:pointer;border:1px solid rgba(255,255,255,0.05);overflow:hidden}.card:hover{transform:translateY(-2px);background:rgba(255,255,255,0.06);border-color:rgba(107,99,255,0.2)}.card-icon{font-size:32px;display:block;margin-bottom:8px;line-height:1}.card-name{font-weight:600;margin:0 0 4px;font-size:0.95rem;line-height:1.2}.card-desc{font-size:0.8rem;color:#a1a1aa;margin:0;line-height:1.3}</style></head><body><h2>Galeria de Projetos</h2><div class="filters"><button class="filter-btn active" data-filter="app">Apps</button><button class="filter-btn" data-filter="website">Websites</button><button class="filter-btn" data-filter="clone">Clones</button><button class="filter-btn" data-filter="game">Jogos</button><button class="filter-btn" data-filter="tool">Ferramentas</button><button class="filter-btn" data-filter="api">API</button></div><div class="grid">${cardsHtml}</div><script> (function(){
        const filters = document.querySelectorAll('.filter-btn');
        function applyFilter(filter){
            document.querySelectorAll('.card').forEach(c=>{
                if(filter==='app' || filter==='website' || filter==='clone' || filter==='game' || filter==='tool' || filter==='api'){
                    if(c.getAttribute('data-category')===filter) c.style.display='block'; else c.style.display='none';
                }
            });
        }
        filters.forEach(btn=>{
            btn.addEventListener('click', ()=>{
                filters.forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.getAttribute('data-filter'));
            });
        });

        // Bind click on cards using event listeners (more reliable than inline onclick in srcdoc)
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const folder = card.getAttribute('data-folder');
                console.log('[Gallery iframe] Card clicked ->', folder);
                try {
                    // Call parent.switchProject reliably
                    if (window.parent && typeof window.parent.switchProject === 'function') {
                        console.log('[Gallery iframe] Calling parent.switchProject');
                        window.parent.switchProject(folder);
                    } else {
                        console.warn('[Gallery iframe] switchProject not available on parent');
                    }
                } catch (err) {
                    console.error('[Gallery iframe] Error calling parent.switchProject:', err);
                }
            });
        });
    })(); </script></body></html>`;

    iframe.srcdoc = galleryHtml;
    // keep a copy so we can restore gallery when projects navigate back to site root
    try { window._gallerySrcdoc = galleryHtml; } catch(e){}
    if (selector) selector.value = '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside modal-content
    modal.addEventListener('click', closeProjectsGalleryOnClickOutside);
}

window.openProjectsGallery = openProjectsGallery;

function closeProjectsGalleryOnClickOutside(event) {
    const modal = event.currentTarget;
    if (event.target === modal) {
        const selector = document.getElementById('project-selector');
        selector.value = '';
        closeProjectsGallery();
    }
}

function closeProjectsGallery() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    modal.classList.remove('active');
    iframe.srcdoc = '';
    document.body.style.overflow = '';
    document.body.style.filter = '';
    modal.removeEventListener('click', closeProjectsGalleryOnClickOutside);
}

// Open contact form in separate modal
function openContactForm() {
    const modal = document.getElementById('contact-modal');
    const iframe = document.getElementById('contact-iframe');

    const contactHtml = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contato</title><style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;background:#081024;color:#e6eef8;margin:0;padding:20px}.form-section{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px}.form-group{margin-bottom:16px}.form-group label{display:block;font-weight:500;margin-bottom:8px;font-size:0.95rem}.form-group input,.form-group textarea,.form-group select{width:100%;padding:10px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:4px;color:#e6eef8;font-family:inherit;font-size:0.95rem;box-sizing:border-box}.form-group input:focus,.form-group textarea:focus,.form-group select:focus{outline:none;background:rgba(255,255,255,0.08);border-color:rgba(107,99,255,0.4)}.form-submit{background:linear-gradient(90deg,#6c63ff,#9b5cff);color:white;border:none;padding:12px 24px;border-radius:4px;cursor:pointer;font-size:1rem;font-weight:600;width:100%;transition:all 0.2s}.form-submit:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(107,71,255,0.3)}</style></head><body><form class="form-section" method="post" action="#"><div class="form-group"><label>Nome Completo<input type="text" name="nome" placeholder="Seu nome" required></label></div><div class="form-group"><label>Email<input type="email" name="email" placeholder="seu@email.com" required></label></div><div class="form-group"><label>Tipo de Projeto<select name="tipo-projeto" required><option value="">Selecione...</option><option value="landing">Landing Page</option><option value="site">Site Institucional</option><option value="webapp">Aplicação Web</option><option value="outro">Outro</option></select></label></div><div class="form-group"><label>Mensagem<textarea name="mensagem" rows="5" placeholder="Descreva seu projeto..." required></textarea></label></div><button type="submit" class="form-submit">Enviar Mensagem</button></form></body></html>`;

    iframe.srcdoc = contactHtml;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside modal-content
    modal.addEventListener('click', closeContactFormOnClickOutside);
}

window.openContactForm = openContactForm;

function closeContactFormOnClickOutside(event) {
    const modal = event.currentTarget;
    if (event.target === modal) {
        closeContactModal();
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    const iframe = document.getElementById('contact-iframe');
    modal.classList.remove('active');
    iframe.srcdoc = '';
    document.body.style.overflow = '';
    modal.removeEventListener('click', closeContactFormOnClickOutside);
}

// Allow iframe pages to return to the gallery
function backToGallery(){
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const selector = document.getElementById('project-selector');
    if(window._gallerySrcdoc){
        try { iframe.srcdoc = window._gallerySrcdoc; } catch(e){ console.error('backToGallery:', e); }
    } else {
        openProjectsGallery();
    }
    if(selector) selector.value = '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.backToGallery = backToGallery;

// Navigation guard: if a project inside iframe navigates to the site root (index.html), restore gallery
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('project-iframe');
    if(!iframe) return;
    iframe.addEventListener('load', () => {
        try {
            const cw = iframe.contentWindow;
            if(!cw || !cw.location) return;
            const originMatch = (cw.location.origin === window.location.origin);
            const path = cw.location.pathname || '';
            // if the iframe loaded our site's root/index, restore the gallery
            if(originMatch && (path === '/' || path.endsWith('/index.html'))){
                // but avoid triggering when the iframe is showing the gallery (srcdoc)
                if(window._gallerySrcdoc){
                    console.warn('Detected iframe navigation to site root — restoring gallery');
                    try { iframe.srcdoc = window._gallerySrcdoc; } catch(e){}
                } else {
                    openProjectsGallery();
                }
            }
        } catch(e){ /* ignore cross-origin or access errors */ }
    });
});
