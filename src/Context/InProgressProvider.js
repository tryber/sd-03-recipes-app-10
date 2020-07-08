import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import InProgressContext from './InProgressContext';

const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const InProgressProvider = ({ children }) => {
  const itemId = useLocation().pathname.split('/')[2];
  const typeRequsition = useLocation().pathname.split('/')[1];
  const localKey = typeRequsition === 'comidas' ? 'meals' : 'cocktails';
  const requestKey = (typeRequsition === 'comidas' ? 'meals' : 'drinks');
  const doesObjPathExists = !!inProgressRecipes && inProgressRecipes !== []
  && !!inProgressRecipes[requestKey] && inProgressRecipes[requestKey][itemId];
  const [dones, setDones] = useState(doesObjPathExists
    ? inProgressRecipes[localKey][itemId] || [] : null);
  const [data, setData] = useState(null);

  const saveInProgress = (item = []) => {
    console.log(item, localKey, itemId);
    if (inProgressRecipes === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        [localKey]: {
          [itemId]: item,
        },
      }));
    }
    if (doesObjPathExists) {
      return localStorage.setItem('inProgressRecipes',
        inProgressRecipes !== null && inProgressRecipes[localKey][itemId] ? JSON.stringify({
          ...inProgressRecipes,
          [localKey]: {
            ...inProgressRecipes[localKey],
            [itemId]: item,
          },
        }) : JSON.stringify({
          ...inProgressRecipes,
          [localKey]: {
            [itemId]: dones,
          },
        }));
    }
    return null;
  };
  const context = {
    dones,
    data,
    itemId,
    localKey,
    typeRequsition,
    doesObjPathExists,
    requestKey,
    setDones,
    setData,
    saveInProgress,
  };

  return <InProgressContext.Provider value={context}>{children}</InProgressContext.Provider>;
};

export default InProgressProvider;

InProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
