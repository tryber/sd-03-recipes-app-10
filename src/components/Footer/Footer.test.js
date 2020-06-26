import React from 'react';
import { fireEvent } from '@testing-library/react';
import Footer from './Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<Footer />);
    const drinksBottomBtnIcon = getByTestId('drinks-bottom-btn');
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');
    const foodBottomBtnIcon = getByTestId('food-bottom-btn');

    expect(drinksBottomBtnIcon).toBeInTheDocument();
    expect(exploreBottomBtnIcon).toBeInTheDocument();
    expect(foodBottomBtnIcon).toBeInTheDocument();
  });

  test('should click the button and redirect to "/explorar/bebidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const foodBottomBtnIcon = getByTestId('drinks-bottom-btn');

    fireEvent.click(foodBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });

  test('should click the button and redirect to "/explorar"', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar');
  });

  test('should click the button and redirect to "/explorar/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Footer />);
    const drinksBottomBtnIcon = getByTestId('food-bottom-btn');

    fireEvent.click(drinksBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar/comidas');
  });
});
