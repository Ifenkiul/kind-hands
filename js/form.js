"use strict";

(function () {
  let time = sessionStorage.getItem("time");
  let chosenDay = sessionStorage.getItem("day");
  let formTextArrea = document.querySelector(".mail__form__input.textarea");
  if (time !== null) {
    alert(time);
    formTextArrea.textContent += `Обрана дата: ${chosenDay}\nОбраний час: ${time}\n Запишіть буль ласка тип масажу або запитання замість цього тексту та введіть свої контактні дані вище і ми з Вами звяжемось!`;
    sessionStorage.removeItem("time");
  }
})();
