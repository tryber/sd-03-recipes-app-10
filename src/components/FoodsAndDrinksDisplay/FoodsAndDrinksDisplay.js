import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

const FoodsAndDrinksDisplay = (getitemDefined, stringObject, imgDisplay) => {
  const {
    filterRecipes,
    setValueToFilter,
    objectReturnedAfterReq,
    setObjectReturnedAfterReq,
  } = useContext(RecipeContext);
  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(null);
    setObjectReturnedAfterReq(await getitemDefined());
  };

  useEffect(() => {
    functionToMakeRequisition();
    return setValueToFilter('All');
  }, []);

  const renderDisplay = () => {
    const firstKey = objectReturnedAfterReq !== null && Object.keys(objectReturnedAfterReq)[0];
    console.log(firstKey);
    console.log(objectReturnedAfterReq);
    switch (true) {
      case objectReturnedAfterReq === null:
        return <h1>Carregando...</h1>;
      case objectReturnedAfterReq[firstKey] === null:
        return alert("Sinto muito, não encontramos nenhuma receita para esses filtros.");
      default:
        return (
          <div className="item-overflow">
            {objectReturnedAfterReq[firstKey].filter(filterRecipes)
            .map(
              (el, index) => index < 12 && (
              <Link
                className="container-display"
                key={el[stringObject]}
                data-testid={`${index}-recipe-card`}
                to={
                  (firstKey === 'meals' && `/comidas/${el.idMeal}`)
                  || (firstKey === 'drinks' && `/bebidas/${el.idDrink}`)
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
    }
  };
  return renderDisplay()
};

export default FoodsAndDrinksDisplay;
