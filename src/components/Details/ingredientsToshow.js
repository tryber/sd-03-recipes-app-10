import React from 'react';

const ingredientsToshow = (el) => {
  const obj = [];
  for (let index = 1; index <= 20; index += 1) {
    if (el[`strIngredient${index}`] !== '' && typeof el[`strIngredient${index}`] === 'string') {
      obj.push(
        <ul style={{ margin: '0', listStyleType: 'square' }} key={Math.random() * Math.PI} data-testid={`${index - 1}-ingredient-name-and-measure`}>
          <li>
            {el[`strIngredient${index}`]}
            {' - '}
            {el[`strMeasure${index}`]}
          </li>
        </ul>,
      );
    }
  }
  return obj;
};

export default ingredientsToshow;
