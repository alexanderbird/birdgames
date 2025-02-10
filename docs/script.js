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
    if (value === (problem.product).toString()) {
      console.log("Ready for the next level");
      return;
    }
    addGuessToHistory(value);
    const guessIndicators = Array.from(document.querySelectorAll('#guess-summary input[type="radio"]'));
    const lastGuess = guessIndicators.filter(x => !x.checked).length <= 1;
    const availableGuess = guessIndicators.find(x => !x.checked);
    availableGuess.checked = true;
    answerBox.value = '';
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
    return {
      a: 2,
      b: 3,
      product: 6
    }
  }
});

