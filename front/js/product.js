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


/* Récupération du paramètre id */
//cf.https://www.sitepoint.com/get-url-parameters-with-javascript/
const QUERYSTRING = window.location.search;// console.log("1 = "+QUERYSTRING);
const URLPARAMS = new URLSearchParams(QUERYSTRING);// console.log("2 = "+URLPARAMS);
const pId = URLPARAMS.get('id')//identifiant du produit sélectionné	// console.log("3 ID = "+pId); 


// Prépa pour obtention des données de l'API selon paramètre pId
let urlAPIproductSelected = "http://localhost:3000/api/products"+"/"+pId;console.log(urlAPIproductSelected);
// Réponse de l'API
fetch(urlAPIproductSelected)
	// OK 
	.then ((response) => response.json()
		.then((data) => 
			{
				document.body.onload = addElement(data);//création des nouveaux éléments 				
			}
		)
	)

	// NOT ok	
	.catch((err) => console.log('Erreur : ' + err));

		

//listener se déclenchant sur le clic du bouton ajouter au panier
/*https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
// Ajouter un écouteur d'évènements à la table avec une fonction fléchée
const el = document.querySelector("#outside");
el.addEventListener("click", () => {
  modifyText("quatre");
}, false);*/
const evtAddCart = document.querySelector("#addToCart"); //listener se déclenchant sur le clic du bouton "ajouter au panier"
evtAddCart.addEventListener("click", () => 
{

	// check quantité et couleur (les 2 doivent être non vides) 
	if ((parseInt(document.querySelector("#quantity").value)) > 0 && (document.querySelector("#colors").value)!=="") 
	{		
		/* vérification du contenu du local storage */
		let LsObj2 = JSON.parse(localStorage.getItem("WachatA"));console.log(LsObj2); // LsObj2 est plus pratique à utiliser		
		// test: boucle de traitement ou vide ?
		let returnObjName= JSON.parse(localStorage.getItem('WachatA'));
		if(returnObjName && Object.keys(returnObjName).length > 0)
		{
			// existe dans le local storage
			let Windicator =  0;  // working indicateur
			Windicator =  Object.keys(returnObjName).length;console.log("Product.js localStorage n'est pas vide." + " "+Windicator);
			// détermination de l'index maximal pour boucle sur l'array du local storage
			let IndexMax = (Object.keys(returnObjName.keyA).length)-1;console.log("Product.js index Maxi est "+IndexMax);

			// boucle sur le contenu du local storage afin d'alimenter les tableaux
			for (let readingIndex=0;readingIndex<=(Object.keys(returnObjName.keyA).length)-1;readingIndex++)
			{
				loadFromLocalStorage(returnObjName);/* renseignement des tableaux depuis le localstorage *///console.log("reading index vaut  "+[readingIndex]);
			}
			
		}

		
		/* Ajout ou mise à jour de l'achat */
		/*https://fr.w3docs.com/snippets/javascript/comment-verifier-si-un-element-est-present-dans-un-tableau-en-javascript.html
		if (myArray.indexOf(searchTerm) === -1) {
		console.log("element doesn't exist");
		}
		else {
		console.log("element found");
		}*/
		// constitution de ma clé : identifiant unique (id et couleur)
		let Wkey = pId+document.querySelector("#colors").value; console.log(Wkey);	
		if(keyA.indexOf(Wkey) === -1) // PAS trouvé alors ajout des données dans les tableaux
		{
			console.log("element doesn't exist" + " "+Wkey);
			//ajout dans les tableaux
			addInArrays(Wkey);//console.log(keyA, idA, colorA, qtyA, imgsrcA, imgaltA);
		}
		else // trouvé alors mise à jour de la quantité selon l'index iA
		{
			console.log("element found" + " "+Wkey);
			iA = keyA.indexOf(Wkey);	console.log("iA "+iA);
			qtyA[iA] = qtyA[iA] + parseInt(document.querySelector("#quantity").value);console.log("qtyA après  "+qtyA[iA]);
		}
		/* Stockage des données dans le localstorage */
		loadToLocalStorage();
		//msg pour dire que c'est ajouté au panier et redirection vers la page d'accueil
		alert("Cet achat a bien été ajouté à votre panier.")
		document.location.href="./index.html"; // retour à l'accueil ou bien aller vers le panier ? Demander à Denis. cf.http://memo-web.fr/categorie-javascript-120/

	}
	else /* sinon check quantité et couleur pour éviter quantité = 0 ou couleur non sélectionnée */
	{
		alert("Vérifiez la couleur et la quantité de votre article !");
	}		

});



//création et renseignement des éléments 
function addElement (data) 
{
	
	// 1. création  
	let newImg = document.createElement('img');
	/* https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
	var el = document.querySelector(".maclasse");*/
	let wTitle = document.querySelector("#title");
	let wDescription = document.querySelector("#description");
	let wPrice = document.querySelector("#price");
	let wPicture = document.querySelector(".item__img");
	let wSelect = document.querySelector("#colors");

	/* 2. renseignement selon  API */ 
	feedNewTag(newImg,wTitle,wDescription,wPrice,data);	

	/* 3. cas particulier: les couleurs */
	/*https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
	let fruits = ['Apple', 'Banana'];
	fruits.forEach(function(item, index, array) {
	console.log(item, index);
	});*/
	let colorsA = data.colors;//console.log("array des couleurs : " + colorsA);
	colorsA.forEach(function(item, index, array) 
	{
		let newOption = document.createElement('option');
		newOption.value = item;console.log("value "+newOption.value);
		newOption.textContent = item;console.log("content "+newOption.textContent);
		console.log("item, index "+item, index);
		wSelect.appendChild(newOption);
	});

	/* 4. mise-à-jour de la page */
	wPicture.appendChild(newImg);
		
	// return;


	// function feedNewTag(data)
	// {
	// 	newImg.src = data.imageUrl;console.log("newImg.src =  " +newImg.src);
	// 	newImg.alt = data.altTxt;console.log("newImg.alt =  " +newImg.alt);
	// 	WimgsrcA = newImg.src;
	// 	WimgaltA = newImg.alt;
	// 	wTitle.innerHTML = data.name; console.log("wTitle.innerHTML =  " +wTitle.innerHTML);
	// 	wDescription.innerHTML = data.description; console.log("wDescription.innerHTML  =  " +wDescription.innerHTML );
	// 	wPrice.innerHTML = data.price; console.log("price  =  " +wPrice.innerHTML );

	// 	return;

	// }
					
}	

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

function addInArrays(Wkey)
{
	keyA.push(Wkey);
	idA.push(pId);
	colorA.push(document.querySelector("#colors").value);
	qtyA.push(parseInt(document.querySelector("#quantity").value));
	// nameA.push(document.querySelector("#title").textContent);	// ajout 27/12/2021 rdx https://fr.flossmanuals.net/initiation-a-javascript/manipuler-le-texte/
	nameA.push(document.querySelector("#title").textContent);
	priceA.push(parseInt(document.querySelector("#price").textContent));
	imgsrcA.push(WimgsrcA);
	imgaltA.push(WimgaltA);

	// return;
}

function feedNewTag(newImg,wTitle,wDescription,wPrice,data)
{
	newImg.src = data.imageUrl;console.log("newImg.src =  " +newImg.src);
	newImg.alt = data.altTxt;console.log("newImg.alt =  " +newImg.alt);
	WimgsrcA = newImg.src;
	WimgaltA = newImg.alt;
	wTitle.innerHTML = data.name; console.log("wTitle.innerHTML =  " +wTitle.innerHTML);
	wDescription.innerHTML = data.description; console.log("wDescription.innerHTML  =  " +wDescription.innerHTML );
	wPrice.innerHTML = data.price; console.log("price  =  " +wPrice.innerHTML );

	return newImg,wTitle,wDescription,wPrice,data;

}