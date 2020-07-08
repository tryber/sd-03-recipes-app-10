import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import { getFoodListByIngredient } from '../../../../../services/api';

const renderGrid = (recipe, cb) => (
  <div className="food-overflow">
    {recipe.meals.slice(0, 12).map((el, index) => (
      <Link
        onClick={() => cb(el.strIngredient)}
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${index}-ingredient-card`}
        to={`/comidas/${el.idIngredient}`}
      >
        <img
          className="image-display"
          data-testid={`${index}-card-img`}
          src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`}
          alt={`${el.strIngredient}`}
        />
        <h3 data-testid={`${index}-card-name`}>{`${el.strIngredient}`}</h3>
      </Link>
    ))}
  </div>
);

export default function ExploreFoodByIng() {
  const location = useLocation();
  const [selectedIng, setSelectedIng] = useState(null);
  /* Lista de cards */
  const [foodByIng, setfoodByIng] = useState(null);
  const handleSelectedIng = (name) => {
    setSelectedIng(name);
    console.log(name, location.pathname);
  };
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
      {foodByIng === null ? null : renderGrid(foodByIng, handleSelectedIng)}
      <Footer />
    </div>
  );
}
