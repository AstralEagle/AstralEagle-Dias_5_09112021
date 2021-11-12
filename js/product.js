const item_img = document.getElementsByClassName("item__img");
const firt_img = item_img[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const desc = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");


var urlIdProduct = new URL(window.location).searchParams.get("id");



fetch("http://localhost:3000/api/products/"+urlIdProduct)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    setItem(value)
})
.catch(function(err) {
    // Une erreur est survenue
});

function setItem(item){
    const img = document.createElement("img");
    img.setAttribute("src",item["imageUrl"]);
    img.setAttribute("alt",item["altTxt"]);
    firt_img.appendChild(img);
    title.innerHTML = item["name"];
    price.innerHTML = item["price"];
    desc.innerHTML = item["description"];
    for(let color of item["colors"]){
        const newColor = document.createElement("option");
        newColor.setAttribute("value",color);
        newColor.innerHTML = color;
        colors.appendChild(newColor);
    }
    addToCart.addEventListener('click',function(){
    if(colors.value == ""){
        alert("Choissisez une couleur valide!");
    }
    else if(quantity.value < 1 || quantity.value > 100){
        alert("Choissisez un nombre d'article(s) valide!");
    }
    else {
        if(localStorage.getItem("panier")==null){
            const panier = new Array();
            localStorage.setItem("panier",JSON.stringify(panier));
        }
        addOnPanier(item);
    }
    });
}
function addOnPanier(item){
        var panier = JSON.parse(localStorage.getItem("panier"));


        var ifTrue = true;
        for(let onPanier of panier){
            if(item["_id"]==onPanier["id"] && colors.value==onPanier["color"]){
                onPanier["quant"] = onPanier["quant"]+parseInt(quantity.value); 
                ifTrue = false;
            }
        }
        if(ifTrue){
            const itemPan = new Object();
            itemPan["title"] = item['name'];
            itemPan["color"] = colors.value;
            itemPan["quant"] = parseInt(quantity.value);
            itemPan["img"] = item['imageUrl'];
            itemPan["id"] = item["_id"];
            itemPan["altImg"] = item['altTxt'];
            itemPan["desc"] = item['description'];
            itemPan["price"] = item['price'];
            panier.push(itemPan);
        }
        localStorage.setItem("panier",JSON.stringify(panier));
}