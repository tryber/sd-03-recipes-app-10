import React, { useContext } from 'react';
import propTypes, { node } from 'prop-types';
import InProgressContext from '../../Context/InProgressContext';
import shareIcon from '../../images/shareIcon.svg';
import favIcon from '../../images/whiteHeartIcon.svg';

export default function Details({ str, children }) {
  const { data, requestKey } = useContext(InProgressContext);
  
  return (
    <div key={Math.random()}>
      <img data-testid="recipe-photo" className="img-align" alt={data[requestKey][0][str]} src={data[requestKey][0][`${str}Thumb`]} />
      <div className="title-icons-container">
        <div>
          <h2 data-testid="recipe-title">{data[requestKey][0][str]}</h2>
        </div>
        <div className="icons-container">
          <input type="image" src={shareIcon} alt="share icon" data-testid="share-btn" />
          <input type="image" src={favIcon} alt="favorite icon" data-testid="favorite-btn" />
        </div>
      </div>
      <p data-testid="recipe-category">{data[requestKey][0].strAlcoholic}</p>
      <p data-testid="recipe-category">{data[requestKey][0].strCategory}</p>
      <p>Ingredients</p>
      {children}
      <p>Instructions</p>
      <div data-testid="instructions">{data[requestKey][0].strInstructions}</div>

    </div>
  );
}

Details.propTypes = {
  str: propTypes.string.isRequired,
  children: node.isRequired,
};
