import React from 'react';
// import { Link } from 'react-router-dom';
import {
  arrayOf, string, number, func,
} from 'prop-types';
import { Link } from 'react-router-dom';
import './FinishButton.style.css';

export default function FinishButtton({ dones, ingredientsQuantity, save }) {
  // const isDone = !!dones && dones.length === ingredientsQuantity;
  return (
    <Link to="/receitas-feitas">
      <button
        className="finish-btn"
        data-testid="finish-recipe-btn"
        disabled={!dones || dones.length === 0
        || dones.length !== ingredientsQuantity}
        type="button"
        onClick={() => save()}
      >
        Finalizar Receita
      </button>
    </Link>
  );
}

FinishButtton.propTypes = {
  dones: arrayOf(string).isRequired,
  ingredientsQuantity: number.isRequired,
  save: func.isRequired,
};
