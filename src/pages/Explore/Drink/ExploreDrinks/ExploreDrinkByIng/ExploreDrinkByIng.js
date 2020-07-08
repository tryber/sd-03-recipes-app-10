import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import { getDrinkListByIngredient } from '../../../../../services/api';

const renderGrid = (drinks) => (
  <div className="food-overflow">
    {console.log(drinks)}
    {drinks.drinks.slice(0, 12).map((el, index) => (
      <Link
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${index}-ingredient-card`}
        to={`/comidas/${el.idIngredient}`}
      >
        <img
          className="image-display"
          data-testid={`${index}-card-img`}
          src={`https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png`}
          alt={`${el.strIngredient1}`}
        />
        <h3 data-testid={`${index}-card-name`}>{`${el.strIngredient1}`}</h3>
      </Link>
    ))}
  </div>
);

export default function ExploreFoodByIng() {
  /* Lista de cards */
  const [drinkByIng, setDrinkByIng] = useState(null);

  const requestDrinkByIng = async () => {
    const reqType = getDrinkListByIngredient();
    return setDrinkByIng(await reqType.then(reqType));
  };

  useEffect(() => {
    requestDrinkByIng();
  }, []);

  return (
    <div>
      {console.log(drinkByIng)}
      {Header('Explorar bebidas por ingredientes', true, true)}
      {drinkByIng === null ? null : renderGrid(drinkByIng)}
      <Footer />
    </div>
  );
}
