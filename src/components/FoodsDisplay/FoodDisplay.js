import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getFoodList } from '../../services/api';
import './FoodDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';

export default function FoodDisplay() {
  const { filterRecipes, setValueToFilter, setRecipeData } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setRecipeData(await getFoodList());
    setObjectReturnedAfterReq(await getFoodList());
  };

  const history = useHistory();
  const redirectToDetails = (el) => history.push({ pathname: `/comidas/${el.idMeal}`, state: el });

  useEffect(() => {
    functionToMakeRequisition();
    return setValueToFilter('All');
  }, []);

  return objectReturnedAfterReq === null ? (
    <h1>Carregando...</h1>
  ) : (
    <div className="item-overflow">
      {objectReturnedAfterReq.meals.filter(filterRecipes).map(
        (el, index) =>
          index < 12 && (
            <Link
              className="container-display"
              key={el.strMeal}
              data-testid={`${index}-recipe-card`}
              type="button"
              onClick={() => redirectToDetails(el)}
            >
              <h3 data-testid={`${index}-card-name`}>{el.strMeal}</h3>
              <img
                className="img-display"
                data-testid={`${index}-card-img`}
                src={el.strMealThumb}
                alt={`${el.strMeal}`}
              />
            </Link>
          ),
      )}
    </div>
  );
}
