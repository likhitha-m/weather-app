// weatherFunctions.ts

import {
    getCurrentWeatherByCoordinates,
    getCurrentWeatherByCityName,
  } from "./weatherApi";
  import { getCurrentLocationWeather } from "./geolocation";
  
  export async function getCurrentLocationWeatherData(
    handleSuccess: Function,
    handleError: Function
  ) {
    getCurrentLocationWeather(
      async (latitude: number, longitude: number) => {
        try {
          const currentWeather = await getCurrentWeatherByCoordinates(
            latitude,
            longitude
          );
          handleSuccess(currentWeather);
        } catch (error) {
          console.error("Error fetching current location weather data:", error);
        }
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting location:", error);
      }
    );
  }
  
  export async function getWeatherByCityName(
    city: string,
    handleSuccess: Function,
    handleError: Function
  ) {
    city = city.charAt(0).toUpperCase() + city.slice(1);
    try {
      const currentWeather = await getCurrentWeatherByCityName(city);
      handleSuccess(currentWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      handleError();
    }
  }
  