import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';
import { getFoodList, getFoodByIngredient } from '../../services/api';

const FoodsAndDrinksDisplay = (getitemDefined, stringObject, imgDisplay) => {
  const {
    valueToFilter,
    setValueToFilter,
    objectReturnedAfterReq,
    setObjectReturnedAfterReq,
  } = useContext(RecipeContext);
  
  const functionToMakeRequisition = async () => {
    if(valueToFilter!== 'All') return setObjectReturnedAfterReq(await getFoodByIngredient(valueToFilter));
    //return setObjectReturnedAfterReq(await getFoodByIngredient(val));
    setObjectReturnedAfterReq(await getitemDefined());
  };

  useEffect(() => {
    functionToMakeRequisition();
    return setValueToFilter('All');
  }, []);

  return objectReturnedAfterReq === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">{console.log('tw', valueToFilter)}
      {objectReturnedAfterReq[Object.keys(objectReturnedAfterReq)[0]].map(
        (el, index) => index < 12 && (
        <Link
          className="container-display"
          key={el[stringObject]}
          data-testid={`${index}-recipe-card`}
          to={
                (Object.keys(objectReturnedAfterReq)[0] === 'meals' && `/comidas/${el.idMeal}`)
                || (Object.keys(objectReturnedAfterReq)[0] === 'drinks' && `/bebidas/${el.idDrink}`)
              }
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
