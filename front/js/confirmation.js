/* Récupération du paramètre orderId */
const QUERYSTRING = window.location.search; console.log("1 = "+QUERYSTRING);
const URLPARAMS = new URLSearchParams(QUERYSTRING); console.log("2  "+URLPARAMS);
const porderId = URLPARAMS.get('orderId')//identifiant du produit sélectionné	
console.log(" porderId = "+porderId); 

//affichage du numéro de commande et suppression du panier dans le local storage
let orderIdConfirmation = document.getElementById("orderId");
orderIdConfirmation.innerHTML = porderId; console.log("numéro de commande "+porderId); // numéro de commande
localStorage.clear();
