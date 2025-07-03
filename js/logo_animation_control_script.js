const video = document.getElementById('logo-video');
const pauseTime = 5; // пауза в секундах
const repeatCount = 2; // сколько раз проигрываем видео до паузы
const midPointRatio = 0.5; // середина видео (50% от длительности)

let playCycles = 0;
let isPausedAtMid = false;

// Запускаем видео сразу
video.play();

// Обработчик на конец видео
video.addEventListener('ended', () => {
    playCycles++;

    if (playCycles === repeatCount) {
        // Поставить видео на паузу в середине
        const midTime = video.duration * midPointRatio;
        video.currentTime = midTime;

        // Пауза на pauseTime секунд
        isPausedAtMid = true;
        video.pause();

        setTimeout(() => {
            // Продолжаем воспроизведение с середины
            video.play();
            playCycles = 0;
            isPausedAtMid = false;
        }, pauseTime * 1000);
    } else {
        // Просто запускаем видео заново для следующих циклов
        video.currentTime = 0;
        video.play();
    }
});

// Если пользователь кликнул по лого, можно, например, перейти на главную
document.querySelector('.logo-container').addEventListener('click', () => {
    window.location.href = '../html/main_window.html';
});
