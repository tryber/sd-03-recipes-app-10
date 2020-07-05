import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.css';
import RecipeContext from '../../Context/RecipeContext';
import SearchBar from '../SearchBar/SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';


const Header = (pageTitle, stateOfTheBar) => {
  const { showSearchBar, toggleSearchBar } = useContext(RecipeContext);
  const [isSearchable, setIsSearchable] = useState();

  useEffect(() => {
    setIsSearchable(stateOfTheBar);
  }, []);

  function renderSearchBar() {
    return toggleSearchBar === true ? showSearchBar(false) : showSearchBar(true);
  }

  const imageDisplay = (dataTestid, imageClassNameAndAlt, imageSrc, func) => (
    <input
      data-testid={dataTestid}
      alt={imageClassNameAndAlt}
      className={imageClassNameAndAlt}
      src={imageSrc}
      type="image"
      onClick={func}
    />
  );

  return (
    <div>
      <header className="header">
        <Link to="/perfil">{imageDisplay('profile-top-btn', 'profile-icon', profileIcon)}</Link>
        <div className="title">
          <p data-testid="page-title">{`${pageTitle}`}</p>
        </div>
        {isSearchable && imageDisplay('search-top-btn', 'search-icon', searchIcon, renderSearchBar)}
      </header>
      {toggleSearchBar && <SearchBar />}
    </div>
  );
};

export default Header;
