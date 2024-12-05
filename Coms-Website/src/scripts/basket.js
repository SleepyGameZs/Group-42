const container = document.getElementById("container");
const pricing = document.getElementById("pricing");
const shoppingCart = getShoppingCart();
let item_arr = [];

function onInit() {
  let items = localStorage.getItem("items");
  if(items == null) {
    localStorage.setItem("items", JSON.stringify(item_arr));
  }
  listItems();
}

function addToBasket(item) {
  try {
    item_arr = JSON.parse(localStorage.getItem("items"));
  } catch (error) {
    console.error(error);
    return;
  }

  item_arr.push(item);
  console.log("added " + item);
  updateShoppingCart(item_arr.length);
  localStorage.setItem("items", JSON.stringify(item_arr));
}

function removeFromBasket(item_num) {
  item_arr = JSON.parse(localStorage.getItem("items"));
  item_arr = item_arr.slice(0,item_num).concat(item_arr.slice(item_num + 1, item_arr.length));
  localStorage.setItem("items", JSON.stringify(item_arr));
  console.log("removed " + item_num);
  listItems();
}

function empty() {
  localStorage.setItem("items", JSON.stringify([]));
  listItems();
}

function listItems() {
  item_arr = JSON.parse(localStorage.getItem("items"));

  //update shopping basket content
  updateShoppingCart(item_arr.length);

  //if not on basket page or no item_arr
  if(container == null || item_arr == null) return;

  //if basket is empty
  if(item_arr.length == 0) {
    pricing.hidden = true;
    container.textContent = "Your basket is empty."
    return;
  }

  container.innerHTML = ""; //empty
  let item_total = 0;
  for(let i = 0; i < item_arr.length; i++) {
    let item = item_arr[i];
    if(item !== null) {
      container.innerHTML+=`<p>${i+1}. ${item.name} - $${item.cost} <button class="order-item" onclick='removeFromBasket(${i})'>X <\p>`;
      item_total += item.cost;
    }
  }    
  updatePricing(item_total);
}

function getShoppingCart() {
  if (window.parent !== window) {
    // If in an iframe, return the parent's shopping cart
    return window.parent.document.getElementById("cart-num");
  } else {
    // If in the parent window, return the local shopping cart
    return window.document.getElementById("cart-num");
}
}

function updateShoppingCart(item_num) {
  if(shoppingCart !== null) {
    shoppingCart.textContent = `(${item_num})`
  } else if (shoppingCartParent !== null) {
    shoppingCartParent.textContent = `(${item_num})`
  }
}

function updatePricing(item_total) {
  pricing.hidden = false;
  let payment_select = pricing.children[0];
  let subtotal = pricing.children[2];
  let tax = pricing.children[3];
  let total = pricing.children[4];

  //perform calculations
  //uses 8% standard NYS sales tax
  //.lastChild modifies only the internal <span>
  let tax_percent = payment_select.value == "credit" ? 0.08 : 0;
  subtotal.lastChild.textContent = item_total.toFixed(2);
  tax.lastChild.textContent = (item_total * tax_percent).toFixed(2);
  total.lastChild.textContent = (item_total * (1 + tax_percent)).toFixed(2);


}

window.addEventListener("DOMContentLoaded", onInit());