const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

let block, gravity, jump, obstacles, frame, gameOver, score;

function init() {
    block = { x: 50, y: 250, width: 20, height: 20, velocityY: 0 };
    gravity = 0.5;
    jump = -8;
    obstacles = [];
    frame = 0;
    gameOver = false;
    score = 0;
    gameOverScreen.style.display = "none";
    gameLoop();
}

function drawBlock() {
    ctx.fillStyle = "blue";
    ctx.fillRect(block.x, block.y, block.width, block.height);
}

function update() {
    if (gameOver) return;
    block.velocityY += gravity;
    block.y += block.velocityY;
    
    if (block.y + block.height >= canvas.height) {
        endGame();
    }
    
    if (frame % 100 === 0) {
        let height = Math.random() * 200 + 50;
        obstacles.push({ x: 400, y: 0, width: 30, height });
        obstacles.push({ x: 400, y: height + 100, width: 30, height: 500 - height - 100 });
    }
    
    obstacles.forEach(obstacle => obstacle.x -= 3);
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    
    obstacles.forEach(obstacle => {
        if (
            block.x < obstacle.x + obstacle.width &&
            block.x + block.width > obstacle.x &&
            block.y < obstacle.y + obstacle.height &&
            block.y + block.height > obstacle.y
        ) {
            endGame();
        }
    });
    
    score = Math.floor(frame / 10);
    frame++;
}

function drawObstacles() {
    ctx.fillStyle = "green";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlock();
    drawObstacles();
    drawScore();
    update();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

function endGame() {
    gameOver = true;
    finalScore.textContent = score;
    gameOverScreen.style.display = "block";
}

function restartGame() {
    init();
}

document.addEventListener("keydown", () => {
    if (!gameOver) block.velocityY = jump;
});

init();
