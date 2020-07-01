import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodList } from '../../services/api';
import RecipeContext from '../../Context/RecipeContext';
import './FoodDisplay.style.css';

export default function FoodDisplay() {
  const { foodRecipeData, setFoodValues } = useContext(RecipeContext);

  const requestFoodList = async () => {
    setFoodValues(await getFoodList());
  };

  const history = useHistory();
  const redirectToDetails = (el) => history.push({ pathname: `/comidas/${el.idMeal}`, state: el });

  useEffect(() => {
    requestFoodList();
  }, []);

  return foodRecipeData === null ? (
    <h2 style={{ position: 'absolute', top: '30px' }}>Carregando Lista...</h2>
  ) : (
    <div className="item-overflow">
      {foodRecipeData.meals.map(
        (el, index) =>
          index < 12 && (
            <div
              className="container-display"
              key={el.strMeal}
              data-testid={`${index}-recipe-card`}
            >
              <h3 data-testid={`${index}-card-name`}>{el.strMeal}</h3>
              <img
                className="img-display"
                data-testid={`${index}-card-img`}
                src={el.strMealThumb}
                alt={`${el.strMeal}`}
              />
              <button type="button" onClick={() => redirectToDetails(el)}>Details</button>
            </div>
          ),
      )}
    </div>
  );
}
