// scripts/navbar-loader.js
document.addEventListener('DOMContentLoaded', function() {
    
    const depth = window.location.pathname.split('/').length - 2; 
    let pathPrefix = './';
    const isGithubPages = window.location.hostname.includes('github.io');
    if (isGithubPages) {
        pathPrefix = './'; 
        
        if (window.location.pathname.split('/').length > 3) { // > 3 car ['', 'NomProjet', 'subfolder', 'index.html']
             pathPrefix = '../';
        }
    } else {
        if (window.location.pathname.split('/').length > 2) { 
             pathPrefix = '../';
        }
    }

    const navbarUrl = pathPrefix + 'nav/navbar.html';
    console.log('Friday: Chargement de la navbar depuis :', navbarUrl);

    fetch(navbarUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} sur ${navbarUrl}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById('navbar-container');
            if (container) {
                container.innerHTML = data;
                initMobileToggle();
                highlightActiveLink();
            } else {
                console.error("Friday: Impossible de trouver <div id='navbar-container'></div>");
            }
        })
        .catch(error => {
            console.error('Friday: Erreur chargement navbar:', error);
        });
});

function initMobileToggle() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || href.endsWith(currentPage))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
