import React from 'react';
import { fireEvent } from '@testing-library/react';
import Header from './Header';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const profileBtnIcon = getByTestId('profile-top-btn');
    const searchBtnIcon = getByTestId('search-top-btn');
    const pageTitle = getByTestId('page-title');

    expect(profileBtnIcon).toBeInTheDocument();
    expect(searchBtnIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('should only have two buttons on screen inside Header Component', () => {
    renderWithRouter(<Header />);
    const allButtons = document.querySelectorAll('button');
    expect(allButtons.length).toBe(2);
  });
});

describe('Test to see if the correct routes are being used', () => {
  test('should Profile Icon, when clicked, got to "/perfil"', () => {
    const { getByTestId, history } = renderWithRouter(<Header />);
    const profileBtnIcon = getByTestId('profile-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
    fireEvent.click(profileBtnIcon);
    expect(history.location.pathname).toBe('/perfil');
  });
});

describe('Test to see if the searchBar appears correctly on Screen', () => {
  test('should, on searchBtnIcon click, render an input - Seach Bar', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const searchBtnIcon = getByTestId('search-top-btn');
    
    expect(searchBtnIcon).toBeInTheDocument();
    fireEvent.click(searchBtnIcon);
    
    const searchBar = getByTestId('search-input');
    
    expect(searchBar).toBeInTheDocument();
    fireEvent.click(searchBtnIcon);
    expect(searchBar).not.toBeInTheDocument()
  });
});
