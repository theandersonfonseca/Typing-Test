import { englishWords, portugueseWords } from './words.js';
import createWords from './create-words.js';

const wordsContainer = document.querySelector('[data-words]');
const wordInput = document.querySelector('[data-input]');
const timerContainer = document.querySelector('[data-timer]');
const languageSelect = document.querySelector('[data-language]');
const minutesButtons = document.querySelectorAll('[data-button-minutes]');
const resetButton = document.querySelector('[data-button-reset]');
const modal = document.querySelector('[data-modal]');
const wpmResultContainer = document.querySelector('[data-wpm]');
const accuracyResultContainer = document.querySelector('[data-accuracy]');

let HITS = 0;
let WPM = 0;
let TOTAL_TYPED_WORDS = 0;
let ACCURACY = 0;
let MINUTES_CHOICE = 1;
let CURRENT_WORD_INDEX = 0;
let IS_STARTED;

let timer;
let minutes;
let seconds;

const focusNextWord = () => {
  const words = [...wordsContainer.children];

  if (CURRENT_WORD_INDEX === 0) {
    words[CURRENT_WORD_INDEX].classList.add('word--focused');
    CURRENT_WORD_INDEX += 1;
    return;
  }

  if (CURRENT_WORD_INDEX === words.length) {
    createWords(
      languageSelect.value === 'portuguese' ? portugueseWords : englishWords
    );

    CURRENT_WORD_INDEX = 0;

    focusNextWord();
    return;
  }

  words[CURRENT_WORD_INDEX - 1].classList.remove('word--current-wrong');
  words[CURRENT_WORD_INDEX - 1].classList.remove('word--focused');
  words[CURRENT_WORD_INDEX].classList.add('word--focused');
  CURRENT_WORD_INDEX += 1;
};

const resetTest = () => {
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  timerContainer.innerHTML = `0${MINUTES_CHOICE}:00`;
  TOTAL_TYPED_WORDS = 0;
  HITS = 0;
  WPM = 0;
  ACCURACY = 0;
  CURRENT_WORD_INDEX = 0;
  IS_STARTED = false;
  wordInput.value = '';

  createWords(
    languageSelect.value === 'portuguese' ? portugueseWords : englishWords
  );

  focusNextWord();
  wordInput.focus();
};

const checkFullWord = () => {
  const words = [...wordsContainer.children];
  const typedWord = wordInput.value.slice(0, -1);
  const currentWord = words[CURRENT_WORD_INDEX - 1];

  if (typedWord === currentWord.innerHTML) {
    HITS += 1;
    currentWord.classList.add('word--correct');
  } else {
    currentWord.classList.add('word--wrong');
  }

  TOTAL_TYPED_WORDS += 1;
  WPM = Math.round(HITS / MINUTES_CHOICE);
  ACCURACY = (HITS / TOTAL_TYPED_WORDS) * 100;
};

const checkCurrentlyTypedWord = () => {
  const words = [...wordsContainer.children];
  const typedWord = wordInput.value;
  const currentWord = words[CURRENT_WORD_INDEX - 1];
  const slicedWord = currentWord.innerHTML.slice(0, typedWord.length);

  if (typedWord !== slicedWord) {
    currentWord.classList.add('word--current-wrong');
    return;
  }

  currentWord.classList.remove('word--current-wrong');
};

const isEmptyInput = () => {
  if (wordInput.value.trim().length === 0) {
    wordInput.value = '';

    return true;
  }

  return false;
};

const closeModal = (e) => {
  if (!e.target.hasAttribute('data-result')) {
    modal.classList.remove('modal--active');
    window.removeEventListener('click', closeModal);
    resetTest();
  }
};

const handleModal = () => {
  modal.classList.add('modal--active');
  wpmResultContainer.innerHTML = WPM;
  accuracyResultContainer.innerHTML = `${ACCURACY.toFixed(2)}%`;

  window.addEventListener('click', closeModal);
};

const finishTest = () => {
  clearInterval(timer);
  handleModal();
};

const handleTime = () => {
  minutes = MINUTES_CHOICE - 1;
  seconds = 60;

  timer = setInterval(() => {
    seconds -= 1;

    timerContainer.innerHTML = `0${minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;

    if (seconds === 0) {
      if (minutes === 0) {
        finishTest();
        return;
      }

      minutes -= 1;
      seconds = 60;
    }
  }, 1000);

  IS_STARTED = true;
};

const startTest = (e) => {
  if (!IS_STARTED) handleTime();

  const key = e.code;

  if (key === 'Space') {
    if (isEmptyInput()) return;

    checkFullWord();
    focusNextWord();
    wordInput.value = '';
    return;
  }

  checkCurrentlyTypedWord();
};

const clearButtonClasses = (selectedClass) => {
  minutesButtons.forEach((button) => button.classList.remove(selectedClass));
};

const setCurrentTime = (timeSeconds, timeString) => {
  MINUTES_CHOICE = timeSeconds;
  timerContainer.innerHTML = timeString;
};

const setTime = (e) => {
  const selectedClass = 'button-minutes--selected';
  const targetButton = e.target;
  const chosenTime = e.target.dataset.buttonMinutes;

  clearButtonClasses(selectedClass);
  targetButton.classList.add(selectedClass);

  if (chosenTime === '1') setCurrentTime(1, '01:00');
  if (chosenTime === '3') setCurrentTime(3, '03:00');
  if (chosenTime === '5') setCurrentTime(5, '05:00');

  if (IS_STARTED) resetTest();
};

const setLanguage = () => {
  if (languageSelect.value === 'portuguese') {
    createWords(portugueseWords);
    resetTest();
    return;
  }

  createWords(englishWords);
  resetTest();
};

export default (function init() {
  createWords(portugueseWords);
  focusNextWord();
  wordInput.focus();

  languageSelect.addEventListener('change', setLanguage);
  minutesButtons.forEach((button) => button.addEventListener('click', setTime));
  resetButton.addEventListener('click', resetTest);
  wordInput.addEventListener('keyup', startTest);
})();
