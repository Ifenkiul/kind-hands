"use strict";

//-------------------------------- СЕРВІСИ НАТИСКАННЯ НА ЕЛЕМЕНТ
const servicesItem = document.querySelectorAll(".services__item");
const servicesDetail = document.querySelector(".services__back__detail");

servicesItem.forEach((element) =>
  element.addEventListener("click", function () {
    servicesDetail.classList.toggle("visible__box");
  })
);

servicesDetail.addEventListener("click", function (event) {
  servicesDetail.classList.toggle("visible__box");
});

//----------------------------------------- CERTIFICATES SLIDER
let itemVisible = 0;
let itemPrevious = 0;
const sliderElements = document.querySelectorAll(".certificates__item");

const sliderBtnNext = document.querySelector(".certificates__slider-btn.next");
const sliderBtnPrev = document.querySelector(".certificates__slider-btn.prev");

sliderBtnNext.addEventListener("click", function () {
  itemPrevious = itemVisible;
  if (itemVisible + 1 < sliderElements.length) {
    itemVisible++;
  } else {
    itemVisible = 0;
  }
  certificatesShowSlide(sliderElements, itemVisible, itemPrevious);
});

sliderBtnPrev.addEventListener("click", function () {
  itemPrevious = itemVisible;
  if (itemVisible === 0) {
    itemVisible = sliderElements.length - 1;
  } else {
    itemVisible--;
  }
  certificatesShowSlide(sliderElements, itemVisible, itemPrevious);
});

function certificatesShowSlide(sliderElements, index, indexPrevious) {
  sliderElements[indexPrevious].style.display = "none";
  sliderElements[index].style.display = "block";
}

//--------------------------------------------- РЕАКЦІЯ НА СКРОЛЛ
window.addEventListener("scroll", function () {
  conditionsScrollResult();
  servicesScrollResult();
  certificatesScrollResult();
});

function conditionsScrollResult() {
  const coordinatesConditions = document
    .querySelector(".main__about__conditions")
    .getBoundingClientRect().top;
  // document.querySelector(".counter").innerText = `${coordinatesConditions}`;
  if (coordinatesConditions < 300) {
    // document.querySelector(".counter").innerText += "coordinate <500";
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
}

function servicesScrollResult() {
  const coordinatesServices = document
    .querySelector(".services")
    .getBoundingClientRect().top;
  if (coordinatesServices < 250) {
    document.querySelector(".services").classList.add("services-normal");
  } else {
    document.querySelector(".services").classList.remove("services-normal");
  }
}

function certificatesScrollResult() {
  const coordinatesCertificates = document
    .querySelector(".certificates")
    .getBoundingClientRect().top;
  if (coordinatesCertificates < 350) {
    document
      .querySelector(".certificates")
      .classList.add("certificates-normal");
  } else {
    document
      .querySelector(".certificates")
      .classList.remove("certificates-normal");
  }
}
