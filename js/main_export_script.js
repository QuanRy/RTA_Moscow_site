document.querySelector('.tooltip').addEventListener('click', exportToExcel);

function exportToExcel() {
    const sliders = document.querySelectorAll('.slider');
    const sections = document.querySelectorAll('.criteria-block');
    const ostrowValueRaw = document.querySelector('.ostrow-frequency-input')?.value || '0.0';
    const ostrowValue = parseFloat(ostrowValueRaw).toFixed(1).replace('.', ',');

    // Получаем выбранный сегмент и компанию
    const segment = document.querySelector('#segment-dropdown .selected-text')?.textContent.trim() || 'Сегмент';
    const company = document.querySelector('#company-dropdown .selected-text')?.textContent.trim() || 'Компания';

    let rows = [];
    let merges = [];

    // Первая строка: сегмент + значения шкалы
    const header = [
        { v: `${segment}`, s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '-0,2', s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '-0,1', s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '0,1',  s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '0,2',  s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        { v: '',     s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } }
    ];
    rows.push(header);

    // Вторая строка — дублируем значение частоты по Остроу в первой ячейке
    rows.push([
        { v: ostrowValue, s: { font: { bold: true }, fill: { fgColor: { rgb: "FFFF00" } } } },
        '', '', '', '', ''
    ]);

    // Пробегаем по секциям и собираем данные
    sections.forEach(section => {
        const sectionTitle = section.querySelector('.criteria-title')?.textContent.trim();
        rows.push(['', sectionTitle, '', '', '', '']);

        const criteria = section.querySelectorAll('.criterion');
        criteria.forEach(crit => {
            const label = crit.querySelector('label')?.textContent.trim();
            const input = crit.querySelector('input[type=range]');
            const valNum = parseFloat(input.value);
            if (valNum === 0) return;

            const value = valNum.toFixed(1).replace('.', ',');
            const factorLabels = crit.querySelectorAll('.factor-labels span');
            const leftLabel = factorLabels[0]?.textContent.trim() || '';
            const rightLabel = factorLabels[1]?.textContent.trim() || '';

            const row = new Array(6).fill('');
            const colIndex = Math.round(2 + valNum * 10);
            row[colIndex] = { v: value, s: { font: { bold: true } } };

            row[0] = `${label} ${leftLabel}`;
            row[5] = `${label} ${rightLabel}`;
            rows.push(row);
        });
    });

    // Добавляем нижние строки с зелёным фоном
    const greenStyle = { fill: { fgColor: { rgb: "C6EFCE" } } };

    rows.push([]);
    rows.push([
        { v: 'Базовая частота', s: greenStyle },
        { v: '0,0', s: { ...greenStyle, font: { bold: true } } }
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

    // Добавляем стили ячеек вручную
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
