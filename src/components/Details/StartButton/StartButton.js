import React, { useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './StartButton.style.css';
import InProgressContext from '../../../Context/InProgressContext';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const saveInProgressRecipes = (key, id, doesObjPathExists) => {
  if (inProgressRecipes === null) {
    return localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ [key]: { [id]: [] } }),
    );
  }
  if (doesObjPathExists && console.log('doesObjPathExists():', doesObjPathExists())) {
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
const isRecipeDone = (id) => doneRecipes[id] && doneRecipes.some((e) => e.id === id);

const text = (localStoragePath) => {
  if (localStoragePath !== [] && !!localStoragePath) return 'Continuar Receita';
  if (isRecipeDone === undefined) return null;
  return 'Iniciar Receita';
};

export default function StartButton() {
  const { localStoragePath } = useContext(InProgressContext);
  const isRecipeInProgress = inProgressRecipes && localStoragePath;
  const typeRequsition = useLocation().pathname.split('/')[1];
  const id = useLocation().pathname.split('/')[2];

  useEffect(() => {
  }, [doneRecipes, inProgressRecipes]);

  return !isRecipeDone(id) && (
    <Link to={{ pathname: `/${typeRequsition}/${id}/in-progress` }}>
      <button
        className="start-btn"
        style={{
          bottom: 0,
          height: '10vh',
          margin: '5px',
          textAalign: 'center',
          width: '100vw',
          display: isRecipeInProgress,
        }}

        data-testid="start-recipe-btn"
        type="button"
        onClick={() => saveInProgressRecipes([])}
      >
        {text(localStoragePath)}
      </button>
    </Link>
  );
}
