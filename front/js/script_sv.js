// Prépa pour obtention de tous les produits par l'API
let urlAPIproducts = "http://localhost:3000/api/products";
// Réponse de l'API 
fetch(urlAPIproducts)
	// OK 
	.then ((response) => response.json()
		.then((data) => 
			{							
				// boucle 
				for (let i=0;i<=(data.length)-1;i++)
				{			
					document.body.onload = addElement(data[i]);//création des nouveaux éléments cf. https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
				}	
			}
		)
	)
	// PAS ok	
	.catch((err) => console.log('Erreur : ' + err));
		

	
//création et renseignement des éléments 
function addElement (data) 
{
	
	/* 1. création des balises
	https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
	var element = document.createElement(tagName[, options]); 	*/
	//<a href="./product.html?id=42">
	let newA = document.createElement('a');
	//<article>
	let newArticle = document.createElement('article');
	//<img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
	let newImg = document.createElement('img');
	//<h3 class="productName">Kanap name1</h3>
	let newH3 = document.createElement('h3');
	//<p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. ...
	let newP = document.createElement('p');

	/* 2. renseignement des nouvelles balises depuis les données de l'API */ 
	newImg.src = data.imageUrl;console.log("newImg.src =  " +newImg.src);
	newImg.alt = data.altTxt;console.log("newImg.alt =  " +newImg.alt);
	//https://www.developpez.net/forums/anocode.php?id=11c2b78f7463145fc7ffa45dd99d35f1
	newA.href = "./product.html?id="+data._id; console.log("newA.href =  " +newA.href);console.log("data[i]._id =  " +data._id);
	newH3.textContent = data.name; console.log("newH3.textContent =  " +newH3.textContent);
	newP.innerHTML = data.description; console.log("newP.innerHTML  =  " +newP.innerHTML);
	// console.log(i);
				
	/* 3. ajout des classes  */
	/* utiliser l'API classList pour supprimer et ajouter des classes
	https://developer.mozilla.org/fr/docs/Web/API/Element/classList	
		const div = document.createElement('div');
		div.className = 'foo';							
		div.classList.remove("foo");
		div.classList.add("anotherclass")*/ 
	newH3.classList.add("productName");console.log("newH3.class =  " +newH3.className);
	newP.classList.add("productDescription");console.log("newP.class =  " +newP.className);
		
	/* 4. mise à jour de la page */
	/* http://www.w3bai.com/fr/jsref/met_node_appendchild.html 
		var node = document.createElement("LI");                 // Create a <li> node	
		document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
	*/
	// ajout de <a> dans <section id="items">    
	document.getElementById("items").appendChild(newA);
	// article est dans <a>
	newA.appendChild(newArticle);
	// <article> contient les autres
	newArticle.appendChild(newImg);
	newArticle.appendChild(newH3);
	newArticle.appendChild(newP);
	
	return;
					
}