import { createElement } from "./createElement";
import { loading as loadingGif } from "../resources/resourcesExport";

let loadingMessageContainer;

function createLoadingMessageContainer() {
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

export function showLoadingMessage() {
  loadingMessageContainer = createLoadingMessageContainer();
  document.querySelector("#nav").after(loadingMessageContainer);
}

export function removeLoadingMessage() {
  if (loadingMessageContainer) {
    loadingMessageContainer.parentNode.removeChild(loadingMessageContainer);
    loadingMessageContainer = null;
  }
}
