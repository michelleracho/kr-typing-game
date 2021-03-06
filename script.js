const wordInput = document.querySelector('#wordInput');
const currentWord = document.querySelector('#currentWord');
const translation = document.querySelector('#translation');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const startBtn = document.querySelector('#startBtn');

/* show/hide keyboard */
const keyboard = document.querySelector('.keyboard');
const keyboardImg = document.querySelector('.keyboard img');
const keyboardBtn = document.querySelector('.btn-keyboard');
const keyboardSpan = document.querySelector('.btn-keyboard span');

keyboardBtn.addEventListener('click', () => {
  keyboardImg.classList.toggle('show-keyboard');
});

keyboardBtn.addEventListener('mouseover', () => {
  keyboardImg.classList.contains('show-keyboard')
    ? (keyboardSpan.innerText = 'Hide')
    : (keyboardSpan.innerText = 'Show');
});

/* game */
const words = vocab;
const DEFAULT_TIME = 15;

let time = DEFAULT_TIME;
let score;
let isGameOver;
let interval;
// let timeout;

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
  if (!isGameOver) interval = setInterval(countdown, 1000);

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
  // currentWord.innerText = words[randIndex].en.toLowerCase();
  translation.innerText = words[randIndex].en;

  time = DEFAULT_TIME + 1;
}

// match input to currentWord
function matchInput() {
  if (wordInput.value === currentWord.innerText) {
    score++;
    message.innerText = 'You got it!';

    // setTimeout(() => {
    showWord(words);
    wordInput.value = '';
    // message.innerText = '';
    // }, 1000);
  } else {
    message.innerText = '';
  }

  scoreDisplay.innerText = score;
}

// countdown timer
function countdown() {
  if (time > 0) {
    time--;
  } else if (time <= 0) {
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
