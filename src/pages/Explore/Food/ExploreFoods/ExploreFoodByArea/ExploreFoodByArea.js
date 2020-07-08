import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../../components/Header/Header';
import Footer from '../../../../../components/Footer/Footer';
import getData from '../../../../../services/getData';
import { getFoodByArea, getFoodList } from '../../../../../services/api';
import './ExploreFoodByArea.style.css';

/* ------------------------------------------------------------ */
/* Requisição para as opções de Area */
const foodByAreaOptionList = async (url) => {
  const response = await getData(url);
  return [response.meals][0].map((el) => el.strArea);
};

const requestOptionList = async (options) => {
  options(await foodByAreaOptionList('https://www.themealdb.com/api/json/v1/1/list.php?a=list'));
};

/* ------------------------------------------------------------ */

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

const renderGrid = (recipe) => (
  <div className="food-overflow">
    {recipe[firstKey(recipe)].map(
      (el, index) => index < 12 && (
      <Link
        className="display-container"
        key={Math.random() * Math.PI}
        data-testid={`${index}-recipe-card`}
        to={`/comidas/${el.idMeal}`}
      >
        <img
          className="image-display"
          data-testid={`${index}-card-img`}
          src={`${el.strMealThumb}`}
          alt={`${el.strMeal}`}
        />
        <h3 data-testid={`${index}-card-name`}>{`${el.strMeal}`}</h3>
      </Link>
      ),
    )}
    ;
  </div>
);

export default function ExploreFoodByArea() {
  /* Opções do select */
  const [foodOptions, setFoodOptions] = useState([]);
  /* Lista de cards */
  const [foodByArea, setfoodByArea] = useState(null);

  const requestFoodByArea = async (value) => {
    const reqType = value === 'All' ? getFoodList() : getFoodByArea(value);
    return setfoodByArea(await reqType);
  };

  useEffect(() => {
    requestOptionList(setFoodOptions);
    requestFoodByArea('All');
  }, []);

  return (
    <div>
      {Header('Explorar Origem', true, true)}
      <div className="dropdown-container">
        <select
          data-testid="explore-by-area-dropdown"
          className="area-select"
          onClick={(e) => requestFoodByArea(e.target.value)}
        >
          <option data-testid="All-option">All</option>
          {foodOptions.map((el) => (
            <option data-testid={`${el}-option`} key={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      {foodByArea === null ? null : renderGrid(foodByArea)}
      <Footer />
    </div>
  );
}
