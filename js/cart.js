const cart__item = document.getElementById("cart__items");

var panier = JSON.parse(localStorage.getItem("panier"));

for(let item of panier){
    newItem(item);
}
function newItem(item){
    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id",item["id"]);
    article.setAttribute("date-color",item["color"]);
    article.innerHTML = '<div class="cart__item__img"><img src="'+item["img"]+'" alt="'+item["altimg"]+'"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>'+item["title"]+'</h2><p>'+item["color"]+'</p><p>'+item["price"]+',00 €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+item["quant"]+'"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div>'
    cart__item.appendChild(article);
}
