const item_img = document.getElementsByClassName("item__img");
const firt_img = item_img[0];
const title = document.getElementById("title");
const price = document.getElementById("price");
const desc = document.getElementById("description");
const colors = document.getElementById("colors");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");


var urlIdProduct = new URL(window.location).searchParams.get("id");


//Recupère le kanap grace a son ID
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
    //Si le produit n'est pas trouver on renvoie l'erreur et on redirige vers l'index.html
    console.error(err.message);
    document.location.href = "index.html";
});

//Met a jour les valeurs a affiché pour l'utilisateur
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
        //Verification des valeurs saisi
        if(colors.value == ""){
            alert("Choissisez une couleur valide!");
        }
        else if(quantity.value < 1 || quantity.value > 100){
            alert("Choissisez un nombre d'article valide!");
        }
        else {
            //Vérifi que le localStorage "panier" existe et si il n'existe pas il le créer
            if(localStorage.getItem("panier")==null){
                const panier = new Array();
                localStorage.setItem("panier",JSON.stringify(panier));
            }
            addOnPanier(item);
        }
    });
}

//Ajoute un kanap a la list du pannier
function addOnPanier(item){
        var panier = JSON.parse(localStorage.getItem("panier"));
        var ifTrue = true;
        //Cherche si le Kanap exist deja
        for(let onPanier of panier){
            if(item["_id"]==onPanier["id"] && colors.value==onPanier["color"]){
                //Si il exist il ajoute la quantité saisi
                onPanier["quant"] = onPanier["quant"]+parseInt(quantity.value); 
                ifTrue = false;
            }
        }
        //Di il ne le trouve pas il l'ajoute a la list
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
        alert("Article ajouté au pannier!");
}