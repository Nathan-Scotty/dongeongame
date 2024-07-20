// Configuration du jeu
const LARGEUR = 27;
const HAUTEUR = 17;
let map = [];
let pacman = { x: 13, y: 8 };
let score = 0;
let pourcent = 40;
let barEnergie = 100;

// Initialisation du tableau de jeu
for (let i = 0; i < HAUTEUR; i++) {
    map.push([]);
    for (let j = 0; j < LARGEUR; j++) {
        let z = Math.floor(Math.random() * 3) + 2;
        map[i].push(z);
        
        // Remplissage des bordures
        if (i === 0 || i === HAUTEUR - 1 || j === 0 || j === LARGEUR - 1) {
            map[i][j] = 1;
        }
        
        // Remplir les espaces vides par des trésors
        if (map[i][j] === 3) {
            map[i][j] = 2;
        }
    }
}
map[pacman.y][pacman.x] = 5; // Position initiale de Pacman

// Fonction pour dessiner le monde
const drawWorld = function () {
    const worldElement = document.getElementById('world');
    worldElement.innerHTML = "";
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            let className;
            switch (map[y][x]) {
                case 1: className = 'mur'; break;
                case 2: className = 'tresor'; break;
                case 3: className = 'sol'; break;
                case 4: className = 'piege'; break;
                case 5: className = 'pacman'; break;
            }
            worldElement.innerHTML += `<div class="${className}"></div>`;
        }
    }
}

// Fonction pour gérer la fin du jeu
const gameOver = () => {
    document.getElementById('endScreen').style.zIndex = 1;
}

// Fonction pour gérer le mouvement de Pacman
function movePacman(direction) {
    let newX = pacman.x;
    let newY = pacman.y;

    switch (direction) {
        case 'left': newX -= 1; break;
        case 'right': newX += 1; break;
        case 'up': newY -= 1; break;
        case 'down': newY += 1; break;
    }

    if (map[newY] && map[newY][newX] !== undefined && map[newY][newX] !== 1) {
        if (map[newY][newX] === 2) {
            score += 1000;
        } else if (map[newY][newX] === 3) {
            score -= 10;
        } else if (map[newY][newX] === 4) {
            pourcent -= 1;
            barEnergie -= 2.5;
            score -= 50;
        }

        document.getElementById('score').innerText = score;
        document.querySelector('#pourcent').innerText = pourcent + '/40';
        document.querySelector('#pourcent').style.width = barEnergie + '%';

        if (pourcent === 0) {
            gameOver();
            return;
        }

        map[pacman.y][pacman.x] = 3; // Réinitialiser l'ancienne position
        pacman.x = newX;
        pacman.y = newY;
        map[pacman.y][pacman.x] = 5; // Mettre à jour la nouvelle position

        drawWorld();
    }
}

// Gestion des événements de clavier
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft': movePacman('left'); break;
        case 'ArrowRight': movePacman('right'); break;
        case 'ArrowUp': movePacman('up'); break;
        case 'ArrowDown': movePacman('down'); break;
    }
});

// Gestion des événements des boutons tactiles
document.getElementById('btnUp').addEventListener('click', () => movePacman('up'));
document.getElementById('btnDown').addEventListener('click', () => movePacman('down'));
document.getElementById('btnLeft').addEventListener('click', () => movePacman('left'));
document.getElementById('btnRight').addEventListener('click', () => movePacman('right'));

// Gestion du bouton Quitter le jeu
document.getElementById('btn').addEventListener('click', () => {
    if (confirm('Voulez-vous quitter le jeu ?')) {
        window.close();
    }
});

// Gestion du bouton Retry et Exit dans l'écran de fin
document.getElementById('retryBtn').addEventListener('click', () => {
    // Réinitialiser le jeu
    map = [];
    pacman = { x: 13, y: 8 };
    score = 0;
    pourcent = 40;
    barEnergie = 100;

    // Réinitialiser le tableau de jeu
    for (let i = 0; i < HAUTEUR; i++) {
        map.push([]);
        for (let j = 0; j < LARGEUR; j++) {
            let z = Math.floor(Math.random() * 3) + 2;
            map[i].push(z);

            // Remplissage des bordures
            if (i === 0 || i === HAUTEUR - 1 || j === 0 || j === LARGEUR - 1) {
                map[i][j] = 1;
            }

            // Remplir les espaces vides par des trésors
            if (map[i][j] === 3) {
                map[i][j] = 2;
            }
        }
    }
    map[pacman.y][pacman.x] = 5; // Position initiale de Pacman

    document.getElementById('endScreen').style.zIndex = -1; // Cacher l'écran de fin
    drawWorld();
});

document.getElementById('exitBtn').addEventListener('click', () => {
    window.close();
});

// Initialiser le jeu
drawWorld();
