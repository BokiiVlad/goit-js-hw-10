// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// // Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const butStart = document.querySelector(".button-main");
const timeInput = document.querySelector("#datetime-picker");
const fieldDays = document.querySelector("[data-days]");
const fieldHours = document.querySelector("[data-hours]");
const fieldMinutes = document.querySelector("[data-minutes]");
const fieldSeconds = document.querySelector("[data-seconds]");
//  вибраний час
console.dir(fieldDays)
let userSelectedDate = null;
butStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    elements: {
        days: fieldDays,
        hours: fieldHours,
        minutes: fieldMinutes,
        seconds: fieldSeconds,
    },
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (Date.now() > selectedDates[0].getTime()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future.'
            });
            butStart.disabled = true;
            return;
        } else {
            butStart.disabled = false;
        }
        userSelectedDate = selectedDates[0].getTime();
    },
};

flatpickr(timeInput, options);

butStart.addEventListener("click", () => {
    butStart.disabled = true;
    const secondInterval = setInterval(() => {
        const timeDifferense = userSelectedDate - Date.now();
        const timeObj = convertMs(timeDifferense);
        fieldDays.textContent = addLeadingZero(timeObj.days);
        fieldHours.textContent = addLeadingZero(timeObj.hours);
        fieldMinutes.textContent = addLeadingZero(timeObj.minutes);
        fieldSeconds.textContent = addLeadingZero(timeObj.seconds);
        if (timeDifferense <= 0) {
            clearInterval(secondInterval);
            butStart.disabled = true;
            fieldDays.textContent = "00";
            fieldHours.textContent = "00";
            fieldMinutes.textContent = "00";
            fieldSeconds.textContent = "00";
        }
    }, 1000)


    function convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }

});

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}