import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

export default function FoodsAndDrinksDisplay(valueToMap, getitemDefined, stringObject, imgDisplay) {
  const { filterRecipes, setValueToFilter, setRecipeData } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setRecipeData(await getitemDefined());
    setObjectReturnedAfterReq(await getitemDefined());
  };

  const history = useHistory();

  const redirectToDetails = (el) => history.push((valueToMap === 'meals' && `/comidas/${el.idMeal}`) || (valueToMap === 'drinks' && `/bebidas/${el.idDrink}`));

  useEffect(() => {
    functionToMakeRequisition();
    return setValueToFilter('All');
  }, []);

  return objectReturnedAfterReq === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">
      {objectReturnedAfterReq[valueToMap].filter(filterRecipes).map(
        (el, index) => index < 12 && (
        <div
          className="container-display"
          key={el[stringObject]}
          data-testid={`${index}-recipe-card`}
          type="button"
          onClick={() => redirectToDetails(el)}
        >
          <h3 data-testid={`${index}-card-name`}>{el[stringObject]}</h3>
          <img
            className="img-display"
            data-testid={`${index}-card-img`}
            src={el[imgDisplay]}
            alt={`${el[stringObject]}`}
          />
        </div>
        ),
      )}
    </div>
  );
}
