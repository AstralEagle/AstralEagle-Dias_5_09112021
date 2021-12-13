const tableau = document.getElementById("items");

//On recupère tout les Kanaps
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    localStorage.removeItem("idContact");
    for(let item of value){
        newElement(item);
    }
})
.catch(function(err) {
    console.error(err.message);
});

//On ajoute un Kanap a la page
function newElement(item){
    const newProduct = document.createElement("a");
    newProduct.setAttribute("href","./product.html?id="+item["_id"]);
    newProduct.innerHTML = '<article><img src="'+item["imageUrl"]+'" alt="'+item["altTxt"]+'"><h3 class="productName">'+item["name"]+'</h3><p class="productDescription">'+item["description"]+'</p></article>'
    tableau.appendChild(newProduct);
}