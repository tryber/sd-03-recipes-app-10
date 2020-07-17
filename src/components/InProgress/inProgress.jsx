import React, { useEffect, useContext } from 'react';
import InProgressContext from '../../Context/InProgressContext';
import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

import FinishButton from './FinishButton';

const localStorageDones = JSON.parse(localStorage.getItem('doneRecipes'));
const saveDone = (formatData) => localStorage.setItem('doneRecipes',
  JSON.stringify(formatData));
const setSingleDone = (recipe, str) => ({
  id: recipe[`id${str}`],
  type: str === 'Meal' ? 'comida' : 'bebida',
  area: recipe.strArea || '',
  category: recipe.strCategory || '',
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe[str],
  image: recipe[`str${str}Thumb`],
  doneDate: Date.now(),
  tags: [recipe.strTag] || [],
});
const formatDataForDones = (recipe, setSingleDone, str) => (
  localStorageDones === null
    ? [setSingleDone(recipe, str)]
    : [...localStorageDones, setSingleDone(recipe, str]);
const InProgress = () => {
  const {
    dones,
    data,
    itemId,
    typeRequsition,
    localStoragePath,
    setData,
    requestKey,
  } = useContext(InProgressContext);
  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setData);
  }, []);
  useEffect(() => {
  }, [localStoragePath]);
  const str = typeRequsition === 'comidas' ? 'Meal' : 'Drink';
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
        ingredientsQuantity={!!localStoragePath && localStoragePath.length}
        save={saveDone(formatDataForDones(data[drinksOrMeals][0]), str)}
      />
    </div>
  );
};

export default InProgress;
