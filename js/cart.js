//Var main
const cart__item = document.getElementById("cart__items");
//Var quantity
const total_quant = document.getElementById("totalQuantity");
const total_price = document.getElementById("totalPrice");

//Var panier
var panier = JSON.parse(localStorage.getItem("panier"));

console.log(window.location.search);

//Appelle de la fonction update
updateItem();

//Upadte cart items
function updateItem(){
    for(let item of panier){
        newItem(item);
    }
    setTotals();
}
//New cart item
function newItem(item){
    const article = document.createElement("article");
    article.setAttribute("class", "cart__item");
    article.setAttribute("data-id",item["id"]);
    article.setAttribute("date-color",item["color"]);
    article.innerHTML = '<div class="cart__item__img"><img src="'+item["img"]+'" alt="'+item["altimg"]+'"></div>'
    const articleDesc = document.createElement("div");
    articleDesc.setAttribute("class","cart__item__content");
    articleDesc.innerHTML = '<div class="cart__item__content__description"><h2>'+item["title"]+'</h2><p>'+item["color"]+'</p><p>'+item["price"]+',00 €</p></div>'
    const articleModif = document.createElement("div");
    articleModif.setAttribute("class","cart__item__content__settings");
    const articleQuant = document.createElement("div");
    articleQuant.setAttribute("class","cart__item__content__settings__quantity");
    const txtQuant = document.createElement("p");
    txtQuant.innerHTML ="Qté : ";
    const nbrQuant = document.createElement("input");
    nbrQuant.setAttribute("type","number");
    nbrQuant.setAttribute("class","itemQuantity");
    nbrQuant.setAttribute("name","itemQuantity");
    nbrQuant.setAttribute("min","1");
    nbrQuant.setAttribute("max","100");
    nbrQuant.setAttribute("value",item["quant"]);
    nbrQuant.addEventListener('change',function(){
        item["quant"] = parseInt(nbrQuant.value);
        localStorage.setItem("panier",JSON.stringify(panier));
        setTotals();
    })
    const articleDelet = document.createElement("div");
    articleDelet.setAttribute("class","cart__item__content__settings__delete")
    const txtDelet = document.createElement("p");
    txtDelet.setAttribute("class","deleteItem")
    txtDelet.innerHTML = "Supprimer";
    txtDelet.addEventListener("click",function(){
        panier.splice(panier.indexOf(item),1);
        localStorage.setItem("panier",JSON.stringify(panier));
        setTotals();
        cart__item.removeChild(article);
    });
    articleQuant.appendChild(txtQuant);
    articleQuant.appendChild(nbrQuant);
    articleModif.appendChild(articleQuant);
    articleDelet.appendChild(txtDelet);
    articleModif.appendChild(articleDelet);
    articleDesc.appendChild(articleModif);
    article.appendChild(articleDesc);
    cart__item.appendChild(article);
}

//Set totals 
function setTotals(){
    var tQuant = 0;
    var tPrice = 0;
    for(let value of panier){
        tQuant += value["quant"];
        tPrice += value["price"]*value["quant"]+tPrice;
    }
    total_quant.innerHTML = tQuant;
    total_price.innerHTML = tPrice+",00";
}

//Var form
const nameForm = document.getElementById("firstName");
const lastNameForm = document.getElementById("lastName");
const adressForm = document.getElementById("address");
const cityForm = document.getElementById("city");
const emailForm = document.getElementById("email");
const formUl = document.getElementsByClassName("cart__order__form");
const sendForm = formUl[0];

sendForm.addEventListener("submit", function(){
    exName = RegExp("([0-9a-zA-Z_]){6,20}");
    exLastName = RegExp("");
    exAdres = RegExp("");
    exCity = RegExp("");
    exEmail = RegExp("");

    if(exName.test(nameForm.value)){
        console.log("Resus");
    }
    var products = [];
    for(let value of panier){
        products.push(value["id"]);
    }
    const order = {
        contact: {
            firstName: nameForm.value,
            lastName: lastNameForm.value,
            city: cityForm.value,
            address: adressForm.value,
            email: emailForm.value,
        },
        products: products,
    };
    console.log(order);
    postItem(order);
    
});

//Post Itme
function postItem(item){
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(item)
    }).then(function(res) {
        if (res.ok) {
            return res.json();
        }
    }).then(function(value){
        localStorage.setItem("idContact",value.orderId);
        localStorage.removeItem("panier");
        document.location.href = "confirmation.html";
    }).catch(function(err){

    });
}