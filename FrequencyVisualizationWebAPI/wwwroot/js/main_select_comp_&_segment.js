document.addEventListener('DOMContentLoaded', function () {
  let prevSelectedCompany = null;
  let prevSelectedSegment = null;
  let pendingDeleteLi = null;
  let pendingDeleteType = null;

  function resetSliders() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => slider.value = 0);
    if (typeof window.recalcOstrowFrequency === 'function') {
      window.recalcOstrowFrequency();
    }
  }

  function setupCustomDropdown(dropdownId, addModalId, placeholderText, type) {
    const dropdown = document.getElementById(dropdownId);
    const selected = dropdown.querySelector('.dropdown-selected');
    const list = dropdown.querySelector('.dropdown-list');
    const selectedText = selected.querySelector('.selected-text');
    const arrow = selected.querySelector('.arrow');

    selected.addEventListener('click', () => {
      list.classList.toggle('hidden');
      arrow.classList.toggle('rotated');
    });

    list.addEventListener('click', (e) => {
      const li = e.target.closest('li');
      if (!li) return;

      if (li.classList.contains('add-option')) {
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById(addModalId).style.display = 'flex';
        list.classList.add('hidden');
        arrow.classList.remove('rotated');
        return;
      }

      if (e.target.classList.contains('delete-icon')) {
        e.stopPropagation();
        pendingDeleteLi = li;
        pendingDeleteType = type;
        openDeleteModal(type);
        return;
      }

      const newValue = li.textContent.trim();
      const prevValue = (type === 'company') ? prevSelectedCompany : prevSelectedSegment;

      selectedText.textContent = newValue;
      list.classList.add('hidden');
      arrow.classList.remove('rotated');

      const isFirstSelection = !prevValue;
      const isSameValue = prevValue === newValue;

      if (!isFirstSelection && !isSameValue) {
        resetSliders();
      }

      if (type === 'company') {
        prevSelectedCompany = newValue;
      } else {
        prevSelectedSegment = newValue;
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        list.classList.add('hidden');
        arrow.classList.remove('rotated');
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (list.classList.contains('hidden')) return;

      const margin = 5;
      const selectedRect = selected.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();

      const isNear = (rect, x, y) => (
        x >= rect.left - margin &&
        x <= rect.right + margin &&
        y >= rect.top - margin &&
        y <= rect.bottom + margin
      );

      if (!isNear(selectedRect, e.clientX, e.clientY) &&
          !isNear(listRect, e.clientX, e.clientY)) {
        list.classList.add('hidden');
        arrow.classList.remove('rotated');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !list.classList.contains('hidden')) {
        list.classList.add('hidden');
        arrow.classList.remove('rotated');
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

  // ДОБАВЛЕНИЕ НОВОЙ КОМПАНИИ в БД
  // =========================================================================================================
  document.getElementById('add-company-btn').addEventListener('click', async () => {
    const input = document.getElementById('new-company-name');
    const newCompany = input.value.trim();

    if (!newCompany) {
      alert('Введите название компании');
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert('Вы не авторизованы. Пожалуйста, войдите в систему.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:5167/company?nameCompany=${encodeURIComponent(newCompany)}&UserId=${userId}`, {
        method: 'POST', 
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка добавления компании в базу данных');
      }

      const success = addNewItem('company-dropdown', 'modal-company', newCompany, 'Компания');
      if (success) {
        closeModals();
        input.value = '';
      }
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить компанию. Проверьте соединение с сервером.');
    }
  });
// =========================================================================================================

  // ДОБАВЛЕНИЕ НОВОГО СЕГМЕНТА в БД
  // =========================================================================================================
  document.getElementById('add-segment-btn').addEventListener('click', () => {
    const input = document.getElementById('new-segment-name');
    const newSegment = input.value.trim();

    if (!newSegment) {
      alert('Введите название сегмента');
      return;
    }

    if (addNewItem('segment-dropdown', 'modal-segment', newSegment, 'Сегмент')) {
      closeModals();
      input.value = '';
    }
  });
  // =========================================================================================================

  
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
      closeModals();
    }
  });

  document.querySelectorAll('.modal .cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  function closeModals() {
    ['modal-overlay', 'modal-company', 'modal-segment', 'modal-delete']
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
  }

  
  function openDeleteModal(type) {
    const modal = document.getElementById('modal-delete');
    const overlay = document.getElementById('modal-overlay');
    const title = modal?.querySelector('h3');

    if (title) {
      title.textContent = `Вы действительно хотите удалить ${type === 'company' ? 'компанию' : 'сегмент'}?`;
    }

    if (overlay) overlay.style.display = 'flex';
    if (modal) modal.style.display = 'flex';
  }

  document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (pendingDeleteLi && pendingDeleteType) {
      const selectedText = document.querySelector(`#${pendingDeleteType}-dropdown .selected-text`);
      if (selectedText.textContent === pendingDeleteLi.textContent.trim()) {
        selectedText.textContent = pendingDeleteType === 'company' ? 'Компания' : 'Сегмент';
      }
      pendingDeleteLi.remove();
    }
    closeModals();
    pendingDeleteLi = null;
    pendingDeleteType = null;
  });

  document.getElementById('cancel-delete-btn').addEventListener('click', () => {
    closeModals();
    pendingDeleteLi = null;
    pendingDeleteType = null;
  });
});
