import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoriteRecipes from './FavoriteRecipes';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId, getByText } = renderWithRouter(<FavoriteRecipes />);
    const thisPageTitle = getByText('Receitas Favoritas');
    const pageTitle = getByTestId('page-title');

    expect(thisPageTitle).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside FavoriteRecipes Component', () => {
    renderWithRouter(<FavoriteRecipes />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(1);
  });
});

describe('Test to see if the correct routes are being used', () => {
  test('should Profile Icon, when clicked, got to "/perfil"', () => {
    const { getByTestId, history } = renderWithRouter(<FavoriteRecipes />);
    const profileBtnIcon = getByTestId('profile-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
    fireEvent.click(profileBtnIcon);
    expect(history.location.pathname).toBe('/perfil');
  });
});
