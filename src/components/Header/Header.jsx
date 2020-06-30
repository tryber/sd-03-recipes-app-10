import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.css';
import SearchBar from '../SearchBar/SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = (pageTitle, stateOfTheBar) => {
  const [isSearchable, setIsSearchable] = useState();
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  useEffect(() => {
    setIsSearchable(stateOfTheBar);
  }, []);

  function renderSearchBar() {
    return toggleSearchBar === true ? setToggleSearchBar(false) : setToggleSearchBar(true);
  }

  const imageDisplay = (dataTestid, imageClassNameAndAlt, imageSrc, func) => (
    <div onClick={func}>
      <img
        data-testid={dataTestid}
        alt={imageClassNameAndAlt}
        className={imageClassNameAndAlt}
        src={imageSrc}
      />
    </div>
  );

  return (
    <div>
      <header className="header">
        <Link to="/perfil">
          {imageDisplay('profile-top-btn', 'profile-icon', profileIcon)}
        </Link>
        <div className="title">
          <p data-testid="page-title">{`${pageTitle}`}</p>
        </div>
        {isSearchable
          ? imageDisplay('search-top-btn', 'search-icon', searchIcon, renderSearchBar)
          : null}
      </header>
      {toggleSearchBar ? <SearchBar /> : null}
    </div>
  );
};

export default Header;
