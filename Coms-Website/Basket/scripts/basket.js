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
}

function empty() {
  localStorage.clear();
  item_num = 1;
  localStorage.setItem("num", 0);
}

function listItems() {
  console.log("listing items!");
  let container = document.getElementById("container");
  let item_count = 1;
  item_num = localStorage.getItem("num");
  console.log(item_num);
  for(let i = 0; i < item_num; i++) {
    let item = localStorage.getItem(i);
    console.log(item);
    if(item !== null) {
      container.innerHTML+="<p id=" + i + ">"+ item_count +". " + item + "<\p>";
      item_count++;
    }
  }
}

window.addEventListener("DOMContentLoaded", listItems());