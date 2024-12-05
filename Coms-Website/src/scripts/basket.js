const container = document.getElementById("container");
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

  //if not on basket page
  if(container == null) return;

  container.innerHTML = ""; //empty

  let item_count = 1;
  //if for some reason no item_arr
  if(item_arr == null) return;

  for(let i = 0; i < item_arr.length; i++) {
    let item = item_arr[i];
    if(item !== null) {
      container.innerHTML+=`<p>${item_count}. ${item} <button class="order-item" onclick='removeFromBasket(${i})'>X <\p>`;
      item_count++;
    }
  }

  //if empty disable checkout button 
  if(item_count == 1) {
    //TODO
  }
}

function getShoppingCart() {
  if (window.parent !== window) {
    // If in an iframe, return the parent's shopping cart
    return window.parent.document.getElementById("shopping-cart");
  } else {
    // If in the parent window, return the local shopping cart
    return window.document.getElementById("shopping-cart");
}
}

function updateShoppingCart(item_num) {
  if(shoppingCart !== null) {
    shoppingCart.textContent = `Shopping Cart (${item_num})`
  } else if (shoppingCartParent !== null) {
    shoppingCartParent.textContent = `Shopping Cart (${item_num})`
  } else {
    console.log("none!");
  }
}

window.addEventListener("DOMContentLoaded", onInit());