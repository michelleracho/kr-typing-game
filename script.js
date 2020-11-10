const wordInput = document.querySelector('#wordInput');
const currentWord = document.querySelector('#currentWord');
const translation = document.querySelector('#translation');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#startBtn');

const words = vocab;
const DEFAULT_TIME = 30;

let time = DEFAULT_TIME;
let score;
let isGameOver;
let interval;

// start game
function start() {
  isGameOver = false;
  message.classList.remove('game-over');
  showWord(words);
  score = 0;
  scoreDisplay.innerHTML = score;

  // countdown timer
  clearInterval(interval);
  interval = setInterval(countdown, 1000);

  setupInput();
  startBtn.innerHTML = 'Playing...';
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
  currentWord.innerHTML = words[randIndex].kr;
  translation.innerHTML = words[randIndex].en;

  time = DEFAULT_TIME + 1;
}

// match input to currentWord
function matchInput() {
  if (matchWords()) {
    showWord(words);
    wordInput.value = '';
    score++;
  }
  scoreDisplay.innerHTML = score;
}

// match currentWord to input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'You got it!';
    return true;
  } else {
    message.innerHTML = '';
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
  timeDisplay.innerHTML = time;
}

// end game
function gameOver() {
  if (isGameOver && time === 0) {
    message.innerHTML = 'Game Over! Play again?';
    message.classList.add('game-over');
    wordInput.setAttribute('disabled', '');
    wordInput.setAttribute('placeholder', 'Play again?');
    startBtn.removeAttribute('disabled');
    startBtn.innerHTML = 'Play Again!';
  }
}

startBtn.addEventListener('click', start);
