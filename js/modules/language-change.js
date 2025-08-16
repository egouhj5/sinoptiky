export default class LanguageChange {
    constructor() {
        const button = document.querySelector(".language-change-open__button")
        const modal = document.querySelector(".language-change__modal")
        const blur = document.querySelector(".blur")
        button.addEventListener("click", ()=> {
            modal.classList = "language-change__modal animate";
            blur.classList = "blur"
        })
        blur.addEventListener("click", ()=> {  
            modal.classList = "hidden";
            blur.classList = "hidden";
        })
    }
}