import React, { useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { getDrinkList } from '../../services/api';
import '../FoodsDisplay/FoodDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

export default function DrinksDisplay() {
  const { recipeData, setDataValues } = useContext(RecipeContext);

  const requestDrinkList = async () => {
    setDataValues(await getDrinkList());
  };
  let history = useHistory();
  const redirectToDetails = (el) => history.push({pathname:`/bebidas/${el.idDrink}`, state: el})
  useEffect(() => {
    requestDrinkList();
  }, []);

  console.log(recipeData);

  return recipeData === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">
      {recipeData.drinks.map(
        (el, index) =>
          index < 12 && (
            <div
              className="container-display"
              key={el.strDrink}
              data-testid={`${index}-recipe-card`}
            >
              <h3 data-testid={`${index}-card-name`}>{el.strDrink}</h3>
              <img
                className="img-display"
                data-testid={`${index}-card-img`}
                src={el.strDrinkThumb}
                alt={`${el.strDrink}`}
              />
              <button type='button' onClick={() => redirectToDetails(el)}>Details</button>
            </div>
          ),
      )}
    </div>
  );
}
