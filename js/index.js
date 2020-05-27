"use strict";

$(".services__item").click(function (event) {
  $(".services__back__detail").toggleClass("visible__box");
});

$(".services__back__detail").click(function (event) {
  $(".services__back__detail").toggleClass("visible__box");
});

$(".header__toolbar__burger").click(function (event) {
  $(".header__menu").toggleClass("menu-burger");
});
