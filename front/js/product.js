const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("{product-ID}");

//modification de l'adresse d'appel à l'API
const newUrl = "http://localhost:3000/api/products/${newId}";

fetch(newUrl)
    .then((response) => response.json())

    
