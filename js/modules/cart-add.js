export default class Cart {
  constructor() {
    this.cart = [];
    const cartQuantityLabel = document.querySelector(".cart__label");
    const cartQuantityNumber = document.querySelector(".cart-label__number");
    fetch("https://api.jsonbin.io/v3/b/68a9ea2c43b1c97be92698a3/latest", {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2a$10$WlTTn6Z8aHKP2rWanszDUuK9ZJYTj8vg.0ARfJK2hV0WXNJpYUTOi",
      },
    })
      .then((Response) => {
        if (!Response.ok) {
          alert("something is wrong");
        }
        return Response.json();
      })
      .then((data) => {
        const cart = data.record.cart;
        cartQuantityNumber.textContent = cart.length;
        if (cart.length == 0) {
          cartQuantityLabel.classList =+ "hidden";
          cartQuantityNumber.textContent = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const addToCart = async (watchId) => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/68a9ea2c43b1c97be92698a3/latest",
          {
            method: "GET",
            headers: {
              "X-Master-Key":
                "$2a$10$WlTTn6Z8aHKP2rWanszDUuK9ZJYTj8vg.0ARfJK2hV0WXNJpYUTOi",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch watches");
        const data = await response.json();

        const watches = data.record.watches;
        let watch = null;
        for (let i = 0; i < watches.length; i++) {
          if (watches[i].id == watchId) {
            watch = watches[i];
            break;
          }
        }
        if (!watch) throw new Error("Watch not found");

        this.cart.push(watch);

        await fetch("https://api.jsonbin.io/v3/b/68a9ea2c43b1c97be92698a3", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$WlTTn6Z8aHKP2rWanszDUuK9ZJYTj8vg.0ARfJK2hV0WXNJpYUTOi",
          },
          body: JSON.stringify({
            ...data.record,
            cart: [...(data.record.cart || []), watch],
          }),
        });
      } catch (error) {
        alert(error.message);
      }
    };

    const buttons = document.querySelectorAll(".featured-add__curt");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const watchId = button.getAttribute("watchId");
        if (watchId) {
          addToCart(watchId);
        } else {
          alert("No watchId found on button!");
        }
      });
    });
  }
}
fetch("asda", { method: "GET" })
  .then((Response) => {
    if (!Response.ok) {
      console.log("something is wrong");
    }
    return Response.json;
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
