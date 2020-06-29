import React, { useEffect, useState } from 'react';
import { getFoodList } from '../../services/api';

export default function FoodDisplay() {
  const [state, setstate] = useState(null);
  useEffect(async () => {
    setstate(await getFoodList());
  }, []);

  if (state === null) return (<h1>Carregando...</h1>);

  if (state !== null) {
    return (
      <div>
        {state.meals.map((el, index) => index <= 12 &&
        <div data-testid={`${index}-recipe-card`}>
          <h3 data-testid={`${index}-card-name`}>{el.strMeal}</h3>
          <img data-testid={`${index}-card-img`} src={el.strMealThumb} alt={`${el.strMeal}`} />
        </div>)}
      </div>
    )
  };
}
