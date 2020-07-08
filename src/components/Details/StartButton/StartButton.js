import React from 'react';
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

const isRecipeInProgress = (id, doesObjPathExists, inProgressKey) => (doesObjPathExists
  ? false
  : Object.keys(inProgressRecipes[inProgressKey]).includes(id));

export default function StartButton() {
  const typeRequsition = useLocation().pathname.split('/')[1];
  const id = useLocation().pathname.split('/')[2];
  const inProgressKey = (typeRequsition === 'comidas' ? 'meals' : 'cocktails');
  // console.log()
  const doesObjPathExists = inProgressRecipes !== null && inProgressRecipes !== []
  && !!inProgressRecipes[inProgressKey] && inProgressRecipes[inProgressKey][id];

  const text = () => {
    console.log('id, typeRequsition, inProgressKey:', id, typeRequsition, inProgressKey)
    if (isRecipeInProgress(id, typeRequsition, inProgressKey)) return 'Continuar Receita';
    if (isRecipeDone(typeRequsition)) return null;
    return 'Iniciar Receita';
  };
  console.log('id:', id);
  return !!isRecipeDone && (
    <Link to={{ pathname: `/${typeRequsition}/${id}/in-progress` }}>
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
        onClick={() => saveInProgressRecipes(inProgressKey, id, doesObjPathExists)}
      >
        {text()}
      </button>
    </Link>
  );
}
