import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './StartButton.style.css';
import { firstCrunkOfPath, secondChunkOfPath } from '../helpers/scrapPath';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
const inProgressKey = (firstCrunkOfPath === 'comidas' ? 'meals' : 'cocktails');
const doesObjPathExists = inProgressRecipes !== null
&& !!inProgressRecipes[inProgressKey] && !!inProgressRecipes[inProgressKey][secondChunkOfPath];

const saveInProgressRecipes = (key, id) => {
  console.log(id, key);
  console.log(inProgressRecipes);
  if (inProgressRecipes === null) {
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ [key]: { [id]: [] } }),
    );
  }
  if (!doesObjPathExists) {
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...inProgressRecipes,
        [key]: { [id]: [], ...inProgressRecipes[key] },
      }),
    );
  }
  return null;
};

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
const isRecipeDone = (id) => (doneRecipes !== null ? doneRecipes : []).some((e) => e.id === id);

const isRecipeInProgress = (id) => (!doesObjPathExists
  ? false
  : Object.keys(inProgressRecipes[inProgressKey]).includes(id));

export default function StartButton() {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const text = () => {
    if (isRecipeInProgress(id, firstCrunkOfPath)) return 'Continuar Receita';
    if (isRecipeDone(firstCrunkOfPath)) return null;
    return 'Iniciar Receita';
  };
  console.log('id:', id);
  return isRecipeDone && (
    <Link to={{ pathname: `/${firstCrunkOfPath}/${id}/in-progress` }}>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={() => saveInProgressRecipes(inProgressKey, id)}
      >
        {text()}
      </button>
    </Link>
  );
}
