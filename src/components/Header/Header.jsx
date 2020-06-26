import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.css';
import Footer from '../Footer/Footer'

export default function Header() {
  const [title, setTitle] = useState('');
  const [isSearchable, setIsSearchable] = useState();
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  useEffect(() => {
    setTitle('Comidas');
    setIsSearchable(true);
  }, []);

  function renderSearchBar() {
    return toggleSearchBar === true
      ? setToggleSearchBar(false)
      : setToggleSearchBar(true);
  }

  return (
    <div>
      <header className="header">
        <Link to="/perfil">
          <button
            data-testid="profile-top-btn"
            type="button"
            className="profile-icon"
          />
        </Link>
        <div className="title">
          <p data-testid="page-title">{title}</p>
        </div>
        {isSearchable ? (
          <button
            data-testid="search-top-btn"
            onClick={renderSearchBar}
            type="button"
            className="search-icon"
          />
        ) : null}
      </header>
      <Footer />
      {toggleSearchBar ? (
        <input
          className="search-bar"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      ) : null}
      {/* {toggleSearchBar ? (
        <SearchBar />
      ) : null} */}
    </div>
  );
}
