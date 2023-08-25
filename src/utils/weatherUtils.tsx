import {
  faSun,
  faCloud,
  faCloudRain,
  faQuestionCircle,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

export const getWeatherIcon = (conditionCode: number): any => {
  if (conditionCode >= 200 && conditionCode <= 232) {
    return faCloudRain; // Thunderstorm
  } else if (conditionCode >= 300 && conditionCode <= 321) {
    return faCloudRain; // Drizzle
  } else if (conditionCode >= 500 && conditionCode <= 531) {
    return faCloudRain; // Rain
  } else if (conditionCode >= 600 && conditionCode <= 622) {
    return faSnowflake; // Snow
  } else if (conditionCode >= 701 && conditionCode <= 781) {
    return faSmog; // Atmosphere (Mist, Smoke, Haze, Fog)
  } else if (conditionCode === 800) {
    return faSun; // Clear Sky
  } else if (conditionCode >= 801 && conditionCode <= 804) {
    return faCloud; // Clouds
  } else {
    return faQuestionCircle; // Default icon for unknown condition
  }
};

export const convertCelsiusToFahrenheit = (temp: any): any => {
  return (temp * (9 / 5) + 32).toFixed(0);
};
