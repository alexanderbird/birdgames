document.addEventListener('DOMContentLoaded', () => {
  const answerBox = document.querySelector('#answer-box');
  answerBox.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      onSubmit(value);
    }
  });

  function onSubmit(value) {
    answerBox.value = 6;
  }
});

