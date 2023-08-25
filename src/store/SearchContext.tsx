import React, { createContext, useContext, useState } from "react";

// Create a context
const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

interface SearchProviderProps {
  children: React.ReactNode;
}

interface SearchContextType {
  searches: string[];
  addSearch: (city: string) => void;
//   removeFavorite: (city: string) => void;
  removeAllSearch: () => void; 
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
    children
  }) => {
    const storedSearches = localStorage.getItem('searches');
    const initialSearches: string[] = storedSearches ? JSON.parse(storedSearches) : [];
  
    const [searches, setRecentSearches] = useState<string[]>(initialSearches);
  
    const removeAllSearch = () => {
      setRecentSearches([]);
      localStorage.removeItem('searches');
    };
  
    const addSearch = (city: string) => {
      city = city.charAt(0).toUpperCase() + city.slice(1);
      if (!searches.includes(city)) {
        const updatedSearches = [city, ...searches];
        setRecentSearches(updatedSearches);
        localStorage.setItem('searches', JSON.stringify(updatedSearches));
      }
    };
  
    const contextValue: SearchContextType = {
      searches,
      addSearch,
      removeAllSearch
    };
  
    return (
      <SearchContext.Provider value={contextValue}>
        {children}
      </SearchContext.Provider>
    );
  };
  
// Custom hook to use the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
