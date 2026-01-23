import { getCurrentHourISO } from "../services/helpers.js";

export const baseUrl = "https://api.open-meteo.com/v1/forecast";

export async function getHourlyWeatherForGeolocation(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: "temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m",
    timezone: "Europe/Skopje",
    past_hours: "0",
    forecast_hours: "24",
  });
 
  const url = `${baseUrl}?${params.toString()}`;

try {
    const response = await fetch(url.replace(/\s+/g, ''));
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
}
console.error("Error fetching weather data:", response.statusText);
} catch (error) {
    console.error("Network error:", error);
}
}