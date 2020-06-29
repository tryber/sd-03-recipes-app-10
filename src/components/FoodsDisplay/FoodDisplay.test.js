import React from 'react';
import FoodDisplay from './FoodDisplay';
import renderWithRouter from '../helpers/renderWithRouter';
import { waitForElement } from '@testing-library/react';

it('should renders "Carregando..."', () => {
  const { getByText } = renderWithRouter(<FoodDisplay />);
  
  expect(getByText(/Carregando.../i)).toBeInTheDocument();
});

describe('Test to check if all elements are being rendered correctly on screen.', () => {
  test('should all elements have their correct data-testids', async () => {
    const { getByTestId } = renderWithRouter(<FoodDisplay />);
    const [receitaUm, receitadDoze] = await waitForElement(() => [
      getByTestId("0-recipe-card"),
      getByTestId("11-recipe-card")
    ]);
    
    await expect(receitaUm).toBeInTheDocument();
    await expect(receitaUm).toHaveTextContent("Corba");
    
    await expect(receitadDoze).toBeInTheDocument();
    await expect(receitadDoze).toHaveTextContent("Pancakes");
  });
});
