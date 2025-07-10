document.querySelector('.tooltip').addEventListener('click', exportToExcel);

function exportToExcel() {
    const sliders = document.querySelectorAll('.slider');
    const sections = document.querySelectorAll('.criteria-block');

    const ostrowValueRaw = document.querySelector('.ostrow-frequency-input')?.value || '0.0';
    const ostrowValue = parseFloat(ostrowValueRaw).toFixed(1).replace('.', ',');

    const baseValueRaw = document.querySelector('.base-frequency-input')?.value || '0.0';
    const baseValue = parseFloat(baseValueRaw).toFixed(1).replace('.', ',');

    const segment = document.querySelector('#segment-dropdown .selected-text')?.textContent.trim() || 'Сегмент';
    const company = document.querySelector('#company-dropdown .selected-text')?.textContent.trim() || 'Компания';

    const allowedValues = [-0.2, -0.1, 0.1, 0.2];

    let rows = [];

    // Шапка таблицы
    const header = [
        { v: `${segment}`, s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '-0,2', s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '-0,1', s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '0,1',  s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '0,2',  s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '',     s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } }
    ];
    rows.push(header);

    // Строка с частотой по Остроу
    rows.push([
        { v: ostrowValue, s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        '', '', '', '', ''
    ]);

    // Обработка критериев
    sections.forEach(section => {
        const sectionTitle = section.querySelector('.criteria-title')?.textContent.trim();
        rows.push(['', sectionTitle, '', '', '', '']);

        const criteria = section.querySelectorAll('.criterion');
        criteria.forEach(crit => {
            const label = crit.querySelector('label')?.textContent.trim();
            const input = crit.querySelector('input[type=range]');
            const valNum = parseFloat(input.value);
            const value = valNum.toFixed(1).replace('.', ',');

            const factorLabels = crit.querySelectorAll('.factor-labels span');
            const leftLabel = factorLabels[0]?.textContent.trim() || '';
            const rightLabel = factorLabels[1]?.textContent.trim() || '';

            const row = new Array(6).fill('');

            // Устанавливаем текст слева и справа
            row[0] = `${label} ${leftLabel}`;
            row[5] = `${label} ${rightLabel}`;

            // Если значение допустимое (не 0), заполняем соответствующий столбец
            const valueMap = { '-0.2': 1, '-0.1': 2, '0.1': 3, '0.2': 4 };
            if (allowedValues.includes(valNum)) {
                const colIndex = valueMap[valNum.toFixed(1)];
                row[colIndex] = { v: value, s: { font: { bold: true } } };
            }

            rows.push(row);
        });
    });

    // Финальные строки с зелёной заливкой
    const greenStyle = { fill: { fgColor: { rgb: "C6EFCE" } } };

    rows.push([]);
    rows.push([
        { v: 'Базовая частота', s: greenStyle },
        { v: baseValue, s: { ...greenStyle, font: { bold: true } } }
    ]);
    rows.push([
        { v: 'Частота по Остроу', s: greenStyle },
        { v: ostrowValue, s: { ...greenStyle, font: { bold: true } } }
    ]);
    rows.push([
        { v: company, s: greenStyle }
    ]);

    // Генерация Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // Применяем стили
    for (let R = 0; R < rows.length; ++R) {
        const row = rows[R];
        for (let C = 0; C < row.length; ++C) {
            const cell = row[C];
            if (cell && typeof cell === 'object' && 'v' in cell) {
                const cellRef = XLSX.utils.encode_cell({ c: C, r: R });
                ws[cellRef] = { v: cell.v, t: 's', s: cell.s || {} };
            }
        }
    }

    // Сохраняем файл
    XLSX.utils.book_append_sheet(wb, ws, 'Остроу');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    const filename = `Экспорт таблички частоты по Остроу.xlsx`;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
        window.URL.revokeObjectURL(url);
    }, 100);
}
