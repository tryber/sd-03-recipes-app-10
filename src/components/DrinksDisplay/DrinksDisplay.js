import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinkList } from '../../services/api';
import '../FoodsDisplay/FoodDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

export default function DrinksDisplay() {
  const { filterRecipes, setValueToFilter } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const requestDrinkList = async () => {
    setObjectReturnedAfterReq(await getDrinkList());
  };
  const history = useHistory();
  const redirectToDetails = (el) => history.push({ pathname: `/bebidas/${el.idDrink}`, state: el });

  useEffect(() => {
    requestDrinkList();
    return setValueToFilter('All');
  }, []);

  return objectReturnedAfterReq === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">
      {objectReturnedAfterReq.drinks.filter(filterRecipes).map(
        (el, index) =>
          index < 12 && (
            <div
              className="container-display"
              key={el.strDrink}
              data-testid={`${index}-recipe-card`}
              type="button"onClick={() => redirectToDetails(el)}
            >
              <h3 data-testid={`${index}-card-name`}>{el.strDrink}</h3>
              <img
                className="img-display"
                data-testid={`${index}-card-img`}
                src={el.strDrinkThumb}
                alt={`${el.strDrink}`}
              />
            </div>
          ),
      )}
    </div>
  );
}
