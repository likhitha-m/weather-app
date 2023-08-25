

import React, { createContext, useContext, useState } from "react";

// Create a context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  removeAllFavorites: () => void; 
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children
}) => {
  const storedFavorites = localStorage.getItem('favorites');
  const initialFavorites: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];

  const [favorites, setFavorites] = useState<string[]>(initialFavorites);

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (city: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeAllFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    removeAllFavorites
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};


// Custom hook to use the context
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  }
  return context;
};
