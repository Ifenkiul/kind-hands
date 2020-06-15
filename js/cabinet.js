"use strict";
(function () {
  // -------------------------- SCHEDULE: json with time loading in object
  let scheduleInfo = [];
  let keysOfSchedule;
  let localDayIndex = 0;

  async function fetchJsonSchedule() {
    const response = await fetch("schedule.json");
    scheduleInfo = await response.json();
    keysOfSchedule = Object.keys(scheduleInfo);

    console.log(scheduleInfo);
    // localDay = keysOfSchedule[localDayIndex];
    scheduleShow(keysOfSchedule[localDayIndex]);

    scheduleTimeArray.forEach((element) =>
      element.addEventListener("click", scheduleClick)
    );
  }
  fetchJsonSchedule();

  // -------------------------- SCHEDULE: loading schedule object content to page

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
  const scheduleChosenDay = document.querySelector(".schedule__day");
  const scheduleTimeArray = document.querySelectorAll(".schedule__hour_div");

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
    const timeIndex = timeArray.indexOf(event.target.innerText);

    if (scheduleInfo[localDay][timeIndex] === true) {
      scheduleInfo[localDay][timeIndex] = false;
    } else {
      scheduleInfo[localDay][timeIndex] = true;
    }

    scheduleShow(keysOfSchedule[localDayIndex]);
  }
  //----------------------------------------- SCHEDULE: write changed object to json
  document.querySelector(".btn__save").addEventListener("click", saveToStorage);

  function saveToStorage() {
    confirmMessage();
    sessionStorage.setItem("Schedule", JSON.stringify(scheduleInfo));
  }

  function confirmMessage() {
    document.querySelector(".msg__confirm").classList.add("visible");
    document.querySelector(
      ".msg__confirm-text"
    ).innerText = `Ви дійсно хочете змінити значеня  в розкладі?`;
  }

  document.querySelectorAll(".msg__confirm-btn").forEach((element) =>
    element.addEventListener("click", function (event) {
      const buttonText = event.target.innerText;
      switch (buttonText) {
        case "OK":
          document.querySelector(".msg__confirm").classList.remove("visible");
          break;
        case "CANCEL":
          sessionStorage.setItem("Schedule", null);
          document.querySelector(".msg__confirm").classList.remove("visible");
          break;
      }
    })
  );

  //   function login() {
  //     // e.preventDefault();

  //     fetch("login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: JSON.stringify(scheduleInfo),
  //     });
  //   }
})();
