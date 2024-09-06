import {
  loading as loadingGif,
  error as errorGif,
} from "../resources/resourcesExport";

export function createElement(tag, attr) {
  const element = document.createElement(tag);

  for (let key in attr) {
    let value = attr[key];
    if (key == "text") {
      element.textContent = value;
    } else if (key == "class") {
      element.classList.add(value);
    } else if (key == "click") {
      element.addEventListener("click", value);
    } else if (key == "child") {
      element.append(...value);
    } else {
      element.setAttribute(key, value);
    }
  }

  return element;
}

export function createLoadingMessageContainer() {
  const div = createElement("div", {
    class: "message", 
    child: [
      createElement("p", { text: "Loading data" }),
      createElement("img", { width: 100, height: 100, src: loadingGif }),
    ],
  });
  console.log(div);
  return div;
}
