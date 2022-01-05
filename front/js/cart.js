//initialisation des variables globales pour cumuls
let WtotalQty = 0;
let WtotalAmount = 0;	

/*  déclaration des variables globales à cette page */
let WimgsrcA = "vide"; //chemin de l'image
let	WimgaltA = "vide"; //texte alternatif de l'image

// initialisation des tableaux afin de stocker les données 
let keyA = [];
let idA = [];
let colorA = [];
let qtyA = []; 
let priceA = [];  
let nameA = [];  
let imgsrcA = [];  
let	imgaltA = [];  
let iA = 0; //index tableau




// test : boucle de traitement ou vide ? //https://qastack.fr/programming/3262605/how-to-check-whether-a-storage-item-is-set
let returnObjName= JSON.parse(localStorage.getItem('WachatA'));
if(returnObjName && Object.keys(returnObjName).length > 0)	// présence dans le local storage
{ 	
	// boucle pour affichage 
	for (let readingIndex=0;readingIndex<=(Object.keys(returnObjName.keyA).length)-1;readingIndex++)
	{
		document.body.onload = addElement(readingIndex);//création des nouveaux éléments 		
		loadFromLocalStorage(returnObjName);// renseignement des tableaux depuis le localstorage
	}

	/* après la boucle: affichage de la quantité et du montant */
	// <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
	let wtotalQuantity = document.querySelector("#totalQuantity");
	wtotalQuantity.innerHTML = WtotalQty;
	let wtotalPrice = document.querySelector("#totalPrice");
	wtotalPrice.innerHTML = WtotalAmount;

}
else //Rien dans local storage
{	
	console.log("localStorage est vide.");
	alert("Votre panier est vide, vous devez sélectionner au moins 1 article. Retournez sur la page Accueil.");
}
  


/* boucle sur <input> selon le listener */ // window.addEventListener('change', function () 
let Wmodifs = document.getElementsByName("itemQuantity");//nom de la balise <input>
for (let Wmodif of Wmodifs) 
{
	Wmodif.addEventListener('change', function()
	{
		let newQt = this.value;//nouvelle quantité affichée à l'écran 
		let reslt = Wmodif.closest("article");// recherche de l'article qui contient les identifiants
		let wCheck=reslt.id+reslt.color;	console.log("modif détectée : "+wCheck);//alert("modif détectée " +wCheck);	alert("nouvelle quantité " +newQt); 
		
		iA = keyA.indexOf(wCheck);	console.log("iA "+iA);
		qtyA[iA] = parseInt(newQt); console.log("qtyA après  "+qtyA[iA]);
		
		/* Stockage des données dans le localstorage */
		loadToLocalStorage();
		
		//msg pour dire que c'est ajouté au panier 
		alert("Cette modification a bien été ajoutée à votre panier.")
		document.location.href="./cart.html";// refresh de la page
	});
}



/* boucle sur <p> dont la class="deleteItem" selon le listener */ 
let Wdelete = document.querySelectorAll(".deleteItem");//nom de la classe de <p>
for (let Wdel of Wdelete) 
{
	Wdel.addEventListener('click', function()
	{
		//let newQt = this.value;//nouvelle quantité affichée à l'écran 
		let reslt = Wdel.closest("article");// recherche de l'article qui contient les identifiants
		let wCheck=reslt.id+reslt.color;	console.log("supression détectée : "+wCheck);//alert("modif détectée " +wCheck);	alert("nouvelle quantité " +newQt); 
		
		//récupération de l'index de l'élément sélectionné
		iA = keyA.indexOf(wCheck);	console.log("iA "+iA);

		//suppression de l'élément sélectionné dans les tableaux
		deleteElement(iA);

		/* Stockage des données dans le localstorage */
		loadToLocalStorage();
		
		//msg pour dire que c'est retiré du panier 
		alert("Cet achat a bien été retiré de votre panier.")
		document.location.href="./cart.html";// refresh de la page
		
	});
}


function addElement(readingIndex)
{
	/* création des nouvelles div */

	
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
	// feedNewTag(readingIndex);	
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


	// function addChildren()
	// {

	// 	// div1 et div2 vont dans article
	// 	newArticle.appendChild(newDiv1);	
	// 	newArticle.appendChild(newDiv2);
	// 	//<img>
	// 	newDiv1.appendChild(newImg);
	// 	// la div3 va dans la div2
	// 	newDiv2.appendChild(newDiv3); 
	// 	//h2 va dans div3
	// 	newDiv3.appendChild(newH2); 
	// 	// p1 et p2 vont dans div3
	// 	newDiv3.appendChild(newP1);
	// 	newDiv3.appendChild(newP2); 
	// 	// la div4 va dans la div2
	// 	newDiv2.appendChild(newDiv4); 
	// 	// la div5 va dans la div4
	// 	newDiv4.appendChild(newDiv5);
	// 	// div Qté et input
	// 	newDiv5.appendChild(newP3); 
	// 	newDiv5.appendChild(newInput); 
	// 	// la div6 va dans la div4  
	// 	newDiv4.appendChild(newDiv6); 
	// 	// delete
	// 	newDiv6.appendChild(newP4);

	// 	/* mise à jour de la page */
	// 	wSection.appendChild(newArticle);
		
	// 	// return;

	// }
}	

function feedNewTag(newArticle,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newImg,newH2,newP1,newP2,newP3,newP4,newInput,readingIndex)
{


	//<-article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
	//newArticle.classList.add("cart__item");
	newArticle=updClass(newArticle,"cart__item");
	newArticle.id = returnObjName.idA[readingIndex]; 
	newArticle.color = returnObjName.colorA[readingIndex];	console.log("article.class =  " +newArticle.className);
	
	//<div class="cart__item__img">
	//newDiv1.classList.add("cart__item__img");console.log("div1.class =  " +newDiv1.className);
	newDiv1=updClass(newDiv1,"cart__item__img");
	
	// <img src="../images/product01.jpg" alt="Photographie d'un canapé">
	newImg.src = returnObjName.imgsrcA[readingIndex];let ZZZ = returnObjName.imgsrcA[readingIndex]; console.log("ZZZ " +ZZZ);
	newImg.alt = returnObjName.imgaltA[readingIndex];	

	//<div class="cart__item__content">
	//newDiv2.classList.add("cart__item__content");console.log("div2.class =  " +newDiv2.className);
	newDiv2=updClass(newDiv2,"cart__item__content");

	//<div class="cart__item__content__description">
	// newDiv3.classList.add("cart__item__content__description");console.log("div3.class =  " +newDiv3.className);
	newDiv3=updClass(newDiv3,"cart__item__content__description");

	///<h2>Nom du produit</h2>
	newH2.innerHTML = returnObjName.nameA[readingIndex];
	//<p>Vert</p>
	newP1.innerHTML = returnObjName.colorA[readingIndex];
	//<p>42,00 €</p>
	newP2.innerHTML = returnObjName.priceA[readingIndex] +",00"+" " +"€";
	
	//<div class="cart__item__content__settings">
	//newDiv4.classList.add("cart__item__content__settings");console.log("div4.class =  " +newDiv4.className);
	newDiv4=updClass(newDiv4,"cart__item__content__settings");
	//<div class="cart__item__content__settings__quantity">
	//newDiv5.classList.add("cart__item__content__settings__quantity");console.log("div5.class =  " +newDiv5.className);
	newDiv5=updClass(newDiv5,"cart__item__content__settings__quantity");
	//<p>Qté : </p>
	newP3.innerHTML = "Qté : ";
	//<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
	newInput.type="number";
	//newInput.classList.add("itemQuantity");console.log("newInput.class =  " +newInput.className);
	newInput=updClass(newInput,"itemQuantity");
	newInput.name="itemQuantity";
	newInput.min=1;
	newInput.max=100;
	newInput.value = + returnObjName.qtyA[readingIndex];
	
	//<div class="cart__item__content__settings__delete">
	//newDiv6.classList.add("cart__item__content__settings__delete");console.log("div6.class =  " +newDiv6.className);
	newDiv6=updClass(newDiv6,"cart__item__content__settings__delete");
	//<p class="deleteItem">Supprimer</p>
	//newP4.classList.add("deleteItem");console.log("newP4 : "+newP4.className);
	newP4=updClass(newP4,"deleteItem");
	newP4.innerHTML = "Supprimer";
	
	/* cumuls */
	WtotalQty = WtotalQty+(parseInt(returnObjName.qtyA[readingIndex]));console.log("wtotalaty : "+WtotalQty);
	WtotalAmount = WtotalAmount+((parseInt(returnObjName.qtyA[readingIndex]))*(parseInt(returnObjName.priceA[readingIndex])));console.log("wtotalamount : "+WtotalAmount);
	// WtotalAmount = WtotalAmount+((parseInt(returnObjName.qtyA))*(parseInt(returnObjName.priceA)));console.log("wtotalamount : "+WtotalAmount);
	//<div class="cart__item__content__settings__delete">
	
	 return newArticle,newDiv1,newDiv2,newDiv3,newDiv4,newDiv5,newDiv6,newImg,newH2,newP1,newP2,newP3,newP4,newInput,readingIndex;

}
	
	// return;





/* renseignement des tableaux depuis le local storage */
function loadFromLocalStorage(returnObjName)
{

	keyA=returnObjName.keyA;
	idA=returnObjName.idA;
	colorA=returnObjName.colorA;
	qtyA=returnObjName.qtyA;
	priceA = returnObjName.priceA;
	nameA = returnObjName.nameA;
	imgsrcA=returnObjName.imgsrcA;
	imgaltA=returnObjName.imgaltA;
				
	// return;

}


/* ajout des données dans le localstorage */
function loadToLocalStorage()
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
	/*let objLinea = JSON.stringify(objJson);
	localStorage.setItem("obj",objLinea);*/
	let WachatA = JSON.stringify(Wachat);
	localStorage.clear();// rdx 30/12/2021
	localStorage.setItem("WachatA",WachatA);// à vérifier RDX

	// return;
}

// suppression dans les tableaux
function deleteElement(iA)
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

// ajout de la balise enfant à son parent
function addChildren(pParent,pChild)
{

	pParent.appendChild(pChild);	
		// // div1 et div2 vont dans article
		// newArticle.appendChild(newDiv1);	
		// newArticle.appendChild(newDiv2);
		// //<img>
		// newDiv1.appendChild(newImg);
		// // la div3 va dans la div2
		// newDiv2.appendChild(newDiv3); 
		// //h2 va dans div3
		// newDiv3.appendChild(newH2); 
		// // p1 et p2 vont dans div3
		// newDiv3.appendChild(newP1);
		// newDiv3.appendChild(newP2); 
		// // la div4 va dans la div2
		// newDiv2.appendChild(newDiv4); 
		// // la div5 va dans la div4
		// newDiv4.appendChild(newDiv5);
		// // div Qté et input
		// newDiv5.appendChild(newP3); 
		// newDiv5.appendChild(newInput); 
		// // la div6 va dans la div4  
		// newDiv4.appendChild(newDiv6); 
		// // delete
		// newDiv6.appendChild(newP4);

		// /* mise à jour de la page */
		// wSection.appendChild(newArticle);
		
	return pParent,pChild;

}

	function updClass(element,className)
{
	/* utiliser l'API classList pour supprimer et ajouter des classes
	https://developer.mozilla.org/fr/docs/Web/API/Element/classList	
	const div = document.createElement('div');
	div.classList.add("anotherclass")*/ 
	element.classList.add(className);//console.log("newH3.class =  " +newH3.className);

	return element;

}
