// modal_import.js
document.addEventListener('DOMContentLoaded', function () {
    const importIcon = document.querySelector('img[alt="Импортировать"]');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalImport = document.getElementById('modal-import');
    const importSubmit = document.getElementById('import-submit-btn');
    const fileInput = document.getElementById('file-input');
    const fileNameSpan = document.getElementById('file-name');

    importIcon.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
        modalImport.style.display = 'flex';
    });

    importSubmit.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            readExcelAndApplyValues(file, () => {
                // Закрываем окно после успешного импорта
                modalImport.style.display = 'none';
                modalOverlay.style.display = 'none';
            });
        } else {
            alert("Сначала выберите файл для импорта.");
        }
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalImport.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });

    fileInput.addEventListener('change', () => {
        fileNameSpan.textContent = fileInput.files[0]?.name || 'Путь к файлу';
    });

    // Drag & Drop
    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#fe5b93';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#fc3a79';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#fc3a79';

        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            fileNameSpan.textContent = files[0].name;
        }
    });
});
