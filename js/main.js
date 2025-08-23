import Alert from "./modules/alert.js";
import LanguageChange from "./modules/language-change.js";
import Slider from "./modules/slider.js";
import Sort from "./modules/sort.js";
import AddToCurt from "./modules/addToCurt.js";
document.addEventListener("DOMContentLoaded", () => {
  new AddToCurt();
  new Alert();
  new LanguageChange();
  new Slider();
  new Sort();
});
