document.addEventListener('DOMContentLoaded', () => {
  const baseFreqInput = document.querySelector('.base-frequency-input');
  const ostrowFreqInput = document.querySelector('.ostrow-frequency-input');
  const criteriaGrid = document.querySelector('.criteria-grid');

  // Создаем контейнер и иконку с подсказкой (если еще не создано)
  const tooltipWrapper = document.createElement('span');
  tooltipWrapper.classList.add('tooltip');
  tooltipWrapper.style.position = 'absolute';
  tooltipWrapper.style.left = '6px';
  tooltipWrapper.style.top = '50%';
  tooltipWrapper.style.transform = 'translateY(-50%)';
  tooltipWrapper.style.color = '#fc3a79';
  tooltipWrapper.style.fontWeight = 'bold';
  tooltipWrapper.style.cursor = 'default';
  tooltipWrapper.textContent = '!';

  const tooltipText = document.createElement('span');
  tooltipText.classList.add('tooltip-text');
  tooltipText.textContent = 'Введите базовую частоту';

  tooltipWrapper.appendChild(tooltipText);

  // Оборачиваем baseFreqInput в relative контейнер (если еще не обернут)
  if (!baseFreqInput.parentNode.classList.contains('relative-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.classList.add('relative-wrapper');
    baseFreqInput.parentNode.insertBefore(wrapper, baseFreqInput);
    wrapper.appendChild(baseFreqInput);
    wrapper.appendChild(tooltipWrapper);
  }

  tooltipWrapper.style.display = 'none';

  // Показывать/скрывать ошибку базовой частоты
  function showError(show) {
    if (show) {
      tooltipWrapper.style.display = 'inline-block';
      baseFreqInput.classList.add('error');
      baseFreqInput.style.paddingLeft = '24px'; // отступ, чтобы иконка не налазила
    } else {
      tooltipWrapper.style.display = 'none';
      baseFreqInput.classList.remove('error');
      baseFreqInput.style.paddingLeft = '';
    }
  }

  // Основная функция пересчёта частоты по Остроу
  function recalcOstrowFrequency() {
    const val = baseFreqInput.value.trim();
    if (val === '' || isNaN(val)) {
      showError(true);
      ostrowFreqInput.value = '0.0';
      return;
    }
    showError(false);

    const baseFreq = parseFloat(val);

    // Находим все слайдеры внутри criteriaGrid
    const sliders = criteriaGrid.querySelectorAll('input[type="range"]');

    // Суммируем значения слайдеров
    let slidersSum = 0;
    sliders.forEach(slider => {
      const v = parseFloat(slider.value);
      if (!isNaN(v)) slidersSum += v;
    });

    // Считаем итоговую частоту
    const ostrowFreq = baseFreq + slidersSum;

    // Записываем результат в readonly input
    ostrowFreqInput.value = ostrowFreq.toFixed(1);
  }

  // Вешаем обработчики:
  baseFreqInput.addEventListener('input', recalcOstrowFrequency);

  // Для динамического пересчёта при изменении любого слайдера
  criteriaGrid.addEventListener('input', (e) => {
    if (e.target.matches('input[type="range"]')) {
      recalcOstrowFrequency();
    }
  });

  // Инициализируем расчет сразу после загрузки
  recalcOstrowFrequency();
});
