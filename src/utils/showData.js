import moment from "moment-timezone";
import * as resources from "../resources/resourcesExport";

const icons = {
  snow: resources.snow,
  rain: resources.rain,
  fog: resources.fog,
  wind: resources.wind,
  cloudy: resources.cloudy,
  "partly-cloudy-day": resources.partlyCloudyDay,
  "partly-cloudy-night": resources.partlyCloudyNight,
  "clear-day": resources.clearDay,
  "clear-night": resources.clearNight,
};

const card = document.getElementById("card");

const icon = document.querySelector("#icon img");
const temp = document.getElementById("truetemp");
const feelsLike = document.getElementById("feelslike");
const description = document.getElementById("description");
const location = document.getElementById("place");
const currentDate = document.getElementById("date");
const currentTime = document.getElementById("time");

const extraInfo = document.getElementById("extra-info");
const humidity = extraInfo.querySelector("#humidity .value");
const chanceOfRain = extraInfo.querySelector("#precipprob .value");
const uvIndex = extraInfo.querySelector("#uv-index .value");
const windSpeed = extraInfo.querySelector("#wind-speed .value");
const cloudCoverage = extraInfo.querySelector("#cloud-cover .value");
const pressure = extraInfo.querySelector("#pressure .value");
const sunrise = extraInfo.querySelector("#sunrise .value");
const sunset = extraInfo.querySelector("#sunset .value");

const hourlyContainer = card.querySelector("#hourly .container");
const dailyContainer = card.querySelector("#daily .container");

export function showData(data) {
  const tzString = data.location.timezone;
  const localDateTimeString = moment
    .utc()
    .tz(tzString)
    .format("D/M/YYYY H:mma");
  [currentDate.textContent, currentTime.textContent] =
    localDateTimeString.split(" ");

  icon.src = icons[data.current.icon];
  location.textContent = data.location.address;
  temp.textContent = data.current.temp;
  feelsLike.textContent = data.current.feelsLike;
  description.textContent = data.current.conditions;
  humidity.textContent = data.current.humidity;
  chanceOfRain.textContent = data.current.chanceOfRain;
  feelsLike.textContent = data.current.feelsLike;
  uvIndex.textContent = data.current.uvIndex;
  windSpeed.textContent = data.current.windSpeed;
  cloudCoverage.textContent = data.current.cloudCoverage;
  pressure.textContent = data.current.pressure;
  sunrise.textContent = data.current.sunrise;
  sunset.textContent = data.current.sunset;

  const hourlyElements = [...hourlyContainer.querySelectorAll(".index")];
  data.hours.forEach((hour, index) => {
    const hourElement = hourlyElements[index];
    const time = hourElement.querySelector(".timestamp");
    const temperature = hourElement.querySelector(".avg");
    const icon = hourElement.querySelector("img");

    time.textContent = hour.label;
    temperature.textContent = hour.temp;
    icon.src = icons[hour.icon];
  });

  const dailyElements = [...dailyContainer.querySelectorAll(".index")];
  data.days.forEach((day, index) => {
    const dayElement = dailyElements[index];
    const time = dayElement.querySelector(".timestamp");
    const minTemp = dayElement.querySelector(".min");
    const maxTemp = dayElement.querySelector(".max");
    const icon = dayElement.querySelector("img");

    time.textContent = day.label;
    minTemp.textContent = day.tempMin;
    maxTemp.textContent = day.tempMax;
    icon.src = icons[day.icon];
  });
}
