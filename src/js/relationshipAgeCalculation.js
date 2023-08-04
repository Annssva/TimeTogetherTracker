import {differenceInDays, differenceInMonths, differenceInYears} from 'date-fns';


// Проверка введенных значений, их обработка и получение значений возраста отношений

const button = document.getElementById("button");
const errorText = 'Error!';
const errorBorderStyle = '3px solid red';
const normalBorderStyle = '3px solid #ce4f71'
let dayValue;
let monthValue;
let yearValue;
const currentDate = new Date();

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

// функция для показа popup-а с подробностями об ошибке
function popupShowFunction(errors) {
    const popup = document.getElementById("popupText");
    popup.innerHTML = errors.join('<br>');
    popup.classList.add("showPopup");
}

// функция, которая анимирует вывод результата
function animateResults(
    fullYears,
    fullYearsText,
    fullMonths,
    fullMonthsText,
    fullDays,
    fullDaysText,
    inMonths,
    inMonthsText,
    inDays,
    inDayTexts
) {
    const mainContainer = document.getElementById('mainContainerID');
    mainContainer.classList.add('newMarginContainer');

    const hr = document.getElementById('hrLine');
    hr.classList.add('hrShow');

    const resultAgesElement = document.getElementById("resultAges");
    resultAgesElement.innerHTML = `
    <div id="rowFullAge">
      <h1 class='resultText' id="relationshipAgeYears">${fullYears}</h1>
      <h1 class='resultText' id="textFullYears">${fullYearsText}</h1>
      <h1 class='resultText' id="relationshipAgeMonths">${fullMonths}</h1>
      <h1 class='resultText' id="textFullMonths">${fullMonthsText}</h1>
      <h1 class='resultText' id="relationshipAgeDays">${fullDays}</h1>
      <h1 class='resultText' id="textFullDays">${fullDaysText}</h1>
    </div>
    <h3 class="orText">or</h3>
    <div id="rowAgeInMonth">
      <h1 class='resultText' id="relationshipAgeInMonth">${inMonths}</h1>
      <h1 class='resultText' id="textMonth">${inMonthsText}</h1>
    </div>
    <h3 class="orText">or</h3>
    <div id="rowAgeInDays">
      <h1 class='resultText' id="relationshipAgeInDays">${inDays}</h1>
      <h1 class='resultText' id="textDays">${inDayTexts}</h1>
    </div>
  `;
    resultAgesElement.classList.add("show-result");
}

// основная функция, которая обрабатывает введенные значения в поля и запускает функцию расчета возраста отношений,
// запускающаяся при нажатии на кнопку
button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // обнуление ошибок
    let errorsForPopup = [];

    // скрытие элментов для вывода результатов, если они показаны
    const popup = document.getElementById("popupText");
    if (popup.classList.contains('showPopup')) {
        popup.classList.remove("showPopup");
    }

    const mainContainer = document.getElementById('mainContainerID');
    const hr = document.getElementById('hrLine');
    const resultAgesElement = document.getElementById("resultAges");
    if (mainContainer.classList.contains('newMarginContainer')) {
        mainContainer.classList.remove("newMarginContainer");
        hr.classList.remove('hrShow');
        resultAgesElement.classList.remove("show-result");
    }

    // проверка на то, ввел ли пользователь значения
    if(document.getElementById("yearInput").value === 'YYYY' &&
        document.getElementById("monthInput").value === 'MM' &&
        document.getElementById("dayInput").value === 'DD'){

        document.getElementById("yearError").textContent = errorText;
        document.getElementById("monthError").textContent = errorText;
        document.getElementById("dayError").textContent = errorText;

        const dayInput = document.getElementById('dayInput');
        dayInput.style.border = errorBorderStyle;
        const monthInput = document.getElementById('monthInput');
        monthInput.style.border = errorBorderStyle;
        const yearInput = document.getElementById('yearInput');
        yearInput.style.border = errorBorderStyle;
        errorsForPopup.push('- Fields are not filled!');
        popupShowFunction(errorsForPopup);
        return;
    }

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
        errorsForPopup.push('- Invalid day value!')
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
        errorsForPopup.push('- Invalid month value!');
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
        errorsForPopup.push('- Invalid year value!');
    }

    // далее, если какой-то элемент получил ошибку при неверном значении, функция останавливается
    if(document.getElementById("yearError").textContent === errorText ||
        document.getElementById("monthError").textContent === errorText ||
        document.getElementById("dayError").textContent === errorText){
        popupShowFunction(errorsForPopup);
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
        errorsForPopup.push('- The entered date cannot be greater than the current one!')
        popupShowFunction(errorsForPopup);
        return;
    }

    // Считается разница между текущей и введенной датами в месяцах, днях и годах
    const monthsDifference = differenceInMonths(currentDate, fullDate);
    const daysDifference = differenceInDays(currentDate, fullDate);
    const yearsDifference = differenceInYears(currentDate, fullDate);

    const fullAgeYears = calculateDifference(daysDifference, monthsDifference, yearsDifference)[2];
    const fullAgeMonths = calculateDifference(daysDifference, monthsDifference, yearsDifference)[1];
    const fullAgeDays = calculateDifference(daysDifference, monthsDifference, yearsDifference)[0]

    // переменные для вывода результатов
    let fullYearsRes;
    let fullYearsTextRes;
    let fullMonthsRes;
    let fullMonthsTextRes;
    let fullDaysRes;
    let fullDaysTextRes;
    let inMonthsRes;
    let inMonthsTextRes;
    let inDaysRes;
    let inDayTextsRes;

    // проверка на нулевые значения и подгон вывода под них
    if (fullAgeYears !== 0 &&
        fullAgeMonths !== 0 &&
        fullAgeDays !== 0
        ){
        fullYearsRes = `${fullAgeYears}`;
        fullYearsTextRes = '\u00A0years\u00A0';
        fullMonthsRes = `${fullAgeMonths}`;
        fullMonthsTextRes = '\u00A0months\u00A0';
        fullDaysRes = `${fullAgeDays}`;
        fullDaysTextRes = '\u00A0days';

    } else if (fullAgeYears === 0 &&
        fullAgeMonths !== 0 &&
        fullAgeDays !== 0
    ){
        fullYearsRes = '';
        fullYearsTextRes = '';
        fullMonthsRes = `${fullAgeMonths}`;
        fullMonthsTextRes = '\u00A0months\u00A0';
        fullDaysRes = `${fullAgeDays}`;
        fullDaysTextRes = '\u00A0days';

    }else if (fullAgeYears !== 0 &&
        fullAgeMonths === 0 &&
        fullAgeDays !== 0
    ){
        fullYearsRes = `${fullAgeYears}`;
        fullYearsTextRes = '\u00A0years\u00A0';
        fullMonthsRes = '';
        fullMonthsTextRes = '';
        fullDaysRes = `${fullAgeDays}`;
        fullDaysTextRes = '\u00A0days';

    } else if (fullAgeYears !== 0 &&
        fullAgeMonths !== 0 &&
        fullAgeDays === 0
    ){
        fullYearsRes = `${fullAgeYears}`;
        fullYearsTextRes = '\u00A0years\u00A0';
        fullMonthsRes = `${fullAgeMonths}`;
        fullMonthsTextRes = '\u00A0months\u00A0';
        fullDaysRes = '';
        fullDaysTextRes = '';

    } else if (fullAgeYears === 0 &&
        fullAgeMonths === 0 &&
        fullAgeDays !== 0
    ){
        fullYearsRes = '';
        fullYearsTextRes = '';
        fullMonthsRes = '';
        fullMonthsTextRes = '';
        fullDaysRes = `${fullAgeDays}`;
        fullDaysTextRes = '\u00A0days';

    } else if (fullAgeYears === 0 &&
        fullAgeMonths !== 0 &&
        fullAgeDays === 0
    ){
        fullYearsRes = '';
        fullYearsTextRes = '';
        fullMonthsRes = `${fullAgeMonths}`;
        fullMonthsTextRes = '\u00A0months\u00A0';
        fullDaysRes = '';
        fullDaysTextRes = '';

    } else if (fullAgeYears !== 0 &&
        fullAgeMonths === 0 &&
        fullAgeDays === 0
    ){
        fullYearsRes = `${fullAgeYears}`;
        fullYearsTextRes = '\u00A0years\u00A0';
        fullMonthsRes = '';
        fullMonthsTextRes = '';
        fullDaysRes = '';
        fullDaysTextRes = '';

    } else{
        errorsForPopup.push('- Not enough time has passed, come back tomorrow!')
        popupShowFunction(errorsForPopup);
        const popup = document.getElementById("popupText");
        if (popup.classList.contains('showPopup')) {
            popup.classList.remove("showPopup");
        }

        const mainContainer = document.getElementById('mainContainerID');
        const hr = document.getElementById('hrLine');
        const resultAgesElement = document.getElementById("resultAges");
        if (mainContainer.classList.contains('newMarginContainer')) {
            mainContainer.classList.remove("newMarginContainer");
            hr.classList.remove('hrShow');
            resultAgesElement.classList.remove("show-result");
        }
    }

    inMonthsRes = `${monthsDifference} `;
    inMonthsTextRes = '\u00A0months';
    inDaysRes = `${daysDifference} `;
    inDayTextsRes = '\u00A0days';

    // вызов функции для вывода результатов
    animateResults(fullYearsRes,
        fullYearsTextRes,
        fullMonthsRes,
        fullMonthsTextRes,
        fullDaysRes,
        fullDaysTextRes,
        inMonthsRes,
        inMonthsTextRes,
        inDaysRes,
        inDayTextsRes);
});
