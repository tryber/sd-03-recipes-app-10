import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './FoodsAndDrinksDisplay.style.css';
import RecipeContext from '../../Context/RecipeContext';
import { getFoodByCategory, getDrinkByCategory } from '../../services/api';

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

export const searchByCategorie = async (
  valueToFilter,
  setObjectReturnedAfterReq,
  getitemDefined,
  objectReturnedAfterReq,
) => {
  if (valueToFilter === 'All') return setObjectReturnedAfterReq(await getitemDefined());
  if (firstKey(objectReturnedAfterReq) === 'meals') {
    return setObjectReturnedAfterReq(await getFoodByCategory(valueToFilter));
  }
  return setObjectReturnedAfterReq(await getDrinkByCategory(valueToFilter));
};

const renderGrid = (recipe, stringObject, imgDisplay) => (
  <div className="item-overflow">{console.log(firstKey(recipe))}
    {((firstKey(recipe) === 'meals' && useHistory().location.pathname.split('/')[1] === 'comidas')
        || (firstKey(recipe) === 'drinks' && useHistory().location.pathname.split('/')[1] === 'bebidas'))
        && recipe[firstKey(recipe)].map(
      (el, index) => index < 12 && (
      <Link
        className="food-cards-display"
        key={Math.random() * Math.PI}
        data-testid={`${index}-recipe-card`}
        to={(firstKey(recipe) === 'meals' && `/comidas/${el.idMeal}`)
        || (firstKey(recipe) === 'drinks' && `/bebidas/${el.idDrink}`)}
      >
        <img
          className="img-display"
          data-testid={`${index}-card-img`}
          src={el[imgDisplay]}
          alt={`${el[stringObject]}`}
        />
        <h3 data-testid={`${index}-card-name`}>{el[stringObject]}</h3>
      </Link>
      ),
    )}
  </div>
);

const FoodsAndDrinksDisplay = (getitemDefined, stringObject, imgDisplay) => {
  const {
    valueToFilter,
    objectReturnedAfterReq,
    setObjectReturnedAfterReq,
    showSearchBar,
    comingFromIngredients,
    setValueToFilter,
  } = useContext(RecipeContext);

  const functionToMakeRequisition = async () => {
    await searchByCategorie(
      valueToFilter, setObjectReturnedAfterReq, getitemDefined, objectReturnedAfterReq,
    );
  };

  useEffect(() => {
    if (comingFromIngredients === false) functionToMakeRequisition();
  }, [valueToFilter, comingFromIngredients]);

  useEffect(
    () => () => {
      showSearchBar(false);
      setValueToFilter('All');
    },
    [],
  );

  const renderDisplay = () => {
    const firstKeyValue = !!objectReturnedAfterReq
    && objectReturnedAfterReq[firstKey(objectReturnedAfterReq)];
    switch (true) {
      case objectReturnedAfterReq === null:
        return null;
      case firstKeyValue === null:
        functionToMakeRequisition();
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      default:
        return renderGrid(objectReturnedAfterReq, stringObject, imgDisplay);
    }
  };
  return renderDisplay();
};

export default FoodsAndDrinksDisplay;
