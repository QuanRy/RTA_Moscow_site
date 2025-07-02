(function() {
  const companySelect = document.getElementById('company-select');
  const segmentSelect = document.getElementById('segment-select');

  let lastCompany = companySelect.value;
  let lastSegment = segmentSelect.value;
  let firstSelectionMade = (lastCompany !== "" || lastSegment !== "");

  function resetSliders() {
    const sliders = document.querySelectorAll('.criteria-grid input[type="range"]');
    sliders.forEach(slider => {
      slider.value = 0;
    });
  }

  function onSelectChange() {
    const currentCompany = companySelect.value;
    const currentSegment = segmentSelect.value;

    if (!firstSelectionMade) {
      lastCompany = currentCompany;
      lastSegment = currentSegment;
      firstSelectionMade = true;
      return;
    }

    if (currentCompany !== lastCompany || currentSegment !== lastSegment) {
      lastCompany = currentCompany;
      lastSegment = currentSegment;
      resetSliders(); // Сброс ползунков
      if (typeof window.recalcOstrowFrequency === 'function') {
        window.recalcOstrowFrequency(); // 💥 Пересчёт после сброса
      }
    }
  }

  companySelect.addEventListener('change', onSelectChange);
  segmentSelect.addEventListener('change', onSelectChange);
})();
