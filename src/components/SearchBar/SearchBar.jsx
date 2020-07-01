import React ,{useState, useContext } from 'react';
import './SearchBar.style.css';
import * as Api from '../../services/api'
import RecipeContext from '../../Context/RecipeContext';

export default function SearchBar() {
  const { setFoodValues, setDrinkValues } = useContext(
  RecipeContext);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(null)
  const currentPath = window.location.pathname;
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

  const saveValues = (e) => {
    console.log(e.target.value);
    return setCategory(e.target.value);
  };

  const filterFoodLogic = async () => {
    if(category === 'Ingrediente' && text){
      return setFoodValues(await Api.getFoodByIngredient(text))
    } 
    if (category === 'Nome' && text) {
      return setFoodValues(await Api.getFoodByName(text))
    } 
    if (category === 'Primeira letra' && text.length === 1)
      return setFoodValues(await Api.getFoodByFirstLetter(text))
  }

  const filterDrinkLogic = async () => {
    if(category === 'Ingrediente' && text){
      return setDrinkValues(await Api.getDrinkByIngredient(text))
    } 
    if (category === 'Nome' && text) {
      return setDrinkValues(await Api.getDrinkByName(text))
    } 
    if (category === 'Primeira letra' && text.length === 1)
      return setDrinkValues(await Api.getDrinkByFirstLetter(text))
  }

  const filteredSearch = async (e) => {
    e.preventDefault();
    console.log(text, category, currentPath);
    if(currentPath === '/comidas') {
      filterFoodLogic();
    }
    if(currentPath === '/bebidas') {
      filterDrinkLogic()
  }
}

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
        <button onClick={filteredSearch} data-testid="exec-search-btn" className="search-btn-display" type="submit">
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
