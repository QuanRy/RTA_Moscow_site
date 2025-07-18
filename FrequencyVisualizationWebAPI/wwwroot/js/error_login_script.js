document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("login_email");
    const emailError = document.getElementById("login_email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    // === Ограничение длины ввода ===
    function restrictInputLength(event, maxLength) {
        const input = event.target;
        // Разрешаем управляющие клавиши (Backspace, Delete, стрелки)
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];
        if (input.value.length >= maxLength && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }

    emailInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 254);
    });

    passwordInput.addEventListener("keydown", function(event) {
        restrictInputLength(event, 64);
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

    // === Общая проверка перед отправкой формы ===
    document.getElementById("registration-form").addEventListener("submit", function(event) {
        event.preventDefault();  // Чтобы форма не отправлялась по умолчанию

        // Поля, обязательные для проверки
        const requiredFields = ["login_email", "password"];
        let hasError = false;

        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            // Проверяем, что поле не пустое
            if (!field.value.trim()) {
                field.classList.add("input-error");
                hasError = true;
            }
        });

        // Проверяем, есть ли ошибки у этих полей (наличие класса input-error)
        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (field.classList.contains("input-error")) {
                hasError = true;
            }
        });


        if (hasError) {
            event.preventDefault();
            alert("Пожалуйста, перепроверьте данные!");
        }
        
        // Если ошибок нет — вызываем функцию из другого скрипта, который отправит POST-запрос
        if (typeof sendLoginData === "function") {
            sendLoginData();  // функция из error_login_POST_script.js
        } else {
            console.error("Функция отправки данных sendLoginData не найдена");
        }
    });
});
