import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';

export default function ExploreDrinksScreen() {
  return (
    <div>
      {Header('Explorar Bebidas', false)}
      <div className="explore-btn-container">
        <Link to="/explorar/bebidas/ingredientes">
          <button data-testid="explore-by-ingredient" className="explore-btn">
            Por Ingrediente
          </button>
        </Link>
        <Link>
          <button data-testid="explore-surprise" className="explore-btn">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
