/* 
  Icons used in this project are from the Meteocons icon pack.
  Licensed under the MIT License.
  Copyright (c) 2022 Bas Milius.
  You may use and modify them as per the license.
*/

import "./styles.css";
import { fetchWeatherData } from "./utils/weatherAPI";
import { showData } from "./utils/showData";
import { setLocation, getCurrentLocation } from "./utils/currentLocation";
import { showLoadingMessage, removeLoadingMessage } from "./utils/loadingMessage";
import { showErrorMessage, removeErrorMessage } from "./utils/errorMessage";

function getCurrentUnit() {
  return document.querySelector("#unit input:checked").value;
}

async function getWeather(location = "Berlin") {
  showLoadingMessage();
  removeErrorMessage();
  try {
    const data = await fetchWeatherData(location, getCurrentUnit());
    showData(data);
    setLocation(location);
    removeLoadingMessage();
  } catch (error) {
    removeLoadingMessage();
    showErrorMessage();
  }
}

function searchLocation(event) {
  if (event.key === "Enter") {
    const location = event.target.value;
    event.target.value = "";
    if (location.length > 0) {
      getWeather(location);
    }
  }
}

async function changeUnit() {
  await getWeather(getCurrentLocation());

  const windSpeedUnit = document.querySelector("#wind-speed .unit");
  if (getCurrentUnit() === "metric") {
    windSpeedUnit.textContent = "km/h";
  } else {
    windSpeedUnit.textContent = "mph";
  }
}

function initForecastContainers() {
  const hourlyContainer = document.querySelector("#hourly .container");
  const hourlyIndex = hourlyContainer.querySelector(".index");
  while (hourlyContainer.childElementCount < 24) {
    hourlyContainer.appendChild(hourlyIndex.cloneNode(true));
  }

  const dailyContainer = document.querySelector("#daily .container");
  const dailyIndex = dailyContainer.querySelector(".index");
  while (dailyContainer.childElementCount < 8) {
    dailyContainer.appendChild(dailyIndex.cloneNode(true));
  }
}

function initUnitButtons() {
  const unitButtons = [
    ...document.querySelectorAll("#unit input[type='radio']"),
  ];
  unitButtons.forEach((button) =>
    button.addEventListener("change", changeUnit),
  );
}

function initSearchBox() {
  const searchBox = document.querySelector("#search-bar input");
  searchBox.addEventListener("keydown", searchLocation);
}

function initUvTooltip() {
  const uvImg = document.querySelector("#uv-index img");
  const uvTooltip = document.getElementById("uv-message");

  uvImg.addEventListener("mouseover", () => uvTooltip.classList.add("active"));
  uvImg.addEventListener("mouseleave", () => uvTooltip.classList.remove("active"));
}

function init() {
  initForecastContainers();
  initUnitButtons();
  initSearchBox();
  initUvTooltip();

  getWeather();
}

window.addEventListener("load", init);
