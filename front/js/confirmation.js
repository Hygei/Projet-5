// On recupère l'Id de la commande présent dans l'URL
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("id");

// On affiche l'Id sur la page de confirmation
let orderNumber = document.createElement("div");
document.getElementById("orderId").appendChild(orderNumber);
orderNumber.innerHTML = `${newId}`;


// On vide le localStorage
localStorage.clear();
