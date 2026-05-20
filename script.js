const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 180,
  y: 550,
  width: 40,
  height: 40,
  speed: 6
};

const keys = {};

const blocks = [];

let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function spawnBlock() {
  blocks.push({
    x: Math.random() * 360,
    y: -20,
    width: 40,
    height: 40,
    speed: 3 + Math.random() * 3
  });
}

setInterval(spawnBlock, 1000);

function update() {

  if (gameOver) return;

  // Movement
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
  }

  if (keys["ArrowRight"] && player.x < 360) {
    player.x += player.speed;
  }

  // Update blocks
  for (let block of blocks) {
    block.y += block.speed;

    // Collision
    if (
      player.x < block.x + block.width &&
      player.x + player.width > block.x &&
      player.y < block.y + block.height &&
      player.y + player.height > block.y
    ) {
      gameOver = true;
    }
  }

  score++;
}

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocks() {
  ctx.fillStyle = "red";

  for (let block of blocks) {
    ctx.fillRect(block.x, block.y, block.width, block.height);
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function drawGameOver() {
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 80, 300);
  }
}

function gameLoop() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();

  drawPlayer();
  drawBlocks();
  drawScore();
  drawGameOver();

  requestAnimationFrame(gameLoop);
}

gameLoop();
