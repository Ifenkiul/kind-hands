"use strict";

(function () {
  let chosenTime = sessionStorage.getItem("time");
  let chosenDay = sessionStorage.getItem("day");
  let formTextArrea = document.querySelector(".mail__form__input.textarea");
  if (chosenTime !== null && chosenDay !== null) {
    formTextArrea.textContent += `Обрана дата: ${chosenDay}\nОбраний час: ${chosenTime}\n Запишіть буль ласка тип масажу або запитання замість цього тексту та введіть свої контактні дані вище і ми з Вами звяжемось!`;
    sessionStorage.removeItem("time");
    sessionStorage.removeItem("day");
  }
})();
