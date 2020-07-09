import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import RecipeContext from '../../../../../Context/RecipeContext';
import { getFoodListByIngredient, getFoodByIngredient } from '../../../../../services/api';

const renderGrid = (recipe, cb) => (
  <div className="food-overflow">
    { recipe.meals !== undefined && recipe.meals.slice(0, 12).map((el, index) => (
      <Link
        onClick={() => cb(el.strIngredient)}
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${index}-ingredient-card`}
        to="/comidas"
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
  const { setObjectReturnedAfterReq, setComingFromIngredients } = useContext(RecipeContext);
  const [foodByIng, setfoodByIng] = useState(null);
  const handleSelectedIng = async (ingredient) => {
    setComingFromIngredients(true);
    const foods = getFoodByIngredient(ingredient);
    const saveFoods = await foods;
    return setObjectReturnedAfterReq(saveFoods);
  };
  const requestFoodByIng = async () => {
    const reqType = getFoodListByIngredient();
    return setfoodByIng(await reqType.then(reqType));
  };

  useEffect(() => {
    requestFoodByIng();
    setObjectReturnedAfterReq(null);
  }, []);

  return (
    <div>
      {Header('Explorar Ingredientes', false)}
      {foodByIng === null ? null : renderGrid(foodByIng, handleSelectedIng)}
      <Footer />
    </div>
  );
}
