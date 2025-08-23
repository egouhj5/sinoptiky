export default class AddToCurt {
  constructor() {
    const modal = document.querySelector(".modal");
    const buttons = document.querySelectorAll(".cell__btns-btn"); // 7 кнопок

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        fetch("https://api.jsonbin.io/v3/b/68a9777243b1c97be9263f1b", {
          method: "GET",
          headers: {
            "X-Access-Key":
              "$2a$10$1EMRcaTIjRPkDXLvChl8iemb9RDzBNxtcESJi3qV2FVMiQOoXKhqe",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const watches = data.record.watches;
            const watch = watches[index];
            if (watch) {
              modal.innerHTML += `
              <div>
                <img class="modal-bg" src="${watch.bg}" alt="" />
                </div>
                <img class="modal-img" src="${watch.img}" alt="" />
                <p>${watch.price}</p>
              <p>${watch.name}</p>`;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  }
}
