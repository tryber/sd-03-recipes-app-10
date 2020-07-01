import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

const FoodsAndDrinksDisplay = (valueToMap, getitemDefined, stringObject, imgDisplay) => {
  const { filterRecipes, setValueToFilter } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await getitemDefined());
  };

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
        <Link
          className="container-display"
          key={el[stringObject]}
          data-testid={`${index}-recipe-card`}
          to={(valueToMap === 'meals' && `/comidas/${el.idMeal}`) || (valueToMap === 'drinks' && `/bebidas/${el.idDrink}`)}
        >
          <h3 data-testid={`${index}-card-name`}>{el[stringObject]}</h3>
          <img
            className="img-display"
            data-testid={`${index}-card-img`}
            src={el[imgDisplay]}
            alt={`${el[stringObject]}`}
          />
        </Link>
        ),
      )}
    </div>
  );
};

export default FoodsAndDrinksDisplay;
