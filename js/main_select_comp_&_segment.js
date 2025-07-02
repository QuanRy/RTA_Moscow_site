document.addEventListener('DOMContentLoaded', function () {
  // Универсальная функция для кастомного dropdown
  function setupCustomDropdown(dropdownId, addModalId, placeholderText) {
    const dropdown = document.getElementById(dropdownId);
    const selected = dropdown.querySelector('.dropdown-selected');
    const list = dropdown.querySelector('.dropdown-list');
    const selectedText = selected.querySelector('.selected-text');
    const deleteIcon = selected.querySelector('.delete-icon');

    // Открытие / закрытие списка
    selected.addEventListener('click', () => {
      list.classList.toggle('hidden');
    });

    // Клик на элемент списка
    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      if (li.classList.contains('add-option')) {
        // Показать модальное окно для добавления
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById(addModalId).style.display = 'flex';
        // Закрыть dropdown
        list.classList.add('hidden');
      } else {
        // Выбор значения
        selectedText.textContent = li.textContent.trim();
        deleteIcon.style.visibility = 'visible';
        list.classList.add('hidden');
      }
    });

    // Нажатие на крестик удаления — сброс
    deleteIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedText.textContent = placeholderText;
      deleteIcon.style.visibility = 'hidden';
    });

    // Клик вне dropdown — закрыть список
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        list.classList.add('hidden');
      }
    });
  }

  setupCustomDropdown('company-dropdown', 'modal-company', 'Компания');
  setupCustomDropdown('segment-dropdown', 'modal-segment', 'Сегмент');

  // Добавление новой компании из модалки
  document.getElementById('add-company-btn').addEventListener('click', () => {
    const input = document.getElementById('new-company-name');
    const newCompany = input.value.trim();
    if (!newCompany) {
      alert('Введите название компании');
      return;
    }

    const companyList = document.querySelector('#company-dropdown .dropdown-list');
    // Проверяем на дубликаты (регистр игнорируем)
    const exists = Array.from(companyList.children).some(li => li.textContent.trim().toLowerCase() === newCompany.toLowerCase());
    if (exists) {
      alert('Такая компания уже есть');
      return;
    }

    // Создаем новый элемент списка
    const newLi = document.createElement('li');
    newLi.textContent = newCompany;
    // Добавляем перед пунктом "Добавить компанию"
    const addOption = companyList.querySelector('.add-option');
    companyList.insertBefore(newLi, addOption);

    // Обновляем выбранный текст и показываем крестик
    const selectedText = document.querySelector('#company-dropdown .selected-text');
    const deleteIcon = document.querySelector('#company-dropdown .delete-icon');
    selectedText.textContent = newCompany;
    deleteIcon.style.visibility = 'visible';

    // Скрываем модальное окно и очищаем инпут
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-company').style.display = 'none';
    input.value = '';
  });

  // Добавление нового сегмента из модалки
  document.getElementById('add-segment-btn').addEventListener('click', () => {
    const input = document.getElementById('new-segment-name');
    const newSegment = input.value.trim();
    if (!newSegment) {
      alert('Введите название сегмента');
      return;
    }

    const segmentList = document.querySelector('#segment-dropdown .dropdown-list');
    const exists = Array.from(segmentList.children).some(li => li.textContent.trim().toLowerCase() === newSegment.toLowerCase());
    if (exists) {
      alert('Такой сегмент уже есть');
      return;
    }

    const newLi = document.createElement('li');
    newLi.textContent = newSegment;
    const addOption = segmentList.querySelector('.add-option');
    segmentList.insertBefore(newLi, addOption);

    const selectedText = document.querySelector('#segment-dropdown .selected-text');
    const deleteIcon = document.querySelector('#segment-dropdown .delete-icon');
    selectedText.textContent = newSegment;
    deleteIcon.style.visibility = 'visible';

    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal-segment').style.display = 'none';
    input.value = '';
  });

  // Закрытие модального окна при клике на overlay или кнопку отмены
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
