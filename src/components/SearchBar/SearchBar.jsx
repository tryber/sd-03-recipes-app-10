import React, { useState, useContext } from 'react';
import './SearchBar.style.css';
import * as Api from '../../services/api';
import RecipeContext from '../../Context/RecipeContext';

const assign = (currentPath, responseId) => window.location.assign(`${currentPath}/${responseId}`);

const nameType = async (response, currentPath, type, superType, setObjectReturnedAfterReq) => {
  if (response[type] != null) {
    const [responseId] = response[type].map((el) => el[superType]);
    return (await response[type].length) === 1
      ? assign(currentPath, responseId)
      : setObjectReturnedAfterReq(response);
  }
  return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
};

const filteredSearchLogic = async (
  category, text, setObjectReturnedAfterReq, getIngredient, getName,
  getFirstLetter, currentPath, type, superType) => {
  if (category === 'Ingrediente') {
    return setObjectReturnedAfterReq(await getIngredient(text));
  } if (category === 'Nome') {
    const response = await getName(text);
    nameType(response, currentPath, type, superType, setObjectReturnedAfterReq);
  } return text.length === 1
    ? setObjectReturnedAfterReq(await getFirstLetter(text))
    : alert('Sua busca deve conter somente 1 (um) caracter');
};

const filteredSearch = async (e, currentPath, category, text, setObjectReturnedAfterReq) => {
  e.preventDefault();
  if (currentPath === '/comidas') {
    return filteredSearchLogic(category, text, setObjectReturnedAfterReq,
      Api.getFoodByIngredient, Api.getFoodByName, Api.getFoodByFirstLetter,
      currentPath, 'meals', 'idMeal');
  }
  return filteredSearchLogic(category, text, setObjectReturnedAfterReq,
    Api.getDrinkByIngredient, Api.getDrinkByName, Api.getDrinkByFirstLetter,
    currentPath, 'drinks', 'idDrink');
};

const radioBtnDisplay = (sameId, testid, func) => (
  <div>
    <input
      className="radio-btn"
      type="radio"
      name="select"
      id={sameId}
      value={sameId}
      data-testid={testid}
      onClick={func}
    />
    <label htmlFor={sameId}>{sameId}</label>
  </div>
);

export default function SearchBar() {
  const { setObjectReturnedAfterReq } = useContext(RecipeContext);
  const [text, setText] = useState('');
  const [category, setCategory] = useState(null);
  const currentPath = window.location.pathname;
  const saveValues = (e) => setCategory(e.target.value);

  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        className="search-bar"
        data-testid="search-input"
        placeholder="Buscar Receitas"
      />
      <div className="search-btn-container">
        <button
          onClick={(e) => filteredSearch(e, currentPath, category, text, setObjectReturnedAfterReq)}
          data-testid="exec-search-btn"
          className="search-btn-display"
          type="submit"
        >
          Buscar
        </button>
      </div>
      <form className="radio-btn-container">
        {radioBtnDisplay('Ingrediente', 'ingredient-search-radio', saveValues)}
        {radioBtnDisplay('Nome', 'name-search-radio', saveValues)}
        {radioBtnDisplay('Primeira letra', 'first-letter-search-radio', saveValues)}
      </form>
    </div>
  );
}
