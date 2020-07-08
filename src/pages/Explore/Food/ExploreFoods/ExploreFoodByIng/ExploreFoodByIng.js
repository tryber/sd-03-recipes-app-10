import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import { getFoodListByIngredient } from '../../../../../services/api';

const renderGrid = (recipe) => (
  <div className="food-overflow">
    {recipe.meals.slice(0, 12).map((el) => (
      <Link
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${el.strIngredient}-recipe-card`}
        to={`/comidas/${el.idIngredient}`}
      >
        <img
          className="image-display"
          data-testid={`${el.strMeal}-card-img`}
          src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`}
          alt={`${el.strIngredient}`}
        />
        <h3 data-testid={`${el.strIngredient}-card-name`}>{`${el.strIngredient}`}</h3>
      </Link>
    ))}
  </div>
);

export default function ExploreFoodByIng() {
  /* Lista de cards */
  const [foodByIng, setfoodByIng] = useState(null);

  const requestFoodByIng = async () => {
    const reqType = getFoodListByIngredient();
    return setfoodByIng(await reqType.then(reqType));
  };

  useEffect(() => {
    requestFoodByIng();
  }, []);

  return (
    <div>
      {Header('Explorar Ingredientes', true, true)}
      {foodByIng === null ? null : renderGrid(foodByIng)}
      <Footer />
    </div>
  );
}
