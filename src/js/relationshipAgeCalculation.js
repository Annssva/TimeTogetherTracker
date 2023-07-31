import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';


// Проверка введенных значений, их обработка и получение значений возраста отношений

const button = document.getElementById("button");
const errorText = 'Incorrect!';
const errorBorderStyle = '3px solid red';
const normalBorderStyle = '3px solid #ce4f71'
let dayValue;
let monthValue;
let yearValue;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // Adding 1 because getMonth() returns zero-based index
const currentDay = currentDate.getDate();

// функция проверки год на високосность
function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    return year % 400 === 0;

}
// функция для расчета возраста отношений
function calculateDifference(difInDays, difInMonth, difInYears){
    let yearsDifference = 0;
    let monthsDifference = 0;
    let daysDifference = 0;

    if(difInYears > 0){
        yearsDifference = difInYears;
    }
    if(difInMonth % 12 > 0){
        monthsDifference = difInMonth % 12;
    }
    if(difInDays > 0){
        daysDifference = Math.round((difInDays % 365) % 30.44);
    }
    return [daysDifference, monthsDifference, yearsDifference];
}

// основная функция, которая обрабатывает введенные значения в поля и запускает функцию расчета возраста отношений,
// запускающаяся при нажатии на кнопку
button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // проверка значения дня
    if ((document.getElementById("monthInput").value === '1' ||
        document.getElementById("monthInput").value === '3' ||
        document.getElementById("monthInput").value === '5' ||
        document.getElementById("monthInput").value === '7' ||
        document.getElementById("monthInput").value === '8' ||
        document.getElementById("monthInput").value === '01' ||
        document.getElementById("monthInput").value === '03' ||
        document.getElementById("monthInput").value === '05' ||
        document.getElementById("monthInput").value === '07' ||
        document.getElementById("monthInput").value === '08' ||
        document.getElementById("monthInput").value === '10' ||
        document.getElementById("monthInput").value === '12') &&
        (document.getElementById("dayInput").value >= 1
            && document.getElementById("dayInput").value <= 31)){
        dayValue = document.getElementById("dayInput").value;
        console.log("Day:", dayValue);

        document.getElementById("dayError").textContent = "";
        const input = document.getElementById('dayInput');
        input.style.border = normalBorderStyle;
    } else if ((document.getElementById("monthInput").value === '4' ||
        document.getElementById("monthInput").value === '6' ||
        document.getElementById("monthInput").value === '9' ||
        document.getElementById("monthInput").value === '11' ||
        document.getElementById("monthInput").value === '04' ||
        document.getElementById("monthInput").value === '06' ||
        document.getElementById("monthInput").value === '09') &&
        (document.getElementById("dayInput").value >= 1
            && document.getElementById("dayInput").value <= 30)){
        dayValue = document.getElementById("dayInput").value;
        console.log("Day:", dayValue);
        document.getElementById("dayError").textContent = "";
        const input = document.getElementById('dayInput');
        input.style.border = normalBorderStyle;
    } else if ((document.getElementById("monthInput").value === '2' ||
        document.getElementById("monthInput").value === '02') &&
        isLeapYear(document.getElementById("yearInput").value) &&
        (document.getElementById("dayInput").value >= 1 &&
            document.getElementById("dayInput").value <= 29)){
        dayValue = document.getElementById("dayInput").value;
        console.log("Day:", dayValue);
        document.getElementById("dayError").textContent = "";
        const input = document.getElementById('dayInput');
        input.style.border = normalBorderStyle;
    } else if ((document.getElementById("monthInput").value === '2' ||
            document.getElementById("monthInput").value === '02') &&
        !isLeapYear(document.getElementById("yearInput").value) &&
        (document.getElementById("dayInput").value >= 1 &&
            document.getElementById("dayInput").value <= 28)){
        dayValue = document.getElementById("dayInput").value;
        console.log("Day:", dayValue);
        document.getElementById("dayError").textContent = "";
        const input = document.getElementById('dayInput');
        input.style.border = normalBorderStyle;
    } else{
        document.getElementById("dayError").textContent = errorText;
        const input = document.getElementById('dayInput');
        input.style.border = errorBorderStyle;
    }

    // проверка значения месяца
    if (document.getElementById("monthInput").value >= 1 &&
        document.getElementById("monthInput").value <= 12){
        monthValue = document.getElementById("monthInput").value;
        console.log("Month:", monthValue);
        document.getElementById("monthError").textContent = '';
        const input = document.getElementById('monthInput');
        input.style.border = normalBorderStyle;

    } else{
        document.getElementById("monthError").textContent = errorText;
        const input = document.getElementById('monthInput');
        input.style.border = errorBorderStyle;
    }

    // проверка значения года
    if (document.getElementById("yearInput").value >= 1){
        yearValue = document.getElementById("yearInput").value;
        console.log("Year:", yearValue);
        document.getElementById("yearError").textContent = '';
        const input = document.getElementById('yearInput');
        input.style.border = normalBorderStyle;

    } else{
        document.getElementById("yearError").textContent = errorText;
        const input = document.getElementById('yearInput');
        input.style.border = errorBorderStyle;
    }

    // далее, если какой-то элемент получил ошибку при неверном значении, функция останавливается
    if(document.getElementById("yearError").textContent === errorText ||
        document.getElementById("monthError").textContent === errorText ||
        document.getElementById("dayError").textContent === errorText){
        return;
    }

    // если ошибок пока не было, то собирается полная дата и проверяется, не является ли эта дата большей,
    // чем текущая дата, если она больше, то обрабатываются ошибки и происходит выход из функции
    const fullDate = new Date(yearValue, monthValue - 1, dayValue);
    console.log(fullDate, currentDate);
    if (currentDate < fullDate) {
        document.getElementById("yearError").textContent = errorText;
        document.getElementById("monthError").textContent = errorText;
        document.getElementById("dayError").textContent = errorText;
        const dayInput = document.getElementById('dayInput');
        dayInput.style.border = errorBorderStyle;
        const monthInput = document.getElementById('monthInput');
        monthInput.style.border = errorBorderStyle;
        const yearInput = document.getElementById('yearInput');
        yearInput.style.border = errorBorderStyle;
        return;
    }

    // Считается разница между текущей и введенной датами в месяцах, днях и годах
    const monthsDifference = differenceInMonths(currentDate, fullDate);
    const daysDifference = differenceInDays(currentDate, fullDate);
    const yearsDifference = differenceInYears(currentDate, fullDate);

    // Далее вызывается функция для подсчета разница в датах в полных днях, месяцах и годах и выводятся все разницы на экран
    document.getElementById("relationshipAge").textContent =
        `${calculateDifference(daysDifference, monthsDifference, yearsDifference)[2]} year(s), 
        ${calculateDifference(daysDifference, monthsDifference, yearsDifference)[1]} month(s), 
        ${calculateDifference(daysDifference, monthsDifference, yearsDifference)[0]} day(s)`;
    document.getElementById('relationshipAgeInMonth').textContent = `${monthsDifference} month(s)`;
    document.getElementById('relationshipAgeInDays').textContent = `${daysDifference} day(s)`;

});
