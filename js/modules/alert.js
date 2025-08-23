export default class Alert {
  constructor() {
    const modal = document.querySelector(".modal");
    const cart = document.querySelector(".header__shopping-cart");

    cart.addEventListener("click", () => {
      if (modal.classList.contains("visually-hidden")) {
        modal.classList.remove("visually-hidden");
      } else {
        modal.classList.add("visually-hidden");
      }
    });
  }
}
