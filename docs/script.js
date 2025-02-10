document.addEventListener('DOMContentLoaded', () => {
  const problem = generateProblem();
  const guessHistory = document.querySelector('#guess-history');
  const answerBox = document.querySelector('#answer-box');
  const question = document.querySelector('#question');
  const submitButton = document.querySelector('#submit-button');
  const dotContainer = document.querySelector('#dots');
  question.innerHTML = `${problem.a} &times; ${problem.b}`;
  submitButton.addEventListener('click', (event) => {
      onSubmit(answerBox.value);
  });
  for (let row = 0; row < problem.a; row++) {
    const dotRowContainer = document.createElement('div');
    dotRowContainer.classList.add('dots__dot-row');
    dotContainer.appendChild(dotRowContainer);
    for (let column = 0; column < problem.b; column++) {
      const dot = document.createElement('div');
      dot.classList.add('dots__dot');
      dotRowContainer.appendChild(dot);
    }
  }

  function onSubmit(value) {
    if (!value) {
      return;
    }
    const guessIndicators = Array.from(document.querySelectorAll('#guess-summary input[type="radio"]'));
    if (value === (problem.product).toString()) {
      guessIndicators.forEach(x => x.checked = false);
      window.location.reload();
      answerBox.value = '';
      return;
    }
    addGuessToHistory(value);
    const lastGuess = guessIndicators.filter(x => !x.checked).length <= 1;
    const availableGuess = guessIndicators.find(x => !x.checked);
    if (availableGuess) {
      availableGuess.checked = true;
    }
    if (lastGuess) {
      answerBox.value = problem.product;
    } else {
      answerBox.value = '';
    }
  }

  function addGuessToHistory(value) {
    const entry = document.createElement('div');
    const historyText = `${question.textContent} ≠ ${value}`;
    entry.textContent = historyText;
    guessHistory.appendChild(entry);
  }

  function generateProblem() {
    const a = randomBetween(2, 5);
    const b = randomBetween(2, 5);
    return { a, b, product: a * b }
  }

  function randomBetween(low, high) {
    const range = high - low;
    return Math.round(low + (Math.random() * range));
  }
});

