"use strict";

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
const sliderBtnNext = document.querySelector(".certificates__slider-btn.next");
const sliderBtnPrev = document.querySelector(".certificates__slider-btn.prev");

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
// -------------------------- SCHEDULE: json with time loading in object
let scheduleInfo = [];
let keysOfSchedule;
let localDay = "";
let localDayIndex = 0;

async function fetchJsonSchedule() {
  const response = await fetch("schedule.json");
  scheduleInfo = await response.json();
  keysOfSchedule = Object.keys(scheduleInfo);

  console.log(scheduleInfo);
  localDay = keysOfSchedule[localDayIndex];
  scheduleShow(localDay);

  scheduleTimeArray.forEach((element) =>
    element.addEventListener("click", scheduleClick)
  );
}
fetchJsonSchedule();

// -------------------------- SCHEDULE: loading schedule object content to page

const timeArray = [
  "9:00 - 9:30",
  "9:30 - 10:00",
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 13:00",
  "13:00 - 13:30",
  "13:30 - 14:00",
];
const scheduleChosenDay = document.querySelector(".schedule__day");
const scheduleTimeArray = document.querySelectorAll(".shedule__hour_div");

//-------------------------------- SCHEDULE: shows schedule for specific day
function scheduleShow(day) {
  console.log("local day = " + day);
  scheduleChosenDay.textContent = day;
  let localDayInfo = scheduleInfo[day];

  for (let i = 0; i < localDayInfo.length; i++) {
    console.log(localDayInfo[i]);
    scheduleTimeArray[i].textContent = timeArray[i];
    if (localDayInfo[i] === true) {
      scheduleTimeArray[i].classList.add("taken");
    }
  }
}

//---------------------------------- SCEDULE: click on element

function scheduleClick(event) {
  console.log(event.target.innerText);
  let localDayInfo = scheduleInfo[localDay];
  const timeIndex = timeArray.indexOf(event.target.innerText);

  scheduleChosenDay.textContent = `${timeIndex}`;
  if (localDayInfo[timeIndex] === true) {
    alert("Sorry dude, this time is taken");
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
