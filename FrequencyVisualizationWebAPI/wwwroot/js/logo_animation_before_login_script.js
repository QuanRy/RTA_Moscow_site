document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('intro-video');
    const overlay = document.getElementById('intro-overlay');
    const shutters = document.querySelectorAll('.shutter');
    let fadeStarted = false;

    video.addEventListener('timeupdate', function () {
        if (!fadeStarted && video.currentTime >= 2.45) {
            fadeStarted = true;

            // 1. Запускаем анимацию прозрачности
            video.classList.add('fade-out');

            // 2. Ждем окончания анимации (1.2s), затем скрываем и запускаем жалюзи
            setTimeout(() => {
                video.classList.add('hidden');

                // 3. Теперь запускаем жалюзи
                shutters.forEach((shutter) => {
                    shutter.classList.add('open');
                });
            }, 1200); // соответствие transition: 1.2s

            setTimeout(() => {
                overlay.style.zIndex = '-1';
            }, 2200);
        }
    });
});