import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.style.css';

export default function Header() {
  const [title, setTitle] = useState('Comidas');
  const [isSearchable, setIsSearchable] = useState(true);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const renderSearchBar = () => {
    toggleSearchBar === true
      ? setToggleSearchBar(false)
      : setToggleSearchBar(true);
  };

  return (
    <div>
      <header className='header'>
        <Link to='/perfil'>
          <button
            data-testid='profile-top-btn'
            type='button'
            className='profile-icon'
          />
        </Link>
        <div className='title'>
          <p data-testid='page-title'>{title}</p>
        </div>
        {isSearchable ? (
          <button
            data-testid='search-top-btn'
            onClick={renderSearchBar}
            type='button'
            className='search-icon'
          />
        ) : null}
      </header>
      {toggleSearchBar ? (

          <input
            className='search-bar'
            data-testid='search-input'
            placeholder='Buscar Receitas'
          />

      ) : null}
      {/* {toggleSearchBar ? (
        <SearchBar />
      ) : null} */}
    </div>
  );
}
