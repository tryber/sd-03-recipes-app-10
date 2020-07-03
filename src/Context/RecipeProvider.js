import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { getFoodByIngredient } from '../services/api';

const RecipeProvider = ({ children }) => {
  const [valueToFilter, setValueToFilter] = useState('All');
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const filterRecipes = async (objectToFilter) => {
    console.log('test')
    if (valueToFilter === 'All') return objectToFilter;
    return await setObjectReturnedAfterReq(getFoodByIngredient(objectToFilter.strCategory));
  };

  const context = {
    valueToFilter,
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
