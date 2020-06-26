import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Link } from 'react-router-dom';

export default function Explore() {
  return (
    <div>
      {Header('Explorar', false)}
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food" >Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks" >Explorar Bebidas</button>
      </Link>
      <Footer />
    </div>
  );
}
