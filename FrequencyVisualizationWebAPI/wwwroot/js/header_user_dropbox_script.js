document.addEventListener('DOMContentLoaded', () => {
  const userDropdown = document.getElementById('user-dropdown');
  const selected = userDropdown.querySelector('.dropdown-user'); // новая замена
  const list = userDropdown.querySelector('.dropdown-list');
  const arrow = userDropdown.querySelector('.arrow');

  selected.addEventListener('click', () => {
    const isHidden = list.classList.contains('hidden');
    if (isHidden) {
      list.classList.remove('hidden');
      arrow.classList.add('rotated');
    } else {
      list.classList.add('hidden');
      arrow.classList.remove('rotated');
    }
  });

  // Закрытие при клике вне
  document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target)) {
      list.classList.add('hidden');
      arrow.classList.remove('rotated');
    }
  });

  // Клик по "Выйти"
  const logoutItem = userDropdown.querySelector('.logout-item');
  logoutItem.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Выход из системы'); // Твоя логика выхода
    list.classList.add('hidden');
    arrow.classList.remove('rotated');
  });
});
