import React from 'react';
import NotFoundPage from './NotFoundPage';
import renderWithRouter from '../../src/components/helpers/renderWithRouter';

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', () => {
    const { getByTestId } = renderWithRouter(<NotFoundPage />);
    const pageTitle = getByTestId('not-found-text');

    expect(pageTitle).toBeInTheDocument();
  });
});
