const X_CLASS = 'X';
const O_CLASS = 'O';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.innerText = ''; // Limpa o conteúdo das células
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  statusDisplay.innerText = 'É a vez do jogador X';
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    statusDisplay.innerText = 'Empate!';
  } else {
    statusDisplay.innerText = `${circleTurn ? 'O' : 'X'} venceu!`;
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function placeMark(cell, currentClass) {
  cell.innerText = currentClass;
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
  statusDisplay.innerText = `É a vez do jogador ${circleTurn ? 'O' : 'X'}`;
}

function setBoardHoverClass() {
  document.body.classList.remove(X_CLASS);
  document.body.classList.remove(O_CLASS);
  circleTurn ? document.body.classList.add(O_CLASS) : document.body.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
