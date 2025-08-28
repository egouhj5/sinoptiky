import Alert from "./modules/alert.js";
import Slider from "./modules/slider.js";
import LanguageChange from "./modules/language-change.js";
import Cart from "./modules/cart-add.js";
import CartLoad from "./modules/cart-content-load.js"
import CartRemove from "./modules/cart-remove.js";
import Sort from "./modules/sort.js";
document.addEventListener("DOMContentLoaded", () => {
  new Alert();
  new LanguageChange();
  new Slider(); 
  new CartLoad();
  new Cart();
  new CartRemove();
  new Sort();
});
const slides = document.querySelectorAll(".hero__img");
const buttons = document.querySelectorAll(".watchbox__slider-list button");

let current = 0;

function showSlide(index) {
  if (index === current) return;

  const currentSlide = slides[current];
  const nextSlide = slides[index];

  currentSlide.classList.remove("active");
  currentSlide.classList.add("exit");

  // убрать класс exit после анимации
  setTimeout(() => currentSlide.classList.remove("exit"), 600);

  nextSlide.classList.add("active");

  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  current = index;
}

buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => showSlide(index));
});
showSlide(0);