import React, { useEffect, useContext } from 'react';
import InProgressContext from '../../Context/InProgressContext';
import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

import FinishButton from './FinishButton';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const InProgress = () => {
  const {
    dones,
    data,
    itemId,
    localKey,
    typeRequsition,
    doesObjPathExists,
    setData,
  } = useContext(InProgressContext);
  useEffect(() => {
    functionToMakeRequisition(
      typeRequsition,
      itemId,
      setData,
    );
  }, []);

  useEffect(() => {}, [inProgressRecipes]);
  if (data === null) return (<h1>Loading...</h1>);
  const drinksOrMeals = typeRequsition === 'comidas' ? 'meals' : 'drinks';
  return (
    <>
      <Details
        data={data[drinksOrMeals][0]}
        str={typeRequsition === 'comidas' ? 'strMeal' : 'strDrink'}
      >
        <Checkboxes />
      </Details>
      <FinishButton
        dones={dones}
        ingredientsQuantity={doesObjPathExists && inProgressRecipes[localKey][itemId].length}
      />
    </>
  );
};

export default InProgress;
