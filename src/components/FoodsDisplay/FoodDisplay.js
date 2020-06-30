import React, { useEffect, useState } from 'react';
import { getFoodList } from '../../services/api';
import './FoodDisplay.style.css';

export default function FoodDisplay() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await getFoodList());
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  if (objectReturnedAfterReq === null) return (<h1>Carregando...</h1>);

  if (objectReturnedAfterReq !== null) {
    return (
      <div className="item-overflow">
        {objectReturnedAfterReq.meals.map((el, index) => index < 12 &&
        <div className="container-display" data-testid={`${index}-recipe-card`}>
          <h3 data-testid={`${index}-card-name`}>{el.strMeal}</h3>
          <img className="img-display" data-testid={`${index}-card-img`} src={el.strMealThumb} alt={`${el.strMeal}`} />
        </div>)}
      </div>
    );
  }
}
