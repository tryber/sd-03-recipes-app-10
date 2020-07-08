import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import functionToMakeRequisition from '../Details/funtionToMakeRequisition';
import Details from './Details';
import Checkboxes from './Checkboxes';

// const detailsToShow = (el, strType, dones, setDones) => (
//   <div key={Math.random() * Math.PI}>
//     <img data-testid="recipe-photo" className="img-align" alt={el[strType]} src={el[`${strType}Thumb`]} />
//     <div className="title-icons-container">
//       <div>
//         <h2 data-testid="recipe-title">{el[strType]}</h2>
//       </div>
//       <div className="icons-container">
//         <input type="image" src={shareIcon} alt="share icon" data-testid="share-btn" />
//         <input type="image" src={favIcon} alt="favorite icon" data-testid="favorite-btn" />
//       </div>
//     </div>
//     <p data-testid="recipe-category">{el.strAlcoholic}</p>
//     <p data-testid="recipe-category">{el.strCategory}</p>
//     <p>Ingredients</p>
//     {checkboxBox(el, dones, setDones)}
//     <p>Instructions</p>
//     <div data-testid="instructions">{el.strInstructions}</div>
//   </div>
// );
const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const InProgress = () => {
  const [data, setData] = useState(null);
  const [dones, setDones] = useState([]);
  const itemId = useLocation().pathname.split('/')[2];
  const typeRequsition = useLocation().pathname.split('/')[1];
  const localKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';
  useEffect(() => {
    functionToMakeRequisition(
      typeRequsition,
      itemId,
      setData,
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({
        ...inProgressRecipes,
        [localKey]: {
          ...inProgressRecipes[localKey],
          [itemId]: dones,
        },
      }));
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
