import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
// import * as Api from '../services/api'

const RecipeProvider = ({ children }) => {
  const [recipeData, setRecipeData] = useState(null);

  const setDataValues = (params) => setRecipeData(params);
  console.log(recipeData);
  const context = {
    recipeData,
    setDataValues,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
