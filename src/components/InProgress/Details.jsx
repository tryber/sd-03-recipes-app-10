import React  from 'react';

import shareIcon from '../../images/shareIcon.svg';
import favIcon from '../../images/whiteHeartIcon.svg';

export default function ({ data, str, children }) {
  console.log(str, children);
  console.log(data);
  return (
    <div key={Math.random()}>
      <img data-testid="recipe-photo" className="img-align" alt={data[str]} src={data[`${str}Thumb`]} />
      <div className="title-icons-container">
        <div>
          <h2 data-testid="recipe-title">{data[str]}</h2>
        </div>
        <div className="icons-container">
          <input type="image" src={shareIcon} alt="share icon" data-testid="share-btn" />
          <input type="image" src={favIcon} alt="favorite icon" data-testid="favorite-btn" />
        </div>
      </div>
      <p data-testid="recipe-category">{data.strAlcoholic}</p>
      <p data-testid="recipe-category">{data.strCategory}</p>
      <p>Ingredients</p>
      {children}
      <p>Instructions</p>
      <div data-testid="instructions">{data.strInstructions}</div>
    </div>
  );
  // return detailsToShow(el, strType);
  // return this.children
}
