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
            for (let colors of product.colors) {
                versionChoice.innerHTML = `<option value="${colors}"</option>`;
            }  
        }

    })

    
