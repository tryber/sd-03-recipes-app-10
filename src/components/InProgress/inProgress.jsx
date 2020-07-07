import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import shareIcon from '../../images/shareIcon.svg';
import favIcon from '../../images/whiteHeartIcon.svg';
import functionToMakeRequisition from '../Details/funtionToMakeRequisition';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

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

const toggleCheckbox = (target, dones, setDones) => {
  if (dones.includes(target.name)) {
    return setDones(
      (prev) => [
        ...prev.slice(0, prev.indexOf(target.name)),
        ...prev.slice(prev.indexOf(target.name) + 1),
      ],
    );
  }
  return setDones((prevDones) => [...prevDones, target.name]);
};

const checkboxBox = (el, dones, setDones) => (
  <div style={{ display: 'grid' }}>
    {ingredients(el).map((e) => (
      <label htmlFor={e}>
        <input name={e} type="checkbox" checked={dones.includes(e)} onChange={(event) => toggleCheckbox(event.target, dones, setDones)} />
        {e}
      </label>
    ))}
  </div>
);

const detailsToShow = (el, strType, dones, setDones) => (
  <div key={Math.random() * Math.PI}>
    <img data-testid="recipe-photo" className="img-align" alt={el[strType]} src={el[`${strType}Thumb`]} />
    <div className="title-icons-container">
      <div>
        <h2 data-testid="recipe-title">{el[strType]}</h2>
      </div>
      <div className="icons-container">
        <input type="image" src={shareIcon} alt="share icon" data-testid="share-btn" />
        <input type="image" src={favIcon} alt="favorite icon" data-testid="favorite-btn" />
      </div>
    </div>
    <p data-testid="recipe-category">{el.strAlcoholic}</p>
    <p data-testid="recipe-category">{el.strCategory}</p>
    <p>Ingredients</p>
    {checkboxBox(el, dones, setDones)}
    <p>Instructions</p>
    <div data-testid="instructions">{el.strInstructions}</div>
  </div>
);

const InProgress = () => {
  const [data, setData] = useState(null);
  const [dones, setDones] = useState([]);
  const itemId = useHistory().location.pathname.split('/')[2];
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const localKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';
  useEffect(() => {
    functionToMakeRequisition(
      typeRequsition,
      itemId,
      setData,
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        ...inProgressRecipes,
        [localKey]: {
          ...inProgressRecipes[localKey],
          [itemId]: dones,
        },
      }));
  }, [dones]);
  if (data === null) return (<h1>Loading...</h1>);
  return typeRequsition.includes('comidas')
    ? detailsToShow(data.meals[0], 'strMeal', dones, setDones)
    : detailsToShow(data.drinks[0], 'strDrink', dones, setDones);
};

export default InProgress;
