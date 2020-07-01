import React from 'react';
import ReactPlayer from 'react-player/youtube';
import ingredientsToshow from './ingredientsToshow';

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

export default detailsToShow;
