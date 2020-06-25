import React from 'react';
import drinkIcon from "../images/drinkIcon.svg";
import exploreIcon from "../images/exploreIcon.svg";
import mealIcon from "../images/mealIcon.svg";
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <div>
      footer
      <p>
        <Link to='explorar/bebidas'>
          <img src={drinkIcon} alt="React Logo" />
        </Link>
        <Link to='/explorar/comidas'>
          <img src={exploreIcon} alt="React Logo" />
        </Link>
        <Link to='/explorar'>
          <img src={mealIcon} alt="React Logo" />
        </Link>
      </p>
    </div>
  )
}
