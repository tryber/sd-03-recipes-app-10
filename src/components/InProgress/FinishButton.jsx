import React from 'react';
// import { Link } from 'react-router-dom';
import { arrayOf, string, number } from 'prop-types';
import './FinishButton.style.css';

export default function FinishButtton({ dones, ingredientsQuantity }) {
  return (
    <button
      className="finish-btn"
      data-testid="finish-recipe-btn"
      style={{ display: !dones || ingredientsQuantity === 0 || dones.length !== ingredientsQuantity.length ? 'none' : 'flex' }}
      type="button"
    >
      Finalizar Receita
    </button>
  );
}

FinishButtton.propTypes = {
  dones: arrayOf(string).isRequired,
  ingredientsQuantity: number.isRequired,
};
