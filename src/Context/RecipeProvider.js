import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
// import * as Api from '../services/api'

const RecipeProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState(null);
  const [valueToFilter, setValueToFilter] = useState('All');

  const filterRecipes = (objectToFilter) => {
    if(valueToFilter==='All') return objectToFilter
    return objectToFilter.strCategory === valueToFilter
  }

  const setDataValues = (params) => setRecipeData(params);

  const context = {
    recipeData,
    setDataValues,
    valueToFilter,
    setValueToFilter,
    filterRecipes,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
