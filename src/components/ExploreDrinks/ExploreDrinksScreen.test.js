import React from 'react';
import ExploreDrinksScreen from './ExploreDrinksScreen';
import renderWithRouter from '../helpers/renderWithRouter';
import { fireEvent } from '@testing-library/react';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId, getByText } = renderWithRouter(<ExploreDrinksScreen />);
    const thisPageTitle = getByText('Explorar Bebidas');
    const profileBtnIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(thisPageTitle).toBeInTheDocument();
    expect(profileBtnIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside ExploreDrinksScreen Component', () => {
    renderWithRouter(<ExploreDrinksScreen />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(1);
  
    const allImages = document.querySelectorAll('img');
    expect(allImages.length).toBe(3);
  });
});

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksScreen />);
    const drinksBottomBtnIcon = getByTestId('drinks-bottom-btn');
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');
    const foodBottomBtnIcon = getByTestId('food-bottom-btn');

    expect(drinksBottomBtnIcon).toBeInTheDocument();
    expect(exploreBottomBtnIcon).toBeInTheDocument();
    expect(foodBottomBtnIcon).toBeInTheDocument();
  });

  test('should click the button and redirect to "/bebidas"', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinksScreen />);
    const foodBottomBtnIcon = getByTestId('drinks-bottom-btn');

    fireEvent.click(foodBottomBtnIcon)
    expect(history.location.pathname).toBe('/bebidas');
  });

  test('should click the button and redirect to "/explorar"', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinksScreen />);
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar');
  });

  test('should click the button and redirect to "/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreDrinksScreen />);
    const drinksBottomBtnIcon = getByTestId('food-bottom-btn');

    fireEvent.click(drinksBottomBtnIcon)
    expect(history.location.pathname).toBe('/comidas');
  });
});
