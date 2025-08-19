import Alert from "./modules/alert.js";
import LanguageChange from "./modules/language-change.js";
import Slider from "./modules/slider.js";
import Sort from "./modules/sort.js";
document.addEventListener("DOMContentLoaded", () => {
  new Alert();
  new LanguageChange();
  new Slider();
  new Sort();
});
