import React, { useContext } from 'react';
import propTypes, { node } from 'prop-types';
import InProgressContext from '../../Context/InProgressContext';
import '../Details/Details.style.css';
import HeartStateAndShareIcon from '../Details/HeartStateAndShareIcon';

export default function Details({ str, children }) {
  const { data, requestKey } = useContext(InProgressContext);

  return (
    <div key={Math.random()}>
      <div className="img-container">
        <img data-testid="recipe-photo" className="img" alt={data[requestKey][0][str]} src={data[requestKey][0][`${str}Thumb`]} />
        <div className="icons-container">
          <HeartStateAndShareIcon />
        </div>
      </div>
      <div className="details-container">
        <div className="title-icons-container">
          <div>
            <h3 className="recipe-title" data-testid="recipe-title">{data[requestKey][0][str]}</h3>
            <p data-testid="recipe-category">{data[requestKey][0].strCategory}</p>
            <p data-testid="recipe-category">{data[requestKey][0].strAlcoholic}</p>
          </div>
        </div>
        <div className="ing-display">
          <h3 style={{ textAlign: 'left', marginBottom: '10px', paddingLeft: '10px' }}>Ingredients</h3>
          {children}
        </div>
        <div className="instr-display">
          <p>Instructions</p>
          <div data-testid="instructions">{data[requestKey][0].strInstructions}</div>
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  str: propTypes.string.isRequired,
  children: node.isRequired,
};
