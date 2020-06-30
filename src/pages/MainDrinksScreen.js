import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DrinksDisplay from '../components/DrinksDisplay/DrinksDisplay';

export default function MainDrinksScreen() {
  return (
    <div>
      {Header('Bebidas', true)}
      <DrinksDisplay />
      <Footer />
    </div>
  );
}
