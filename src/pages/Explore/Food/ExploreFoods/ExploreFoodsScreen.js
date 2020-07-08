import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import './ExploreFoodsScreen.style.css';
import RecipeContext from '../../../../Context/RecipeContext';
import { getRandomMeal } from '../../../../services/api';

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

export default function ExploreFoodsScreen() {
  const { objectReturnedAfterReq, setObjectReturnedAfterReq } = useContext(RecipeContext);
  const firstKeyValue = !!objectReturnedAfterReq
  && objectReturnedAfterReq[firstKey(objectReturnedAfterReq)];

  const reqApiRandomMeal = async () => setObjectReturnedAfterReq(await getRandomMeal());

  useEffect(() => {
    reqApiRandomMeal();
  }, []);

  const [randomMealId] = Object.values(firstKeyValue).map((el) => el.idMeal);

  console.log(randomMealId);
  return (
    <div>
      {Header('Explorar Comidas', false)}
      <div className="explore-btn-container">
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient" className="explore-btn">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area" className="explore-btn">
            Por Local de Origem
          </button>
        </Link>
        <Link to={`/comidas/${randomMealId}`}>
          <button type="button" data-testid="explore-surprise" className="explore-btn">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
