/**
 * REALISÉ PAR NATHAN KADIBU MUSOKO
 */

// Génération du tableau à deux dimensions
const LARGEUR = 27;
const HAUTEUR = 17;
let map = [];
for (let i = 0; i < HAUTEUR; i++) {
    map.push([]);
    for (let j = 0; j < LARGEUR; j++) {
        // Remplissage du tableau de façon aléatoire
        let z = Math.floor(Math.random() * 3) + 2;
        map[i].push(z);

        // Remplissage des bordures
        if (i === 0 || i === 16 || j === 0 || j === 26) {
            map[i][j] = 1;
        }
        // Remplir les espaces vides par des trésors
        if (map[i][j] === 3) {
            map[i][j] = 2;
        }
    }
}

// Ajout de murs pour créer des obstacles
const obstacles = [
    [6, 2], [7, 4], [8, 6], [9, 8], [10, 9],
    [8, 11], [8, 15], [8, 9], [3, 14], // Mur horizontal central
];

for (const [y, x] of obstacles) {
    map[y][x] = 1;
}

// Position du pacman dans le tableau
let pacman = {
    x: 13,
    y: 8
}
// Affectation du pacman à sa position du tableau
map[8][13] = 5;

let score = 0;
let pourcent = 40;
let barEnergie = 100;

// 1 = <div class='mur'></div> 
// 2 = <div class='tresor'></div>
// 3 = <div class='sol'></div> 
// 4 = <div class='piege'></div>
// 5 = <div class='pacman'></div>

const drawWorld = function () {
    const worldElement = document.getElementById('world');
    worldElement.innerHTML = "";

    for (let y = 0; y < map.length; y++) {
        if (pourcent === 0) {
            gameOver();
            document.getElementById('endScreen').style.zIndex = 1;
        }

        for (let x = 0; x < map[y].length; x++) {
            const div = document.createElement('div');

            switch (map[y][x]) {
                case 1:
                    div.className = 'mur';
                    break;
                case 2:
                    div.className = 'tresor';
                    break;
                case 3:
                    div.className = 'sol';
                    break;
                case 4:
                    div.className = 'piege';
                    break;
                case 5:
                    div.className = 'pacman';
                    break;
            }

            worldElement.appendChild(div);
        }
    }
}

// Bouton exit
document.getElementById('btn').addEventListener('click', () => {
    window.close();
});

// Détection des touches du clavier
window.addEventListener('keydown', function (event) {
    const key = event.key;
    let newX = pacman.x;
    let newY = pacman.y;

    switch (key) {
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
    }

    if (map[newY][newX] !== 1) {
        switch (map[newY][newX]) {
            case 2:
                score += 1000;
                document.getElementById('score').innerText = score;
                break;
            case 3:
                score -= 10;
                document.getElementById('score').innerText = score;
                break;
            case 4:
                pourcent--;
                document.querySelector('#pourcent').innerText = pourcent + '/40';
                barEnergie -= 2.5;
                document.querySelector('#pourcent').style.width = barEnergie + '%';
                score -= 50;
                document.getElementById('score').innerText = score;
                break;
        }

        map[pacman.y][pacman.x] = 3;
        pacman.x = newX;
        pacman.y = newY;
        map[pacman.y][pacman.x] = 5;

        drawWorld();
    }
});

const endScreen = document.getElementById('endScreen');

const gameOver = () => {
    endScreen.innerHTML = `
        <h1>GAME OVER</h1>
        <p>Score final: ${score}</p>
        <button id="replayButton">Rejouer</button>
        <button id="exitButton">Quitter</button>
    `;
    endScreen.style.zIndex = 1;

    document.getElementById('replayButton').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('exitButton').addEventListener('click', () => {
        window.close();
    });
};

document.getElementById('btn').addEventListener('click', () => {
    if (confirm('Voulez-vous quitter le jeu ?')) {
        window.close();
    }
});

drawWorld();
