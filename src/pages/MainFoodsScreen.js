import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FoodDisplay from '../components/FoodsDisplay/FoodDisplay';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import { getFoodsCategoriesList } from '../services/api';

export default function MainFoodsScreen() {
  return (
    <div>
      {Header('Comidas', true)}
      {CategoryFilter(getFoodsCategoriesList, 'categories')}
      <FoodDisplay />
      <Footer />
    </div>
  );
}
