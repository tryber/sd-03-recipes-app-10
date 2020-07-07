import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useHistory } from 'react-router';
import functionToMakeRequisition from './funtionToMakeRequisition';
import ingredientsToshow from './ingredientsToshow';
import StartButton from './StartButton';
import Recomendations from './Recomendations';

import './Details.style.css';
import shareIcon from '../../images/shareIcon.svg';
import favIcon from '../../images/whiteHeartIcon.svg';

const detailsToShow = (el, strType, strThumb, typeRequsition, itemId, objectReturnedAfterReq) => (
  <div key={Math.random() * Math.PI}>
    <div className="img-container">
      <img data-testid="recipe-photo" className="img" alt={el[strType]} src={el[strThumb]} />
    </div>
    <div className="details-container">
      <div className="title-icons-container">
        <div>
          <h2 data-testid="recipe-title">{el[strType]}</h2>
          <p data-testid="recipe-category">{el.strCategory}</p>
          <p data-testid="recipe-category">{el.strAlcoholic}</p>
        </div>
        <div className="icons-container">
          <input type="image" src={shareIcon} alt="share icon" data-testid="share-btn" />
          <input type="image" src={favIcon} alt="favorite icon" data-testid="favorite-btn" />
        </div>
      </div>
      <div className="ing-display">
        <h3 style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '10px' }}>Ingredients</h3>
        {ingredientsToshow(el)}
      </div>
      <p>Instructions</p>
      <div data-testid="instructions">{el.strInstructions}</div>
      {el.strYoutube !== undefined && (
      <div>
        <p>Video</p>
        <ReactPlayer
          data-testid="video"
          width="100%"
          height="100%"
          url={el.strYoutube}
        />
      </div>
      )}
      <Recomendations />
      <StartButton
        typeRequsition={typeRequsition}
        itemId={itemId}
        recipe={objectReturnedAfterReq}
      />
    </div>
  </div>
);

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];
  useEffect(() => {
    functionToMakeRequisition(
      typeRequsition,
      itemId,
      setObjectReturnedAfterReq,
    );
  }, []);

  return objectReturnedAfterReq === null ? null : (
    <div>
      {typeRequsition === 'comidas'
        ? objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb', typeRequsition, itemId, objectReturnedAfterReq))
        : objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb', typeRequsition, itemId, objectReturnedAfterReq))}
    </div>
  );
}
