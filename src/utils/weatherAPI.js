const KEY = "6C9F49DSKHDTNT7F67FAYS99J";

async function getWeatherInfo(location, unit) {
  const request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${KEY}&contentType=json`;

  try {
    const response = await fetch(request);
    const json = await response.json();
    const data = {
      location: {
        address: json.resolvedAddress,
        latitude: json.latitude,
        longtitude: json.longtitude,
      },
      current: {
        temp: currentConditions.temp,
        feelslike: currentConditions.feelslike,
        conditions: currentConditions.conditions,
        icon: currentConditions.icon,
      },
      days: [
        {
          
        }
      ]
    }

    return data;
  } catch {}
}
