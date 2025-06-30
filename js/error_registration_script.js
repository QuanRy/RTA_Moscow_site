document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("password-error");

    const fullnameInput = document.getElementById("fullname");
    const fullnameError = document.getElementById("fullname-error");

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

    // === Проверка email ===
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
        // Поля, обязательные для проверки
        const requiredFields = ["fullname", "email", "password"];
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
            alert("Пожалуйста, корректно заполните все обязательные поля.");
        }
    });
});
