document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("login_email");
    const emailError = document.getElementById("login_email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    const fullnameInput = document.getElementById("fullname");
    const fullnameError = document.getElementById("fullname-error");

    const phoneInput = document.getElementById("phone");
    const emailContactInput = document.getElementById("contact_email");

    const telegramInput = document.getElementById("telegram");
    const telegramError = document.getElementById("telegram-error");

    // === Ограничение длины ввода ===
    function restrictInputLength(event, maxLength) {
        const input = event.target;
        // Разрешаем управляющие клавиши (Backspace, Delete, стрелки)
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];
        if (input.value.length >= maxLength && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    fullnameInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 100);
    });

    emailInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 254);
    });

    emailContactInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 254);
    });

    phoneInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 12);
    });

    passwordInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 64);
    });

    telegramInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 33);
    });

    // === Проверка ФИО ===
    fullnameInput.addEventListener("input", function () {
        let value = fullnameInput.value;
        value = value.replace(/^\s+/, "");        // Удалить начальные пробелы
        value = value.replace(/\s{2,}/g, " ");    // Заменить несколько пробелов подряд на один
        fullnameInput.value = value;

        const validNameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;

        if (value === "") {
            fullnameError.textContent = "ФИО не должно быть пустым";
            fullnameError.style.display = "block";
            fullnameInput.classList.add("input-error");
        } else if (!validNameRegex.test(value)) {
            fullnameError.textContent = "ФИО должно содержать только буквы и пробелы";
            fullnameError.style.display = "block";
            fullnameInput.classList.add("input-error");
        } else {
            fullnameError.textContent = "";
            fullnameError.style.display = "none";
            fullnameInput.classList.remove("input-error");
        }
    });

    // === Проверка login_email ===
    emailInput.addEventListener("input", function () {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Email не должен быть пустым";
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Введите корректный email (example@mail.com)";
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
        } else if (email.length < 6) {
            emailError.textContent = "Email должен быть минимум 6 символов";
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
        } else {
            emailError.textContent = "";
            emailError.style.display = "none";
            emailInput.classList.remove("input-error");
        }
    });

    // === Проверка пароля ===
    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const minLength = 8;
        // Разрешаем латиницу, цифры, спецсимволы, но ЗАПРЕЩАЕМ пробелы
        const latinOnlyRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{}|\\;:'",.<>/?`~]+$/;

        if (password.length < minLength) {
            passwordError.textContent = "Пароль должен быть не менее 8 символов";
            passwordError.style.display = "block";
            passwordInput.classList.add("input-error");
        } else if (!latinOnlyRegex.test(password)) {
            passwordError.textContent = "Пароль должен содержать только латиницу, цифры и спецсимволы, без пробелов";
            passwordError.style.display = "block";
            passwordInput.classList.add("input-error");
        } else {
            passwordError.textContent = "";
            passwordError.style.display = "none";
            passwordInput.classList.remove("input-error");
        }
    });

    // === Проверка Telegram (необязательное поле) ===
    telegramInput.addEventListener("input", function () {
        const value = telegramInput.value.trim();

        // Если поле пустое — ошибки нет, форма валидна
        if (value === "") {
            telegramError.textContent = "";
            telegramError.style.display = "none";
            telegramInput.classList.remove("input-error");
            return;
        }

        // Проверим, начинается ли с '@'
        if (!value.startsWith("@")) {
            telegramError.textContent = "Никнейм Telegram должен начинаться с символа @";
            telegramError.style.display = "block";
            telegramInput.classList.add("input-error");
            return;
        }

        // Уберем '@' для валидации остального ника
        const username = value.slice(1);

        // Проверка длины: минимум 5 символов, максимум 32
        if (username.length < 5) {
            telegramError.textContent = "Никнейм должен содержать минимум 5 символов после @";
            telegramError.style.display = "block";
            telegramInput.classList.add("input-error");
            return;
        }
        if (username.length > 32) {
            telegramError.textContent = "Никнейм не должен превышать 32 символа после @";
            telegramError.style.display = "block";
            telegramInput.classList.add("input-error");
            return;
        }

        // Проверка на недопустимые символы:
        // Допустимы: A-Z, a-z, 0-9, _
        // Запрещены пробелы, спецсимволы, дополнительные '@' и Unicode символы
        const usernameRegex = /^[A-Za-z0-9_]+$/;

        if (!usernameRegex.test(username)) {
            telegramError.textContent = "Никнейм может содержать только буквы латинского алфавита, цифры и символ подчёркивания (_)";
            telegramError.style.display = "block";
            telegramInput.classList.add("input-error");
            return;
        }

        // Все проверки пройдены
        telegramError.textContent = "";
        telegramError.style.display = "none";
        telegramInput.classList.remove("input-error");
    });

    // === Общая проверка перед отправкой формы ===
    document.getElementById("registration-form").addEventListener("submit", function(event) {
        event.preventDefault();  // Чтобы форма не отправлялась по умолчанию

        // Поля, обязательные для проверки
        const requiredFields = ["fullname", "login_email", "password"];
        let hasError = false;

        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (!field.value.trim()) {
                field.classList.add("input-error");
                hasError = true;
            }
        });

        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (field.classList.contains("input-error")) {
                hasError = true;
            }
        });

        if (telegramInput.value.trim() !== "" && telegramInput.classList.contains("input-error")) {
            hasError = true;
        }

        if (hasError) {
            alert("Пожалуйста, корректно заполните все обязательные поля!");
            return;  // Ошибки есть — дальше не идём
        }

        // Если ошибок нет — вызываем функцию из другого скрипта, который отправит POST-запрос
        if (typeof sendRegistrationData === "function") {
            sendRegistrationData();  // функция из error_registration_POST_script.js
        } else {
            console.error("Функция отправки данных sendRegistrationData не найдена");
        }
    });
});
