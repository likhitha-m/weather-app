import React, { useState, useEffect } from "react";
import "../styles/Favorites.css";
import * as images from "../assets/images";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesContext } from "../store/FavoritesContext";
import { fetchWeatherData } from "../services/weatherApi";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite, removeAllFavorites } =
    useFavoritesContext();
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    fetchWeatherData(favorites)
      .then((fetchedWeatherData) => {
        setWeatherData(fetchedWeatherData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [favorites]);

  const handleRemoveItem = (city: string) => {
    removeFavorite(city);
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <div className="page-container">
          <div className="fav-container">
            <div className="weather-info-main no-fav-container">
              <img className="no-fav" src={images.noFav} alt="No Favorites" />
              <div className="fav-description">No favorites added</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="remove-all-container">
            <div>{favorites.length} city added as favorite</div>
            <div>
              <button
                onClick={() => setShowConfirmation(true)}
                className="remove-all-button"
              >
                Remove All
              </button>
            </div>
          </div>

          {showConfirmation && (
            <div className="confirmation-popup">
              <div className="confirmation-text">
                Are you sure you want to remove all the favorites?
              </div>
              <div className="confirmation-buttons">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="cancel-button"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    removeAllFavorites();
                  }}
                  className="confirm-button"
                >
                  Yes
                </button>
              </div>
            </div>
          )}

          <ul className="favorites-list">
            {favorites.map((city, index) => {
              const weatherInfo = weatherData[city];
              const weatherIcon = weatherInfo?.weatherIcon;

              return (
                <li key={index}>
                  <div className="favorite-item">
                    <div className="weather-info-fav-">
                      <div className="city f-city">{city}</div>
                      <div className="weather-inf">
                        {" "}
                        <div className="weather-icon- responsive-weather">
                          <div className="weather-icon-container">
                            <FontAwesomeIcon
                              icon={weatherIcon}
                              size="2x"
                              className="weather-img-"
                            />
                          </div>
                        </div>
                        <div className="fav-temperature responsive-weather">
                          {weatherInfo?.main?.temp}
                          <span className="fav-temperature unit">°C</span>
                        </div>
                        <div className="fav-description responsive-weather">
                          {weatherInfo?.weather[0]?.description}
                        </div>
                      </div>
                    </div>
                    <div className="favorite-icon-container">
                      <img
                        src={images.faviYellow}
                        alt="Remove from Favorites"
                        className="favorite-icon add-icon"
                        onClick={() => handleRemoveItem(city)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Favorites;
