document.querySelector('.auth-link.registration').addEventListener('click', (e) => {
    e.preventDefault(); // отменяем переход по href="#"
    window.location.href = '../html/registration_only_admin.html';
});

document.querySelector('.auth-link.login').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../html/login.html';
});

document.querySelector('.logo-container').addEventListener('click', () => {
    window.location.href = '../html/main_window.html';
});
