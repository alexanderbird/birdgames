document.addEventListener('DOMContentLoaded', () => {
  const problem = generateProblem();
  const guessHistory = document.querySelector('#guess-history');
  const answerBox = document.querySelector('#answer-box');
  const question = document.querySelector('#question');
  question.innerHTML = `${problem.a} &times; ${problem.b}`;
  answerBox.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      onSubmit(value);
    }
  });

  function onSubmit(value) {
    const guessIndicators = Array.from(document.querySelectorAll('#guess-summary input[type="radio"]'));
    answerBox.value = '';
    if (value === (problem.product).toString()) {
      guessIndicators.forEach(x => x.checked = false);
      window.location.reload();
      return;
    }
    addGuessToHistory(value);
    const lastGuess = guessIndicators.filter(x => !x.checked).length <= 1;
    const availableGuess = guessIndicators.find(x => !x.checked);
    if (availableGuess) {
      availableGuess.checked = true;
    }
    if (lastGuess) {
      answerBox.value = 6;
    }
  }

  function addGuessToHistory(value) {
    const entry = document.createElement('div');
    const historyText = `${question.textContent} ≠ ${value}`;
    entry.textContent = historyText;
    guessHistory.appendChild(entry);
  }

  function generateProblem() {
    const a = randomBetween(3, 10);
    const b = randomBetween(3, 10);
    return { a, b, product: a * b }
  }

  function randomBetween(low, high) {
    const range = high - low;
    return Math.round(low + (Math.random() * range));
  }
});

