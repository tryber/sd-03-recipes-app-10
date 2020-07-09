import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useLocation } from 'react-router';
import functionToMakeRequisition from './funtionToMakeRequisition';
import ingredientsToshow from './ingredientsToshow';
import StartButton from './StartButton/StartButton';
import Recomendations from './Recomendations/Recomendations';
import InProgressProvider from '../../Context/InProgressProvider';

import './Details.style.css';
import HeartStateAndShareIcon from './HeartStateAndShareIcon';

const detailsToShow = (el, strType, strThumb) => (
  <div key={Math.random() * Math.PI}>
    <div className="img-container">
      <img data-testid="recipe-photo" className="img" alt={el[strType]} src={el[strThumb]} />
      <div className="icons-container">
        <HeartStateAndShareIcon />
      </div>
    </div>
    <div className="details-container">
      <div className="title-icons-container">
        <div>
          <h3 className="recipe-title" data-testid="recipe-title">{el[strType]}</h3>
          <p data-testid="recipe-category">{el.strCategory}</p>
          <p data-testid="recipe-category">{el.strAlcoholic}</p>
        </div>
      </div>
      <div className="ing-display">
        <h3 style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '10px' }}>Ingredients</h3>
        {ingredientsToshow(el)}
      </div>
      <div className="instr-display">
        <h3>Instructions</h3>
        <div data-testid="instructions">{el.strInstructions}</div>
      </div>
      {el.strYoutube !== undefined && (
        <div>
          <p>Video</p>
          <ReactPlayer
            data-testid="video"
            width="340px"
            height="250px"
            url={el.strYoutube}
          />
        </div>
      )}
    </div>
  </div>
);

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const typeRequsition = useLocation().pathname.split('/')[1];
  const itemId = useLocation().pathname.split('/')[2];
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
        ? objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb'))
        : objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb'))}
      <InProgressProvider>
        <Recomendations />
        <StartButton
          typeRequsition={typeRequsition}
          itemId={itemId}
          recipe={objectReturnedAfterReq}
        />
      </InProgressProvider>
    </div>
  );
}
