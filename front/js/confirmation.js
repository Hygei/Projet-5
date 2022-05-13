// Récupération de l'ID de la commande
const orderId = localStorage.getItem("orderId");
// 
let orderNumber = document.createElement("div")
    document.getElementById("orderId").appendChild(orderNumber);
    orderNumber.innerHTML = `${orderId}`

    localStorage.clear();