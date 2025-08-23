export default class CartLoad {
    constructor() {
        const createElement = document.querySelector(".cart__table");
        fetch("http://localhost:3000/cart", {method:"GET"})
        .then((Response) =>{
            if(!Response.ok) {
                console.log("something is wrong");
            }
            return Response.json();
        })
        .then((data) => {
            data.forEach(element => {
            createElement.innerHTML += `
                <tr class="cart-table__item">
                    <td class="cart-product__cell">
                    <div class="cart__product">
                        <div class="cart-talbe-item__image" style="background: url('${element.bgimage}') no-repeat; background-size: 120%; background-position: center;"><img src="${element.image}" alt=""></div>
                        <p>${element.name}</p>
                    </div>
                    </td>
                    <td>$${element.price}</td>
                    <td>
                    <div class="cart-table__quantity">
                        <button>-</button>
                        <p>1</p>
                        <button>+</button>
                    </div>
                    </td>
                    <td>$50</td>
                </tr>
            `;   
            });

        })
        .catch((error) => {
            console.log(error);
        })
        console.log("script has ended");
    }
}