const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("id");

//modification de l'adresse d'appel à l'API
const newUrl = `http://localhost:3000/api/products/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((resultatID) => {
        const product = resultatID;
        addCard(resultatID);

        console.log(product)

        // lancement de la fonction
        function addCard(product) {

            // insertion des données du produit
            const ProductImage = document.querySelector(".item__img");
            ProductImage.innerHTML = `<img src="${product.imageUrl}" alt="$Photographie d'un canapé">`;

            const ProductName = document.getElementById("title");
            ProductName.innerHTML = `${product.name}`;

            const ProductPrice = document.getElementById("price");
            ProductPrice.innerHTML = `${product.price}`;

            const ProductDescription = document.getElementById("description");
            ProductDescription.innerHTML = `${product.description}`;

            const versionChoice = document.getElementById("colors");
            for (let color of product.colors) {
                versionChoice.innerHTML += `<option value="${color}">${color}</option>`;
                }  
        }

        // Ajout au panier
        const addToCart = document.getElementById("addToCart");
        addToCart.addEventListener("click", (e) => {
            e.preventDefault();
            const color = document.getElementById("colors");
            const quantity = document.getElementById("quantity");

            let productAdded = {
                name: product.name,
                price: product.price,
                _id: newId,
                color: color.value,
                quantity: parseInt(quantity.value, 10),
                img: product.imageUrl,
            };

            //  Gestion du localStorage
            let arrayProductsInCart = [];
      
            // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
            if (localStorage.getItem("cart") !== null) {
            arrayProductsInCart = JSON.parse(localStorage.getItem("cart"));
        
            } 
            // trouver dans le tableau un item qui a le même ID et couleur que l'item à ajouter 
            const foundIndex = arrayProductsInCart.findIndex (item => {
                return item._id === productAdded._id && item.color === productAdded.color
            })
            // Si l'item existe dans le tableau récupérer l'index de l'item dans le tableau
            if (foundIndex !== -1) {
                // avec l'index de l'item, incrémenter la qté 
                arrayProductsInCart[foundIndex].quantity += parseInt(productAdded.quantity, 10)
            } else {
                // Sinon pousser l'item dans le tableau
                arrayProductsInCart.push(productAdded);
            }


            localStorage.setItem("cart", JSON.stringify(arrayProductsInCart));
        });
    })

    
