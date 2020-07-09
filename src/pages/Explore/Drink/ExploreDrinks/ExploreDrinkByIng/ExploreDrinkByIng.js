import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../../../../Context/RecipeContext';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import { getDrinkListByIngredient, getDrinkByIngredient } from '../../../../../services/api';

const renderGrid = (drinks, cb) => (
  <div className="food-overflow">
    {drinks.drinks.slice(0, 12).map((el, index) => (
      <Link
        onClick={() => cb(el.strIngredient1)}
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${index}-ingredient-card`}
        to="/bebidas"
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
  const { setObjectReturnedAfterReq, setComingFromIngredients } = useContext(RecipeContext);
  const [drinkByIng, setDrinkByIng] = useState(null);
  const handleSelectedIng = async (ingredient) => {
    setComingFromIngredients(true);
    const drinks = getDrinkByIngredient(ingredient);
    const savedDrinks = await drinks;
    return setObjectReturnedAfterReq(savedDrinks);
  };
  const requestDrinkByIng = async () => {
    const reqType = getDrinkListByIngredient();
    return setDrinkByIng(await reqType.then(reqType));
  };

  useEffect(() => {
    requestDrinkByIng();
    setObjectReturnedAfterReq(null);
  }, []);

  return (
    <div>
      {Header('Explorar bebidas por ingredientes', true, true)}
      {drinkByIng === null ? null : renderGrid(drinkByIng, handleSelectedIng)}
      <Footer />
    </div>
  );
}
