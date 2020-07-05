import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Explore.style.css';

export default function Explore() {
  return (
    <div>
      {Header('Explorar', false)}
      <div className="explore-btn-container">
        <div>
          <Link to="/explorar/comidas">
            <button className="explore-btn" type="button" data-testid="explore-food">
              Explorar Comidas
            </button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/bebidas">
            <button className="explore-btn" type="button" data-testid="explore-drinks">
              Explorar Bebidas
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
