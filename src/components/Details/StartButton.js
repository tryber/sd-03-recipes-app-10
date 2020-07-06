import React from 'react';
import { useHistory } from 'react-router';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './StartButton.style.css';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const saveInProgressRecipes = (key, id, value) => {
  const recipe = {};
  recipe[id] = value;
  if (inProgressRecipes === null) {
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ [key]: recipe }),
    );
  }
  return localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({
      ...inProgressRecipes,
      [key]: {
        ...inProgressRecipes[key],
        [id]: value,
      },
    }),
  );
};

export const ingredients = (recipeObj) => {
  let counter = 0;
  return Object.entries(recipeObj).reduce(
    (acc = [], [key, value]) => {
      if (key.includes('strIngredient') && !!value) {
        acc.push(value);
      }
      if (key.includes('strMeasure') && !!acc[counter]) {
        acc[counter] = `${acc[counter]} - ${value}`;
        counter += 1;
      }
      return acc;
    }, [],
  );
};

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
const isRecipeDone = (id) => (doneRecipes !== null ? doneRecipes : []).some((e) => e.id === id);

const drinksOrMeals = (type) => (type === 'comidas' ? 'meals' : 'drinks');
const inProgressKey = (type) => (type === 'comidas' ? 'meals' : 'cocktails');

const isRecipeInProgress = (id, type) => !!inProgressRecipes
  && Object.prototype.hasOwnProperty.call(inProgressRecipes[inProgressKey(type)], id);

const setRecipeToInProgress = (recipe, id, typeRequsition) => {
  const recipeObj = recipe[drinksOrMeals(typeRequsition)][0];

  return saveInProgressRecipes(inProgressKey(typeRequsition), id, ingredients(recipeObj));
};

export default function StartButton({ recipe }) {
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];

  const text = () => {
    if (isRecipeInProgress(itemId, typeRequsition)) return 'Continuar Receita';
    if (isRecipeDone(itemId)) return null;
    return 'Iniciar Receita';
  };
  return (
    <Link to={{ pathname: `/${typeRequsition}/${itemId}/in-progress`, recipe }}>
      <button
        className="start-btn"
        style={{
          bottom: 0,
          height: '10vh',
          margin: '5px',
          textAalign: 'center',
          width: '100vw',
        }}
        data-testid="start-recipe-btn"
        type="button"
        onClick={() => setRecipeToInProgress(recipe, itemId, typeRequsition)}
      >
        {text()}
      </button>
    </Link>
  );
}

StartButton.defaultProps = {
  recipe: null,
};

StartButton.propTypes = {
  recipe: propTypes.shape(propTypes.object),
};
