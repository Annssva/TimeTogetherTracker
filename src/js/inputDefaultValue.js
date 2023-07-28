// Функции для значений полей ввода по умолчанию
// Получение всех элементов с селектором ".formInput"
const inputFields = document.querySelectorAll(".formInput");

// Добавление листинера к каждому элементу
inputFields.forEach((input) => {
    input.addEventListener("focus", function () {
        // Проверяем, равно ли значение исходному значению, и если да, устанавливаем в value пустую строку
        if (this.value === this.getAttribute("value")) {
            this.value = "";
        }
    });

    // Добавляем листенер событий, когда ввод теряет фокус
    input.addEventListener("blur", function () {
        // Проверяем, если поле ввода пустое, то возвращаем изначальное значение value
        if (this.value === "") {
            this.value = this.getAttribute("value");
        }
    });
});