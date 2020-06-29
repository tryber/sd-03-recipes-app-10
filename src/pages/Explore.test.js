import React from 'react';
import { fireEvent } from '@testing-library/react';
import Explore from './Explore';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId, getByText } = renderWithRouter(<Explore />);
    const thisPageTitle = getByText('Explorar');
    const pageTitle = getByTestId('page-title');

    expect(pageTitle).toBeInTheDocument();
    expect(thisPageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside Explore Component', () => {
    renderWithRouter(<Explore />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(6);
  });
});

describe('Test to see if the correct routes are being used', () => {
  test('should Profile Icon, when clicked, got to "/perfil"', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const profileBtnIcon = getByTestId('profile-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
    fireEvent.click(profileBtnIcon);
    expect(history.location.pathname).toBe('/perfil');
  });
});

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const drinksBottomBtnIcon = getByTestId('drinks-bottom-btn');
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');
    const foodBottomBtnIcon = getByTestId('food-bottom-btn');

    expect(drinksBottomBtnIcon).toBeInTheDocument();
    expect(exploreBottomBtnIcon).toBeInTheDocument();
    expect(foodBottomBtnIcon).toBeInTheDocument();
  });

  test('should click the button and redirect to "/bebidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const foodBottomBtnIcon = getByTestId('drinks-bottom-btn');

    fireEvent.click(foodBottomBtnIcon)
    expect(history.location.pathname).toBe('/bebidas');
  });

  test('should click the button and redirect to "/explorar"', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar');
  });

  test('should click the button and redirect to "/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const drinksBottomBtnIcon = getByTestId('food-bottom-btn');

    fireEvent.click(drinksBottomBtnIcon)
    expect(history.location.pathname).toBe('/comidas');
  });
});
