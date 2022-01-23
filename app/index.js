import getJson from './getJson.js';
import createDomElement from './createDomElement.js';
import selectionSuggestion from './selectionSuggestion.js';
import createButtonSearchListener from './createButtonSearchListener.js';



document.addEventListener(
  "DOMContentLoaded",
 
 // Get Json
  async function () {
  
  /* DOM*/
    const divSearch = createDomElement("div", document.body, "divSearch");
    createDomElement(
      "H1",
      divSearch,
      "titleSearch",
      "Ma recherche"
    );
    const divList = createDomElement("div", document.body, "divList");
    createDomElement(
      "H2",
      divList,
      "titleList",
      "Mes adresses"
    );
    const divInput = createDomElement("div", divSearch, "divInput");
    const inputSearch = createDomElement(
      "input",
      divInput,
      "inputSearch",
      
    );
    const buttonSearch = createDomElement(
      "button",
      divSearch,
      "buttonSearch",
      "ajouter à ma liste"
    );
    const ulSearch = createDomElement("ul", divInput, "ulSearch");

    
    const ulList = createDomElement("ul", divList, "ulList");

    
  // Create Search Suggest 
    let searchSuggest = [
      "input",
      async function (e) {
        ulSearch.innerHTML = "";
        if (e.target.value.length > 3) {
          let apiAdress = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            inputSearch.value
          )}&type=housenumber&autocomplete=1`;
          let apiData = await getJson(apiAdress);
         
          const results = apiData.features;

          const resultsProperties = results.map(function (item) {
            return item.properties;
          });

          

          resultsProperties.forEach(function (element, index) {
            const propertyAdress = "";
            let liSearch = createDomElement(
              "li",
              ulSearch,
              "liSearch",
              element.label,
              `listElement${index}`
            );
            liSearch.onclick = (event) =>
              selectionSuggestion(event, ulSearch , inputSearch);
            
          });
        } else {
          ulSearch.innerHTML = "";
        }   
      },
      false,
    ];


    createButtonSearchListener(buttonSearch, inputSearch , ulList);

    inputSearch.addEventListener(...searchSuggest);
  },

  { once: true }
);

