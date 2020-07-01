import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

const RecipeProvider = ({ children }) => {
  const [foodRecipeData, setFoodRecipeData] = useState(null);
  const [drinkRecipeData, setDrinkRecipeData] = useState(null);
  const [valueToFilter, setValueToFilter] = useState('All');
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const setFoodValues = (params) => setFoodRecipeData(params);
  const setDrinkValues = (params) => setDrinkRecipeData(params);

  const filterRecipes = (objectToFilter) => {
    if (valueToFilter === 'All') return objectToFilter;
    return objectToFilter.strCategory === valueToFilter;
  };

  const context = {
    foodRecipeData,
    drinkRecipeData,
    valueToFilter,
    setFoodValues,
    setDrinkValues,
    setValueToFilter,
    filterRecipes,
    objectReturnedAfterReq,
    setObjectReturnedAfterReq,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
