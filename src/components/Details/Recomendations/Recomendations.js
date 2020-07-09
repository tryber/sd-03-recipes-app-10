import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getFoodList, getDrinkList } from '../../../services/api';
import './Recomendation.style.css';

const Recomendations = () => {
  const [recomendetions, setRecomendations] = useState(null);

  const isFood = window.location.pathname.includes('comidas');
  const srtSufix = isFood ? 'Drink' : 'Meal';
  const key = isFood ? 'drinks' : 'meals';

  const callRecomendations = async () => (window.location.pathname.includes('comidas') ? setRecomendations(await getDrinkList()) : setRecomendations(await getFoodList()));
  const id = useLocation().pathname.split('/')[2];
  useEffect(() => {
    callRecomendations();
  }, []);
  console.log(recomendetions);
  return (
    <div className="recomendation-container">
      {!!recomendetions && recomendetions[key].map((item, index) => index < 6
        && (
        <div
          key={Math.random()}
          data-testid={`${index}-recomendation-card`}
          className="recomendation-card"
        >
          <p data-testid={`${index}-recomendation-title`}>{item[`str${srtSufix}`]}</p>
          <div>
            <Link to={`/${isFood ? 'comidas' : 'bebidas'}/${id}`}>
              <img
                data-testid={`${index}-recomendation-image`}
                className="recomendation-image"
                src={item[`str${srtSufix}Thumb`]}
                alt={item[key]}
              />
            </Link>
          </div>
        </div>
        ))}
    </div>
  );
};

export default Recomendations;
