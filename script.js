function loadList(url) {
fetch(url)
.then(res => res.json())
.then(json => printList(json["products"]));
}
function printList(data) {
const display = document.getElementById("display-items");

for (const product of data) {
var div = document.createElement("div");
div.innerHTML = createItem(product);
display.appendChild(div);

}
}

function createItem(product) {
return (`<div class="item-card">
<ul>
<h2> ${ product.title } </h2>

<li> Description: 
${ product.description }
</li>
<li>
Price: 
${ product.price }
</li>
<li>
Rating: 
${ product.rating }
</li>
</ul>
</div>`)
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

loadList("
https://dummyjson.com/products
");


