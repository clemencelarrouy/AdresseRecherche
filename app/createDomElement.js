export default  function createDomElement(
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
  } ; 