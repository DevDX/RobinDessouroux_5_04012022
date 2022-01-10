//initialisation des variables globales 
let WtotalQty = 0;	//variable globale pour cumul quantité
let WtotalAmount = 0;	//variable globale pour cumul quantité
let indEmpty = "0"; // panier vide. 0=PAS vide, 1=vide 
let qtyOk = "OK"; // qtyOk="OK" alors quantité valide 

let WimgsrcA = "vide"; //chemin de l'image
let	WimgaltA = "vide"; //texte alternatif de l'image

// initialisation des tableaux afin de stocker les données 
let keyA = [];//clé identifiant unique
let idA = [];
let colorA = [];
let qtyA = []; 
let priceA = [];  
let nameA = [];  
let imgsrcA = [];  
let	imgaltA = [];  
let iA = 0; //index tableau


// test : boucle de traitement ou vide ?
let returnObjName= JSON.parse(localStorage.getItem('WachatA'));
if(returnObjName && Object.keys(returnObjName).length > 0)	// présence dans le local storage
{ 	
	// boucle pour affichage 
	indEmpty = "0"; // panier vide. 0=PAS vide, 1=vide 
	for (let readingIndex=0;readingIndex<=(Object.keys(returnObjName.keyA).length)-1;readingIndex++)
	{
		document.body.onload = addElement(readingIndex);//création des nouveaux éléments 		
		loadFromLocalStorage(returnObjName);// renseignement des tableaux depuis le localstorage
	}

	/* après la boucle: affichage de la quantité et du montant */
	let wtotalQuantity = document.querySelector("#totalQuantity");
	wtotalQuantity.innerHTML = WtotalQty;
	let wtotalPrice = document.querySelector("#totalPrice");
	wtotalPrice.innerHTML = WtotalAmount;

}
else //Rien dans local storage
{	
	// alert("Votre panier est vide, vous devez sélectionner au moins 1 article. Retournez sur la page Accueil.");//console.log("localStorage est vide.");
	indEmpty = "1"; // panier vide. 0=PAS vide, 1=vide 
}
  

/* boucle sur <input> selon le listener */ 
let Wmodifs = document.getElementsByName("itemQuantity");//nom de la balise <input>
for (let Wmodif of Wmodifs) 
{
	Wmodif.addEventListener('change', function() //change de la quantité
	{
		let newQt = this.value;//nouvelle quantité affichée à l'écran 
		if (newQt > 0)	//la quantité doit être positive  
		{ 
			let reslt = Wmodif.closest("article");// recherche de l'article qui contient les identifiants
			let wCheck=reslt.id+reslt.color; //constitution de l'identifiant unique	//console.log("modif détectée : "+wCheck);//alert("modif détectée " +wCheck);	alert("nouvelle quantité " +newQt); 
			
			iA = keyA.indexOf(wCheck);	//récupération de l'index de la clé unique //console.log("iA "+iA);
			qtyA[iA] = parseInt(newQt); //mise-à-jour de la quantité //console.log("qtyA après  "+qtyA[iA]);
			
			loadToLocalStorage(); /* Stockage des données dans le localstorage */
			alert("Cette modification a bien été ajoutée à votre panier.") //msg pour dire que c'est ajouté au panier 
			document.location.href="./cart.html";// refresh de la page
		}
		else
		{
			alert("Quantité invalide. Veuillez corriger. Une quantité ne peut pas être infèrieure à 1.")	;
			qtyOk = "";
		}
	});
}


/* boucle sur <p> dont la class="deleteItem" selon le listener */ 
let Wdelete = document.querySelectorAll(".deleteItem");//nom de la classe de <p>
for (let Wdel of Wdelete) 
{
	Wdel.addEventListener('click', function()	//clic sur supprimer
	{
		let reslt = Wdel.closest("article");// recherche de l'article qui contient les identifiants
		let wCheck=reslt.id+reslt.color;	//constitution de la clé unique //console.log("supression détectée : "+wCheck);//alert("modif détectée " +wCheck);	alert("nouvelle quantité " +newQt); 
		
		iA = keyA.indexOf(wCheck);	console.log("iA "+iA);//récupération de l'index de l'élément sélectionné
		deleteElement(iA);//suppression de l'élément sélectionné dans les tableaux
		
		loadToLocalStorage();/* Stockage des données dans le localstorage */
		alert("Cet achat a bien été retiré de votre panier.")//msg pour dire que c'est retiré du panier 
		document.location.href="./cart.html";// refresh de la page		
	});
}


//listener se déclenchant sur le clic du bouton commander
const evtAddOrder = document.querySelector("#order");  
evtAddOrder.addEventListener("click", () => //listener se déclenchant sur le clic du bouton "commander"
{
	if(indEmpty === "1" || qtyOk === "")
	{
		alert("Votre panier est vide, vous devez sélectionner au moins 1 article. Retournez sur la page Accueil.");
	}
	else
	{	
		event.preventDefault(); //	alert("commande détectée");	
		// iniErrMsg
		document.getElementById("firstNameErrorMsg").innerHTML = "";// faire une fonction
		document.getElementById("lastNameErrorMsg").innerHTML = "";// faire une fonction
		document.getElementById("addressErrorMsg").innerHTML = "";// faire une fonction
		document.getElementById("cityErrorMsg").innerHTML = "";// faire une fonction
		document.getElementById("emailErrorMsg").innerHTML = "";// faire une fonction
		let indErr="0";	//indicateur erreur détectée <=> 0=pas d'erreur	

		//test du formulaire 
		/* le prénom */
		let wPrenom = document.getElementById("firstName").value;console.log("le prénom est : "+wPrenom);
		if (wPrenom.length <= 1) //longueur du prénom
		{		
			alert("prénom trop court");
			sndId="firstNameErrorMsg";
			sndMsg="Le prénom est incomplet";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}
		if(! wPrenom.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝÆ._\s-]{2,60}$/)) //le prénom ne doit contenir que des lettres
		{
			alert("prénom invalide");
			sndId="firstNameErrorMsg";
			sndMsg="prénom invalide";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}

		/* le nom */
		let wNom = document.getElementById("lastName").value;console.log("le nom est : "+wNom);
		if (wNom.length <= 1) //longueur du nom
		{
			alert("nom trop court");
			sndId="lastNameErrorMsg";
			sndMsg="Le nom est incomplet";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}
		if(! wNom.match(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝÆ._\s-]{2,60}$/)) //le nom ne doit contenir que des lettres
		{
			alert("nom invalide");
			sndId="lastNameErrorMsg";
			sndMsg="nom invalide";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}

		/* l'adresse */
		let wAdresse = document.getElementById("address").value;console.log("adresse est : "+wAdresse); 
		if (wAdresse.length <= 1) //longueur de l'adresse
		{
			alert("nom trop court");
			sndId="addressErrorMsg";
			sndMsg="L'adresse est incomplète";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}
		if(! wAdresse.match(/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝÆ._\s-]{5,60}$/ )) //l'adresse peut contenir des chiffres et des lettres ;-)
		{
			alert("adresse invalide");
			sndId="addressErrorMsg";
			sndMsg="adresse invalide";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}

		/* la ville */
		let wVille = document.getElementById("city").value;console.log("ville est : "+wVille);
		if (wVille.length <= 1) //longueur de ville
		{
			alert("nom de ville trop court");
			sndId="cityErrorMsg";
			sndMsg="Le nom de la ville est incomplet";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}
		if(! wVille.match(/^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝÆ._\s-]{3,60}$/ )) //l'adresse peut contenir des chiffres et des lettres ;-)
		{
			alert("nom de ville invalide");
			sndId="cityErrorMsg";
			sndMsg="nom de ville invalide";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}

		/* le mail */
		// (/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i)
		let wEmail = document.getElementById("email").value;console.log("le mail est : "+wEmail);
		if (wEmail.length <= 1) //longueur du nom
		{
			alert("email trop court");
			sndId="emailErrorMsg";
			sndMsg="L'email est erroné";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}
		// validité de l'email
		if(! wEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) //à vérifier 
		{
			alert("email invalide");
			sndId="emailErrorMsg";
			sndMsg="email invalide";
			indErr="1";
			sndErrMsg(sndId,sndMsg);
		}

		if(indErr==="0") // pas d'erreur détectée alors création de contact et product
		{	
			// objet contact
			// let contact = document.forms["cart__order__form"]; 		console.log("contact "+contact.firstName + " " + contact.lastName+" "+contact.address+" " +contact.city+" " +contact.email); 
			let contact = (
			{
				firstName : document.getElementById("firstName").value,
				lastName : document.getElementById("lastName").value,
				address : document.getElementById("address").value,
				city : document.getElementById("city").value,
				email : document.getElementById("email").value
			}); console.log("contact "+contact.firstName + " " + contact.lastName+" "+contact.address+" " +contact.city+" " +contact.email); 
			// products => tableau des produits
			let products = idA; // idA est l'array qui contient les id des articles contenus dans le panier
			console.log("idA "+idA);console.log("products "+products);
			/* POST */
			const pObjects =  {contact,products}; // objets à passer en paramètres à passer => contact et product 
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(pObjects)
			};console.log(requestOptions);
			fetch('http://localhost:3000/api/products/order', requestOptions)
				.then(async response => {
					const isJson = response.headers.get('content-type')?.includes('application/json');
					const data = isJson && await response.json();
					console.log("data :"+data);
					// check response
					if (!response.ok) {
						// error message from body or default to response status
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}
					else{
						alert("orderId "+data.orderId);
						let porderId = data.orderId;
						// affichage page confirmation
						// document.location.href="./confirmation.html"+"/"+porderId;			
						// let orderIdConfirmation = document.getElementById("orderId");
						// orderIdConfirmation.value = porderId; console.log("numéro de commande "+porderId); // numéro de commande
						// localStorage.clear();
						document.location.href="./confirmation.html"+"?orderId="+porderId;						
						

					}			
				})

				.catch(error => {
					console.error('There was an error!', error);
				});
			/* fin POST */
		}
	}
});


/* création des éléments */
function addElement(readingIndex)
{
	/* création des nouvelles balises */
	// la section qui contiendra tout
	let wSection = document.querySelector("#cart__items");
	//<article>
	let newArticle = document.createElement('article');
	//<div>
	let newDiv1 = document.createElement('div');
	let newDiv2 = document.createElement('div');
	let newDiv3 = document.createElement('div');
	let newDiv4 = document.createElement('div');
	let newDiv5 = document.createElement('div');
	let newDiv6 = document.createElement('div');
	//<img>
	let newImg = document.createElement('img');
	//<h2>
	let newH2 = document.createElement('h2');
	//<p>
	let newP1 = document.createElement('p');
	let newP2 = document.createElement('p');
	let newP3 = document.createElement('p');
	let newP4 = document.createElement('p');
	//<input>
	let newInput = document.createElement('input');
	
	/* mise à jour des balises */	
	feedNewTag(newArticle,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newImg,newH2,newP1,newP2,newP3,newP4,newInput,readingIndex);

	/* Prépa pour affichage */
	addChildren(newArticle,newDiv1);
	addChildren(newArticle,newDiv2);
	addChildren(newDiv1,newImg);
	addChildren(newDiv2,newDiv3); 
	addChildren(newDiv3,newH2); 
	addChildren(newDiv3,newP1);
	addChildren(newDiv3,newP2);
	addChildren(newDiv2,newDiv4); 
	addChildren(newDiv4,newDiv5);
	addChildren(newDiv5,newP3); 
	addChildren(newDiv5,newInput); 
	addChildren(newDiv4,newDiv6); 
	addChildren(newDiv6,newP4);
	addChildren(wSection,newArticle);
}	

// ajout des classes et renseignement des balises
function feedNewTag(newArticle,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newImg,newH2,newP1,newP2,newP3,newP4,newInput,readingIndex)
{
	newArticle=updClass(newArticle,"cart__item");
	newArticle.id = returnObjName.idA[readingIndex]; 
	newArticle.color = returnObjName.colorA[readingIndex];	console.log("article.class =  " +newArticle.className);
	newDiv1=updClass(newDiv1,"cart__item__img");
	newImg.src = returnObjName.imgsrcA[readingIndex];let ZZZ = returnObjName.imgsrcA[readingIndex]; console.log("ZZZ " +ZZZ);
	newImg.alt = returnObjName.imgaltA[readingIndex];	
	newDiv2=updClass(newDiv2,"cart__item__content");
	newDiv3=updClass(newDiv3,"cart__item__content__description");
	newH2.innerHTML = returnObjName.nameA[readingIndex];
	newP1.innerHTML = returnObjName.colorA[readingIndex];
	newP2.innerHTML = returnObjName.priceA[readingIndex] +",00"+" " +"€";
	newDiv4=updClass(newDiv4,"cart__item__content__settings");
	newDiv5=updClass(newDiv5,"cart__item__content__settings__quantity");	
	newP3.innerHTML = "Qté : ";
	newInput.type="number";
	newInput=updClass(newInput,"itemQuantity");
	newInput.name="itemQuantity";
	newInput.min=1;
	newInput.max=100;
	newInput.value = + returnObjName.qtyA[readingIndex];	
	newDiv6=updClass(newDiv6,"cart__item__content__settings__delete");	
	newP4=updClass(newP4,"deleteItem");
	newP4.innerHTML = "Supprimer";	
	/* cumuls */
	WtotalQty = WtotalQty+(parseInt(returnObjName.qtyA[readingIndex]));console.log("wtotalaty : "+WtotalQty);
	WtotalAmount = WtotalAmount+((parseInt(returnObjName.qtyA[readingIndex]))*(parseInt(returnObjName.priceA[readingIndex])));console.log("wtotalamount : "+WtotalAmount);
	
	return newArticle,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newImg,newH2,newP1,newP2,newP3,newP4,newInput,readingIndex;
}
	

function loadFromLocalStorage(returnObjName) /* renseignement des tableaux depuis le LocalStorage */
{
	keyA=returnObjName.keyA;
	idA=returnObjName.idA;
	colorA=returnObjName.colorA;
	qtyA=returnObjName.qtyA;
	priceA = returnObjName.priceA;
	nameA = returnObjName.nameA;
	imgsrcA=returnObjName.imgsrcA;
	imgaltA=returnObjName.imgaltA;				
}

function loadToLocalStorage() /* ajout des données dans le localstorage */
{
	// achat effectué
	let Wachat = 
	{
		keyA,
		idA,
		colorA,
		qtyA,
		priceA,	 
		nameA ,	 
		imgsrcA,  
		imgaltA  
	};
	let WachatA = JSON.stringify(Wachat);
	localStorage.clear();// rdx 30/12/2021 ou storage.removeItem(WachatA);
	localStorage.setItem("WachatA",WachatA);// c'est le panier dans le LocalStorage
}

function deleteElement(iA) // suppression dans les tableaux
{
	keyA.splice(iA,1);
	idA.splice(iA,1);
	colorA.splice(iA,1);
	qtyA.splice(iA,1);
	priceA.splice(iA,1);
	nameA.splice(iA,1);
	imgsrcA.splice(iA,1);
	imgaltA.splice(iA,1);
	// return;
}

function addChildren(pParent,pChild) // ajout de la balise enfant à son parent
{
	pParent.appendChild(pChild);		
	return pParent,pChild;
}

function updClass(element,className) // ajout de la classe à l'élément
{
	element.classList.add(className);
	return element;
}

function sndErrMsg(sndId,sndMsg) // Affichage du msg d'erreur - identifiant de la balise et message à afficher
{
	document.getElementById(sndId).innerHTML = sndMsg;
	return sndId,sndMsg;
}