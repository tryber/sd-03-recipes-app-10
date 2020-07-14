import React, { useState } from 'react';
import { render, getByTestId } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details from './Details';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockGetFoodByID as mockFood } from '../../services/apiFood.mock';
import { ingredients as recipeList } from './StartButton/StartButton';
import InProgressProvider from '../../Context/InProgressProvider';
// afterEach(global.fetch.mockClear());

test('should ', async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockFood),
    }));
  // const { getByTestId, getAllByTestId } = renderWithRouter(<Details />);
  // console.log(renderWithRouter(<RecipeProvider><Details /></RecipeProvider>));
  const {
    container, findByTestId, findAllByTestId, getByTestId,
  } = render(
    <MemoryRouter initialEntries={[{ pathname: '/comidas' }]}>
      <InProgressProvider><Details /></InProgressProvider>
    </MemoryRouter>,
  );
  expect(await findByTestId('recipe-photo')).toHaveAttribute('src', mockFood.meals.strMealThumb);
  // console.log(window.history.location.pathname);
  expect(await findByTestId('recipe-title')).toBeInTheDocument();

  const category = await findByTestId('recipe-category');
  expect(category.value).toBe(mockFood.meals.strCategory);

  const instructions = await findByTestId('instructions');
  expect(instructions.value).toBe(mockFood.meals.strInstructions);

  const video = findByTestId('video');
  expect(video.url).toBe(mockFood.meals.strYoutube);

  const ingredients = await findAllByTestId(/\.*ingredient-name-and-measure/);
    console.log(ingredients)
  expect(await ).toMatch(recipeList(mockFood.meals));

  const shareIcon = findByTestId('share-btn');
  expect(shareIcon).toBeInTheDocument();

  const favoriteIcon = findByTestId('favorite-btn');
  expect(favoriteIcon).toBeInTheDocument();
});
