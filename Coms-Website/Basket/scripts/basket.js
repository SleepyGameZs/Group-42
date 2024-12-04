const container = document.getElementById("container");

function addToBasket(item) {
  item_num = localStorage.getItem("num");
  if(item_num == null) item_num = 0;

  localStorage.setItem(item_num, item);
  console.log("added " + item);

  item_num++;
  localStorage.setItem("num", item_num);
}

function removeFromBasket(item_num) {
  localStorage.removeItem(item_num);
  console.log("removed " + item_num);
  listItems();
}

function empty() {
  localStorage.clear();
  item_num = 1;
  localStorage.setItem("num", 0);
}

function listItems() {
  console.log("listing items!");
  container.innerHTML = ""; //empty

  let item_count = 1;
  item_num = localStorage.getItem("num");
  for(let i = 0; i < item_num; i++) {
    let item = localStorage.getItem(i);
    if(item !== null) {
      container.innerHTML+=`<p>${item_count}. ${item} <button onclick='removeFromBasket(${i})'>X <\p>`;
      item_count++;
    }
  }
  
  //reset counter if empty and disable checkout button 
  if(item_count == 1) {
    empty();
    
  }
}

window.addEventListener("DOMContentLoaded", listItems());