// change entry point in webpack config
import "./styles.css";
import { getWeatherInfo } from "./utils/weatherAPI";
import { showData } from "./utils/showData";

function init() {
  const hourlyContainer = document.querySelector("#hourly .container");
  const hourlyIndex = hourlyContainer.querySelector(".index");

  const dailyContainer = document.querySelector("#daily .container");
  const dailyIndex = dailyContainer.querySelector(".index");

  while (hourlyContainer.childElementCount < 24) {
    hourlyContainer.appendChild(hourlyIndex.cloneNode(true));
  }

  while (dailyContainer.childElementCount < 8) {
    dailyContainer.appendChild(dailyIndex.cloneNode(true));
  }

  getWeatherInfo("Naypyidaw", getCurrentUnit())
  .then((data) => showData(data))
  .catch(() => showError());
}

init();

function showError() {}

function getCurrentUnit() {}
