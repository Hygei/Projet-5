// Récupération des données du panier
let copyOfLS = JSON.parse(localStorage.getItem("cart"));
console.log(copyOfLS);

// affichage du panier sur la page
let cart = document.getElementById("cart__items");
for (let item in copyOfLS) {
  let itemArticle = document.createElement("article");
  document.getElementById("cart__items").appendChild(itemArticle);
  itemArticle.classList.add("cart__item");

  let itemImg = document.createElement("img");
  itemArticle.appendChild(itemImg);
  itemImg.src = copyOfLS[item].img;
  itemImg.classList.add("cart__item__img");

  let itemContent = document.createElement("div");
  itemArticle.appendChild(itemContent);
  itemContent.classList.add("cart__item__content");

  let itemContentDesc = document.createElement("div");
  itemContent.appendChild(itemContentDesc);
  itemContentDesc.classList.add("cart__item__content__description");
  const itemId = copyOfLS[item]._id;
  const response = fetch(`http://localhost:3000/api/products/${itemId}`)
    .catch((error) => console.error(error))
    .then((response) => response.json())
    .then((result) => {
      const leItem = result;
      let itemPrice = leItem.price;
      itemContentDesc.innerHTML += `<h2>${copyOfLS[item].name}</h2> <p>${copyOfLS[item].color}</p> <p>${leItem.price} €</p>`;
    });

  let itemContentSet = document.createElement("div");
  itemContent.appendChild(itemContentSet);
  itemContentSet.classList.add("cart__item__content__settings");

  let itemContentSetQuantity = document.createElement("div");
  itemContentSet.appendChild(itemContentSetQuantity);
  itemContentSetQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );

  let label = document.createElement("p");
  label.textContent = "Qté : ";
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.classList.add("itemQuantity");
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("value", copyOfLS[item].quantity);
  itemContentSetQuantity.appendChild(label);
  itemContentSetQuantity.appendChild(input);

  // changer la valeur dans l'input fait changer le tableau
  input.addEventListener("change", (e) => {
    updateItemQuantity(copyOfLS[item], e.target.value);

    if (e.target.value < 1) {
      removeItemFromCart(copyOfLS[item]);
    }
  });

  let itemContentSetDelete = document.createElement("p");
  itemContent.appendChild(itemContentSetDelete);
  itemContentSetDelete.classList.add("cart__item__content__settings__delete");
  itemContentSetDelete.innerHTML = `<p class=deleteItem>Supprimer</p>`;

  itemContentSetDelete.addEventListener("click", (e) => {
    e.preventDefault();
    removeItemFromCart(copyOfLS[item]);
  });
}
// --------------------------------------------------------------- Les fonctions du panier ---------------------------------------------------------------------------------
// ---------------------------------- Calcul du prix total ------------------------------------------
async function calculTotalPrice() {
  let quantityTotal = 0;
  let priceTotal = 0;
  for (let i = 0; i < copyOfLS.length; i++) {
    const itemId = copyOfLS[i]._id;
    const response = await fetch(
      `http://localhost:3000/api/products/${itemId}`
    ).catch((error) => console.error(error));
    const remoteItem = await response.json();
    quantityTotal = parseInt(copyOfLS[i].quantity, 10);
    priceTotal += parseInt(quantityTotal, 10) * parseInt(remoteItem.price, 10);
  }

  const affichageQuantityTotal = document.getElementById("totalQuantity");
  affichageQuantityTotal.innerHTML = `${quantityTotal}`;

  const affichagePriceTotal = document.getElementById("totalPrice");
  affichagePriceTotal.innerHTML = `${priceTotal}`;
}
calculTotalPrice();

// --------------------------------Supprimer un objet dans le panier -----------------------------------
function removeItemFromCart(itemToRemove) {
  //  Gestion du localStorage
  let arrayProductsInCart = [];

  // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
  if (localStorage.getItem("cart") !== null) {
    arrayProductsInCart = JSON.parse(localStorage.getItem("cart"));
  }
  // trouver dans le tableau un item qui a le même ID et couleur que l'item à ajouter
  const foundIndex = arrayProductsInCart.findIndex((item) => {
    return item._id === itemToRemove._id && item.color === itemToRemove.color;
  });
  // Si l'item existe dans le tableau récupérer l'index de l'item dans le tableau
  if (foundIndex !== -1) {
    // avec l'index de l'item, supprimer l'elmt du tableau
    arrayProductsInCart.splice(foundIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(arrayProductsInCart));
  location.reload();
}

// ------------------------------------------ Mettre a jour le panier ------------------------------------------
function updateItemQuantity(itemToUpdate, newQuantity) {
  //  Gestion du localStorage
  let arrayProductsInCart = [];

  // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
  if (localStorage.getItem("cart") !== null) {
    arrayProductsInCart = JSON.parse(localStorage.getItem("cart"));
  }
  // trouver dans le tableau un item qui a le même ID et couleur que l'item à ajouter
  const foundIndex = arrayProductsInCart.findIndex((item) => {
    return item._id === itemToUpdate._id && item.color === itemToUpdate.color;
  });
  // Si l'item existe dans le tableau récupérer l'index de l'item dans le tableau
  if (foundIndex !== -1) {
    // avec l'index de l'item, incrémenter la qté
    arrayProductsInCart[foundIndex].quantity = parseInt(newQuantity, 10);
  }
  localStorage.setItem("cart", JSON.stringify(arrayProductsInCart));
  location.reload();
}

// ---------------------------------------------------------------- Le Formulaire -----------------------------------------------------------------------------------

//-------------------- Récuperation des données du formulaire -------------------------------------------
const btnEnvoyerFormulaire = document.querySelector("#order");
btnEnvoyerFormulaire.addEventListener("click", (e) => {
  e.preventDefault();

  // On recupère les differentes données
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  // ------------------------ Vérification des données du formulaire---------------------------------
  // ------------ regEx de controle --------------------
  const regExPrenomNomVille = (value) => {
    return /^([ \u00c0-\u01ffa-zA-Z'\-])+$/.test(value);
  };
  const regExMail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9\s\,\''\-]*$/.test(value);
  };

  // controle du prenom
  function prenomControl() {
    const lePrenom = contact.firstName;
    if (regExPrenomNomVille(lePrenom)) {
      return true;
    } else {
      let firstNameErrorMsg = document.createElement("p");
      document
        .getElementById("firstNameErrorMsg")
        .appendChild(firstNameErrorMsg);
      firstNameErrorMsg.innerHTML = "Le prenom est invalide, il ne doit pas contenir de chiffres ni de caractères spéciaux";
      return false;
    }
  }
  // controle du nom
  function nomControl() {
    const leNom = contact.lastName;
    if (regExPrenomNomVille(leNom)) {
      return true;
    } else {
      let lastNameErrorMsg = document.createElement("p");
      document.getElementById("lastNameErrorMsg").appendChild(lastNameErrorMsg);
      lastNameErrorMsg.innerHTML = "Le nom est invalide, il ne doit pas contenir de chiffres ni de caractères spéciaux";
      return false;
    }
  }
  // Controle de la ville
  function villeControl() {
    const laVille = contact.city;
    if (regExPrenomNomVille(laVille)) {
      return true;
    } else {
      let cityErrorMsg = document.createElement("p");
      document.getElementById("cityErrorMsg").appendChild(cityErrorMsg);
      cityErrorMsg.innerHTML = "La ville est invalide, elle ne doit pas contenir de chiffres ni de caractères spéciaux";
      return false;
    }
  }
  //  controle de l'email
  function mailControl() {
    const leMail = contact.email;
    if (regExMail(leMail)) {
      return true;
    } else {
      let emailErrorMsg = document.createElement("p");
      document.getElementById("emailErrorMsg").appendChild(emailErrorMsg);
      emailErrorMsg.innerHTML = "L'email est invalide, attention aux espaces";
      return false;
    }
  }
  // controle de l'adresse
  function adresseControl() {
    const leAdresse = contact.address;
    if (regExAdresse(leAdresse)) {
      return true;
    } else {
      let addressErrorMsg = document.createElement("p");
      document.getElementById("addressErrorMsg").appendChild(addressErrorMsg);
      addressErrorMsg.innerHTML = "L'adresse est invalide, elle ne doit pas contenir d'accents";
      return false;
    }
  }

  //------------ Mettre les données dans le localStorage si verification OK --------------------
  if (
    prenomControl() &&
    nomControl() &&
    villeControl() &&
    mailControl() &&
    adresseControl()
  ) {
    // stockage des données "contact" dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact));
    // Création d'un tableau avec les Id des produits
    let products = [];
    for (k = 0; k < copyOfLS.length; k++) {
      let productId = copyOfLS[k]._id;
      products.push(productId);
    }
    // Rassembler à la fois les données du formulaire et celles du panier dans un objet
    const aEnvoyer = {
      contact,
      products,
    };

    console.log("aEnvoyer");
    console.log(aEnvoyer);

    envoieVersServ(aEnvoyer);
  }

  // Envoyer les données aEnvoyer dans un serveur *********************

  function envoieVersServ(aEnvoyer) {
    // Création de l'entête de la requête

    const goToServ = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(aEnvoyer),
      headers: { "Content-Type": "application/json" },
    });

    //  voir le resultat du serveur dans la console

    goToServ.then(async (response) => {
      try {
        console.log("response");
        console.log(response);

        const contenu = await response.json();
        console.log("contenu");
        console.log(contenu);

        //   --Vers page de confirmation--
        window.location = `confirmation.html?id=${contenu.orderId}`;
      } catch (e) {
        console.log(e);
      }
    });
  }
});
