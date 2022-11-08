const boardWidth = 16;
const boardHeight = 10;
const board = document.getElementById('board');

const snake = {
  body: [{ x: boardWidth / 2, y: boardHeight / 2,},
  { x: (boardWidth / 2) + 1, y: boardHeight / 2,}
  ],
  direction: { x: 1, y: 0 },
};

let cherry = getRandomCherryPosition();

function renderBoard() {
  let newBoard = '';
  checkSnakeOnCherry();
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      if (snake.body.some(part => part.x === x && part.y === y)) {
        newBoard += '*';
      } else if (x === cherry.x && y === cherry.y) {
        newBoard += '+';
      } else {
        newBoard += ' ';
      }
    }
    newBoard += '\n';
  }
  board.textContent = newBoard;
}

function gameLoop() {
  snake.body[0].x = (snake.body[0].x + snake.direction.x) % boardWidth;
  snake.body[0].x = snake.body[0].x < 0 ? boardWidth + snake.body[0].x : snake.body[0].x;
  snake.body[0].y = (snake.body[0].y + snake.direction.y) % boardHeight;
  snake.body[0].y = snake.body[0].y < 0 ? boardHeight + snake.body[0].y : snake.body[0].y;
  renderBoard();
}

renderBoard();
setInterval(gameLoop, 400);

const keyToDirection = {
  'ArrowUp': { x: 0, y: -1 },
  'ArrowRight': { x: 1, y: 0 },
  'ArrowDown': { x: 0, y: 1 },
  'ArrowLeft': { x: -1, y: 0 },
};

document.addEventListener('keydown', e => {
  if (keyToDirection[e.key]) {
    snake.direction = keyToDirection[e.key];
  }
});

function checkSnakeOnCherry() {
  if (snake.body[0].x === cherry.x && snake.body[0].y === cherry.y) {
    cherry = getRandomCherryPosition();
  }
}

function getRandomCherryPosition() {
  return { 
    x: Math.floor(Math.random() * boardWidth), 
    y: Math.floor(Math.random() * boardHeight)
  }
}