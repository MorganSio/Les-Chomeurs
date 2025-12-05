const form = document.getElementById('ReportForm');
const popupOverlay = document.getElementById('popupOverlay');

// Emojis extrêmement amusants
const funEmojis = ['🎉', '🎊', '🌟', '⭐', '✨', '🚀', '💥', '🎈', '🎁', '👏', '🔥', '💫', '🌈', '💎', '⚡', '🎯', '🌪️', '🪐'];

// Créer des particules volantes
function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.textContent = funEmojis[Math.floor(Math.random() * funEmojis.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 6000);
}

// Créer une explosion de confettis
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.textContent = funEmojis[Math.floor(Math.random() * funEmojis.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = Math.random() * 20 + 'vh';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
}

// Déclencher une tempête de confettis
function triggerConfetti() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createConfetti(), i * 30);
    }
}

// Effet de particules qui suivent la souris
function createParticleTrail(e) {
    if (Math.random() > 0.8 && e.clientX && e.clientY) {
        const emoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];
        const spark = document.createElement('span');
        spark.textContent = emoji;
        spark.style.position = 'fixed';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.pointerEvents = 'none';
        spark.style.fontSize = '20px';
        spark.style.animation = 'sparkFloat 1.5s ease-in forwards';
        spark.style.opacity = '0.8';
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1500);
    }
}

// Mode "Folie" - activer les couleurs psychédéliques
let crazyMode = false;
function toggleCrazyMode() {
    crazyMode = !crazyMode;
    if (crazyMode) {
        document.body.style.animation = 'gradientShift 2s ease infinite';
        document.querySelector('.card h2').style.fontSize = '40px';
    }
}

// Validation du formulaire avec effets
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const sujet = document.getElementById('sujet').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!nom || !email || !sujet || !message) {
        // Secousse extrême
        form.style.animation = 'shake 0.8s ease-in-out';
        setTimeout(() => form.style.animation = '', 800);
        
        // Particules d'erreur
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingParticle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 50);
        }
        
        alert('🚨 TOUS LES CHAMPS SONT OBLIGATOIRES ! 🚨');
        return;
    }

    // EXPLOSION MAXIMALE
    triggerConfetti();
    
    // Particules partout
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFloatingParticle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 20);
    }

    // Déverrouiller le mode folie
    toggleCrazyMode();

    // Afficher la popup
    popupOverlay.classList.add('active');

    // Réinitialiser le formulaire
    form.reset();

    // Fermer la popup après 6 secondes (plus longtemps pour profiter)
    setTimeout(() => {
        closePopup();
        crazyMode = false;
        document.body.style.animation = 'gradientShift 15s ease infinite';
    }, 6000);
});

function closePopup() {
    popupOverlay.classList.remove('active');
}

// Fermer la popup au clic externe
popupOverlay.addEventListener('click', function(e) {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Souris magique - particules qui suivent
document.addEventListener('mousemove', createParticleTrail);

// Easter egg fou - cliquer sur le titre
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.card h2');
    if (title) {
        let clickCount = 0;
        title.addEventListener('click', function(e) {
            clickCount++;
            
            // Créer des particules au clic
            for (let i = 0; i < 15; i++) {
                createFloatingParticle(e.clientX, e.clientY);
            }
            
            title.style.animation = 'spin 0.6s ease-in-out';
            setTimeout(() => title.style.animation = 'gradientText 4s ease infinite, float 3s ease-in-out infinite', 600);
            
            // Easter egg spécial au 5e clic
            if (clickCount === 5) {
                triggerConfetti();
                alert('🎉 Faites nous remporter le défi ! 🎉');
                clickCount = 0;
            }
        });
        title.style.cursor = 'pointer';
    }

    // Animer les champs au focus
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function(e) {
            // Créer des petites particules
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFloatingParticle(
                        e.clientX + (Math.random() - 0.5) * 50,
                        e.clientY + (Math.random() - 0.5) * 50
                    );
                }, i * 50);
            }
        });
    });
});
