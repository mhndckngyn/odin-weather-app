// change entry point in webpack config
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

function init() {
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

  const unitButtons = [
    ...document.querySelectorAll("#unit input[type='radio']"),
  ];
  unitButtons.forEach((button) =>
    button.addEventListener("change", changeUnit),
  );

  const searchBox = document.querySelector("#search-bar input");
  searchBox.addEventListener("keydown", searchLocation);

  getWeather();
}

window.addEventListener("load", init);
