function loadList(url) {
fetch(url)
.then(res => res.json())
.then(json => printList(json["products"]));
}
function printList(data) {
    const display = document.getElementById("display-items");

    for (const product of data) {
        var div = document.createElement("div");
        div.classList.add("item-card");
        var title = document.createElement("h2");
        title.innerHTML = product.title;
        var detailsList = document.createElement("ul");
        var detailsKeys = ["description", "price", "rating","stock","brand","category"];
        for (const key of detailsKeys){
            var liEle = document.createElement("li");
            liEle.innerHTML =key.toUpperCase() +": " +product[key];
            detailsList.appendChild(liEle);
        }
        var imgtag = document.createElement("img");
        imgtag.src = product.images[0];

        div.appendChild(title);
        div.appendChild(imgtag);
        div.appendChild(detailsList);
        display.appendChild(div);
    }
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


