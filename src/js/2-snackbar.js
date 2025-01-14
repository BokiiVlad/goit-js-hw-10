// // Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formElement = document.querySelector("form");
console.dir(formElement);

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const snackbarPrimise = () => {

        const delay = Number(formElement.elements.delay.value);
        const radioButValue = formElement.elements.state.value

        const promise = new Promise(((resolve, reject) => {
            setTimeout(() => {
                if (radioButValue === "fulfilled") {
                    resolve(delay)
                } else {
                    reject(delay)
                }
            }, delay)
        }))
        return promise;
    }
    snackbarPrimise()
        .then((delay) => {
            iziToast.success({
                title: 'Done',
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`
            });
        })
    formElement.reset();
})