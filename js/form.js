"use strict";

(function () {
  let chosenTime = sessionStorage.getItem("time");
  let chosenDay = sessionStorage.getItem("day");
  let formTextArrea = document.querySelector(".mail__form__input.textarea");
  if (
    chosenTime !== null &&
    chosenDay !== null &&
    chosenTime !== "" &&
    chosenDay !== ""
  ) {
    formTextArrea.textContent += `Обрана дата: ${chosenDay}\nОбраний час: ${chosenTime}\n Оберіть будь ласка тип масажу та  введіть свої контактні дані вище і ми з Вами звяжемось!`;
    sessionStorage.removeItem("time");
    sessionStorage.removeItem("day");
  }
})();
