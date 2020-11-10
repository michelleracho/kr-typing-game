const wordInput = document.querySelector('#wordInput');
const currentWord = document.querySelector('#currentWord');
const translation = document.querySelector('#translation');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#startBtn');

const words = vocab;
const DEFAULT_TIME = 15;

let time = DEFAULT_TIME;
let score;
let isGameOver;
let interval;

// start game
function start() {
  currentWord.classList.remove('initial-font');
  isGameOver = false;
  message.innerText = '';
  message.classList.remove('game-over');
  showWord(words);
  score = 0;
  scoreDisplay.innerText = score;

  // countdown timer
  clearInterval(interval);
  interval = setInterval(countdown, 1000);

  setupInput();
  startBtn.innerText = 'Playing...';
  startBtn.setAttribute('disabled', '');
}

function setupInput() {
  wordInput.value = '';
  wordInput.removeAttribute('disabled');
  wordInput.focus();
  wordInput.setAttribute('placeholder', '');
  wordInput.addEventListener('input', matchInput);
}

// pick and show random word
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randIndex].kr;
  translation.innerText = words[randIndex].en;

  time = DEFAULT_TIME + 1;
}

// match input to currentWord
function matchInput() {
  if (matchWords()) {
    // add 1s delay before changing word
    setTimeout(() => {
      showWord(words);
      wordInput.value = '';
    }, 1000);
    score++;
  }
  scoreDisplay.innerText = score;
}

// match currentWord to input
function matchWords() {
  if (wordInput.value === currentWord.innerText) {
    message.innerText = 'You got it!';
    setTimeout(() => {
      message.innerText = '';
    }, 1000);
    return true;
  } else {
    message.innerText = '';
    return false;
  }
}

// countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isGameOver = true;
    gameOver();
  }
  timeDisplay.innerText = time;
}

// end game
function gameOver() {
  if (isGameOver && time === 0) {
    message.innerText = 'Game Over! Play again?';
    message.classList.add('game-over');
    wordInput.setAttribute('disabled', '');
    wordInput.setAttribute('placeholder', 'Play again?');
    startBtn.removeAttribute('disabled');
    startBtn.innerText = 'Play Again!';
  }
}

startBtn.addEventListener('click', start);
