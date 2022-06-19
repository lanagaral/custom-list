loadList("https://dummyjson.com/products");
let _productList;
function loadList(url) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      _productList = json["products"];
      printList(json["products"]);
    });
}

var cart = [];
const display = document.getElementById("display-items");
const cart_display = document.getElementById("cart-items");

function printList(products) {
  console.log(products);
  // const display = document.getElementById("display-items");

  for (const product of products) {
    var div = document.createElement("div");
    div.classList.add("item-card");
    var title = document.createElement("h2");
    title.textContent = product.title;
    var detailsList = document.createElement("ul");
    var detailsKeys = [
      "price",
      "description",
      "rating",
      "stock",
      "brand",
      "category",
    ];
    for (const key of detailsKeys) {
      var ELe = document.createElement("li");
      ELe.innerHTML = key.toUpperCase() + ": " + product[key];
      detailsList.appendChild(ELe);
    }
    var imgtag = document.createElement("img");
    imgtag.src = product.thumbnail;
    var btnatc = document.createElement("button");
    btnatc.innerHTML = "ADD TO CART";
    btnatc.classList.add("btn_atc");
    console.log(product);
    btnatc.setAttribute("state", "0");
    btnatc.name = product.id;
    btnatc.onclick = function () {
      var s = this.getAttribute("state");
      if (s == "0") {
        this.innerHTML = "REMOVE FROM CART";
        this.classList.add("add");
        this.setAttribute("state", "1");
        // cartbtnvalue("add");
        cart.push(product);
      } else {
        this.innerHTML = "ADD TO CART";
        this.classList.remove("add");
        this.setAttribute("state", "0");
        // cartbtnvalue("remove");
        cart = cart.filter((d) => d.id != product.id);
      }
    };
    var btnbuy = document.createElement("button");
    btnbuy.innerHTML = "BUY NOW";
    btnbuy.classList.add("btn_buy");
    btnbuy.onclick = function () {
      sessionStorage.setItem("totalchk", product.price);
        checkout_page();
      };
    div.appendChild(title);
    div.appendChild(imgtag);
    div.appendChild(detailsList);
    div.appendChild(btnatc);
    div.appendChild(btnbuy);
    display.appendChild(div);
  }
}

function printCart(products) {
  var total = 0;
  for (const product of products) {
    var imgtag = document.createElement("img");
    imgtag.src = product.thumbnail;
    var div = document.createElement("div");
    div.classList.add("cart-card");
    var title = document.createElement("h3");
    title.innerHTML = product.title;
    var price = document.createElement("span");
    price.innerText = "Rs." + product.price;
    // var btn=document.createElement("span");
    // btn.innerHTML="REMOVE";
    // btn.classList.add("btn");
    total += product.price;
    var del = document.createElement("a");
    del.innerText = "Delete";
    del.onclick = function () {
            cart = cart.filter(d => d.id != product.id); // removing the product from cart
            cartpage();
            var btn = display.querySelectorAll('button[name]')[product.id-1];
            btn.click();
        };
    title.appendChild(price);
    div.appendChild(imgtag);
    div.appendChild(title);
    div.appendChild(del);
    // div.appendChild(btn);
    cart_display.appendChild(div);
  }
  var div = document.createElement("div");
  div.classList.add("cart-total-card");
  var totalcard = document.createElement("h3");
  totalcard.innerHTML = " Total cart value = Rs. " + total;
  var btnchk = document.createElement("button");
  btnchk.innerHTML = "CHECKOUT";
  btnchk.classList.add("btn_buy");
  btnchk.onclick = function () {
    if(total==0){
      alert("No items in cart. Please add items before checkout");
    }else{
      sessionStorage.setItem("totalchk", total);
      checkout_page();
    }
};
  div.appendChild(totalcard);
  div.appendChild(btnchk);
  cart_display.appendChild(div);
}
// function cartbtnvalue(op) {
//     var crtbtn = document.getElementById("cart");
//     var count = parseInt(crtbtn.getAttribute("count"));
//     console.log(count);
//     if (op == "add") {
//         count++;
//         crtbtn.setAttribute("count", count);
//     } else {
//         count--;
//         crtbtn.setAttribute("count", count);
//     }
//      crtbtn.innerText = "CART (" + count + ")";
// }

function cartpage() {
  cart_display.innerHTML = "";
  display.innerHTML = "";
  // display.style.display = "none";
  printCart(cart);
}
function home() {
  cart_display.innerHTML = "";
  printList(_productList);
}

function checkout_page(){

  window.open("checkout.html");
  
}

function search(searchString) {
  input = document.getElementById("nameInput");
  console.log("***searchString***", searchString);
  let inputData = searchString.toUpperCase();
  newproducts = _productList.filter(
    (value) =>
      value.title.toUpperCase().includes(inputData) ||
      value.description.toUpperCase().includes(inputData)
  );

  document.getElementById("display-items").innerHTML = "";
  printList(newproducts);
}

function backtohome(){
  window.open('index2.html'); 
}

function payment(){
// var doc = document.getElementById("checkoutbody");
// doc.style.display = "none"
}