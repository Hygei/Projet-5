// Récupération des données du panier
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
    itemContentDesc.innerHTML = `${copyOfLS[item].name} <br> ${"Prix : " + copyOfLS[item].price + " €"} <br> ${"Couleur : " + copyOfLS[item].color}`;

    let itemContentSet = document.createElement("div");
    itemContent.appendChild(itemContentSet);
    itemContentDesc.classList.add ("cart__item__content__settings");
    
    let itemContentSetQuantity = document.createElement("div");
    itemContent.appendChild(itemContentSetQuantity);
    itemContentDesc.classList.add ("cart__item__content__settings__quantity");
   
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

        if(e.target.value < 1 ){
            removeItemFromCart (copyOfLS[item]);
        }
    })

    let itemContentSetDelete = document.createElement("button");
    itemContent.appendChild(itemContentSetDelete);
    itemContentDesc.classList.add ("cart__item__content__settings__delete");
    itemContentSetDelete.innerHTML = `<p class=deleteItem>Supprimer</p>`
    
    itemContentSetDelete.addEventListener("click", (e) => {
        e.preventDefault();
        removeItemFromCart (copyOfLS[item])
    })


}
// ---------------------------------------------------------------- Calcul du prix total -------------------------------------------------------------------------

// création d'un tableau avec les qtés
let quantityTotalCalcul = [];
// récupération des qtés et push dans le tableau
for (let i = 0; i < copyOfLS.length; i++){
    let quantityItemPanier = copyOfLS[i].quantity;
    quantityTotalCalcul.push(quantityItemPanier)
}
// Somme des qtés
const reducer01 = (accumulator, currentValue) => accumulator + currentValue;
const quantityTotal = quantityTotalCalcul.reduce(reducer01,0);

const affichageQuantityTotal = document.getElementById("totalQuantity");
affichageQuantityTotal.innerHTML = `${quantityTotal}`

// Pour chaque item on multiplie la qté par le prix
let priceTotalCalcul = [];
for (let j = 0; j < copyOfLS.length; j++){
    let priceItemPanier = copyOfLS[j].quantity*copyOfLS[j].price;
    priceTotalCalcul.push(priceItemPanier)
}
// on additionne le prix obtenu de chaque items
const reducer02 = (accumulator, currentValue) => accumulator + currentValue;
const priceTotal = priceTotalCalcul.reduce(reducer02,0);
// on injecte dans le HTML
const affichagePriceTotal = document.getElementById("totalPrice");
affichagePriceTotal.innerHTML = `${priceTotal}`


// ----------------------------------------------------------------- Les fonctions du panier ---------------------------------------------------------------------------------

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

// ---------------------------------------------------------------- Le Formulaire -----------------------------------------------------------------------------------

//-------------------- Récuperation des données du formulaire -------------------------------------------
const btnEnvoyerFormulaire = document.querySelector("#order")
btnEnvoyerFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

// On recupère les differentes données 
const contact = {
    prenom : document.querySelector("#firstName").value,
    nom : document.querySelector("#lastName").value,
    adresse : document.querySelector("#address").value,
    ville : document.querySelector("#city").value,
    email : document.querySelector("#email ").value,
}

// ------------------------ Vérification des données du formulaire---------------------------------
const textAlert = (value) => {
    return `${value}: n'est pas valide`;
}
// ------------ regEx de controle --------------------
const regExPrenomNomVille = (value) => {
    return /^([ \u00c0-\u01ffa-zA-Z'\-])+$/.test(value);
}
const regExMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
const regExAdresse = (value) => {
    return /^[a-zA-Z0-9\s\,\''\-]*$/.test(value);
}

// controle du prenom
function prenomControl() { 
    const lePrenom = contact.prenom;
    if(regExPrenomNomVille(lePrenom)) {
        return true;
    } else {
        alert(textAlert("Prenom"));
        return false;
        }
}
// controle du nom
function nomControl() { 
    const leNom = contact.nom;
    if(regExPrenomNomVille(leNom)) {
        return true;
    } else {
        alert(textAlert("Nom"));
        return false;
        }
}
// Controle de la ville
function villeControl() { 
    const laVille = contact.ville;
    if(regExPrenomNomVille(laVille)) {
        return true;
    } else {
        alert(textAlert("Ville"));
        return false;
        }
}
//  controle de l'email
function mailControl() { 
    const leMail = contact.email;
    if(regExMail(leMail)) {
        return true;
    } else {
        alert(textAlert("E-mail"));
        return false;
        }
}
// controle de l'adresse
function adresseControl() { 
    const leAdresse = contact.adresse;
    if(regExAdresse(leAdresse)) {
        return true;
    } else {
        alert(textAlert("Adresse"));
        return false;
        }
}

//------------ Mettre les données dans le localStorage si verification OK --------------------
if(prenomControl() && nomControl() && villeControl() && mailControl() && adresseControl())  {
// Création d'un tableau contact dans le local storage
localStorage.setItem("contact", JSON.stringify(contact));
// Rassembler à la fois les données du formulaire et celles du panier dans un objet
const aEnvoyer = {
    copyOfLS,
    contact,
}

console.log("aEnvoyer")
console.log(aEnvoyer)

envoieVersServ(aEnvoyer);

} else {
    alert("Veuillez vérifier les informations que vous avez saisie")
}



// Envoyer les données aEnvoyer dans un serveur *********************

function envoieVersServ(aEnvoyer){

// Création de l'entête de la requête

const goToServ = fetch("http://localhost:3000/api/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: { "Content-Type": "application/json" },
  });

//  voir le resultat du serveur dans la console

goToServ.then(async(response)=>{
    try{
        console.log("response");
        console.log(response);

        const contenu = await response.json();
        console.log("contenu");
        console.log(contenu);

//   --Mettre l'ID dans le localStorage--
        localStorage.setItem("orderId", contenu._id); 

//   --Vers page de confirmation--
        window.location = "../html/confirmation.html";
            
    } catch(e){
        console.log(e)
        }
    })
}



})