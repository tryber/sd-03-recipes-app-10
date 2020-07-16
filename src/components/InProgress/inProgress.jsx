import React, { useEffect, useContext } from 'react';
import InProgressContext from '../../Context/InProgressContext';
import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

import FinishButton from './FinishButton';

const localStorageDones = JSON.parse(localStorage.getItem('doneRecipes'));
const saveDone = (formatData) => localStorage.setItem('doneRecipes',
  JSON.stringify(formatData));/* [{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}] */
const setSingleDone = (recipe, str, requestKey) => ({
  id: recipe[requestKey][`id${str}`],
  type: str === 'Meal' ? 'comida' : 'bebida',
  area: recipe[requestKey].strArea || '',
  category: recipe[requestKey].strCategory || '',
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe[str],
  image: recipe[`str${str}Thumb`],
  doneDate: Date.now(),
  tags: [recipe.strTag] || [],
});

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

  const formatDataForDones = (recipe) => (
    localStorageDones === null
      ? [setSingleDone(recipe, str, requestKey)]
      : [...localStorageDones, setSingleDone(recipe, str, requestKey)]);
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
        save={saveDone(formatDataForDones(data[drinksOrMeals][0]))}
      />
    </div>
  );
};

export default InProgress;
