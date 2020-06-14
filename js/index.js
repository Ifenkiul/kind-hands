"use strict";
const scheduleChosenDay = document.querySelector(".schedule__day");
const scheduleTimeArray = document.querySelectorAll(".schedule__hour_div");
const timeArray = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
];
(function () {
  //--------------------------------------------- SCROLL REACTION
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

  //------------------------  SERVICES: Loading json with info
  let servicesInfo = [];
  let keysofServices;
  async function fetchJson() {
    const response = await fetch("json/services.json");
    servicesInfo = await response.json();
    keysofServices = Object.keys(servicesInfo);
  }
  fetchJson();

  //-------------------------------- SERVICES: click on element
  const servicesItem = document.querySelectorAll(".services__item");
  const servicesDetail = document.querySelector(".services__back__detail");
  const servicesText = document.querySelector(".services__text");
  const servicesTextTitle = document.querySelector(".services__text-title");

  servicesItem.forEach((element) =>
    element.addEventListener("click", servicesLoadText)
  );

  servicesDetail.addEventListener("click", function (event) {
    servicesDetail.classList.toggle("visible__box");
  });

  function servicesLoadText(event) {
    let index = -1;

    servicesDetail.classList.toggle("visible__box");

    switch (event.currentTarget.id) {
      case "classic__back":
        index = 0;
        break;
      case "neck":
        index = 1;
        break;
      case "lymfo__drenage":
        index = 2;
        break;
      case "chest":
        index = 3;
        break;
      case "anti__cellulite":
        index = 4;
        break;
      case "hands":
        index = 5;
        break;
    }
    if (index !== -1) {
      servicesTextTitle.textContent = keysofServices[index];
      servicesText.textContent = servicesInfo[keysofServices[index]];
    }
  }

  //----------------------------------------- CERTIFICATES SLIDER
  let itemVisible = 0;
  let itemPrevious = 0;

  const sliderElements = document.querySelectorAll(".certificates__item");
  const sliderBtnNext = document.querySelector(
    ".certificates__slider-btn.next"
  );
  const sliderBtnPrev = document.querySelector(
    ".certificates__slider-btn.prev"
  );

  sliderBtnNext.addEventListener("click", function () {
    itemPrevious = itemVisible;
    itemVisible++;
    if (itemVisible >= sliderElements.length) {
      itemVisible = 0;
    }
    certificatesShowSlide(sliderElements, itemVisible, itemPrevious);
  });

  sliderBtnPrev.addEventListener("click", function () {
    itemPrevious = itemVisible;
    itemVisible--;
    if (itemVisible < 0) {
      itemVisible = sliderElements.length - 1;
    }
    certificatesShowSlide(sliderElements, itemVisible, itemPrevious);
  });

  function certificatesShowSlide(sliderElements, index, indexPrevious) {
    console.log(sliderElements[index].id);
    sliderElements[indexPrevious].style.display = "none";
    sliderElements[index].style.display = "block";
  }

  // -------------------------- SCHEDULE: json with time loading in object
  let scheduleInfo = [];
  let keysOfSchedule;
  let localDayIndex = 0;

  async function fetchJsonSchedule() {
    let storageObj = sessionStorage.getItem("Schedule");

    if (storageObj !== null) {
      scheduleInfo = JSON.parse(storageObj);
    } else {
      const response = await fetch("schedule.json");
      scheduleInfo = await response.json();
    }

    keysOfSchedule = Object.keys(scheduleInfo);
    scheduleShow(keysOfSchedule[localDayIndex]);

    scheduleTimeArray.forEach((element) =>
      element.addEventListener("click", scheduleClick)
    );
  }
  fetchJsonSchedule();

  //-------------------------------- SCHEDULE: shows schedule for specific day
  function scheduleShow(day) {
    scheduleChosenDay.textContent = day;
    let localDayInfo = scheduleInfo[day];

    for (let i = 0; i < localDayInfo.length; i++) {
      scheduleTimeArray[i].textContent = timeArray[i];
      scheduleTimeArray[i].classList.remove("taken");

      if (localDayInfo[i] === true) {
        scheduleTimeArray[i].classList.add("taken");
      }
    }
  }

  //---------------------------------- SCHEDULE: days navigation
  document
    .querySelectorAll(".schedule__header__btn")
    .forEach((element) => element.addEventListener("click", scheduleBtnClick));

  function scheduleBtnClick(event) {
    switch (event.target) {
      case document.querySelector(".schedule__header__btn.prev"):
        if (localDayIndex - 1 >= 0) {
          localDayIndex--;
        }
        break;

      case document.querySelector(".schedule__header__btn.next"):
        if (localDayIndex + 1 < keysOfSchedule.length) {
          localDayIndex++;
        }
        break;
    }
    scheduleShow(keysOfSchedule[localDayIndex]);
  }

  //---------------------------------- SCEDULE: click on element

  function scheduleClick(event) {
    const localDay = keysOfSchedule[localDayIndex];
    let localDayInfo = scheduleInfo[localDay];
    const timeIndex = timeArray.indexOf(event.target.innerText);

    if (localDayInfo[timeIndex] === true) {
      alert(
        "Вибачте, цей час нажаль зайнято. Всі зайняті проміжки часу відмічені червоним."
      );
    } else {
      let confirmBox = confirm(
        "Ви обрали дату " +
          localDay +
          " та час " +
          timeArray[timeIndex] +
          ". Чи хочете записатись на цей час на масаж?"
      );
      if (confirmBox) {
        document.location.href = "form.html";
        sessionStorage.setItem("day", localDay);
        sessionStorage.setItem("time", timeArray[timeIndex]);
      }
    }
  }
  //--------------------------------- MODAL WINDOW
  let openOrNot = Math.floor(Math.random() * 4);
  if (openOrNot === 0) {
    document.querySelector(".present__modal").style.display = "flex";
  }
  document
    .querySelector(".present__modal")
    .addEventListener(
      "click",
      (event) => (event.currentTarget.style.display = "none")
    );

  //----------------------------- PERSONAL CABINET
  const cabinetLoginForm = document.querySelector(".cabinet__login");

  document
    .querySelector(".cabinet__link__btn")
    .addEventListener("click", function () {
      cabinetLoginForm.classList.toggle("cabinet__login__visible");
    });

  cabinetLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameEntered = document.querySelector(
      ".cabinet__login__form-input.name"
    );
    const passwordEntered = document.querySelector(
      ".cabinet__login__form-input.password"
    );
    if (nameEntered.value === "admin" && passwordEntered.value === "admin") {
      document.location.href = "cabinet.html";
    } else {
      alert("Ви ввели неправильний логін чи пароль. Спробуйте ще раз.");
      nameEntered.value = "";
      passwordEntered.value = "";
    }
  });
})();
