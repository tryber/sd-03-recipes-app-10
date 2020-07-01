import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FoodsAndDrinksDisplay from '../components/FoodsAndDrinksDisplay/FoodsAndDrinksDisplay';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import { getFoodsCategoriesList, getFoodList } from '../services/api';

export default function MainFoodsScreen() {
  return (
    <div>
      {Header('Comidas', true)}
      {CategoryFilter(getFoodsCategoriesList, 'meals')}
      {FoodsAndDrinksDisplay('meals', getFoodList, 'strMeal', 'strMealThumb')}
      <Footer />
    </div>
  );
}
