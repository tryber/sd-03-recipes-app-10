import React, { useState, useContext } from 'react';
import './SearchBar.style.css';
import * as Api from '../../services/api';
import RecipeContext from '../../Context/RecipeContext';

const filterFoodLogic = async (category, text, setFoodValues) => {
  if (category === 'Ingrediente') {
    setFoodValues(await Api.getFoodByIngredient(text));
  } else if (category === 'Nome') {
    setFoodValues(await Api.getFoodByName(text));
  } else if (category === 'Primeira letra') {
    return (text.length === 1)
    ? setFoodValues(await Api.getFoodByFirstLetter(text))
    : alert('Sua busca deve conter somente 1 (um) caracter');
  }
  return null;
};

const filterDrinkLogic = async (category, text, setDrinkValues) => {
  if (category === 'Ingrediente') {
    return setDrinkValues(await Api.getDrinkByIngredient(text));
  } else if (category === 'Nome') {
    return setDrinkValues(await Api.getDrinkByName(text));
  } else if (category === 'Primeira letra') {
    return (text.length === 1)
    ? setDrinkValues(await Api.getDrinkByFirstLetter(text))
    : alert('Sua busca deve conter somente 1 (um) caracter');
  } 
  return null;
};

const filteredSearch = async (e, currentPath, category, text, setFoodValues, setDrinkValues) => {
  e.preventDefault();
  if (currentPath === '/comidas') {
    return filterFoodLogic(category, text, setFoodValues);
  } return filterDrinkLogic(category, text, setDrinkValues);
};

const radioBtnDisplay = (className, type, name, id, value, testid, func) => (
  <div>
    <input
      className={className}
      type={type}
      name={name}
      id={id}
      value={value}
      data-testid={testid}
      onClick={func}
    />
    <label htmlFor={id}>{value}</label>
  </div>
);

export default function SearchBar() {
  const { setFoodValues, setDrinkValues } = useContext(RecipeContext);
  const [text, setText] = useState('');
  const [category, setCategory] = useState(null);
  const currentPath = window.location.pathname;
  const saveValues = (e) => setCategory(e.target.value);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setText(e.target.value)}
          className="search-bar"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      </div>
      <div className="search-btn-container">
        <button
          onClick={(e) =>
            filteredSearch(e, currentPath, category, text, setFoodValues, setDrinkValues)
          }
          data-testid="exec-search-btn"
          className="search-btn-display"
          type="submit"
        >
          Buscar
        </button>
      </div>
      <form className="radio-btn-container">
        {radioBtnDisplay('radio-btn', 'radio', 'select', 'Ingrediente', 'Ingrediente'
        , 'ingredient-search-radio', saveValues)}
        {radioBtnDisplay('radio-btn', 'radio', 'select', 'Nome', 'Nome'
        , 'name-search-radio', saveValues)}
        {radioBtnDisplay('radio-btn', 'radio', 'select', 'Primeira letra', 'Primeira letra'
        , 'first-letter-search-radio', saveValues)}
      </form>
    </div>
  );
}
