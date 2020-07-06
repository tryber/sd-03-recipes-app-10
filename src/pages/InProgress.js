import React, { useEffect, useState } from 'react';
import { ingredients } from '../components/Details/StartButton';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import functionToMakeRequisition from '../components/Details/funtionToMakeRequisition';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
// const toggle
const InProgress = () => {
  const detailsToShow = (el, strType) => (
    <div key={Math.random() * Math.PI}>
      {console.log(el)}
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
      {console.log(el)}
        <p>Ingredients</p>
      <div style={{ display: 'grid' }}>
        {ingredients(el).map((e) => (
          <label>
            <input type="checkbox" checked={Object.values(inProgressRecipes).includes(e)} onChange={e => console.log(e.target.value)} />
            {e}
          </label>
        ))}
      </div>
      <p>Instructions</p>
      <div data-testid="instructions">{el.strInstructions}</div>
    </div>
  );
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(window.location.pathname.split('/')[1]);
    functionToMakeRequisition(
      window.location.pathname.split('/')[1],
      window.location.pathname.split('/')[2],
      setData,
    );
  }, []);
  useEffect(() => {}, [data]);
  console.log(data);
  if (data === null) return (<h1>Loading...</h1>);
  return window.location.pathname.includes('comidas')
    ? detailsToShow(data.meals[0], 'strMeal')
    : detailsToShow(data.drinks[0], 'strDrink');
};
export default InProgress;
