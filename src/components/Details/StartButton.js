import React from 'react';
import { useHistory } from 'react-router';
import propTypes from 'prop-types'

const saveInProgressRecipes = (key, id, value) => localStorage.setItem(
  'inProgressRecipes',
  JSON.stringify({
    ...JSON.parse(localStorage.getItem('inProgressRecipes')),
    [key]: { [id]: value },
  }),
);

const inProgressRecipes = JSON.parse(
  localStorage.getItem('inProgressRecipes'),
);
const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
const isRecipeDone = (id) => (doneRecipes !== null ? doneRecipes : []).some((e) => e.id === id);

const drinksOrMeals = (type) => (type === 'comidas' ? 'meals' : 'drinks');
const inProgressKey = (type) => (type === 'comidas' ? 'meals' : 'cocktails');

const isRecipeInProgress = (id) => !!inProgressRecipes[inProgressKey]
    && Object.prototype.hasOwnProperty.call(inProgressRecipes[inProgressKey], id);

const setRecipeToInProgress = (recipe, id, typeRequsition) => {
  const recipeObj = recipe[drinksOrMeals(typeRequsition)][0];
  const ingredients = () => {
    let counter = 0;
    Object.entries(recipeObj).reduce(
      (acc = [], [key, value]) => {
        if (key.includes('strIngredient') && !!value) {
          acc.push(value);
        }
        if (key.includes('strMeasure') && !!acc[counter]) {
          acc[counter] = `${acc[counter]} - ${value}`;
          counter += 1;
        }
        console.log(acc);
        return acc;
      }, [],
    );
  };
  return saveInProgressRecipes(drinksOrMeals(typeRequsition), id, ingredients(recipe));
};

export default function StartButton({ recipe }) {
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];

  console.log(inProgressKey);
  const text = () => {
    if (isRecipeInProgress) return 'Continuar Receita';
    if (isRecipeDone(itemId)) return null;
    return 'Iniciar Receita';
  };

  return (<button type="button" onClick={() => setRecipeToInProgress(recipe, itemId, typeRequsition)}>{text()}</button>);
}

StartButton.propTypes = {
  recipe: propTypes.shape(propTypes.object).isRequired,
};
