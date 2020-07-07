import React from 'react';
import { Link } from 'react-router-dom';

const renderGrid = (recipe, index) => (
  <div>
    {
      <Link
        key={Math.random() * Math.PI}
        data-testid={`${index}-recipe-card`}
        to={(recipe.type === 'comida' && `/comidas/${recipe.id}`)
              || (recipe.type === 'bebida' && `/bebidas/${recipe.id}`)}
      >
        <img
          src={recipe.image}
          alt={recipe.name}
        />
        <h3 data-testid={`${index}-card-name`}>{recipe.name}</h3>
      </Link>
    }
  </div>
);

export default function DisplayFavoriteRecipes() {
  return (
  JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
  && JSON.parse(localStorage.getItem('favoriteRecipes')).map((el, index) => 
    <div>
      {renderGrid(el, index)}
    </div>);
  )
};
