import { PubSub } from "./PubSub";

function storageAvailable(type) {
  try {
    let storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

function setLocationToStorage(location) {
  localStorage.setItem("location", location);
}

export function initWebStorage() {
  if (storageAvailable("localStorage")) {
    PubSub.subscribe("locationSet", setLocationToStorage);
    return localStorage.getItem("location");
  }
}
