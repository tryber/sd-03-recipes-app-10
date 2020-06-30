import React, { useEffect, useContext } from 'react';
import { getDrinkList } from '../../services/api';
import '../FoodsDisplay/FoodDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

export default function DrinksDisplay() {
  const { recipeData, setDataValues, filterRecipes } = useContext(RecipeContext);

  const requestDrinkList = async () => {
    setDataValues(await getDrinkList());
  };

  useEffect(() => {
    requestDrinkList();
  }, []);

  return recipeData === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">{console.log(recipeData)}
      {recipeData.drinks.filter(filterRecipes).map(
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
            </div>
          ),
      )}
    </div>
  );
}
