//НАТИСКАННЯ НА БУРГЕР КНОПКУ
const burgerBtn = document.querySelector(".header__toolbar__burger");
burgerBtn.addEventListener("click", function () {
  document.querySelector(".header__menu").classList.toggle("menu-burger");
  burgerBtn.classList.toggle("header__toolbar__burger-clicked");
});

//ФІКСАЦІЯ ГОЛОВНОГО МЕНЮ ПРИ СКРОЛІ
const toolbar = document.querySelector(".header__toolbar");

window.addEventListener("scroll", function () {
  const windowScroll = this.pageYOffset;

  if (windowScroll > 400) {
    toolbar.classList.add("header__tolbar-fixed");
  } else toolbar.classList.remove("header__tolbar-fixed");
});
