//НАТИСКАННЯ НА БУРГЕР КНОПКУ
const burgerBtn = document.querySelector(".header__toolbar__burger");
burgerBtn.addEventListener("click", function () {
  document.querySelector(".header__menu").classList.toggle("menu-burger");
  burgerBtn.classList.toggle("header__toolbar__burger-clicked");
});

//ФІКСАЦІЯ ГОЛОВНОГО МЕНЮ ПРИ СКРОЛІ
const toolbar = document.querySelector(".header__toolbar");

window.addEventListener("scroll", function () {
  const windowScroll = window.scrollY;

  if (windowScroll > 80) {
    toolbar.classList.add("header__tolbar-fixed");
  } else toolbar.classList.remove("header__tolbar-fixed");
});

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
    alert("allesgut");
    document.location.href = "cabinet.html";
  } else {
    alert(
      "oh u a piece of shit, u bastard... Trying to break my defence mufucka"
    );
  }
});
