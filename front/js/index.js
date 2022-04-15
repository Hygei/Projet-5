main();

function main() {
  getProducts();
}
// recupération des données de l'API
function getProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
      return res.json()
    })
    .catch((error) => {
        let productsContainer = document.querySelector(".items");
        productsContainer.innerHTML =
          "Nous n'avons pas réussi à afficher nos produits. Avez vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
        productsContainer.style.textAlign = "center";
        productsContainer.style.padding = "30vh 0";
      })
    
    // Afficher les differents produits 
    .then(function (resultatAPI) {
        const products = resultatAPI;
        console.log(products);
        for (let product in products) {
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = "product.html?id=${resultatAPI[product]._id";

            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[product].imageUrl;

            let productTitle = document.createElement("div");
            productArticle.appendChild(productTitle);
            productTitle.classList.add("productName");
            productTitle.innerHTML = resultatAPI[product].name;

            let productDesc = document.createElement("div");
            productArticle.appendChild(productDesc);
            productDesc.classList.add("productDescription");
            productDesc.innerHTML = resultatAPI[product].description;

            }
    })
}


