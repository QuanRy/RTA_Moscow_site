document.addEventListener('DOMContentLoaded', function () {
  function setupCustomDropdown(dropdownId, addModalId, placeholderText) {
    const dropdown = document.getElementById(dropdownId);
    const selected = dropdown.querySelector('.dropdown-selected');
    const list = dropdown.querySelector('.dropdown-list');
    const selectedText = selected.querySelector('.selected-text');

    // Клик по выбранному элементу — открыть/закрыть список
    selected.addEventListener('click', () => {
      list.classList.toggle('hidden');
    });

    // Выбор элемента из списка
    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      // Если нажали на кнопку "Добавить"
      if (li.classList.contains('add-option')) {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById(addModalId).style.display = 'flex';
        list.classList.add('hidden');
        return;
      }

      // Если нажали на крестик удаления в li
      if (e.target.classList.contains('delete-icon')) {
        e.stopPropagation(); // чтобы не срабатывал выбор li
        li.remove(); // удаляем элемент из списка

        // Если удалили выбранный элемент, сбрасываем placeholder
        if (selectedText.textContent === li.textContent.trim()) {
          selectedText.textContent = placeholderText;
        }

        return;
      }

      // Иначе — выбираем элемент
      selectedText.textContent = li.textContent.trim();
      list.classList.add('hidden');
    });

    // Клик вне дропдауна — закрыть список
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        list.classList.add('hidden');
      }
    });

    // Наведение курсора — закрывать список, если курсор далеко от dropdown
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

      const insideSelected = isNear(selectedRect, e.clientX, e.clientY);
      const insideList = isNear(listRect, e.clientX, e.clientY);

      if (!insideSelected && !insideList) {
        list.classList.add('hidden');
      }
    });

    // Закрытие dropdown по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !list.classList.contains('hidden')) {
        list.classList.add('hidden');
      }
    });
  }

  setupCustomDropdown('company-dropdown', 'modal-company', 'Компания');
  setupCustomDropdown('segment-dropdown', 'modal-segment', 'Сегмент');

  // Функция для добавления нового элемента в dropdown
  function addNewItem(dropdownId, modalId, newItemText, placeholderText) {
    const list = document.querySelector(`#${dropdownId} .dropdown-list`);
    const addOption = list.querySelector('.add-option');

    // Проверка на дубликаты (без учета регистра и пробелов)
    const exists = Array.from(list.children).some(li =>
      li !== addOption && li.textContent.trim().toLowerCase() === newItemText.toLowerCase()
    );

    if (exists) {
      alert(`Такой элемент уже есть`);
      return false;
    }

    // Создаем новый элемент списка с крестиком
    const newLi = document.createElement('li');
    newLi.classList.add('dropdown-item');
    newLi.textContent = newItemText;

    // Создаем крестик
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '../img/delete_icon.png';
    deleteIcon.alt = 'Удалить';
    deleteIcon.classList.add('delete-icon');

    newLi.appendChild(deleteIcon);

    // Вставляем перед "Добавить" (add-option)
    list.insertBefore(newLi, addOption);

    // Обновляем выбранный текст
    const selectedText = document.querySelector(`#${dropdownId} .selected-text`);
    selectedText.textContent = newItemText;

    return true;
  }

  // Обработчик добавления новой компании
  document.getElementById('add-company-btn').addEventListener('click', () => {
    const input = document.getElementById('new-company-name');
    const newCompany = input.value.trim();

    if (!newCompany) {
      alert('Введите название компании');
      return;
    }

    if (addNewItem('company-dropdown', 'modal-company', newCompany, 'Компания')) {
      // Закрыть модалку и очистить инпут
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-company').style.display = 'none';
      input.value = '';
    }
  });

  // Обработчик добавления нового сегмента
  document.getElementById('add-segment-btn').addEventListener('click', () => {
    const input = document.getElementById('new-segment-name');
    const newSegment = input.value.trim();

    if (!newSegment) {
      alert('Введите название сегмента');
      return;
    }

    if (addNewItem('segment-dropdown', 'modal-segment', newSegment, 'Сегмент')) {
      // Закрыть модалку и очистить инпут
      document.getElementById('modal-overlay').style.display = 'none';
      document.getElementById('modal-segment').style.display = 'none';
      input.value = '';
    }
  });

  // Закрытие модальных окон при клике вне или на кнопку отмены
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
