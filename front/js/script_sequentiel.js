// Get all products by API
let urlAPIproducts = "http://localhost:3000/api/products";

/*// window.location.search
const WqueryString = window.location.search;
console.log ("window.location.search "+WqueryString);*/

/*var str = "https://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris";
					var url = new URL(str);
					var name = url.searchParams.get("name");
					console.log(name);*/	

/*test rdx https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
var paramsString = urlAPIproducts;
var searchParams = new URLSearchParams(paramsString);
// Itère sur les paramètres de recherche.
for (let p of searchParams) {
  console.log(p);
}*/

// API Feedback 
fetch(urlAPIproducts)
	// OK 
	.then ((response) => response.json()
		.then((data) => 
			{
				console.log("longueur de data : "+data.length);

				// W indexes initialization 
				let i=0;	// reading index 
				let iMax=(data.length)-1;	// max value index
								
				// loop 
				while (i<=iMax)
				{
					console.log("index i vaut  "+[i]);
					/* 1. new tags creation
					https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
					var element = document.createElement(tagName[, options]); 
					OR 
					https://www.pierre-giraud.com/javascript-apprendre-coder-cours/dom-ajout-modification-suppression/
					let newP = document.createElement('p');
					*/
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

					/* 2. feed new tags with data from API */ 
					newImg.src = data[i].imageUrl;console.log("newImg.src =  " +newImg.src);
					newImg.alt = data[i].altTxt;console.log("newImg.alt =  " +newImg.alt);
					//https://www.developpez.net/forums/anocode.php?id=11c2b78f7463145fc7ffa45dd99d35f1
					newA.href = "./product.html?id="+data[i]._id; console.log("newA.href =  " +newA.href);console.log("data[i]._id =  " +data[i]._id);
					newH3.textContent = data[i].name; console.log("newH3.textContent =  " +newH3.textContent);
					newP.innerHTML = data[i].description; console.log("newP.innerHTML  =  " +newP.innerHTML);
					console.log([i]);
				
					/* 3. add class */
					/* utiliser l'API classList pour supprimer et ajouter des classes
					https://developer.mozilla.org/fr/docs/Web/API/Element/classList	
						const div = document.createElement('div');
						div.className = 'foo';							
						div.classList.remove("foo");
						div.classList.add("anotherclass")*/ 
					newH3.classList.add("productName");console.log("newH3.class =  " +newH3.className);
					newP.classList.add("productDescription");console.log("newP.class =  " +newP.className);
						
					/* 4. Web page update */
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
					
					

					i=i+1; // next record
					console.log("i=i+1 i vaut " +i);
				}
			}
		)
	)

	// NOT ok	
	.catch((err) => console.log('Erreur : ' + err));
		
			
	