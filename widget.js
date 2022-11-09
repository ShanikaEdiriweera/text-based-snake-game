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
  const newHead = {};
  // TODO: check if possible to improve below logic
  newHead.x = (snake.body[0].x + snake.direction.x) % boardWidth;
  newHead.x = newHead.x < 0 ? boardWidth + newHead.x : newHead.x;
  newHead.y = (snake.body[0].y + snake.direction.y) % boardHeight;
  newHead.y = newHead.y < 0 ? boardHeight + newHead.y : newHead.y;

  // TODO: Check if game is over
  // check new head is on snake body or out of board dimensions

  snake.body.unshift(newHead);
  snake.body.pop();
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
  const newDirection = keyToDirection[e.key];
  if (newDirection) {
    // snake should not be able to reverse direction
    if (snake.direction.x !== 0 && newDirection.x !== 0) return;
    if (snake.direction.y !== 0 && newDirection.y !== 0) return;
    snake.direction = keyToDirection[e.key];
  }
});

function checkSnakeOnCherry() {
  // TODO: improve to generate new cherry until it is not on the snake
  if (snake.body[0].x === cherry.x && snake.body[0].y === cherry.y) {
    cherry = getRandomCherryPosition();
    // grow snake
    snake.body.push(snake.body[snake.body.length - 1])
  }
}

function getRandomCherryPosition() {
  return { 
    x: Math.floor(Math.random() * boardWidth), 
    y: Math.floor(Math.random() * boardHeight)
  }
}