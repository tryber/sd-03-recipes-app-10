import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { getFoodByID, getDrinkByID } from '../../services/api';
import './Details.style.css';
import detailsToShow from './detailsToShow';

export default function Details() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const tipeRequsition = useHistory().location.pathname.split('/');

  const functionToMakeRequisition = async () => {
    if (tipeRequsition[0] === 'comidas') setObjectReturnedAfterReq(await getFoodByID(tipeRequsition[2]));
    if (tipeRequsition[0] === 'bebidas') setObjectReturnedAfterReq(await getDrinkByID(tipeRequsition[2]));
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div>
      {tipeRequsition[0] === 'comidas'
        ? objectReturnedAfterReq.meals.map((el) => detailsToShow(el, 'strMeal', 'strMealThumb'))
        : objectReturnedAfterReq.drinks.map((el) => detailsToShow(el, 'strDrink', 'strDrinkThumb'))}
    </div>
  );
}
