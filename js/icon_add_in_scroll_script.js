(function() {
  const companySelect = document.getElementById('company-select');
  const segmentSelect = document.getElementById('segment-select');
  const modalOverlay = document.getElementById('modal-overlay');

  const modalCompany = document.getElementById('modal-company');
  const modalSegment = document.getElementById('modal-segment');

  const newCompanyInput = document.getElementById('new-company-name');
  const addCompanyBtn = document.getElementById('add-company-btn');

  const newSegmentInput = document.getElementById('new-segment-name');
  const addSegmentBtn = document.getElementById('add-segment-btn');

  let lastCompany = companySelect.value;
  let lastSegment = segmentSelect.value;
  let firstSelectionMade = (lastCompany !== "" || lastSegment !== "");

  function resetSliders() {
    const sliders = document.querySelectorAll('.criteria-grid input[type="range"]');
    sliders.forEach(slider => {
      slider.value = 0;
    });
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
    modalCompany.style.display = 'none';
    modalSegment.style.display = 'none';
    newCompanyInput.value = '';
    newSegmentInput.value = '';
  }

  function openModal(type) {
    modalOverlay.style.display = 'flex';
    if (type === 'company') {
      modalCompany.style.display = 'block';
      newCompanyInput.focus();
    } else if (type === 'segment') {
      modalSegment.style.display = 'block';
      newSegmentInput.focus();
    }
  }

  companySelect.addEventListener('change', () => {
    if (companySelect.value === 'add-company') {
      openModal('company');
      // Сброс значения селекта (чтобы не оставалось выбрано "Добавить компанию")
      companySelect.value = "";
      return;
    }
    onSelectChange();
  });

  segmentSelect.addEventListener('change', () => {
    if (segmentSelect.value === 'add-segment') {
      openModal('segment');
      segmentSelect.value = "";
      return;
    }
    onSelectChange();
  });

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
      resetSliders();
      if (typeof window.recalcOstrowFrequency === 'function') {
        window.recalcOstrowFrequency();
      }
    }
  }

  addCompanyBtn.addEventListener('click', () => {
    const newCompany = newCompanyInput.value.trim();
    if (newCompany) {
      // Проверим, нет ли уже такого варианта (без учета регистра)
      const exists = Array.from(companySelect.options).some(opt => opt.text.toLowerCase() === newCompany.toLowerCase());
      if (!exists) {
        const option = document.createElement('option');
        option.text = newCompany;
        companySelect.add(option, companySelect.options.length - 1); // Добавляем перед "Добавить компанию"
        companySelect.value = newCompany; // Выбираем новый вариант
      } else {
        alert('Такая компания уже есть в списке.');
      }
      closeModal();
      onSelectChange();
    } else {
      alert('Введите название компании');
    }
  });

  addSegmentBtn.addEventListener('click', () => {
    const newSegment = newSegmentInput.value.trim();
    if (newSegment) {
      const exists = Array.from(segmentSelect.options).some(opt => opt.text.toLowerCase() === newSegment.toLowerCase());
      if (!exists) {
        const option = document.createElement('option');
        option.text = newSegment;
        segmentSelect.add(option, segmentSelect.options.length - 1);
        segmentSelect.value = newSegment;
      } else {
        alert('Такой сегмент уже есть в списке.');
      }
      closeModal();
      onSelectChange();
    } else {
      alert('Введите название сегмента');
    }
  });

  // Закрываем модал при клике вне окна
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Закрываем модал по ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
      closeModal();
    }
  });

})();
