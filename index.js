const character = document.getElementById("character");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let isJumping = false;
let velocity = 0;
let gravity = 0.6;
let jumpForce = -12;
let characterBottom = 0;
let isGameOver = false;
let score = 0;

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !isJumping && !isGameOver) {
    velocity = jumpForce;
    isJumping = true;
  }
});

function updateCharacter() {
  if (isGameOver) return;

  velocity += gravity;
  characterBottom -= velocity;

  if (characterBottom <= 0) {
    characterBottom = 0;
    velocity = 0;
    isJumping = false;
  }

  character.style.bottom = characterBottom + "px";
  requestAnimationFrame(updateCharacter);
}

function createObstacle() {
  if (isGameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  const height = Math.floor(Math.random() * 30) + 20;
  obstacle.style.height = height + "px";
  obstacle.style.left = "600px";
  game.appendChild(obstacle);

  let obstacleLeft = 600;

  const moveObstacle = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveObstacle);
      return;
    }

    obstacleLeft -= 5;
    obstacle.style.left = obstacleLeft + "px";

    if (
      obstacleLeft < 80 &&
      obstacleLeft > 50 &&
      characterBottom < height + 10
    ) {
      gameOver();
      clearInterval(moveObstacle);
    }

    if (obstacleLeft < -30) {
      obstacle.remove();
      score++;
      updateScore();
      clearInterval(moveObstacle);
    }
  }, 20);

  const delay = Math.random() * 1000 + 1500;
  setTimeout(createObstacle, delay);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function gameOver() {
  isGameOver = true;
  alert("Game Over! Final Score: " + score);
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

updateCharacter();
createObstacle();
