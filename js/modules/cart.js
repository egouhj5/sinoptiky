export default class Cart {
  constructor() {
    this.cart = [];
    const cartQuantityLabel = document.querySelector(".cart__label")
    const cartQuantityNumber = document.querySelector(".cart-label__number")
    fetch("http://localhost:3000/cart", {method: "GET",})
    .then((Response)=> {
        if(!Response.ok) {
            alert("something is wrong")
        }
        return Response.json();
    })
    .then((data) => {
        cartQuantityNumber.textContent = data.length;
        if(data.length == 0) {
            alert("There are no elements in the cart")
            cartQuantityLabel.classList =+ "hidden";
            cartQuantityNumber.textContent = "";
        } 
    })
    .catch((error)=> {
        console.log(error);
    })
    const addToCart = async (watchId) => {
        try {
            const response = await fetch("http://localhost:3000/watches");
            if (!response.ok) throw new Error("Failed to fetch watches");
            const watches = await response.json();
            let watch = null;
            for (let i = 0; i < watches.length; i++) {
                if (watches[i].id == watchId) {
                    watch = watches[i];
                    break;
                }
            }
            if (!watch) throw new Error("Watch not found");
            this.cart.push(watch);

            await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(watch)
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
//button.getAttribute("watchId")