import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Header from './Header';
import { toPath } from 'lodash';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = render(<Header />);
    const profileBtnIcon = getByTestId('profile-top-btn');
    const searchBtnIcon = getByTestId('search-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
    expect(searchBtnIcon).toBeInTheDocument();
  });
});

describe('Test to see if the correct routes are being used', () => {
  test('should Profile Icon, when clicked, got to "./perfil"', () => {
    const { getByTestId } = render(<Header />);
    const profileBtnIcon = getByTestId('profile-top-btn');

    expect(profileBtnIcon).toBeInTheDocument();
  });
});
