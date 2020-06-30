import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
// import * as Api from '../services/api'

const RecipeProvider = ({ children }) => {
  const [foodRecipeData, setFoodRecipeData] = useState(null);
  const [drinkRecipeData, setDrinkRecipeData] = useState(null);

  const setFoodValues = (params) => setFoodRecipeData(params);
  const setDrinkValues = (params) => setDrinkRecipeData(params);

  const context = {
    foodRecipeData,
    drinkRecipeData,
    setFoodValues,
    setDrinkValues,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
