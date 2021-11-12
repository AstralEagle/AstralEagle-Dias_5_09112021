const tableau = document.getElementById("items");

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    for(let item of value){
        newElement(item);
    }
})
.catch(function(err) {
    // Une erreur est survenue
});


function newElement(item){
    const onClic = document.createElement("a");
    onClic.setAttribute("href","./product.html?id="+item["_id"]);
    onClic.innerHTML = '<article><img src="'+item["imageUrl"]+'" alt="'+item["altTxt"]+'"><h3 class="productName">'+item["name"]+'</h3><p class="productDescription">'+item["description"]+'</p></article>'
    tableau.appendChild(onClic);
}