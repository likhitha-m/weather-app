
import React from 'react';
import '../styles/Header.css'; 

import * as images from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../store/SearchContext';
interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const {searches,addSearch} = useSearchContext()
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryInput = event.currentTarget.elements.namedItem('query')
    if (queryInput instanceof HTMLInputElement) { 
        const query = queryInput.value;
        
        if (query) {
          console.log("query: " + query,searches)
          addSearch(query)
          onSearch(query);
       
          navigate({ pathname: '/', search: query.toString() });
          queryInput.value = '';
        }
      }
  };

  
 

  return (
    <header className="app-header">
     <a href="/" className="logo-link"> 
        <img className="app-logo" src={images.logo} alt="Weather App Logo" />
      </a>
      <form onSubmit={handleSearch} className='search-form'>
        <input type="text" name="query" placeholder="Search city"   />
        
        <button type="submit">
          <i className="fa fa-search"></i> 
        </button>
      </form>
    </header>
  );
};

export default Header;
