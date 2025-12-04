// --- CONFIGURATION ---
const CONFIG = {
    GRID_SIZE: 20,
    BASE_SPEED: 100, 
    MIN_SPEED: 300,   // Vitesse MAXIMALE (30ms entre chaque frame = très rapide)
    MAX_SPEED: 10,  // Vitesse MINIMALE (600ms = très lent / hésitant)
    COLORS: {
        SNAKE: '#0f0',
        APPLE: '#fff',
        GLOW: '#0f0',
        BG: '#000'
    }
};

// --- VARIABLES ---
let canvas, ctx;
let gameLoopId;
let lastTime = 0;
let score = 0;
let isGameOver = false;
let isGameRunning = false;
let currentSpeed = CONFIG.BASE_SPEED;

// Snake State
let snake = [];
let velocity = { x: 0, y: 0 };
let apple = { x: 0, y: 0 };

// Particles System
let particles = [];

// --- KONAMI CODE ---
const konamiCode = [
    "ArrowUp", "ArrowUp", 
    "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", 
    "ArrowLeft", "ArrowRight", 
    "b", "a"
];
let keyHistory = [];

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', handleInput);
    console.log("FRIDAY: Systems monitoring inputs...");
});

// --- INPUT HANDLING ---
function handleInput(e) {
    // 1. Konami Code Detection
    keyHistory.push(e.key);
    if (keyHistory.length > konamiCode.length) {
        keyHistory.shift(); // Keep buffer same size as code
    }

    if (checkKonami() && !isGameRunning) {
        console.log("FRIDAY: Cheat code accepted. Init Protocol Snake.");
        initInterface();
    }

    // 2. Game Controls (Prevent default scrolling)
    if (isGameRunning) {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }

        if (isGameOver && e.key === 'Enter') {
            resetGame();
            return;
        }

        changeDirection(e.key);
    }
}

function checkKonami() {
    return JSON.stringify(keyHistory) === JSON.stringify(konamiCode);
}

// --- INTERFACE MANAGEMENT ---
function initInterface() {
    const landing = document.getElementById('landing-content');
    const overlay = document.getElementById('game-overlay');

    landing.classList.add('fade-out'); // CSS transition

    setTimeout(() => {
        landing.classList.add('hidden');
        overlay.classList.remove('hidden');
        initGame();
    }, 800);
}

// --- GAME ENGINE ---
function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Set Canvas Size (Terminal Ratio or Fullish)
    canvas.width = Math.floor((window.innerWidth * 0.8) / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE;
    canvas.height = Math.floor((window.innerHeight * 0.7) / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE;

    resetGame();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    const startX = Math.floor(canvas.width / CONFIG.GRID_SIZE / 2);
    const startY = Math.floor(canvas.height / CONFIG.GRID_SIZE / 2);

    snake = [
        { x: startX, y: startY },
        { x: startX, y: startY + 1 },
        { x: startX, y: startY + 2 }
    ];
    velocity = { x: 0, y: -1 }; 
    score = 0;

    currentSpeed = CONFIG.BASE_SPEED; 

    document.getElementById('score').innerText = score;
    document.getElementById('game-message').classList.add('hidden');

    placeApple();
    isGameOver = false;
    isGameRunning = true;
    particles = [];
}

function gameLoop(timestamp) {
    if (!isGameRunning) return;

    // Utilise currentSpeed qui change dynamiquement
    if (timestamp - lastTime > currentSpeed) {
        update();
        lastTime = timestamp;
    }

    draw(); 
    requestAnimationFrame(gameLoop);
}

function update() {
    if (isGameOver) return;

    // 1. Move Head
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    // 2. Collision Walls
    const gridW = canvas.width / CONFIG.GRID_SIZE;
    const gridH = canvas.height / CONFIG.GRID_SIZE;

    if (head.x < 0 || head.x >= gridW || head.y < 0 || head.y >= gridH) {
        triggerGameOver();
        return;
    }

    // 3. Collision Self
    for (let part of snake) {
        if (head.x === part.x && head.y === part.y) {
            triggerGameOver();
            return;
        }
    }

    snake.unshift(head); // Add new head

    // 4. Eat Apple & RANDOMIZE SPEED
    if (head.x === apple.x && head.y === apple.y) {
        score += 10;
        document.getElementById('score').innerText = score;
        spawnParticles(head.x * CONFIG.GRID_SIZE, head.y * CONFIG.GRID_SIZE, CONFIG.COLORS.APPLE);
        placeApple();

        // --- ALGORYTHME DE CHAOS ---
        // Génère un chiffre entier aléatoire entre 30 et 600
        currentSpeed = Math.floor(Math.random() * (CONFIG.MAX_SPEED - CONFIG.MIN_SPEED + 1)) + CONFIG.MIN_SPEED;

        console.log(`FRIDAY: Speed updated to ${currentSpeed}ms`);

    } else {
        snake.pop(); 
    }
}

function draw() {
    ctx.fillStyle = 'rgba(0, 20, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Apple
    ctx.shadowBlur = 20;
    ctx.shadowColor = CONFIG.COLORS.APPLE;
    ctx.fillStyle = CONFIG.COLORS.APPLE;
    ctx.fillRect(apple.x * CONFIG.GRID_SIZE, apple.y * CONFIG.GRID_SIZE, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);

    // Draw Snake
    ctx.shadowBlur = 15;
    ctx.shadowColor = CONFIG.COLORS.GLOW;
    ctx.fillStyle = CONFIG.COLORS.SNAKE;

    snake.forEach(part => {
        ctx.fillRect(part.x * CONFIG.GRID_SIZE, part.y * CONFIG.GRID_SIZE, CONFIG.GRID_SIZE - 2, CONFIG.GRID_SIZE - 2);
    });

    // Draw Particles
    updateAndDrawParticles();
}

// --- UTILS ---
function changeDirection(key) {
    const goingUp = velocity.y === -1;
    const goingDown = velocity.y === 1;
    const goingRight = velocity.x === 1;
    const goingLeft = velocity.x === -1;

    if (key === 'ArrowLeft' && !goingRight) { velocity = { x: -1, y: 0 }; }
    if (key === 'ArrowUp' && !goingDown) { velocity = { x: 0, y: -1 }; }
    if (key === 'ArrowRight' && !goingLeft) { velocity = { x: 1, y: 0 }; }
    if (key === 'ArrowDown' && !goingUp) { velocity = { x: 0, y: 1 }; }
}

function placeApple() {
    const gridW = canvas.width / CONFIG.GRID_SIZE;
    const gridH = canvas.height / CONFIG.GRID_SIZE;
    apple = {
        x: Math.floor(Math.random() * gridW),
        y: Math.floor(Math.random() * gridH)
    };
}

function triggerGameOver() {
    isGameOver = true;
    document.getElementById('game-message').classList.remove('hidden');
    canvas.style.transform = "translate(5px, 5px)";
    setTimeout(() => canvas.style.transform = "translate(0,0)", 100);
}

// --- PARTICLE SYSTEM ---
class Particle {
    constructor(x, y, color) {
        this.x = x + CONFIG.GRID_SIZE/2;
        this.y = y + CONFIG.GRID_SIZE/2;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this.alpha = 1;
        this.life = 0.03;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.life;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function spawnParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function updateAndDrawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}
