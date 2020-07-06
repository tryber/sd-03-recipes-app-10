import React from 'react';

const ingredientsToshow = (el) => {
  const obj = [];
  for (let index = 1; index <= 20; index += 1) {
    if (el[`strIngredient${index}`] !== '' && typeof el[`strIngredient${index}`] === 'string') {
      obj.push(
        <p data-testid={`${index}-ingredient-name-and-measure`}>
          {`${el[`strIngredient${index}`]} - ${el[`strMeasure${index}`]}`}
        </p>,
      );
    }
  }
  return obj;
};

export default ingredientsToshow;
