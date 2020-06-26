import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function MainFoodsScreen() {
  return (
    <div>
      {Header('Comidas', true)}
      <Footer />
    </div>
  );
}
