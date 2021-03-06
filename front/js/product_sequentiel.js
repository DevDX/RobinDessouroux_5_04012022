//https://www.sitepoint.com/get-url-parameters-with-javascript/
const QUERYSTRING = window.location.search;
console.log("1 = "+QUERYSTRING);

const URLPARAMS = new URLSearchParams(QUERYSTRING);
console.log("2 = "+URLPARAMS);

const pId = URLPARAMS.get('id')
console.log("3 ID = "+pId); //identifiant du produit sélectionné

// Get THE product by API
let urlAPIproductSelected = "http://localhost:3000/api/products"+"/"+pId;// à vérifier mais semble ok
console.log(urlAPIproductSelected);

// déclaration variables  
let WimgsrcA = "vide"; //28/12/2021 rdx ajout
let	WimgaltA = "vide"; //28/12/2021 rdx ajout

// API Feedback 
fetch(urlAPIproductSelected)
	// OK 
	.then ((response) => response.json()
		.then((data) => 
			{
				console.log("id : "+data._id);
				console.log("name  : "+data.name);
				// 1. creation
				let newImg = document.createElement('img');
				/* https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector
				var el = document.querySelector(".maclasse");*/
				var wTitle = document.querySelector("#title");
				var wDescription = document.querySelector("#description");
				var wPrice = document.querySelector("#price");
				var wPicture = document.querySelector(".item__img");
				var wSelect = document.querySelector("#colors");

				/* 2. feed from API */ 
				newImg.src = data.imageUrl;console.log("newImg.src =  " +newImg.src);
				newImg.alt = data.altTxt;console.log("newImg.alt =  " +newImg.alt);
				WimgsrcA = newImg.src;
				WimgaltA = newImg.alt;
				wTitle.innerHTML = data.name; console.log("wTitle.innerHTML =  " +wTitle.innerHTML);
				wDescription.innerHTML = data.description; console.log("wDescription.innerHTML  =  " +wDescription.innerHTML );
				wPrice.innerHTML = data.price; console.log("price  =  " +wPrice.innerHTML );
				
				/* 3. cas particulier: les couleurs */
				/*https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
				let fruits = ['Apple', 'Banana'];
				fruits.forEach(function(item, index, array) {
  				console.log(item, index);
				});*/
				let colorsA = data.colors;
				console.log("array des couleurs : " + colorsA);
				colorsA.forEach(function(item, index, array) 
				{
					let newOption = document.createElement('option');
					newOption.value = item;console.log("value "+newOption.value);
					newOption.textContent = item;console.log("content "+newOption.textContent);
					console.log("item, index "+item, index);
					wSelect.appendChild(newOption);
				});
			
				/* 4. Web page update */
				wPicture.appendChild(newImg);
						
				
			}
		)
	)

	// NOT ok	
	.catch((err) => console.log('Erreur : ' + err));

		
/* ajout panier en cliquant sur le bouton */
let cartA = []; // panier sous forme d'array PAS UTILISE
let keyA = [];
let idA = [];
let colorA = [];
let qtyA = []; 
let priceA = []; //27/12/2021 rdx ajout 
let nameA = []; //27/12/2021 rdx ajout 
let imgsrcA = []; //27/12/2021 rdx ajout
let	imgaltA = []; //27/12/2021 rdx ajout
let iA = 0;

// achat effectué
let Wachat = 
{
	keyA,
	idA,
	colorA,
	qtyA,
	priceA,	//27/12/2021 rdx ajout 
	nameA ,	//27/12/2021 rdx ajout
	imgsrcA, //27/12/2021 rdx ajout
	imgaltA //27/12/2021 rdx ajout
};


/*https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener
// Ajouter un écouteur d'évènements à la table avec une fonction fléchée
const el = document.querySelector("#outside");
el.addEventListener("click", () => {
  modifyText("quatre");
}, false);
*/
const evtAddCart = document.querySelector("#addToCart");
evtAddCart.addEventListener("click", () => 
{

	// check quantité et couleur (les 2 doivent être non vides) 
	if ((parseInt(document.querySelector("#quantity").value)) > 0 && (document.querySelector("#colors").value)!=="") 
	{
		
		
		/*===================================================================================================================================================*/
		/*vérification du contenu du local storage*/
		let LsObj2 = JSON.parse(localStorage.getItem("WachatA"));
		console.log(LsObj2); // LsObj2 est plus pratique à utiliser
		let Windicator =  0;  // working indicateur
		// test vide ou boucle de traitement ?
		var returnObjName= JSON.parse(localStorage.getItem('WachatA'));
		if(returnObjName && Object.keys(returnObjName).length > 0)
		{
			//Exist data in local storage
			Windicator =  Object.keys(returnObjName).length;  
			console.log("Product.js localStorage n'est pas vide." + " "+Windicator);
			// détermination de l'index maximal pour boucle sur l'array du local storage
			// let IndexMax = ((LsObj2.keyA).length)-1;alert(Object.keys(returnObjName.keyA).length);
			let IndexMax = (Object.keys(returnObjName.keyA).length)-1;
			console.log("Product.js index Maxi est "+IndexMax);

			// set 0 reading index   
			let readingIndex=0;	// reading index 
			// loop 
			while (readingIndex<=IndexMax)
			{
				console.log("reading index vaut  "+[readingIndex]);

				/* renseignement de l'array depuis le local storage */
				// keyA =(LsObj2.keyA[readingIndex]);console.log("Wachat.keyA : "+keyA);
				keyA=returnObjName.keyA;console.log("Wachat.keyA : "+keyA);
				// idA =LsObj2.idA[readingIndex];console.log("Wachat.keyA : "+idA);
				idA=returnObjName.idA;
				// colorA =LsObj2.colorA[readingIndex];console.log("Wachat.keyA : "+colorA);
				colorA=returnObjName.colorA;
				// qtyA =LsObj2.qtyA[readingIndex];console.log("Wachat.keyA : "+qtyA);
				qtyA=returnObjName.qtyA;
				// priceA =LsObj2.priceA[readingIndex];console.log("Wachat.keyA : "+priceA);
				priceA = returnObjName.priceA;
				// nameA =LsObj2.nameA[readingIndex];  console.log("Wachat.keyA : "+nameA);
				nameA = returnObjName.nameA;
				// imgsrcA =LsObj2.imgsrcA[readingIndex]; console.log("Wachat.keyA : "+imgsrcA);
				imgsrcA=returnObjName.imgsrcA;
				// imgaltA =LsObj2.imgaltA[readingIndex];console.log("Wachat.keyA : "+imgaltA);
				imgaltA=returnObjName.imgaltA;
				
				readingIndex=readingIndex+1; // next record
				console.log(" Product.js readingIndex=readingIndex+1  vaut " +readingIndex);
			}
			// console.log(Wachat);
		}
		/*=================================================================================================================================*/

	
		let Wkey = pId+document.querySelector("#colors").value; // constitution de ma clé unique
		console.log(Wkey);

		/*https://fr.w3docs.com/snippets/javascript/comment-verifier-si-un-element-est-present-dans-un-tableau-en-javascript.html
		if (myArray.indexOf(searchTerm) === -1) {
		console.log("element doesn't exist");
		}
		else {
		console.log("element found");
		}*/	
		if(keyA.indexOf(Wkey) === -1) // not found
		{
			console.log("element doesn't exist" + " "+Wkey);
			// keyA.push(Wkey);
			keyA.push(Wkey);
			// idA.push(pId);
			idA.push(pId);
			// colorA.push(document.querySelector("#colors").value);
			colorA.push(document.querySelector("#colors").value);
			// qtyA.push(parseInt(document.querySelector("#quantity").value));
			qtyA.push(parseInt(document.querySelector("#quantity").value));
			// nameA.push(document.querySelector("#title").textContent);	// ajout 27/12/2021 rdx https://fr.flossmanuals.net/initiation-a-javascript/manipuler-le-texte/
			nameA.push(document.querySelector("#title").textContent);
			// priceA.push(parseInt(document.querySelector("#price").textContent));	// ajout 27/12/2021 rdx
			priceA.push(parseInt(document.querySelector("#price").textContent));
			// imgsrcA.push(WimgsrcA);
			imgsrcA.push(WimgsrcA);
			// imgaltA.push(WimgaltA);
			imgaltA.push(WimgaltA);
			console.log(keyA, idA, colorA, qtyA, imgsrcA, imgaltA);
			// console.table("Wachat insert "+Wachat);
			// console.log(Wachat);
		}
		else // found
		{
			console.log("element found" + " "+Wkey);
			iA = keyA.indexOf(Wkey);	console.log("iA "+iA);
			/*console.log("keyA.indexOf(Wkey) "+keyA.indexOf(Wkey));
			console.log("iA "+iA);
			console.log("qtyA avant  "+qtyA[iA]);*/
			qtyA[iA] = qtyA[iA] + parseInt(document.querySelector("#quantity").value);
			console.log("qtyA après  "+qtyA[iA]);

		}
		// localstorage
		//localStorage.setItem("students", JSON.stringify(newStudent));
		/*console.log("localstorage table cartA");
		console.table(cartA);  */
		// achat effectué
		let Wachat = 
		{
			keyA,
			idA,
			colorA,
			qtyA,
			priceA,	//27/12/2021 rdx ajout 
			nameA ,	//27/12/2021 rdx ajout
			imgsrcA, //27/12/2021 rdx ajout
			imgaltA //27/12/2021 rdx ajout
		};
		console.log("localstorage table Wachat");
		console.table(Wachat);  
		/*let objLinea = JSON.stringify(objJson);
		localStorage.setItem("obj",objLinea);*/
		console.log("Wachat : "+Wachat);
		let WachatA = JSON.stringify(Wachat);
		localStorage.clear();// rdx 30/12/2021
		//localStorage.removeItem();//rdx 30/12/2021
		localStorage.setItem("WachatA",WachatA);// à vérifier RDX

		//msg pour dire que c'est ajouté au panier et redirection vers la page d'accueil
		alert("Cet achat a bien été ajouté à votre panier.")
		document.location.href="./index.html"; // retour à l'accueil ou bien aller vers le panier ? Demander à Denis. cf.http://memo-web.fr/categorie-javascript-120/

		/*
		https://askcodez.com/ajouter-des-donnees-a-lobjet-localstorage.html
		ou
		localStorage.setItem("students", JSON.stringify(newStudent));
		*/

	/* sinon check quantité et couleur pour éviter quantité = 0 ou couleur non sélectionnée */
	}
	else 
	{
		alert("This is an alert box. Check the color and the quantity !");
	}		

});


