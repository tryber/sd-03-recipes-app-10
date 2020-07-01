import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useHistory } from 'react-router';
import { getFoodByID, getDrinkByID } from '../../services/api';
import './Details.style.css';
import ingredientsToshow from './ingredientsToshow';

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const tipeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];

  const detailsToShow = (el, strType, strThumb) => (
    <div>
      <img data-testid="recipe-photo" className="img-align" alt={el[strType]} src={el[strThumb]} />
      <p data-testid="recipe-title">{el[strType]}</p>
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
    </div>
  );

  const functionToMakeRequisition = async () => {
    if (tipeRequsition === 'comidas') setObjectReturnedAfterReq(await getFoodByID(itemId));
    if (tipeRequsition === 'bebidas') setObjectReturnedAfterReq(await getDrinkByID(itemId));
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div>
      {tipeRequsition === 'comidas'
        ? objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb'))
        : objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb'))}
    </div>
  );
}
