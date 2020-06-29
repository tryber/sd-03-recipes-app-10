import React from 'react';
import Profile from './Profile';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';
import { fireEvent } from '@testing-library/react';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId, getByText } = renderWithRouter(<Profile />);
    const thisPageTitle = getByText('Perfil');
    const profileBtnIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(thisPageTitle).toBeInTheDocument();
    expect(profileBtnIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside Profile Component', () => {
    renderWithRouter(<Profile />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(4);
  });
});

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const drinksBottomBtnIcon = getByTestId('drinks-bottom-btn');
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');
    const foodBottomBtnIcon = getByTestId('food-bottom-btn');

    expect(drinksBottomBtnIcon).toBeInTheDocument();
    expect(exploreBottomBtnIcon).toBeInTheDocument();
    expect(foodBottomBtnIcon).toBeInTheDocument();
  });

  test('should click the button and redirect to "/bebidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    const foodBottomBtnIcon = getByTestId('drinks-bottom-btn');

    fireEvent.click(foodBottomBtnIcon)
    expect(history.location.pathname).toBe('/bebidas');
  });

  test('should click the button and redirect to "/explorar"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar');
  });

  test('should click the button and redirect to "/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Profile />);
    const drinksBottomBtnIcon = getByTestId('food-bottom-btn');

    fireEvent.click(drinksBottomBtnIcon)
    expect(history.location.pathname).toBe('/comidas');
  });
});
