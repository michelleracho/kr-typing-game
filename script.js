const wordInput = document.querySelector('#wordInput');
const currentWord = document.querySelector('#currentWord');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#startBtn');

const words = ['apple', 'eagle', 'igloo', 'octopus', 'umbrella'];
const DEFAULT_TIME = 5;

let time = DEFAULT_TIME;
let score;
let isGameOver;
let interval;

// start game
function start() {
  isGameOver = false;
  showWord(words);
  score = 0;
  scoreDisplay.innerHTML = score;

  // countdown timer
  clearInterval(interval);
  interval = setInterval(countdown, 1000);

  setupInput();
  startBtn.setAttribute('disabled', '');
}

function setupInput() {
  wordInput.value = '';
  wordInput.removeAttribute('disabled');
  wordInput.focus();
  wordInput.setAttribute('placeholder', 'Start typing...');
  // start matching input to currentWord
  wordInput.addEventListener('input', matchInput);
}

// pick and show random word
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];

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
    message.innerHTML = 'Game Over!';
    wordInput.setAttribute('disabled', '');
    wordInput.setAttribute('placeholder', 'Play again?');
    startBtn.removeAttribute('disabled');
    startBtn.innerHTML = 'Play Again!';
  }
}

startBtn.addEventListener('click', start);
