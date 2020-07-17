import React from 'react';
import Header from '../components/Header/Header';
import Container from '../components/DoneRecipes/Container';

export default function RecipesMade() {
  return (
    <div>
      {Header('Receitas Feitas', false)}
      <Container />
    </div>
  );
}
