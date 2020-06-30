import React, { useState } from 'react';
import RecipeContext from './RecipeContext';
// import PropTypes from 'prop-types';
// import * as Api from '../services/api'

const RecipeProvider = ({children}) => {
  const [recipeData, setRecipeData] = useState(null);
  

  const setDataValues = (params) => {
    return setRecipeData(params)
  }

  const context = {
    recipeData,
    setDataValues,
  }

  return (
    <RecipeContext.Provider value={context}>
      {children}
    </RecipeContext.Provider>
  )
}

export default RecipeProvider;