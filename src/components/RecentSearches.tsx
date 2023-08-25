import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import * as images from "../assets/images";
import { useFavoritesContext } from "../store/FavoritesContext";
import { useSearchContext } from "../store/SearchContext";
import { fetchWeatherData } from "../services/weatherApi";

interface RecentSearchesProps {
  onSelectSearch: (query: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ onSelectSearch }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
  const { searches, removeAllSearch } = useSearchContext();
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchWeatherData(searches)
      .then((fetchedWeatherData) => {
        setWeatherData(fetchedWeatherData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [searches]);

  const handleRemoveAll = () => {
    removeAllSearch();
  };

  const handleRemoveItem = (city: string) => {
    removeFavorite(city);
  };

  const handleAddToFavorites = (city: string) => {
    if (city) {
      addFavorite(city);
    }
  };

  return (
    <div>
      {searches.length === 0 ? (
        <div className="page-container">
          <div className="fav-container">
            <div className="weather-info-main no-fav-container">
              <img className="no-fav" src={images.noFav} alt="No Favorites" />
              <div className="fav-description">No Recent Search</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="remove-all-container">
            <div>You recently searched for</div>
            <div>
              <button onClick={handleRemoveAll} className="remove-all-button">
                Remove All
              </button>
            </div>
          </div>

          <ul className="favorites-list">
            {searches.map((city, index) => (
              <li key={index}>
                <div className="favorite-item">
                  <div className="weather-info-fav-">
                    <div className="city f-city">{weatherData[city]?.name}</div>
                    <div className="weather-inf">
                      {" "}
                      <div className="weather-icon- responsive-weather">
                        <div className="weather-icon-container">
                          <FontAwesomeIcon
                            icon={weatherData[city]?.weatherIcon}
                            size="2x"
                            className="weather-img-"
                          />
                        </div>
                      </div>
                      <div className="fav-temperature responsive-weather">
                        {weatherData[city]?.main?.temp}
                        <span className="fav-temperature unit">°C</span>
                      </div>
                      <div className="fav-description responsive-weather">
                        {weatherData[city]?.weather[0]?.description}
                      </div>
                    </div>
                  </div>
                  <div>
                    {favorites.includes(city) ? (
                      <img
                        src={images.faviYellow}
                        alt="Remove from Favorites"
                        className="favorite-icon add-icon"
                        onClick={() => handleRemoveItem(city)}
                      />
                    ) : (
                      <img
                        src={images.favicon}
                        alt="Add to Favorites"
                        className="favorite-icon add-icon"
                        onClick={() => handleAddToFavorites(city)}
                      />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
