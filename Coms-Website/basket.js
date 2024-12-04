let item_num = 0;

function addToBasket(item) {
  localStorage.setItem(item_num, item);
  console.log("added " + item);
  item_num++;
}

function removeFromBasket(item_num) {
  localStorage.removeItem(item_num);
  console.log("removed " + item_num);
}

function empty() {
  localStorage.clear();
  item_num = 0;
}