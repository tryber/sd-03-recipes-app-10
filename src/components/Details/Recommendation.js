import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getDrinkList, getFoodList } from '../../services/api';

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

const renderGrid = (recipe, stringObject, imgDisplay) => (
  <div>
    {recipe[firstKey(recipe)].map(
      (el, index) =>
        index < 6 && (
          <Link
            key={el[stringObject]}
            data-testid={`${index}-recomendation-card`}
            to={
              (firstKey(recipe) === 'meals' && `/comidas/${el.idMeal}`) ||
              (firstKey(recipe) === 'drinks' && `/bebidas/${el.idDrink}`)
            }
          >
            <img
              className="img-display"
              data-testid={`${index}-card-img`}
              src={el[imgDisplay]}
              alt={`${el[stringObject]}`}
            />
            <h3 data-testid={`${index}-recomendation-title`}>{el[stringObject]}</h3>
          </Link>
        ),
    )}
  </div>
);

export default function Recommendation() {
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const [recomendation, setRecomendation] = useState(null);
  const drinksRecomendation = async () => setRecomendation(await getDrinkList());
  const foodRecomendation = async () => setRecomendation(await getFoodList());

  const sertifyRecomendation = () => {
    if (typeRequsition === 'comidas') return drinksRecomendation();
    return foodRecomendation();
  };
  useEffect(() => {
    sertifyRecomendation();
    return setRecomendation(null);
  }, []);
  return (
    <div>
      Recomendadas
      {recomendation !== null && typeRequsition === 'comidas' && renderGrid(recomendation, 'strDrink', 'strDrinkThumb')}
      {recomendation !== null && typeRequsition === 'bebidas' && renderGrid(recomendation, 'strMeal', 'strMealThumb')}
    </div>
  );
}
