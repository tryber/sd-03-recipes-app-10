import React, { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
import HeartStateAndShareIcon from '../Details/HeartStateAndShareIcon';

const localStorageDones = JSON.parse(localStorage.getItem('doneRecipes'));
const Container = () => {
  /* const itemId = useParams().id;
  const typeRequsition = useLocation().pathname.split('/')[1];
 */
  const [filter, setFilter] = useState('All');
  const setFilterToInnerText = (e) => setFilter(e.target.innerText);
  return (
    <div>
      <div>
        <button
          className="buttons-filter-display"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={(e) => setFilterToInnerText(e)}
        >
          All
        </button>
        <button
          className="buttons-filter-display"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={(e) => setFilterToInnerText(e)}
        >
          Food
        </button>
        <button
          className="buttons-filter-display"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={(e) => setFilterToInnerText(e)}
        >
          Drink
        </button>
      </div>
      { localStorageDones.map((recipe, index) => recipe.type === filter || filter === 'All'(
        <div>
          <img src={recipe.image} alt={recipe.name} />
          <p>{recipe.category || recipe.alcoholicOrNot}</p>
          <h3>{recipe.name}</h3>
          <HeartStateAndShareIcon index={index} />
        </div>,
      ))}
    </div>
  );
};/* [{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}] */
export default Container;
