(function() {
    const companySelect = document.getElementById('company-select');
    const segmentSelect = document.getElementById('segment-select');

    // Запоминаем последние выбранные значения (изначально пустые)
    let lastCompany = companySelect.value;
    let lastSegment = segmentSelect.value;

    // Флаг, был ли уже сделан первый выбор (чтобы не сбрасывать ползунки сразу при загрузке)
    let firstSelectionMade = (lastCompany !== "" || lastSegment !== "");

    // Функция сброса всех ползунков критериев в 0
    function resetSliders() {
        const sliders = document.querySelectorAll('.criteria-grid input[type="range"]');
        sliders.forEach(slider => {
            slider.value = 0;
        });
    }

    function onSelectChange() {
        const currentCompany = companySelect.value;
        const currentSegment = segmentSelect.value;

        if (!firstSelectionMade) {
            // Первый выбор — запоминаем значения, не сбрасываем ползунки
            lastCompany = currentCompany;
            lastSegment = currentSegment;
            firstSelectionMade = true;
            return;
        }

        // Если значения поменялись — сбрасываем ползунки
        if (currentCompany !== lastCompany || currentSegment !== lastSegment) {
            lastCompany = currentCompany;
            lastSegment = currentSegment;
            resetSliders(); // Сброс всех ползунков в 0
        }
        // Если значения не изменились — ничего не делаем
    }

    companySelect.addEventListener('change', onSelectChange);
    segmentSelect.addEventListener('change', onSelectChange);
})();