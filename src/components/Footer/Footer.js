import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../Context/RecipeContext';
import './Footer.style.css';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const imageDisplay = (dataTestid, imageClassNameAndAlt, imageSrc) => <img
  data-testid={dataTestid}
  alt={imageClassNameAndAlt}
  className={imageClassNameAndAlt}
  src={imageSrc}
/>;

export default function Footer() {
  const { setComingFromIngredients } = useContext(RecipeContext);
  const handleClick = () => {
    setComingFromIngredients(false);
  };
  return (
    <div className="footer-container" data-testid="footer">
      <Link to="/bebidas">
        {imageDisplay('drinks-bottom-btn', 'drink-icon', drinkIcon)}
      </Link>
      <Link to="/explorar">
        {imageDisplay('explore-bottom-btn', 'explore-icon', exploreIcon)}
      </Link>
      <Link onClick={handleClick} to="/comidas">
        {imageDisplay('food-bottom-btn', 'meal-icon', mealIcon)}
      </Link>
    </div>
  );
}
