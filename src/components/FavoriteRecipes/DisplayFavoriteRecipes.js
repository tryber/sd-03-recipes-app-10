import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DisplayFavoriteRecipe.style.css';
import shareIcon from '../../images/shareIcon.svg';
import isFavIcon from '../../images/blackHeartIcon.svg';

const allButtonsToFilter = ['All', 'Food', 'Drinks'];

const removeFromFavorites = (itemId, setLocalStorageFavorites) => {
  const findElementToRemove = JSON.parse(localStorage.getItem('favoriteRecipes'))
    .filter((el) => el.id !== itemId);
  localStorage.setItem('favoriteRecipes', JSON.stringify(findElementToRemove));
  setLocalStorageFavorites(findElementToRemove);
};

const copyToClipBoard = (itemLink, setCopied) => {
  navigator.clipboard.writeText(`http://localhost:3000${itemLink}`);
  navigator.clipboard.readText().then((el) => el === `http://localhost:3000${itemLink}` &&
  setCopied(true)).then(setTimeout(() => {
    setCopied(false);
  }, 2000));
};

const renderGrid = (recipe, index, setLocalStorageFavorites, setCopied) => (
  <div className="container-display">
    <Link
      key={Math.random() * Math.PI}
      data-testid={`${index}-recipe-card`}
      to={(recipe.type === 'comida' && `/comidas/${recipe.id}`)
            || (recipe.type === 'bebida' && `/bebidas/${recipe.id}`)}
    >
      <img
        className="img-display"
        src={recipe.image}
        alt={recipe.name}
      />
      <h3>{recipe.name}</h3>
      <h3>{recipe.category}</h3>
      <h3>{recipe.area}</h3>
    </Link>
    <div className="icons-container">
      <input
        data-testid="share-btn"
        type="image"
        src={shareIcon}
        onClick={() => copyToClipBoard((recipe.type === 'comida' && `/comidas/${recipe.id}`)
        || (recipe.type === 'bebida' && `/bebidas/${recipe.id}`), setCopied)}
        alt="share-button"
      />
      <input
        data-testid={`${index}-horizontal-favorite-btn`}
        type="image"
        src={isFavIcon}
        onClick={() => removeFromFavorites(recipe.id, setLocalStorageFavorites)}
        alt="fav-button"
      />
    </div>
  </div>
);

export default function DisplayFavoriteRecipes() {
  const [localStorageFavorites, setLocalStorageFavorites] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));
  const [copied, setCopied] = useState(false);

  return (
    localStorageFavorites !== null
  && <div>
    {allButtonsToFilter.map((el) => <button className="buttons-filter-display">{el}</button>)}
    {localStorageFavorites.map((el, index) =>
    <div className="favorites-display">
        {copied && <p>Link copiado!</p>}
        {renderGrid(el, index, setLocalStorageFavorites, setCopied)}
      </div>)}
    </div>
  );
}
