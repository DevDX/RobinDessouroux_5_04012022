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
					document.body.onload = addElement(data[i]);//création des nouveaux éléments 
				}	
			}
		)
	)
	// PAS ok	
	.catch((err) => console.log('Erreur : ' + err));		

	
//création et renseignement des éléments 
function addElement (data) 
{	
	/* 1. création des balises */
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
	newImg.src = data.imageUrl;//console.log("newImg.src =  " +newImg.src);
	newImg.alt = data.altTxt;//console.log("newImg.alt =  " +newImg.alt);
	newA.href = "./product.html?id="+data._id; console.log("newA.href =  " +newA.href);console.log("data[i]._id =  " +data._id);
	newH3.textContent = data.name; console.log("newH3.textContent =  " +newH3.textContent);
	newP.innerHTML = data.description; console.log("newP.innerHTML  =  " +newP.innerHTML);

	/* 3. ajout des classes  */
	newH3=updClass(newH3,"productName");
	newP=updClass(newP,"productDescription");		
	
	/* 4. mise à jour de la page */
	// ajout de <a> dans <section id="items">    
	document.getElementById("items").appendChild(newA);
	addChildren(newA,newArticle);
	addChildren(newArticle,newImg);
	addChildren(newArticle,newH3);
	addChildren(newArticle,newP);	
}	

// ajout de classe
function updClass(element,className)
{
	element.classList.add(className);//console.log("newH3.class =  " +newH3.className);
	return element;
}

// ajout de la balise enfant à son parent
function addChildren(pParent,pChild)
	{
		pParent.appendChild(pChild);	
		// return pParent,pChild; 		
	}