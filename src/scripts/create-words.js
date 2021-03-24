import { shuffleArray } from './utils.js';

const wordsContainer = document.querySelector('[data-words]');

const insertElementsInDom = (elements) => {
  wordsContainer.innerHTML = '';

  while (wordsContainer.children.length < 20) {
    wordsContainer.appendChild(elements[wordsContainer.children.length]);
  }
};

const createWords = (words) => {
  const shuffledWords = shuffleArray(words);

  const elements = shuffledWords.map((word) => {
    const span = document.createElement('span');
    span.classList.add('word');
    span.innerHTML = word;

    return span;
  });

  insertElementsInDom(elements);
};

export default createWords;
