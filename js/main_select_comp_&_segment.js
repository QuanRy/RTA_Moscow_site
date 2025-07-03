document.addEventListener('DOMContentLoaded', function () {
  let prevSelectedCompany = null;
  let prevSelectedSegment = null;

  function resetSliders() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
      slider.value = 0;
    });

    // Пересчитать частоту по Остроу
    if (typeof window.recalcOstrowFrequency === 'function') {
      window.recalcOstrowFrequency();
    }
  }

  function setupCustomDropdown(dropdownId, addModalId, placeholderText, type) {
    const dropdown = document.getElementById(dropdownId);
    const selected = dropdown.querySelector('.dropdown-selected');
    const list = dropdown.querySelector('.dropdown-list');
    const selectedText = selected.querySelector('.selected-text');

    selected.addEventListener('click', () => {
      list.classList.toggle('hidden');
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      if (li.classList.contains('add-option')) {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById(addModalId).style.display = 'flex';
        list.classList.add('hidden');
        return;
      }

      if (e.target.classList.contains('delete-icon')) {
        e.stopPropagation();
        li.remove();

        if (selectedText.textContent === li.textContent.trim()) {
          selectedText.textContent = placeholderText;
        }

        return;
      }

      const newValue = li.textContent.trim();
      const prevValue = (type === 'company') ? prevSelectedCompany : prevSelectedSegment;

      selectedText.textContent = newValue;
      list.classList.add('hidden');

      const isFirstSelection = !prevValue;
      const isSameValue = prevValue === newValue;

      if (!isFirstSelection && !isSameValue) {
        resetSliders(); // сброс ползунков и пересчёт частоты
      }

      // Обновляем предыдущее значение
      if (type === 'company') {
        prevSelectedCompany = newValue;
      } else {
        prevSelectedSegment = newValue;
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        list.classList.add('hidden');
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (list.classList.contains('hidden')) return;

      const margin = 5;
      const selectedRect = selected.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      function isNear(rect, x, y) {
        return (
          x >= rect.left - margin &&
          x <= rect.right + margin &&
          y >= rect.top - margin &&
          y <= rect.bottom + margin
        );
      }

      if (!isNear(selectedRect, e.clientX, e.clientY) && !isNear(listRect, e.clientX, e.clientY)) {
        list.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !list.classList.contains('hidden')) {
        list.classList.add('hidden');
      }
    });
  }

  setupCustomDropdown('company-dropdown', 'modal-company', 'Компания', 'company');
  setupCustomDropdown('segment-dropdown', 'modal-segment', 'Сегмент', 'segment');

  function addNewItem(dropdownId, modalId, newItemText, placeholderText) {
    const list = document.querySelector(`#${dropdownId} .dropdown-list`);
    const addOption = list.querySelector('.add-option');

    const exists = Array.from(list.children).some(li =>
      li !== addOption && li.textContent.trim().toLowerCase() === newItemText.toLowerCase()
    );

    if (exists) {
      alert(`Такой элемент уже есть`);
      return false;
    }

    const newLi = document.createElement('li');
    newLi.classList.add('dropdown-item');
    newLi.textContent = newItemText;

    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../img/delete_icon.png';
    deleteIcon.alt = 'Удалить';
    deleteIcon.classList.add('delete-icon');

    newLi.appendChild(deleteIcon);
    list.insertBefore(newLi, addOption);

    const selectedText = document.querySelector(`#${dropdownId} .selected-text`);
    selectedText.textContent = newItemText;

    return true;
  }

  document.getElementById('add-company-btn').addEventListener('click', () => {
    const input = document.getElementById('new-company-name');
    const newCompany = input.value.trim();

    if (!newCompany) {
      alert('Введите название компании');
      return;
    }

    if (addNewItem('company-dropdown', 'modal-company', newCompany, 'Компания')) {
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-company').style.display = 'none';
      input.value = '';
    }
  });

  document.getElementById('add-segment-btn').addEventListener('click', () => {
    const input = document.getElementById('new-segment-name');
    const newSegment = input.value.trim();

    if (!newSegment) {
      alert('Введите название сегмента');
      return;
    }

    if (addNewItem('segment-dropdown', 'modal-segment', newSegment, 'Сегмент')) {
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-segment').style.display = 'none';
      input.value = '';
    }
  });

  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
      closeModals();
    }
  });

  document.querySelectorAll('.modal .cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  function closeModals() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-company').style.display = 'none';
    document.getElementById('modal-segment').style.display = 'none';
  }
});
