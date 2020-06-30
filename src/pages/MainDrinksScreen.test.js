import React from 'react';
import { fireEvent } from '@testing-library/react';
import MainDrinksScreen from './MainDrinksScreen';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<MainDrinksScreen />);
    const profileBtnIcon = getByTestId('profile-top-btn');
    const searchBtnIcon = getByTestId('search-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(profileBtnIcon).toBeInTheDocument();
    expect(searchBtnIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen and tree icons inside MainDrinksScreen Component', () => {
    renderWithRouter(<MainDrinksScreen />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(2);
  
    const allImages = document.querySelectorAll('img');
    expect(allImages.length).toBe(3);
  });
});

describe('Test to see if the correct routes are being used', () => {
  test('should Profile Icon, when clicked, got to "/perfil"', () => {
    const { getByTestId, history } = renderWithRouter(<MainDrinksScreen />);
    const profileBtnIcon = getByTestId('profile-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
    fireEvent.click(profileBtnIcon);
    expect(history.location.pathname).toBe('/perfil');
  });
});

describe('Test to see if the searchBar appears correctly on Screen', () => {
  test('should, on searchBtnIcon click, render an input - Seach Bar', () => {
    const { getByTestId } = renderWithRouter(<MainDrinksScreen />);
    const searchBtnIcon = getByTestId('search-top-btn');
    
    expect(searchBtnIcon).toBeInTheDocument();
    fireEvent.click(searchBtnIcon);
    
    const searchBar = getByTestId('search-input');
    
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchBtnIcon);
    expect(searchBar).not.toBeInTheDocument()
  });
});
describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<MainDrinksScreen />);
    const drinksBottomBtnIcon = getByTestId('drinks-bottom-btn');
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');
    const foodBottomBtnIcon = getByTestId('food-bottom-btn');

    expect(drinksBottomBtnIcon).toBeInTheDocument();
    expect(exploreBottomBtnIcon).toBeInTheDocument();
    expect(foodBottomBtnIcon).toBeInTheDocument();
  });

  test('should click the button and redirect to "/bebidas"', () => {
    const { getByTestId, history } = renderWithRouter(<MainDrinksScreen />);
    const foodBottomBtnIcon = getByTestId('drinks-bottom-btn');

    fireEvent.click(foodBottomBtnIcon)
    expect(history.location.pathname).toBe('/bebidas');
  });

  test('should click the button and redirect to "/explorar"', () => {
    const { getByTestId, history } = renderWithRouter(<MainDrinksScreen />);
    const exploreBottomBtnIcon = getByTestId('explore-bottom-btn');

    fireEvent.click(exploreBottomBtnIcon)
    expect(history.location.pathname).toBe('/explorar');
  });

  test('should click the button and redirect to "/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<MainDrinksScreen />);
    const drinksBottomBtnIcon = getByTestId('food-bottom-btn');

    fireEvent.click(drinksBottomBtnIcon)
    expect(history.location.pathname).toBe('/comidas');
  });
});
