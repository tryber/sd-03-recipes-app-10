import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const InProgress = () => {
  const [data, setData] = useState(null);
  const [dones, setDones] = useState([]);
  const itemId = useLocation().pathname.split('/')[2];
  const typeRequsition = useLocation().pathname.split('/')[1];
  const localKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';
  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setData);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...inProgressRecipes,
        [localKey]: {
          ...inProgressRecipes[localKey],
          [itemId]: dones,
        },
      }),
    );
  }, [dones]);
  if (data === null) return (<h1>Loading...</h1>);
  console.log('data', data);
  const drinksOrMeals = typeRequsition === 'comidas' ? 'meals' : 'drinks';
  return (
    <Details
      data={data[drinksOrMeals][0]}
      str={typeRequsition === 'comidas' ? 'strMeal' : 'strDrink'}
      dones={dones}
      setDone={setDones}
    >
      <Checkboxes setDones={setDones} data={data[drinksOrMeals][0]} dones={dones} />
    </Details>
  );
};

export default InProgress;
