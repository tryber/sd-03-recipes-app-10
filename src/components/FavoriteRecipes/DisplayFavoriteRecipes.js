import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DisplayFavoriteRecipe.style.css';
import shareIcon from '../../images/shareIcon.svg';
import isFavIcon from '../../images/blackHeartIcon.svg';

const removeFromFavorites = (itemId, setLocalStorageFavorites) => {
  const findElementToRemove = JSON.parse(localStorage.getItem('favoriteRecipes')).filter(
    (el) => el.id !== itemId,
  );
  localStorage.setItem('favoriteRecipes', JSON.stringify(findElementToRemove));
  setLocalStorageFavorites(findElementToRemove);
};

const copyToClipBoard = (itemLink, setCopied) => {
  navigator.clipboard.writeText(`http://localhost:3000${itemLink}`);
  navigator.clipboard
    .readText()
    .then((el) => el === `http://localhost:3000${itemLink}` && setCopied(true))
    .then(
      setTimeout(() => {
        setCopied(false);
      }, 2000),
    );
};

const buttonsToFilterFavorites = (changeFavoriteRecipes) => (
  <div>
    <button
      type="button"
      className="buttons-filter-display"
      onClick={() => changeFavoriteRecipes('All')}
      data-testid="filter-by-all-btn"
    >
      All
    </button>
    <button
      type="button"
      className="buttons-filter-display"
      onClick={() => changeFavoriteRecipes('Food')}
      data-testid="filter-by-food-btn"
    >
      Food
    </button>
    <button
      type="button"
      className="buttons-filter-display"
      onClick={() => changeFavoriteRecipes('Drinks')}
      data-testid="filter-by-drink-btn"
    >
      Drinks
    </button>
  </div>
);

const renderGrid = (recipe, index, setLocalStorageFavorites, setCopied) => (
  <div className="container-display">
    <Link
      key={Math.random()}
      data-testid={`${index}-recipe-card`}
      to={
        (recipe.type === 'comida' && `/comidas/${recipe.id}`)
        || (recipe.type === 'bebida' && `/bebidas/${recipe.id}`)
      }
    >
      <h3>{recipe.alcoholicOrNot}</h3>
      <h3>{recipe.area}</h3>
      <img data-testid={`${index}-horizontal-image`} className="img-display" src={recipe.image} alt={recipe.name} />
      <h3 data-testid={`${index}-horizontal-name`}>{recipe.name}</h3>
      <h3 data-testid={`${index}-horizontal-top-text`}>{recipe.category}</h3>
    </Link>
    <div className="icons-favorites-page">
      <input
        data-testid={`${index}-horizontal-share-btn`}
        type="image"
        src={shareIcon}
        onClick={() => copyToClipBoard(
          (recipe.type === 'comida' && `/comidas/${recipe.id}`)
              || (recipe.type === 'bebida' && `/bebidas/${recipe.id}`),
          setCopied,
        )}
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
  const [localStorageFavorites, setLocalStorageFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const [copied, setCopied] = useState(false);

  const changeFavoriteRecipes = (valueToFilter) => {
    const localToFilter = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (valueToFilter === 'Food') {
      return setLocalStorageFavorites(localToFilter.filter((el) => el.type === 'comida'));
    }
    if (valueToFilter === 'Drinks') {
      return setLocalStorageFavorites(localToFilter.filter((el) => el.type === 'bebida'));
    }
    return setLocalStorageFavorites(localToFilter);
  };

  return (
    localStorageFavorites !== null
  && (
  <div>
    {buttonsToFilterFavorites(changeFavoriteRecipes)}
    {localStorageFavorites.map((el, index) => (
      <div className="favorites-display">
        {copied && <p>Link copiado!</p>}
        {renderGrid(el, index, setLocalStorageFavorites, setCopied)}
      </div>
    ))}
  </div>
  )
  );
}
