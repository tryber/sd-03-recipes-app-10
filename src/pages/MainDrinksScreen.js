import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DrinksDisplay from '../components/DrinksDisplay/DrinksDisplay';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import { getDrinksCategoriesList } from '../services/api';

export default function MainDrinksScreen() {
  return (
    <div>
      {Header('Bebidas', true)}
      {CategoryFilter(getDrinksCategoriesList, 'drinks')}
      <DrinksDisplay />
      <Footer />
    </div>
  );
}
