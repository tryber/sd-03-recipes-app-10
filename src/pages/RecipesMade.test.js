import React from 'react';
import RecipesMade from './RecipesMade';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId, getByText } = renderWithRouter(<RecipesMade />);
    const thisPageTitle = getByText('Receitas Feitas');
    const profileBtnIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(thisPageTitle).toBeInTheDocument();
    expect(profileBtnIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside Profile Component', () => {
    renderWithRouter(<RecipesMade />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(1);
  });
});
