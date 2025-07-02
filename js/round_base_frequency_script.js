const baseFreqInput = document.querySelector('.base-frequency-input');

baseFreqInput.addEventListener('blur', () => {
  let val = baseFreqInput.value.trim();
  if (val !== '') {
    // Проверяем, есть ли десятичная точка
    if (!val.includes('.')) {
      // Добавляем .0 к числу
      baseFreqInput.value = val + '.0';
    } else {
      baseFreqInput.value = parseFloat(val).toFixed(1);
    }
  }
});
