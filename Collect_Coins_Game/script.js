const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

let playerPosition = { x: 0, y: 0 };
let score = 0;
let coin = document.querySelector('.coin');
let obstacle = document.querySelector('.obstacle');

// Function to randomly place the coin and obstacle
function placeCoin() {
    const randomX = Math.random() * (gameArea.clientWidth - 20);
    const randomY = Math.random() * (gameArea.clientHeight - 20);
    coin.style.left = \`\${randomX}px\`;
    coin.style.top = \`\${randomY}px\`;
}

function placeObstacle() {
    const randomX = Math.random() * (gameArea.clientWidth - 50);
    const randomY = Math.random() * (gameArea.clientHeight - 50);
    obstacle.style.left = \`\${randomX}px\`;
    obstacle.style.top = \`\${randomY}px\`;
}

// Handle keyboard input for movement
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && playerPosition.x < gameArea.clientWidth - 50) {
        playerPosition.x += 5; // Move right
    }
    if (e.key === 'ArrowLeft' && playerPosition.x > 0) {
        playerPosition.x -= 5; // Move left
    }
    if (e.key === 'ArrowUp' && playerPosition.y < gameArea.clientHeight - 50) {
        playerPosition.y += 5; // Move up
    }
    if (e.key === 'ArrowDown' && playerPosition.y > 0) {
        playerPosition.y -= 5; // Move down
    }
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
    checkCollision();
});

// Check for collisions with the coin and obstacle
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const coinRect = coin.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (playerRect.left < coinRect.right && playerRect.right > coinRect.left &&
        playerRect.top < coinRect.bottom && playerRect.bottom > coinRect.top) {
        score++;
        scoreDisplay.innerText = score;
        placeCoin(); // Move coin to new location
    }

    if (playerRect.left < obstacleRect.right && playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom && playerRect.bottom > obstacleRect.top) {
        alert('Game Over! You hit an obstacle!');
        resetGame(); // Reset the game
    }
}

// Reset the game
function resetGame() {
    score = 0;
    scoreDisplay.innerText = score;
    playerPosition = { x: 0, y: 0 };
    player.style.left = '0px';
    player.style.top = '0px';
    placeCoin(); // Place coin and obstacle again
    placeObstacle(); // Reset obstacle position
}

// Initialize the game
placeCoin();
placeObstacle();
