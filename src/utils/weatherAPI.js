import {
  addDays,
  format,
  fromUnixTime,
  isSameHour,
  isToday,
  roundToNearestHours,
} from "date-fns";

const KEY = "6C9F49DSKHDTNT7F67FAYS99J";

export async function getWeatherInfo(location, unit = "metric") {
  const request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&key=${KEY}&contentType=json`;

  try {
    const response = await fetch(request, { mode: "cors" });

    const json = await response.json();
    const data = getNecessaryDataFromJson(json);
    
    return data;
  } catch {
    throw new Error("Error while retriving data");
  }
}

function getNecessaryDataFromJson(json) {
  let info = {
    location: {
      address: json.resolvedAddress,
      latitude: json.latitude,
      longitude: json.longitude,
      timezone: json.timezone,
    },
    current: {
      temp: Math.round(json.currentConditions.temp),
      feelsLike: Math.round(json.currentConditions.feelslike),
      conditions: json.currentConditions.conditions,
      icon: json.currentConditions.icon,
      humidity: Math.round(json.currentConditions.humidity),
      chanceOfRain: json.currentConditions.precipprob,
      uvIndex: json.currentConditions.uvindex,
      windSpeed: Math.round(json.currentConditions.windspeed),
      cloudCoverage: json.currentConditions.cloudcover,
      pressure: json.currentConditions.pressure,
      sunrise: (json.currentConditions.sunrise).slice(0, 5), // strings like 18:53, not epoch
      sunset: (json.currentConditions.sunset).slice(0, 5),
    },
    days: [],
    hours: [],
  };

  // Daily forecast for next 7 days
  const days = json.days.slice(0, 8);
  let dayCounter = new Date(days[0]["datetime"]);

  days.forEach((element) => {
    let day = {
      label: format(dayCounter, "eee"), // Mon, Tue, Wed,...
      tempMax: Math.round(element.tempmax),
      tempMin: Math.round(element.tempmin),
      icon: element.icon,
    };

    if (isToday(dayCounter)) {
      day.label = "Today";
    }

    dayCounter = addDays(dayCounter, 1);
    info.days.push(day);
  });

  // Hourly forecast
  // get today and tomorrow hours
  let hours = [...json.days[0]["hours"], ...json.days[1]["hours"]];

  // get the current hour and round down
  const currentHour = roundToNearestHours(new Date(), {
    roundingMethod: "floor",
  });

  // find the index of the current hour
  const currentHourIndex = hours.findIndex(
    (hour) => isSameHour(currentHour, fromUnixTime(hour.datetimeEpoch)), // hour.datetimeEpoch is in seconds so can't be created from Date constructor
  );

  // filter info of the next 24 hours
  hours = hours.slice(currentHourIndex + 1, currentHourIndex + 25).map((hour) => {
    return {
      label: hour.datetime.slice(0, 5), // 01:00, 13:00,...
      temp: Math.round(hour.temp),
      icon: hour.icon,
    };
  });

  info.hours.push(...hours);

  return info;
}
