// Récupération de l'ID de la commande
const orderId = localStorage.getItem("orderId");
// Afffichage du numero de commande
let orderNumber = document.createElement("div");
document.getElementById("orderId").appendChild(orderNumber);
orderNumber.innerHTML = `${orderId}`;

// On vide le localStorage
localStorage.clear();
