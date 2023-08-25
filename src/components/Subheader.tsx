import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Subheader.css';

interface SubheaderProps {
  activeLink: string;
  onHomeClick: () => void;
  onRecentSearchesClick: () => void;
  onFavoritesClick: () => void;
}

const Subheader: React.FC<SubheaderProps> = ({
  activeLink,
  onHomeClick,
  onRecentSearchesClick,
  onFavoritesClick
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="subheader">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={activeLink === 'home' ? 'active' : ''}
              onClick={onHomeClick}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={activeLink === 'favorites' ? 'active' : ''}
              onClick={onFavoritesClick}
            >
              FAVORITE
            </Link>
          </li>
          <li>
            <Link
              to="/recent"
              className={activeLink === 'recent' ? 'active' : ''}
              onClick={onRecentSearchesClick}
            >
              RECENT SEARCH
            </Link>
          </li>
          <div className="current-date-time">{currentDateTime}</div>
        </ul>
      </nav>
    </div>
  );
};

export default Subheader;
