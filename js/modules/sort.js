export default class Sort {
  constructor() {
    const allTimesInput = document.getElementById("allTimes");
    const menTimesInput = document.getElementById("menTimes");
    const womenTimesInput = document.getElementById("womenTimes");
    const sportsTimesInput = document.getElementById("sportsTimes");
    const trendTimesInput = document.getElementById("trendTimes");
    const menTimes = document.querySelectorAll('[data-category="men"]');
    const womenTimes = document.querySelectorAll('[data-category="women"]');
    const sportsTimes = document.querySelectorAll('[data-category="sport"]');

    allTimesInput.addEventListener("click", () => {
      menTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
      womenTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
      sportsTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
    });
    menTimesInput.addEventListener("click", () => {
      menTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
      womenTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      sportsTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
    });
    womenTimesInput.addEventListener("click", () => {
      menTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      womenTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
      sportsTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
    });
    sportsTimesInput.addEventListener("click", () => {
      menTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      womenTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      sportsTimes.forEach((element) => {
        element.classList.remove("visually-hidden");
      });
    });
    trendTimesInput.addEventListener("click", () => {
      menTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      womenTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
      sportsTimes.forEach((element) => {
        element.classList.add("visually-hidden");
      });
    });
  }
}
