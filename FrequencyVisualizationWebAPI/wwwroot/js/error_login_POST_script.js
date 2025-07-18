function sendLoginData() {
    const form = document.getElementById("registration-form");

    const login = encodeURIComponent(form.login_email.value.trim());
    const password = encodeURIComponent(form.password.value);

    const url = `https://localhost:5167/user/login?login=${login}&password=${password}`;

    fetch(url, {
        method: "POST"
    })
    .then(response => {
        if (!response.ok) throw new Error("Неверный логин или пароль");
        return response.json();
    })
    .then(data => {
        console.log("Успешный вход:", data);
        alert("Добро пожаловать!");

        // Сохраняем токен и userId в localStorage
        localStorage.setItem("token", "Bearer " + data.tokenUser);
        localStorage.setItem("userId", data.id);
        
        // Здесь можно выполнить редирект
    })
    .catch(error => {
        console.error("Ошибка авторизации:", error);
        alert("Ошибка авторизации. Проверьте логин и пароль.");
    });
}
