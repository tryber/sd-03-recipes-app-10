import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getFoodByID, getDrinkByID } from '../../services/api';
import './Details.style.css';
import detailsToShow from './detailsToShow';

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const tipeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];

  const functionToMakeRequisition = async () => {
    if (tipeRequsition === 'comidas') setObjectReturnedAfterReq(await getFoodByID(itemId));
    if (tipeRequsition === 'bebidas') setObjectReturnedAfterReq(await getDrinkByID(itemId));
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div>
      {tipeRequsition === 'comidas'
        ? objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb'))
        : objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb'))}
    </div>
  );
}
