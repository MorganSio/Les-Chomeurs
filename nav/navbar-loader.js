// scripts/navbar-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Charger la navbar (chemin absolu depuis la racine pour éviter les requêtes comme /snake/nav/...)
    fetch('/nav/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            
            // Initialiser le toggle mobile
            const toggle = document.getElementById('navbarToggle');
            const menu = document.getElementById('navbarMenu');
            
            if (toggle && menu) {
                toggle.addEventListener('click', function() {
                    menu.classList.toggle('active');
                });
            }
            
            // Marquer le lien actif
            highlightActiveLink();
        })
        .catch(error => console.error('Erreur chargement navbar:', error));
});

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
