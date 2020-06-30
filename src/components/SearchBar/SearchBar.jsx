import React/* , {useContext} */ /* { useState } */ from 'react';
import './SearchBar.style.css';
// import RecipeContext from '../../Context/RecipeContext';

export default function SearchBar() {
  // const {recipeData, setDataValues} = useContext(RecipeContext)[1,2]
  // const [text, setText] = useState('');
  // const [category, setCategory] = useState(null)
  console.log(window.location.pathname)
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
    // return setCategory(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          // onChange={(e) => setText(e.target.value)}
          className="search-bar"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      </div>
      <div className="search-btn-container">
        <button data-testid="exec-search-btn" className="search-btn-display" type="submit">
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
