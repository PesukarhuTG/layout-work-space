export const inputNumberController = () => {
  const inputNumberElements = document.querySelectorAll('input[type="number"]');
  inputNumberElements.forEach(input => {
    let value = '';

    input.addEventListener('input', e => {
      const symbol = e.data;
      // если введем букву = true
      if (isNaN(parseInt(symbol)) && symbol !== null) {
        e.target.value = value;
      }

      value = e.target.value;
    });
  });
};
