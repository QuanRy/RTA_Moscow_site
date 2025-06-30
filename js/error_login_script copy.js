document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Создаём элементы для ошибок под полями (если их нет в HTML, добавим динамически)
    let usernameError = document.getElementById("username-error");
    if (!usernameError) {
        usernameError = document.createElement("div");
        usernameError.id = "username-error";
        usernameError.style.color = "red";
        usernameInput.insertAdjacentElement('afterend', usernameError);
    }

    let passwordError = document.getElementById("password-error");
    if (!passwordError) {
        passwordError = document.createElement("div");
        passwordError.id = "password-error";
        passwordError.style.color = "red";
        passwordInput.insertAdjacentElement('afterend', passwordError);
    }

    // Ограничение длины ввода
    function restrictInputLength(event, maxLength) {
        const input = event.target;
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];
        if (input.value.length >= maxLength && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    usernameInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 254); // длина логина, как email в оригинале
    });

    passwordInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 64);
    });

    // Валидация логина (username) — например, не пустой, минимальная длина, допустимые символы (зависит от требований)
    usernameInput.addEventListener("input", function () {
        const value = usernameInput.value.trim();
        // Можно добавить более строгую проверку, например, на email-подобие:
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // но пока просто проверим минимальную длину и отсутствие пробелов
        if (value === "") {
            usernameError.textContent = "Логин не должен быть пустым";
            usernameInput.classList.add("input-error");
        } else if (value.length < 3) {
            usernameError.textContent = "Логин должен содержать минимум 3 символа";
            usernameInput.classList.add("input-error");
        } else if (/\s/.test(value)) {
            usernameError.textContent = "Логин не должен содержать пробелы";
            usernameInput.classList.add("input-error");
        } else {
            usernameError.textContent = "";
            usernameInput.classList.remove("input-error");
        }
    });

    // Валидация пароля (по образцу)
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const minLength = 8;
        const latinOnlyRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{}|\\;:'",.<>/?`~]+$/;

        if (password.length < minLength) {
            passwordError.textContent = "Пароль должен быть не менее 8 символов";
            passwordInput.classList.add("input-error");
        } else if (!latinOnlyRegex.test(password)) {
            passwordError.textContent = "Пароль должен содержать только латиницу, цифры и спецсимволы, без пробелов";
            passwordInput.classList.add("input-error");
        } else {
            passwordError.textContent = "";
            passwordInput.classList.remove("input-error");
        }
    });

    // Проверка формы при отправке (кнопка submit)
    const form = document.querySelector(".login-container"); // если форма не обёрнута в <form>, можно изменить селектор

    form.querySelector("button[type=submit]").addEventListener("click", function(event) {
        // Триггерим проверку input (если пользователь не изменял поля)
        usernameInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));

        let hasError = false;

        // Проверяем, что поля не пустые
        if (!usernameInput.value.trim()) {
            usernameInput.classList.add("input-error");
            usernameError.textContent = "Логин не должен быть пустым";
            hasError = true;
        }
        if (!passwordInput.value) {
            passwordInput.classList.add("input-error");
            passwordError.textContent = "Пароль не должен быть пустым";
            hasError = true;
        }

        // Проверяем наличие ошибок
        if (usernameInput.classList.contains("input-error") || passwordInput.classList.contains("input-error")) {
            hasError = true;
        }

        if (hasError) {
            event.preventDefault();
            alert("Пожалуйста, корректно заполните все обязательные поля!");
        } else {
            location.reload();
        }
    });
});
