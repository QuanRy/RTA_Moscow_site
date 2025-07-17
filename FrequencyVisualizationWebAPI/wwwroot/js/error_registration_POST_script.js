function sendRegistrationData() {
    const form = document.getElementById("registration-form");

    const fio = encodeURIComponent(form.fullname.value.trim());
    const login = encodeURIComponent(form.login_email.value.trim());
    const password = encodeURIComponent(form.password.value);
    const role = encodeURIComponent(form.role.value);

    // Передаём все параметры прямо в URL (имитируем GET-подобный стиль)
    const url = `https://localhost:5167/user?fio=${fio}&login=${login}&password=${password}&role=${role}`;

    fetch(url, {
        method: "POST"
    })
    .then(response => {
        if (!response.ok) throw new Error("Ошибка при отправке формы");
        return response.json();
    })
    .then(data => {
        console.log("Успешно:", data);
        alert("Пользователь успешно создан!");
    })
    .catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка при отправке данных. Попробуйте позже.");
    });
}
