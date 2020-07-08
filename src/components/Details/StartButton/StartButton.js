import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './StartButton.style.css';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const saveInProgressRecipes = (key, id, doesObjPathExists) => {
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
const isRecipeDone = (id) => (doneRecipes || []).some((e) => e.id === id);

const isRecipeInProgress = (doesObjPathExists) => (
  inProgressRecipes && doesObjPathExists);

const text = (id, typeRequsition, inProgressKey, doesObjPathExists) => {
  console.log('id, typeRequsition, isRecipeInProgress(id, typeRequsition, inProgressKey):', id, typeRequsition, isRecipeInProgress(id, typeRequsition, inProgressKey));
  console.log('doesObjPathExists', doesObjPathExists);
  if (isRecipeInProgress(id, typeRequsition, inProgressKey)) return 'Continuar Receita';
  if (!isRecipeDone(id) && !isRecipeInProgress(id, typeRequsition, inProgressKey)) return 'Iniciar Receita';
  return null;
};

export default function StartButton() {
  const typeRequsition = useLocation().pathname.split('/')[1];
  const id = useLocation().pathname.split('/')[2];
  const inProgressKey = (typeRequsition === 'comidas' ? 'meals' : 'cocktails');
  const doesObjPathExists = !!inProgressRecipes && inProgressRecipes !== []
  && !!inProgressRecipes[inProgressKey] && inProgressRecipes[inProgressKey][id];

  useEffect(() => {
    console.log('ussing effect', inProgressRecipes);
    // text(id, typeRequsition, inProgressKey, doesObjPathExists);
  }, [isRecipeDone, isRecipeInProgress]);

  console.log('id:', id);
  return !isRecipeDone(id) && (
    <Link to={{ pathname: `/${typeRequsition}/${id}/in-progress` }}>
      <button
        className="start-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={() => saveInProgressRecipes(inProgressKey, id, doesObjPathExists)}
      >
        {text(id, typeRequsition, inProgressKey, doesObjPathExists)}
      </button>
    </Link>
  );
}
