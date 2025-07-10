function readExcelAndApplyValues(file, onComplete = () => {}) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (rows.length === 0) return;

        // Сегмент
        const segment = rows[0][0] || '';
        const segmentDisplay = document.querySelector('#segment-dropdown .selected-text');
        if (segmentDisplay) segmentDisplay.textContent = segment;

        // Частота по Остроу из второй строки
        const ostrowFreq = (rows[1][0] || '0').toString().replace(',', '.');
        const ostrowInput = document.querySelector('.ostrow-frequency-input');
        if (ostrowInput) ostrowInput.value = parseFloat(ostrowFreq).toFixed(1);

        // Критерии
        let currentSection = null;
        for (let i = 2; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            const firstCell = row[0]?.trim();
            const sectionCandidate = row[1]?.trim();

            if (firstCell && !row[1] && !row[2] && !row[3]) {
                currentSection = firstCell;
                continue;
            }

            const leftLabel = row[0] || '';
            const rightLabel = row[5] || '';

            const valueCell = row.find(cell => typeof cell === 'string' && /^-?\d,\d$/.test(cell));
            if (!valueCell) continue;

            const numericValue = parseFloat(valueCell.replace(',', '.'));
            if (isNaN(numericValue)) continue;

            // Найти подходящий ползунок по лейблам
            const sliders = document.querySelectorAll('.slider');
            sliders.forEach(slider => {
                const container = slider.closest('.criterion');
                const label = container?.querySelector('label')?.textContent.trim();
                const spans = container?.querySelectorAll('.factor-labels span');
                const left = spans?.[0]?.textContent.trim() || '';
                const right = spans?.[1]?.textContent.trim() || '';

                if (label + ' ' + left === leftLabel && label + ' ' + right === rightLabel) {
                    slider.value = numericValue;
                    slider.dispatchEvent(new Event('input'));
                }
            });
        }

        // Последние строки: базовая частота и компания
        for (let i = rows.length - 1; i >= 0; i--) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            if (row[0] === 'Базовая частота') {
                const baseFreq = row[1].toString().replace(',', '.');
                const baseFreqInput = document.querySelector('.base-frequency-input');
                if (baseFreqInput) baseFreqInput.value = parseFloat(baseFreq).toFixed(1);
            }

            if (row[0] === 'Частота по Остроу') {
                const ostrowAgain = row[1].toString().replace(',', '.');
                const ostrowInput2 = document.querySelector('.ostrow-frequency-input');
                if (ostrowInput2) ostrowInput2.value = parseFloat(ostrowAgain).toFixed(1);
            }

            // Последняя строка — компания
            if (i === rows.length - 1 && row[0]) {
                const company = row[0];
                const companyDisplay = document.querySelector('#company-dropdown .selected-text');
                if (companyDisplay) companyDisplay.textContent = company;
            }
        }

        // Вызов колбэка для закрытия модального окна
        onComplete();
    };

    reader.readAsArrayBuffer(file);
}
