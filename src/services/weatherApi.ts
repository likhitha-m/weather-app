

import axios from "axios";
import {
  getWeatherIcon,
 
} from "../utils/weatherUtils";
import * as config from "../config/config"
const apiKey = process.env.REACT_APP_API_KEY;


export async function getCurrentWeatherByCoordinates(
  latitude: number,
  longitude: number
) {
  try {
    const apiUrl = `${config.BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching current location weather data:", error);
    throw error;
  }
}

export async function getCurrentWeatherByCityName(city: string) {
  try {
    const apiUrl = `${config.BASE_URL}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}


// weatherApi.ts
export const fetchWeatherData = async ( cities: string[]) => {


  const fetchedWeatherData: Record<string, any> = {};

  for (const city of cities) {
    const response = await fetch(`${config.BASE_URL}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const weatherConditionCode: number = data?.weather[0].id;
    const weatherIcon: any = getWeatherIcon(weatherConditionCode);
    data.weatherIcon = weatherIcon;
    fetchedWeatherData[city] = data;
  }

  return fetchedWeatherData;
};

// export default fetchWeatherData;
