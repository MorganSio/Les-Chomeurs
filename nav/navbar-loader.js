document.addEventListener('DOMContentLoaded', () => {
    // 1. Détermine si on est dans un sous-dossier pour ajuster le chemin
    const isGithub = location.hostname.includes('github.io');
    const depth = location.pathname.split('/').length - (isGithub ? 3 : 2);
    const prefix = depth > 0 ? '../' : './';

    fetch(`${prefix}nav/navbar.html`)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById('navbar-container');
            if (!container) return;
            
            container.innerHTML = html;

            // 2. Gestion du Menu Mobile
            const toggle = document.getElementById('navbarToggle');
            const menu = document.getElementById('navbarMenu');
            
            toggle?.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // 3. Gestion du lien Actif
            const currentFile = location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href').endsWith(currentFile)) {
                    link.classList.add('active');
                }
            });
        })
        .catch(err => console.error("Friday: Erreur navbar", err));
});
