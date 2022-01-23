let adresseListe = [];

document.addEventListener(
  "DOMContentLoaded",
 
 // Get Json
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

  // CreateDomElement
    function createDomElement(
      element,
      parentElement,
      classCss,
      textElement,
      id
    ) {
      element = document.createElement(element);
      parentElement.append(element);
      element.classList.add(classCss);
      if (id) {
        element.setAttribute("id", id);
      }
      element.textContent = textElement;

      return element;
    }

  // Select Suggestion and remove
    function selectionSuggestion(event, inputSearch) {
      ulSearch.innerHTML = "";
      inputSearch.value = event.target.textContent;

      return ulSearch.innerHTML = "";
    }

  
  // DOM
    const divSearch = createDomElement("div", document.body, "divSearch");
    const titleSearch = createDomElement(
      "H1",
      divSearch,
      "titleSearch",
      "Ma recherche"
    );
    const divList = createDomElement("div", document.body, "divList");
    const titleList = createDomElement(
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

          

          let inputSuggest = "";

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
              selectionSuggestion(event, inputSearch);
            
          });
        } else {
          ulSearch.innerHTML = "";
        }


        
      },
      false,
    ];

    

  // Create liList 
    const liList = '';
    buttonSearch.addEventListener("click", () => {
      if (inputSearch === "") {
        alert("Veuillez saisir une adresse");
      } else {
        const liList = createDomElement("li", ulList, "liList" , inputSearch.value );
      }
    });

  // Create Remove li from List 
    liList.addEventListener("click", () => {
      ulList.removeChild(liList);
     });
    

  // ??? 
    inputSearch.addEventListener(...searchSuggest);
  },

  { once: true }
);

