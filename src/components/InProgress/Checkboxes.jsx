import React from 'react';
import propTypes from 'prop-types';

export const ingredients = (recipeObj) => {
  let counter = 0;
  return Object.entries(recipeObj).reduce(
    (acc = [], [key, value]) => {
      if (key.includes('strIngredient') && !!value) {
        acc.push(value);
      }
      if (key.includes('strMeasure') && !!acc[counter]) {
        acc[counter] = `${acc[counter]} - ${value}`;
        counter += 1;
      }
      return acc;
    }, [],
  );
};
const toggleCheckbox = (target, dones, setDones) => {
  if (dones.includes(target.name)) {
    return setDones(
      (prev) => [
        ...prev.slice(0, prev.indexOf(target.name)),
        ...prev.slice(prev.indexOf(target.name) + 1),
      ],
    );
  }
  return setDones((prevDones) => [...prevDones, target.name]);
};

export default function Checkboxes({ data, dones, setDones }) {
  return data && (
    <div style={{ display: 'grid' }}>
      {ingredients(data).map((e) => (
        <label key={Math.random()} htmlFor={e}>
          <input
            name={e}
            type="checkbox"
            checked={dones.includes(e)}
            onChange={(event) => toggleCheckbox(event.target, dones, setDones)}
          />
          {e}
        </label>
      ))}
    </div>
  );
}

Checkboxes.propTypes = {
  dones: propTypes.arrayOf(propTypes.string).isRequired,
  setDones: propTypes.func.isRequired,
  data: propTypes.isRequired,
};
