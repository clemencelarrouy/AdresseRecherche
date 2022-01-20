let adresseListe = [];

document.addEventListener(
  "DOMContentLoaded",
  async function () {
    function getJson(url) {
      return fetch(url)
      .then(function (resp) {
        return resp.json();
      })
      .catch(function (error) {
        console.error(error);
      });
    }
    
    function createDomElement(element, parentElement, classCss, textElement, id) {
      element = document.createElement(element);
      parentElement.append(element);
      element.classList.add(classCss);
      if(id){
        element.setAttribute("id", id);
      }
      element.textContent = textElement;
      
      return element;
    }

    function selectionSuggestion(event, inputSearch){
      ulSearch.innerHTML = "";
      inputSearch.value = event.target.textContent;
    }
    
    const divSearch = createDomElement("div", document.body, "divSearch");
    const titleSearch = createDomElement(
      "H1",
      divSearch,
      "titleSearch",
      "Ma recherche"
      );
      const divInput = createDomElement("div", divSearch, "divInput");
      const inputSearch = createDomElement("input", divInput, "inputSearch", "inputRecherche");
      const buttonSearch = createDomElement(
        "button",
        divSearch,
        "buttonSearch",
        "ajouter à ma liste"
        );
        const ulSearch = createDomElement("ul", divInput, "ulSearch");
        
        let searchSuggest = ['input', async function(e) {
          ulSearch.innerHTML = "";
          if(e.target.value.length > 3){
            let apiAdress = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(inputSearch.value)}&type=housenumber&autocomplete=1`;
            let apiData = await getJson(apiAdress);
            console.log("Les données", apiData);
            
            console.log("input change :", inputSearch.value);
            
            const results = apiData.features;
            
            const resultsProperties = results.map(function (item) {
              return item.properties;
            });
            
            console.log(resultsProperties)
            
            let inputSuggest = ''; 
            
            resultsProperties.forEach(function(element, index){ 
              const  propertyAdress = "" ;
              let liSearch = createDomElement( "li" , ulSearch , "liSearch" , element.label, `listElement${index}`);
              liSearch.onclick = (event) => selectionSuggestion(event, inputSearch);
              console.log( resultsProperties[element.label])
            });
          } else {
            ulSearch.innerHTML = "";
          }
        }, false];
        inputSearch.addEventListener(...searchSuggest);
      },
      
      { once: true }
      );
      
      /*fetch("curl 'https://api-adresse.data.gouv.fr/search/?q=20%20avenue%20de%20S%C3%A9gur%2C%20Paris&type=housenumber&autocomplete=1'")
      .then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
      .catch(error => console.log("Erreur : " + error));*/
      
      /*  .textContent = apiData.features.properties;
      OK  cree liste vide
      OK  istener sur input
      Promise
      features (bouclé dessus)
      ca cré un element li que le
      display liste = nouvel liste*/
      /* inputSearch.addEventListener("change", )*/
      
      //let arrayApiData = await Promise.all([apiData],[""]);
      // arrayApiData.forEach((item) => {
      //  console.log(item);
      //})
      /*liSearch = createDomElement( "li" , ulSearch , "liSearch" );*/
      
      
      
      // créer une liste vide , quand la barre passe en change la remplacé par le ul de suggestion  et quand la barre repasse en vide la remplacé par la vide