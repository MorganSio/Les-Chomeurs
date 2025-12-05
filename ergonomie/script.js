/* --- DATE DU JOUR --- */
const today = new Date();
const todayYear = today.getFullYear();

/* --- Limites modifiées --- */
const startYear = -5000;
const endYear = todayYear; // <-- AUJOURD'HUI en année

const container = document.getElementById('container');
const cursor = document.getElementById('cursor');
const dateDisplay = document.getElementById('dateDisplay');
const periodImage = document.getElementById('periodImage');

const historicalPeriods = [
    { name: 'Préhistoire', startYear: -5000, endYear: -3000, image: './img/prehistory.jpeg' },
    { name: 'Antiquité', startYear: -3000, endYear: 500, image: './img/antiquity.jpeg' },
    { name: 'Moyen Âge', startYear: 500, endYear: 1492, image: './img/middle-age.png' },
    { name: 'Renaissance', startYear: 1492, endYear: 1650, image: './img/renaissance.png' },
    { name: 'Époque Moderne', startYear: 1650, endYear: 1789, image: './img/modern-era.png' },
    { name: 'XIXe siècle', startYear: 1789, endYear: 1900, image: './img/XIXcentury.png' },
    { name: 'XXe siècle', startYear: 1900, endYear: 2000, image: './img/XXcentury.png' },
    { name: 'XXIe siècle', startYear: 2000, endYear: todayYear, image: './img/XXIcentury.png' } // <-- MAJ
];

/* --- FIX 1 : Boundaries corrects --- */
function getMaxCursorX() {
    return container.clientWidth - cursor.offsetWidth;
}
let maxX = getMaxCursorX();

/* Recalcule automatiquement si la fenêtre change */
window.addEventListener("resize", () => {
    maxX = getMaxCursorX();
    cursorX = Math.max(0, Math.min(maxX, cursorX));
    cursor.style.left = cursorX + "px";
});

/* Position initiale */
let cursorX = container.clientWidth / 2;
cursor.style.left = cursorX + 'px';

/* --- AFFICHAGE DATE + IMAGE --- */
function getPeriodImage(year) {
    year = Math.max(startYear, Math.min(endYear, year));
    for (let period of historicalPeriods) {
        if (year >= period.startYear && year <= period.endYear) {
            return period.image;
        }
    }
    return historicalPeriods[historicalPeriods.length - 1].image;
}

function updateDate() {
    let ratio = cursorX / maxX;
    let year = Math.floor(startYear + ratio * (endYear - startYear));

    /* --- SI CURSEUR À DROITE → DATE DU JOUR --- */
    if (cursorX >= maxX - 1) {
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        dateDisplay.textContent = `Date: ${dd}/${mm}/${yyyy}`;
        periodImage.src = getPeriodImage(yyyy);
        return;
    }

    /* --- SINON → DATE ALÉATOIRE COMME AVANT --- */
    const yyyy = year;
    const mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const dd = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

    dateDisplay.textContent = `Date: ${dd}/${mm}/${yyyy}`;
    periodImage.src = getPeriodImage(yyyy);
}

updateDate();

/* --- BOUTON VALIDATION --- */
document.getElementById('validateBtn').addEventListener('click', () => {
    alert('Date validée : ' + dateDisplay.textContent.replace('Date: ', ''));
});

/* --- DRIFT --- */
let driftEnabled = true;
let driftCooldown;

setInterval(() => {
    if (!driftEnabled) return;
    cursorX += (Math.random() - 0.5) * 20;
    cursorX = Math.max(0, Math.min(maxX, cursorX));
    cursor.style.left = cursorX + 'px';
    updateDate();
}, 200);

/* --- DRAG --- */
let dragging = false;

cursor.addEventListener('mousedown', () => {
    dragging = true;
    driftEnabled = false;
    clearTimeout(driftCooldown);
});

document.addEventListener('mouseup', () => {
    dragging = false;
    clearTimeout(driftCooldown);
    driftCooldown = setTimeout(() => {
        driftEnabled = true;
    }, 2000);
});

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    cursorX += e.movementX * 4;
    cursorX = Math.max(0, Math.min(maxX, cursorX));
    cursor.style.left = cursorX + 'px';
    updateDate();
});

/* --- SCROLL --- */
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    cursorX += e.deltaY * 3;
    cursorX = Math.max(0, Math.min(maxX, cursorX));
    cursor.style.left = cursorX + 'px';
    updateDate();
});
