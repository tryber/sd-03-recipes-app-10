import React from 'react';
// import { Link } from 'react-router-dom';
import { arrayOf, string, number } from 'prop-types';
import { Link } from 'react-router-dom';

export default function FinishButtton({ dones, ingredientsQuantity }) {
  // const isDone = !!dones && dones.length === ingredientsQuantity;
  return (
    <Link to="/receitas-feitas">
      <button
        data-testid="finish-recipe-btn"
        disabled={!!dones && ingredientsQuantity !== 0
        && dones.length === ingredientsQuantity}
        type="button"
      >
        Finalizar Receita
      </button>
    </Link>
  );
}

FinishButtton.propTypes = {
  dones: arrayOf(string).isRequired,
  ingredientsQuantity: number.isRequired,
};
