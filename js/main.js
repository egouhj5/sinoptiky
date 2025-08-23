import Alert from "./modules/alert.js";
import Slider from "./modules/slider.js";
import Sort from "./modules/sort.js";
import LanguageChange from "./modules/language-change.js";
import Cart from "./modules/cart.js";
import CartLoad from "./modules/cart-content-load.js"
document.addEventListener("DOMContentLoaded", () => {
  new Alert();
  new LanguageChange();
  new Slider(); 
  new Cart();
  new CartLoad();
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