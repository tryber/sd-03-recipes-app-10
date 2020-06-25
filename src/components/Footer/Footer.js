import React from 'react';
import drinkIcon from "../images/drinkIcon.svg";
import exploreIcon from "../images/exploreIcon.svg";
import mealIcon from "../images/mealIcon.svg";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <p>
        <Link to='explorar/bebidas'>
          <img data-testid="drinks-bottom-btn" src={drinkIcon} alt="React Logo" />
        </Link>
        <Link to='/explorar/comidas'>
          <img data-testid="explore-bottom-btn" src={exploreIcon} alt="React Logo" />
        </Link>
        <Link to='/explorar'>
          <img data-testid="food-bottom-btn" src={mealIcon} alt="React Logo" />
        </Link>
      </p>
    </div>
  );
};
