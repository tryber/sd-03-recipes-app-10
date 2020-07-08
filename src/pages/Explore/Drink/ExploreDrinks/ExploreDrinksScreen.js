import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import { getRandomDrink } from '../../../../services/api';
import RecipeContext from '../../../../Context/RecipeContext';

const firstKey = (obj) => obj !== null && Object.keys(obj)[0];

export default function ExploreDrinksScreen() {
  const { objectReturnedAfterReq, setObjectReturnedAfterReq } = useContext(RecipeContext);
  const firstKeyValue = !!objectReturnedAfterReq
  && objectReturnedAfterReq[firstKey(objectReturnedAfterReq)];

  const reqApiRandomDrink = async () => setObjectReturnedAfterReq(await getRandomDrink());

  useEffect(() => {
    reqApiRandomDrink();
  }, []);

  const [randomDrinkId] = Object.values(firstKeyValue).map((el) => el.idDrink);

  console.log(randomDrinkId);

  return (
    <div>
      {Header('Explorar Bebidas', false)}
      <div className="explore-btn-container">
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient" className="explore-btn">
            Por Ingredientes
          </button>
        </Link>
        <Link to={`/bebidas/${randomDrinkId}`}>
          <button type="button" data-testid="explore-surprise" className="explore-btn">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
