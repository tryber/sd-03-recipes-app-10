import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FoodDisplay from '../components/FoodsDisplay/FoodDisplay';

export default function MainFoodsScreen() {
  return (
    <div>
      {Header('Comidas', true)}
      <FoodDisplay />
      <Footer />
    </div>
  );
}
