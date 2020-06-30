import React, { useEffect, useState } from 'react';
import { getDrinkList } from '../../services/api';
import '../FoodsDisplay/FoodDisplay.style.css';

export default function DrinksDisplay() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await getDrinkList());
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  if (objectReturnedAfterReq === null) return (<h1>Carregando...</h1>);

  if (objectReturnedAfterReq !== null) {
    return (
      <div className="item-overflow">
        {objectReturnedAfterReq.drinks.map((el, index) => index < 12 &&
        <div className="container-display" key={el.strDrink} data-testid={`${index}-recipe-card`}>
          <h3 data-testid={`${index}-card-name`}>{el.strDrink}</h3>
          <img className="img-display" data-testid={`${index}-card-img`} src={el.strDrinkThumb} alt={`${el.strDrink}`} />
        </div>)}
      </div>
    );
  }
}
