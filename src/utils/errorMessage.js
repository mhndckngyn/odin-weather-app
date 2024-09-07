import { createElement } from "./createElement";
import { error as errorGif } from "../resources/resourcesExport";

let errorMessageContainer;

function createErrorMessageContainer() {
  const div = createElement("div", {
    class: "message",
    child: [
      createElement("p", { text: "Error while fetching data" }),
      createElement("img", { width: 100, height: 100, src: errorGif }),
    ],
  });
  return div;
}

export function showErrorMessage() {
  errorMessageContainer = createErrorMessageContainer();
  document.querySelector("#nav").after(errorMessageContainer);
}

export function removeErrorMessage() {
  if (errorMessageContainer) {
    errorMessageContainer.parentNode.removeChild(errorMessageContainer);
    errorMessageContainer = null;
  }
}
