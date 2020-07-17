import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';

import InProgressContext from './InProgressContext';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const saveInProgress = (item = [], localKey, itemId) => {
  if (inProgressRecipes === null) {
    return localStorage.setItem('inProgressRecipes', JSON.stringify({
      [localKey]: {
        [itemId]: item,
      },
    }));
  }

  return localStorage.setItem('inProgressRecipes',
    inProgressRecipes[localKey] ? JSON.stringify({
      ...inProgressRecipes,
      [localKey]: {
        ...inProgressRecipes[localKey],
        [itemId]: item,
      },
    }) : JSON.stringify({
      ...inProgressRecipes,
      [localKey]: {
        [itemId]: item,
      },
    }));
};
const InProgressProvider = ({ children }) => {
  const itemId = useParams().id;
  const typeRequsition = useLocation().pathname.split('/')[1];
  const localKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';
  const requestKey = (typeRequsition === 'comidas' ? 'meals' : 'drinks');
  const localStoragePath = !!inProgressRecipes && !!inProgressRecipes[localKey]
   && !!inProgressRecipes[localKey][itemId] && inProgressRecipes[localKey][itemId];

  const [data, setData] = useState(null);
  const [dones, setDones] = useState(localStoragePath ? [...localStoragePath] : []);

  const context = ({
    dones,
    data,
    itemId,
    localKey,
    typeRequsition,
    localStoragePath,
    requestKey,
    setDones,
    setData,
    saveInProgress: (item) => saveInProgress(
      item, localKey, itemId, localStoragePath, dones,
    ),
  });
  //   console.log(context.saveInProgress);
  return <InProgressContext.Provider value={context}>{children}</InProgressContext.Provider>;
};

export default InProgressProvider;

InProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
