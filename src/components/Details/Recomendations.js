import React, { useEffect, useState } from 'react';
import { getFoodList, getDrinkList } from '../../services/api';
import './Recomendation.style.css';

const Recomendations = () => {
  const [recomendetions, setRecomendations] = useState(null);

  const isFood = window.location.pathname.includes('comidas');
  const srtSufix = isFood ? 'Drink' : 'Meal';
  const key = isFood ? 'drinks' : 'meals';

  const callRecomendations = async () => (window.location.pathname.includes('comidas') ? setRecomendations(await getDrinkList()) : setRecomendations(await getFoodList()));

  useEffect(() => {
    callRecomendations();
  }, []);
  console.log(recomendetions);
  return (
    <div className="recomendation-container">
      {!!recomendetions && recomendetions[key].map((item, index) => (index < 6
        && (
        <div
          key={Math.random() * Math.PI}
          data-testid={`${index}-recomendation-card`}
          className="recomendation-card"
        >
          <img
            data-testid={`${index}-recomendation-image`}
            className="recomendation-image"
            src={item[`str${srtSufix}Thumb`]}
            alt={item[key]}
          />
          <p data-testid={`${index}-recomendation-title`}>{item[`str${srtSufix}`]}</p>
        </div>
        )
      ))}
    </div>
  );
};

export default Recomendations;
