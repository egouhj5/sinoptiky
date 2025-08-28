export default class CartLoad {
  constructor() {
    this.apiUrl = "https://api.jsonbin.io/v3/b/68a9ea2c43b1c97be92698a3";
    this.masterKey =
      "$2a$10$D9ztOK.76KiAO/wETsn73eX1SinE2r7hQOCdIJTnGIVxmz2ECERL2";

    this.loadCart();
  }

  async loadCart() {
    try {
      const res = await fetch(`${this.apiUrl}/latest`, {
        method: "GET",
        headers: { "X-Access-Key": this.masterKey },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      const cartItems = data.record.cart || [];

      const grouped = {};
      cartItems.forEach((item) => {
        if (grouped[item.id]) {
          grouped[item.id].quantity++;
        } else {
          grouped[item.id] = { ...item, quantity: 1 };
        }
      });

      this.renderCart(grouped);
    } catch (error) {
      console.log(error);
    }
  }

  async saveCart(grouped) {
    try {
      const res = await fetch(`${this.apiUrl}/latest`, {
        method: "GET",
        headers: { "X-Access-Key": this.masterKey },
      });

      const data = await res.json();
      const apiData = data.record;

      const newCart = Object.values(grouped).flatMap((item) =>
        Array(item.quantity).fill({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          bgimage: item.bgimage,
        })
      );

      await fetch(this.apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": this.masterKey,
        },
        body: JSON.stringify({
          ...apiData,
          cart: newCart, // replace only the cart section
        }),
      });
    } catch (error) {
      console.log("Error saving cart:", error);
    }
  }

  updateTotalPrice(grouped) {
    const totalPrice = document.querySelector(".cart-menu-total__price");
    if (totalPrice) {
      const total = Object.values(grouped).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      totalPrice.textContent = `$${total}`;
    }
  }

  renderCart(grouped) {
    const table = document.querySelector(".cart__table");

    let tableBody = table.querySelector("tbody");
    if (!tableBody) {
      tableBody = document.createElement("tbody");
      table.appendChild(tableBody);
    }
    Object.values(grouped).forEach((element) => {
      tableBody.innerHTML += `
        <tr class="cart-table__item">
          <td class="cart-product__cell">
            <div class="cart__product">
              <div class="cart-talbe-item__image" style="background: url('${
                element.bgimage
              }') no-repeat; background-size: 120%; background-position: center;">
                <button class="cart-item__remove" itemToDelete="${
                  element.id
                }"><img src="./images/cross-icon.png"></img></button>
                <img src="${element.image}" alt="" class="${element.class}">
              </div>
              <p>${element.name}</p>
            </div>
          </td>
          <td class="cart-product__price">$${element.price}</td>
          <td>
            <div class="cart-table__quantity">
              <button class="cart-table-add__button">-</button>
              <p class="cart-table-quantity__number">${element.quantity}</p>
              <button class="cart-table-remove__button">+</button>
            </div>
          </td>
          <td class="cart-product__total">$${
            element.price * element.quantity
          }</td>
        </tr>
      `;
    });

    tableBody.querySelectorAll(".cart-table__item").forEach((row) => {
      const minusBtn = row.querySelector(".cart-table-add__button");
      const plusBtn = row.querySelector(".cart-table-remove__button");
      const quantityNumber = row.querySelector(".cart-table-quantity__number");
      const totalPriceCell = row.querySelector(".cart-product__total");
      const name = row.querySelector("p").textContent;
      const removeBtn = row.querySelector(".cart-item__remove");
      removeBtn.addEventListener("click", () => {
        fetch(`${this.apiUrl}/latest`, {
          method: "GET",
          headers: { "X-Access-Key": this.masterKey },
        })
          .then((Response) => {
            if (!Response.ok) {
              console.log("something went wrong with the remove fetch#!");
            }
            return Response.json();
          })
          .then((data) => {
            const apiData = data.record;
            const cart = data.record.cart;
            const updatedCart = cart.filter(
              (item) => item.id !== removeBtn.getAttribute("itemToDelete")
            );
            console.log(updatedCart);
            fetch(`${this.apiUrl}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "X-Access-Key": this.masterKey,
              },
              body: JSON.stringify({
                ...apiData,
                cart: updatedCart,
              }),
            })
              .then((res) => {
                if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
                return res.json();
              })
              .then((data) => {
                    location.reload();
              })
              .catch((err) => console.error("PUT error:", err));
          })
          .catch((error) => {
            console.log(error);
          });

      });
      

      const element = Object.values(grouped).find((e) => e.name === name);
      let quantity = element.quantity;
      const unitPrice = parseFloat(element.price);

      minusBtn.addEventListener("click", async () => {
        if (quantity > 1) {
          quantity--;
          quantityNumber.textContent = quantity;
          totalPriceCell.textContent = `$${unitPrice * quantity}`;
          grouped[element.id].quantity = quantity;
          await this.saveCart(grouped);
          this.updateTotalPrice(grouped);
        }
      });

      plusBtn.addEventListener("click", async () => {
        quantity++;
        quantityNumber.textContent = quantity;
        totalPriceCell.textContent = `$${unitPrice * quantity}`;
        grouped[element.id].quantity = quantity;
        await this.saveCart(grouped);
        this.updateTotalPrice(grouped);
      });
    });

    this.updateTotalPrice(grouped);
  }
}
