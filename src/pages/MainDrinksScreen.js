import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainDrinksScreen() {
  return (
    <div>
      {Header('Bebidas', true)}
      <Footer />
    </div>
  );
}
