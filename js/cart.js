const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const url = '/js/jackets.json';
const main = document.querySelector('.detailsmain');
const delay = 1000;
const adcbutton = document.querySelector('.adcbutton')
const productsinCart = document.querySelector('.productsinCart');
const shoppingCart = document.querySelector('.shoppingcart');
const cartIcon = document.querySelector('#cart');
let shoppingCartOpen = false;

fetch(url)
.then(function(response){
    return response.json();
})
.then(function(data) {
    localStorage.setItem("products", JSON.stringify(data));
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]");
    }
});

export let products = [
    {
    name: "Expedition",
    id: 1,
    price: 194,
    description: "A durable and thick jacket designed to keep you warm and dry on your adventures.",
    src: "../media/RainyDays_Jacket1.png",
    color1: "grey",
    color2: "black",
    color3: "orange",
    },
    {
    name: "Explorer",
    id: 2,
    price: 96,
    description: "Warm and insulated jacket with zippered hand pockets",
    src: "../media/RainyDays_Jacket2.png",
    color1: "grey",
    color2: "black",
    color3: "white",
    },
    {
    name: "Hercules",
    id: 3,
    price: 74,
    description: "Waterproof and breathable jacket with underarm vents and adjustable cuffs",
    src: "../media/RainyDays_Jacket3.png",
    color1: "red",
    color2: "blue",
    color3: "black",
    },
    {
    name: "Storm",
    id: 4,
    price: 125 ,
    description: "Insulated and windproof jacket with adjustable hem and cuffs",
    src: "../media/RainyDays_Jacket4.png",
    color1: "grey",
    color2: "white",
    color3: "black",
    },
     {
    name: "Charge",
    id: 5,
    description: "Windproof and water-resistant jacket with detachable hood",
    price: 274,
    src: "../media/RainyDays_Jacket5.png",
    color1: "grey",
    color2: "blue",
    color3: "black",
    },
    {
    name: "Sleek",
    id: 6,
    price: 83,
    description: "Water-resistant lightweight jacket with breathable mesh lining",
    src: "../media/RainyDays_Jacket6.png",
    color1: "grey",
    color2: "black",
    color3: "yellow",
    },
     {
     name: "Heat",
     id: 7,
     price: 95,
     description: "A durable and thick wool jacket perfect for camping trips",
     src: "../media/RainyDays_Jacket7.png",
     color1: "red",
     color2: "blue",
     color3: "black",
      }
]

let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addItemToCart(productId) {
    let product = products.find(function(product){
        return product.id == productId;
    });
    if(product){
        if(cart.length == 0) {
            cart.push(product);
        } else {
            let res = cart.find(element => element.id == productId);
            if(res === undefined) {
                cart.push(product);
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayItemsCart()
    }
}

export function removeItemFromCart(productId) {
    let temp = cart.filter(item => item.id != productId)
    localStorage.setItem("cart", JSON.stringify(temp))
    displayItemsCart()
}

export function getTotal() {
    let temp = cart.map(function(item){
        return parseFloat(item.price);
    });

    let sum = temp.reduce(function(prev, next) {
        return prev + next
    }, 0);
    return sum
}
cartIcon.onclick = () => {
    displayItemsCart();
    if (!shoppingCartOpen) {
        shoppingCart.style.display = "flex";
        shoppingCartOpen = true;    
    } else {
        shoppingCart.style.display = "none";
       shoppingCartOpen = false;
       
    }
}

export function displayItemsCart() {
    if (cart.length == 0) {
      productsinCart.innerHTML = "You have no products in the shopping cart";
    } else {
      let html = "";
      for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        html += `
        <div class="container-cart">
            <div class='product'>${product.name}</div>
            <div class="imgcart-cont">
            <img class="imagecart" src="${product.src}">
            </div>
            <div class="pricecart">$${product.price}</div>
        </div>
        `;
      }
      productsinCart.innerHTML = html;
    }
  }
    let totalcost = getTotal();
  const total = document.createElement('p');
  total.classList.add('price-cart');
  total.innerHTML = `Total: $${totalcost}`
  shoppingCart.appendChild(total)
  const checkoutbtn = document.createElement('a');
  checkoutbtn.classList.add('checkoutbtn');
  checkoutbtn.href = "/pages/checkout.html";
  checkoutbtn.innerHTML = "Checkout"
  shoppingCart.appendChild(checkoutbtn)
