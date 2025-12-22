// Menu hamburger toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const cabecalhoMenu = document.querySelector('.cabecalho_menu');
    const menuLinks = document.querySelectorAll('.cabecalho_menu_link');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            cabecalhoMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                cabecalhoMenu.classList.remove('active');
            });
        });
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.cabecalho')) {
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
            if (cabecalhoMenu) {
                cabecalhoMenu.classList.remove('active');
            }
        }
    });

    // Destacar link da página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
        'index.html': './index.html',
        'about.html': './about.html',
        'portfolio.html': './portfolio.html',
        'contato.html': './contato.html',
        '': './index.html'
    };
    
    const activePage = pageMap[currentPage] || pageMap[''];
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === activePage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

