import React, { useEffect, useState } from "react";
import "../styles/CurrentWeather.css";

import * as images from "../assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFavoritesContext } from "../store/FavoritesContext";
import {
  getWeatherIcon,
  convertCelsiusToFahrenheit,
} from "../utils/weatherUtils";

interface CurrentWeatherProps {
  searchedCity: any | null;
  currentWeatherData: any | null;
  weatherData: any | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  searchedCity,
  currentWeatherData,
  weatherData,
}) => {
  const { addFavorite, favorites } = useFavoritesContext();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [precipitaton, setPrecipitation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState<any | null>(null);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    const data = searchedCity ? weatherData : currentWeatherData;

    if (data) {
      const tempMinFahrenheit = convertCelsiusToFahrenheit(data.main?.temp_min);
      const tempMaxFahrenheit = convertCelsiusToFahrenheit(data.main?.temp_max);
      const precipitationValue = data.rain?.["1h"] ? data.rain?.["1h"] : "0";

      setTempMin(tempMinFahrenheit);
      setTempMax(tempMaxFahrenheit);
      setPrecipitation(precipitationValue);
      setWeatherInfo(data);
    }
  }, [searchedCity, weatherData, currentWeatherData]);

  const weatherConditionCode: number = weatherInfo?.weather[0].id;
  const weatherIcon: any = getWeatherIcon(weatherConditionCode);

  const handleAddToFavorites = (city: string) => {
    if (city) {
      addFavorite(city);
      setIsFavorite(true);
    }
  };

  const temperatureCelsius = weatherInfo?.main?.temp;
  const temperatureFahrenheit = convertCelsiusToFahrenheit(
    weatherInfo?.main?.temp
  );

  return (
    <div>
      <div className="current-weather">
        {weatherData || currentWeatherData ? (
          <div className="favorite-container">
            <div className="city">
              {weatherInfo?.name}, {weatherInfo?.sys.country}
            </div>
            <div
              className="favorite-button"
              onClick={() => handleAddToFavorites(weatherInfo?.name)}
            >
              {isFavorite || favorites.includes(weatherInfo?.name) ? (
                <div className="favorite-icon">
                  <img
                    src={images.faviYellow}
                    alt="Add to Favorites"
                    className="favorite-icon add-icon"
                  />
                  <span className="favorite-title added-fav">
                    Added to favorites
                  </span>
                </div>
              ) : (
                <div className="favorite-icon">
                  <img
                    src={images.favicon}
                    alt="Add to Favorites"
                    className="favorite-icon add-icon"
                  />
                  <span className="favorite-title">Add to favorite</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <div className="home-container">
       
        <FontAwesomeIcon icon={weatherIcon} size="5x" className="weather-img" />
        <div className="weather-info-main">
          <div className="temperature-unit">
            <p className="temperature">
              {unit === "C"
                ? `${temperatureCelsius}`
                : `${temperatureFahrenheit}`}
            </p>
            <div className="unit-buttons">
              <button
                onClick={() => setUnit("C")}
                className={unit === "C" ? "active-button" : ""}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("F")}
                className={unit === "F" ? "active-button" : ""}
              >
                °F
              </button>
            </div>
          </div>
          <p className="description">{weatherInfo?.weather[0]?.description}</p>
        </div>
      </div>

      <div className="weather-info">
        <div className="divider"></div>
        <div className="weather-item">
          {" "}
          <img src={images.tempIcon} alt="temp" className="weather-icon" />
          <div className="weather-details">
            <span className="weather-text">Min - Max</span>
            <span className="humidity">{`${tempMin}°- ${tempMax}°`} </span>
          </div>
        </div>
        <div className="weather-item">
          <img
            src={images.precipitationIcon}
            alt="temp"
            className="weather-icon"
          />

          <div className="weather-details">
            <span className="weather-text">Precipitation</span>
            <span className="humidity">{`${precipitaton}%`} </span>
          </div>
        </div>
        <div className="weather-item">
          <img src={images.humidityIcon} alt="temp" className="weather-icon" />

          <div className="weather-details">
            <span className="weather-text">Humidity</span>
            <span className="humidity">
              {`${weatherInfo?.main?.humidity}%`}{" "}
            </span>
          </div>
        </div>
        <div className="weather-item">
          <img src={images.windIcon} alt="temp" className="weather-icon" />

          <div className="weather-details">
            <span className="weather-text">Wind</span>
            <span className="humidity">
              {`${weatherInfo?.wind?.speed} mph`}{" "}
            </span>
          </div>
        </div>
        <div className="weather-item">
          <img
            src={images.visibilityIcon}
            alt="temp"
            className="weather-icon"
          />

          <div className="weather-details">
            <span className="weather-text">Visibility</span>
            <span className="humidity">
              {`${weatherInfo?.visibility} mph`}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
