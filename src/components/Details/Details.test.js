import React, { useState } from 'react';
import Details from './Details';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockGetFoodByID as mockFood } from '../../services/apiFood.mock';
import { ingredients as recipeList } from './StartButton';

// afterEach(global.fetch.mockClear());

test('should ', () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        value: mockFood,
      }),
    }));
  const { getByTestId, getAllByTestId } = renderWithRouter(<Details />);
  console.log(renderWithRouter(<Details />))


  const photo = getByTestId('recipe-photo');
  expect(photo.src).toBe(mockFood.meals.strMealThumb);

  const title = getByTestId('recipe-title');
  expect(title.value).toBe(mockFood.meals.strMeal);

  const category = getByTestId('recipe-category');
  expect(category.value).toBe(mockFood.meals.strCategory);

  const instructions = getByTestId('instructions');
  expect(instructions.value).toBe(mockFood.meals.strInstructions);

  const video = getByTestId('video');
  expect(video.url).toBe(mockFood.meals.strYoutube);

  // const ingredientsArray = Object.entries(mockFood.meals).filter((e) => e[0].includes('strIngredient') && !!e[1]);

  const ingredients = getAllByTestId(/ingredient-name-and-measure/);

  const arrayTestIdValues = ingredients.reduce((acc, ingredient) => acc.push(ingredient.value), []);
  expect(arrayTestIdValues).toMatch(recipeList(mockFood.meals));

  const shareIcon = getByTestId('share-btn');
  expect(shareIcon).toBeInTheDocument();

  const favoriteIcon = getByTestId('favorite-btn');
  expect(favoriteIcon).toBeInTheDocument();
});
