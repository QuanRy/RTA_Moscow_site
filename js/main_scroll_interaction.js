for (let i = 1; i <= 5; i++) {
    const slider = document.getElementById(`slider${i}`);
    const input = document.getElementById(`value${i}`);

    slider.addEventListener("input", () => {
        input.value = slider.value;
    });

    input.addEventListener("input", () => {
        if (input.value >= -5 && input.value <= 5) {
            slider.value = input.value;
        }
    });
}