import React from 'react';
import { itemId, typeRequsition } from '../helpers/splitsOfPath';

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

const drinksOrMeals = typeRequsition === 'comidas' ? 'meals' : 'drinks';
const inProgressKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';

const isRecipeInProgress = !!inProgressRecipes[inProgressKey]
  && Object.prototype.hasOwnProperty.call(inProgressRecipes[inProgressKey], itemId);

const setRecipeToInProgress = (recipe) => {
  const recipeObj = recipe[drinksOrMeals][0];
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
  return saveInProgressRecipes(drinksOrMeals, itemId, ingredients(recipe));
  
};

export default function StartButton({ recipe }) {
  console.log(inProgressKey);
  const text = () => {
    if (isRecipeInProgress) return 'Continuar Receita';
    if (isRecipeDone(itemId)) return null;
    return 'Iniciar Receita';
  };

  return (<button type="button" onClick={() => setRecipeToInProgress()}>{text()}</button>);
}
