//Var main
const cart__item = document.getElementById("cart__items");



console.log(window.location.pathname);
if(new RegExp("cart.html$").test(window.location.pathname)){
    //Var panier
    var panier = JSON.parse(localStorage.getItem("panier"));
    if(panier != null){
        console.log(panier);
        //Appelle de la fonction update
        updateItem(panier);
    }

    //Var form
    const formUlClass = document.getElementsByClassName("cart__order__form");
    const formUl = formUlClass[0];
    formUl.addEventListener("submit", function(){
        getValueForm(); 
    });
}else if(new RegExp("confirmation.html$").test(window.location.pathname)){
    var idContact = localStorage.getItem("idContact");
    if(idContact != null){
        confirmationPage(idContact);
    }
}


//Upadte cart items
function updateItem(panier){
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
    //Var quantity
    const total_quant = document.getElementById("totalQuantity");
    const total_price = document.getElementById("totalPrice");
    
    var tQuant = 0;
    var tPrice = 0;
    for(let value of panier){
        tQuant += value["quant"];
        tPrice += value["price"]*value["quant"]+tPrice;
    }
    total_quant.innerHTML = tQuant;
    total_price.innerHTML = tPrice+",00";
}

//Get form values
function getValueForm(){
    const nameForm = document.getElementById("firstName");
    const lastNameForm = document.getElementById("lastName");
    const adressForm = document.getElementById("address");
    const cityForm = document.getElementById("city");
    const emailForm = document.getElementById("email");
    var valueForm = [nameForm,lastNameForm,adressForm,cityForm,emailForm];
    
    var products = [];
    for(let value of JSON.parse(localStorage.getItem("panier"))){
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
    postItem(order); 
}

function verifValue(values){
    const verifName = new RegExp("")

}
//Post Itme
function postItem(value){
    fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(value)
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



//Set number command
function confirmationPage(idContact){
    const contenantID = document.getElementById("orderId");
    contenantID.innerHTML = idContact;
}