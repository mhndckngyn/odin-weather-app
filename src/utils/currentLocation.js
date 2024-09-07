import { PubSub } from "./PubSub";

let currentLocation;

function setCurrentLocation(location) {
  currentLocation = location;
}

export function initSetLocation() {
  PubSub.subscribe("locationSet", setCurrentLocation);
}

export function getCurrentLocation() {
  return currentLocation;
}
