const container = document.getElementById("container");
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
  console.log("listing items!");
  
  //if not on basket page
  if(container == null) return;
  container.innerHTML = ""; //empty

  let item_count = 1;
  item_arr = JSON.parse(localStorage.getItem("items"));
  //if for some reason no item_arr
  if(item_arr == null) return;

  for(let i = 0; i < item_arr.length; i++) {
    let item = item_arr[i];
    if(item !== null) {
      container.innerHTML+=`<p>${item_count}. ${item} <button onclick='removeFromBasket(${i})'>X <\p>`;
      item_count++;
    }
  }
  
  //if empty disable checkout button 
  if(item_count == 1) {
    //TODO
  }
}

window.addEventListener("DOMContentLoaded", onInit());