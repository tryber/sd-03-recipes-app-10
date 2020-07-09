import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

const RecipeProvider = ({ children }) => {
  const [valueToFilter, setValueToFilter] = useState('All');
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [comingFromIngredients, setComingFromIngredients] = useState(false);

  const showSearchBar = (bool) => setToggleSearchBar(bool);

  const context = {
    valueToFilter,
    objectReturnedAfterReq,
    toggleSearchBar,
    showSearchBar,
    setValueToFilter,
    setObjectReturnedAfterReq,
    comingFromIngredients,
    setComingFromIngredients,
  };

  return <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>;
};

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
