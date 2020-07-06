import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import ReactPlayer from 'react-player/youtube';
import functionToMakeRequisition from './funtionToMakeRequisition';
import ingredientsToshow from './ingredientsToshow';
import './Details.style.css';
import Recommendation from './Recommendation';
import HeartStateAndShareIcon from './HeartStateAndShareIcon';

const detailsToShow = (el, strType, strThumb) => (
  <div>
    <img data-testid="recipe-photo" className="img-align" alt={el[strType]} src={el[strThumb]} />
    <div className="title-icons-container">
      <div>
        <h2 data-testid="recipe-title">{el[strType]}</h2>
      </div>
      <HeartStateAndShareIcon />
    </div>
    <p>{el.strAlcoholic}</p>
    <p data-testid="recipe-category">{el.strCategory}</p>
    <p>Ingredients</p>
    {ingredientsToshow(el)}
    <p>Instructions</p>
    <div data-testid="instructions">{el.strInstructions}</div>
    {el.strYoutube !== undefined && (
      <div>
        <p>Video</p>
        <ReactPlayer data-testid="video" width="100%" height="100%" url={el.strYoutube} />
      </div>
    )}
    <Recommendation />
  </div>
);

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];

  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setObjectReturnedAfterReq);
  }, [typeRequsition]);

  return objectReturnedAfterReq === null ? null : (
    <div>
      {typeRequsition === 'comidas'
        ? objectReturnedAfterReq.meals !== undefined && objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb'))
        : objectReturnedAfterReq.drinks !== undefined && objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb'))}
    </div>
  );
}
