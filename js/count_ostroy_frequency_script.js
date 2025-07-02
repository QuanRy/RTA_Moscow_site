document.addEventListener('DOMContentLoaded', () => {
  const baseFreqInput = document.querySelector('.base-frequency-input');
  const ostrowFreqInput = document.querySelector('.ostrow-frequency-input');
  const criteriaGrid = document.querySelector('.criteria-grid');
  const errorSpan = document.getElementById('basefreq-error');

  let hasUserInteracted = false; // флаг взаимодействия

  // Функция показа/скрытия ошибки
  function showError(show) {
    if (!hasUserInteracted) {
      errorSpan.style.display = 'none';
      baseFreqInput.classList.remove('error');
      return;
    }
    if (show) {
      errorSpan.style.display = 'inline';
      baseFreqInput.classList.add('error');
    } else {
      errorSpan.style.display = 'none';
      baseFreqInput.classList.remove('error');
    }
  }

  // Пересчёт итоговой частоты
  function recalcOstrowFrequency() {
    const val = baseFreqInput.value.trim();
    if (val === '' || isNaN(val)) {
      showError(true);
      ostrowFreqInput.value = '0.0';
      return;
    }
    showError(false);

    const baseFreq = parseFloat(val);

    const sliders = criteriaGrid.querySelectorAll('input[type="range"]');
    let slidersSum = 0;
    sliders.forEach(slider => {
      const v = parseFloat(slider.value);
      if (!isNaN(v)) slidersSum += v;
    });

    const ostrowFreq = baseFreq + slidersSum;
    ostrowFreqInput.value = ostrowFreq.toFixed(1);
  }

  // Обработчики ввода
  baseFreqInput.addEventListener('input', () => {
    hasUserInteracted = true;
    recalcOstrowFrequency();
  });

  criteriaGrid.addEventListener('input', e => {
    if (e.target.matches('input[type="range"]')) {
      hasUserInteracted = true;
      recalcOstrowFrequency();
    }
  });

  // Инициализация (без ошибки)
  showError(false);
  recalcOstrowFrequency();
});
