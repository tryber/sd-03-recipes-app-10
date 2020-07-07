import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import './ExploreFoodsScreen.style.css';

export default function ExploreFoodsScreen() {
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
        <Link to="/comidas/surprise">
          <button type="button" data-testid="explore-surprise" className="explore-btn">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
