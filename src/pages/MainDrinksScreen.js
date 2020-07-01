import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import { getDrinksCategoriesList, getDrinkList } from '../services/api';
import FoodsAndDrinksDisplay from '../components/FoodsAndDrinksDisplay/FoodsAndDrinksDisplay';

export default function MainDrinksScreen() {
  return (
    <div>
      {Header('Bebidas', true)}
      {CategoryFilter(getDrinksCategoriesList, 'drinks')}
      {FoodsAndDrinksDisplay('drinks', getDrinkList, 'strDrink', 'strDrinkThumb')}
      <Footer />
    </div>
  );
}
