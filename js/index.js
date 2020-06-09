"use strict";

$(".services__item").click(function (event) {
  $(".services__back__detail").toggleClass("visible__box");
});

$(".services__back__detail").click(function (event) {
  $(".services__back__detail").toggleClass("visible__box");
});

window.addEventListener("scroll", function () {
  const coordinatesConditions = document
    .querySelector(".main__about__conditions")
    .getBoundingClientRect().top;
  document.querySelector(".counter").innerText = `${coordinatesConditions}`;
  if (coordinatesConditions < 300) {
    document.querySelector(".counter").innerText += "coordinate <500";
    document
      .querySelector(".main__about__todo")
      .classList.add("main__about__todo-normal");
    document
      .querySelector(".main__about__nottodo")
      .classList.add("main__about__nottodo-normal");
  } else {
    document
      .querySelector(".main__about__todo")
      .classList.remove("main__about__todo-normal");
    document
      .querySelector(".main__about__nottodo")
      .classList.remove("main__about__nottodo-normal");
  }
  const coordinatesServices = document
    .querySelector(".services")
    .getBoundingClientRect().top;
  if (coordinatesServices < 250) {
    document.querySelector(".services").classList.add("services-normal");
  } else {
    document.querySelector(".services").classList.remove("services-normal");
  }
});
