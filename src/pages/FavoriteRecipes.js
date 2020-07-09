import React from 'react';
import Header from '../components/Header/Header';
import DisplayFavoriteRecipes from '../components/FavoriteRecipes/DisplayFavoriteRecipes';

export default function FavoriteRecipes() {
  return (
    <div>
      {Header('Receitas Favoritas', false)}
      <DisplayFavoriteRecipes />
    </div>
  );
}
