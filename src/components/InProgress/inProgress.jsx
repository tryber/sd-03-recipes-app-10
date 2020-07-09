import React, { useEffect, useContext } from 'react';
import InProgressContext from '../../Context/InProgressContext';
import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

import FinishButton from './FinishButton';


const InProgress = () => {
  const {
    dones,
    data,
    itemId,
    typeRequsition,
    localStoragePath,
    setData,
  } = useContext(InProgressContext);
  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setData);
  }, []);
  useEffect(() => {
  }, [dones]);
  if (data === null) return (<h1>Loading...</h1>);
  const drinksOrMeals = typeRequsition === 'comidas' ? 'meals' : 'drinks';
  return (
    <div>
      {!!data && (
      <Details
        data={data[drinksOrMeals][0]}
        str={typeRequsition === 'comidas' ? 'strMeal' : 'strDrink'}
      >
        <Checkboxes />
      </Details>
      )}
      <FinishButton
        dones={dones}
        ingredientsQuantity={!!localStoragePath && localStoragePath}
      />
    </div>
  );
};

export default InProgress;
