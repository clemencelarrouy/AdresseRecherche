import createDomElement from './createDomElement.js';
   
   export default  function createButtonSearchListener(buttonSearch, inputSearch , ulList) {
   buttonSearch.addEventListener("click", () => {
          let liList = createDomElement("li", ulList, "liList" , inputSearch.value );
          liList.addEventListener("click", () => {
            ulList.removeChild(liList);
           });
        
      });

    }