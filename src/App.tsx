import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./styles/global.css";
import "./styles/common.css";

import CurrentWeather from "./components/CurrentWeather";
import Favorites from "./components/Favorites";

import Header from "./components/Header";
import Subheader from "./components/Subheader";
import RecentSearches from "./components/RecentSearches";

import { FavoritesProvider } from "./store/FavoritesContext";
import { SearchProvider } from "./store/SearchContext";
import { getCurrentLocationWeatherData, getWeatherByCityName } from "./services/weatherFunction";

const App: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>("home");

  const [searchedCity, setSeachedCity] = useState<string | null>(null);

  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [currentWeatherData, setCurrentWeatherData] = useState<any | null>(
    null
  );

 
  const handleSearch = async (city: string) => {
    setActiveLink("home");
    getWeatherByCityName(
      city,
      (currentWeather: any) => {
        setWeatherData(currentWeather);
        setSeachedCity(city);
      },
      (error:Error) => {
        console.error("Error fetching weather data:", error);
     
      }
    );
  };

  useEffect(() => {
    getCurrentLocationWeatherData(
      (currentWeather: any) => setCurrentWeatherData(currentWeather),
      (error: any) => console.error("Error getting current location weather:", error)
    );
  }, []);

  const handleCitiesClick = () => {
 
    handleLinkClick("recent");
  };

  const handleFavoritesClick = () => {
   
    handleLinkClick("favorites");
  };
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <Router>
      <SearchProvider>
        <FavoritesProvider>
          <div className="app">
            <Header onSearch={handleSearch} />

            <Subheader
              activeLink={activeLink}
              onHomeClick={() => handleLinkClick("home")}
              onRecentSearchesClick={handleCitiesClick}
              onFavoritesClick={handleFavoritesClick}
            />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <CurrentWeather
                      searchedCity={searchedCity}
                      weatherData={weatherData}
                      currentWeatherData={currentWeatherData}
                      
                    />
                  }
                ></Route>

                <Route
                  path="/recent"
                  element={<RecentSearches onSelectSearch={handleSearch} />}
                ></Route>

                <Route path="/favorites" element={<Favorites />}></Route>
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </SearchProvider>
    </Router>
  );
};

export default App;
