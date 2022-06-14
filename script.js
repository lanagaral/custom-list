function loadList(url) {
fetch(url)
.then(res => res.json())
.then(json => printList(json["products"]));
}

var cart = [];
const display = document.getElementById("display-items");
const cart_display = document.getElementById("cart-items");
function printList(data) {
    console.log(data);
    for (const product of data) {
        var div = document.createElement("div");
        div.classList.add("item-card");
        var title = document.createElement("h2");
        title.innerHTML = product.title;
        var detailsList = document.createElement("ul");
        var detailsKeys = ["description", "price", "rating", "stock", "brand", "category"];
        for (const key of detailsKeys) {
            var liEle = document.createElement("li");
            liEle.innerHTML = key.toUpperCase() + ": " + product[key];
            detailsList.appendChild(liEle);
        }
        var imgtag = document.createElement("img");
        imgtag.src = product.images[0];
        var btnatc = document.createElement("button");
        btnatc.innerHTML = "ADD TO CART";
        btnatc.classList.add("btn_atc");
        btnatc.setAttribute("state", "0");
        btnatc.name = product.id;
        btnatc.onclick = function () {
            var s = this.getAttribute("state");
            if (s == "0") {
                this.innerHTML = "ADDED TO CART";
                this.classList.add("added");
                this.setAttribute("state", "1");
                cartbtnvalue("add");
                cart.push(product); // adding product to cart
            }
            else {
                this.innerHTML = "ADD TO CART";
                this.classList.remove("added");
                this.setAttribute("state", "0");
                cartbtnvalue("remove");
                cart = cart.filter(d => d.id != product.id); // removing the product from cart
            }
        };
        div.appendChild(title);
        div.appendChild(imgtag);
        div.appendChild(detailsList);
        div.appendChild(btnatc);
        display.appendChild(div);
    }
}


function printCart(data) {
    var total=0;
    for (const product of data) {
        var div = document.createElement("div");
        div.classList.add("item-card");
        var title = document.createElement("h3");
        title.innerHTML = product.title;
        var pricespan = document.createElement("span");
        pricespan.innerText = "Rs. " + product.price;
        total+=product.price;
        title.appendChild(pricespan)
        div.appendChild(title);
        cart_display.appendChild(div);
    }
        var div = document.createElement("div");
        div.classList.add("item-card");
        var totalcard = document.createElement("h3");
        totalcard.innerHTML ="Total items = "+ cart.length + "&emsp; &emsp;  &emsp; &emsp;  Total cart value = Rs. " + total;
        div.appendChild(totalcard);
        cart_display.appendChild(div);  
}



function cartbtnvalue(op) {
    var crtbtn = document.getElementById("cart");
    var count = parseInt(crtbtn.getAttribute("count"));
    console.log(count);
    if (op == "add") {
        count++;
        crtbtn.setAttribute("count", count);
    } else {
        count--;
        crtbtn.setAttribute("count", count);
    }
    crtbtn.innerText = "CART (" + count + ")";
}
function cartpage() {
cart_display.innerHTML="";
display.style.display = 'none';
printCart(cart);

}

function home() {
display.style.display = '';
}
function search() {
    var input, inputuppercase, i, txtValue;
    input = document.getElementById("nameInput");
    inputuppercase = input.value.toUpperCase();
    list = document.getElementById("display-items");
    h2 = list.getElementsByTagName("h2");
    lstitem = document.getElementsByClassName("item-card");
    
    for (i = 0; i < h2.length; i++) {
        if (h2) {
            txtValue = h2[i].textContent;
            if (txtValue.toUpperCase().indexOf(inputuppercase) > -1) {
                lstitem[i].style.display = "";
            } else {
                lstitem[i].style.display = "none";
            }
        }
    }
}

loadList("https://dummyjson.com/products");


