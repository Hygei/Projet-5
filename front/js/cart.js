let copyOfLS = JSON.parse(localStorage.getItem("cart"));
console.log (copyOfLS)

// affichage du panier sur la page 
let cart = document.getElementById("cart__items");
for (let item in copyOfLS) {
    let itemArticle = document.createElement("article")
    document.getElementById("cart__items").appendChild(itemArticle);

    let itemImg = document.createElement("img");
    itemArticle.appendChild(itemImg);
    itemImg.src = copyOfLS[item].img;
    itemImg.classList.add ("cart__item__img");

    let itemContent = document.createElement("div");
    itemArticle.appendChild(itemContent);
    itemContent.classList.add ("cart__item__content");

    let itemContentDesc = document.createElement("div");
    itemContent.appendChild(itemContentDesc);
    itemContentDesc.classList.add ("cart__item__content__description");
    itemContentDesc.innerHTML = `${copyOfLS[item].name} ${copyOfLS[item].price} ${copyOfLS[item].color}`;

    let itemContentSet = document.createElement("div");
    itemContent.appendChild(itemContentSet);
    itemContentDesc.classList.add ("cart__item__content__settings");
    
    let itemContentSetQuantity = document.createElement("div");
    itemContent.appendChild(itemContentSetQuantity);
    itemContentDesc.classList.add ("cart__item__content__settings__quantity");
    // itemContentSetQuantity.innerHTML = "qté: " + copyOfLS[item].quantity;
    
    // ajouter un input
    let p = document.createElement("p");
    let label = document.createElement("label");
    label.textContent = "Quantité : ";
    let input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("name","itemQuantity");
    input.setAttribute("value",copyOfLS[item].quantity);

    itemContentSetQuantity.appendChild(p);
    p.appendChild(label);
    p.appendChild(input);
    // changer la valeur dans l'input fait changer le tableau
    input.addEventListener("change", (e) => {
        updateItemQuantity (copyOfLS[item], e.target.value);
    })


    let itemContentSetDelete = document.createElement("button");
    itemContent.appendChild(itemContentSetDelete);
    itemContentDesc.classList.add ("cart__item__content__settings__delete");
    itemContentSetDelete.innerHTML = {<p class=deleteItem>Supprimer</p>}
    // ajouter class "deleteItem"
    
    itemContentSetDelete.addEventListener("click", (e) => {
        e.preventDefault();
        removeItemFromCart (copyOfLS[item])
    })


}

// Afficher la quantité total
let totalQuantity = document.getElementById("totalQuantity");
let sum = 0;
for (let i = 0; i < copyOfLS.length; i++) {
    sum += copyOfLS.quantity[i]
    console.log(sum)
}
    // const initialValue = 0;
    // const sumWithInitial = copyOfLS.price.reduce(
    //     (previousValue, currentValue) => previousValue + currentValue,
    //     initialValue
    // );
    
    // console.log(sumWithInitial);



// afficher le prix total
let totalPrice = document.getElementById("totalPrice");



function removeItemFromCart (itemToRemove) {
    //  Gestion du localStorage
    let arrayProductsInCart = [];
      
    // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
    if (localStorage.getItem("cart") !== null) {
    arrayProductsInCart = JSON.parse(localStorage.getItem("cart"));

    } 
    // trouver dans le tableau un item qui a le même ID et couleur que l'item à ajouter 
    const foundIndex = arrayProductsInCart.findIndex (item => {
        return item._id === itemToRemove._id && item.color === itemToRemove.color
    })
    // Si l'item existe dans le tableau récupérer l'index de l'item dans le tableau
    if (foundIndex !== -1) {
        // avec l'index de l'item, supprimer l'elmt du tableau 
        arrayProductsInCart.splice(foundIndex, 1)
    }
    localStorage.setItem("cart", JSON.stringify(arrayProductsInCart));
    location.reload();
}

function updateItemQuantity (itemToUpdate, newQuantity) {

         //  Gestion du localStorage
         let arrayProductsInCart = [];
      
         // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
         if (localStorage.getItem("cart") !== null) {
         arrayProductsInCart = JSON.parse(localStorage.getItem("cart"));
     
         } 
         // trouver dans le tableau un item qui a le même ID et couleur que l'item à ajouter 
         const foundIndex = arrayProductsInCart.findIndex (item => {
             return item._id === itemToUpdate._id && item.color === itemToUpdate.color
         })
         // Si l'item existe dans le tableau récupérer l'index de l'item dans le tableau
         if (foundIndex !== -1) {
             // avec l'index de l'item, incrémenter la qté 
             arrayProductsInCart[foundIndex].quantity = parseInt (newQuantity, 10)
         } 
         localStorage.setItem("cart", JSON.stringify(arrayProductsInCart));
         location.reload();
}