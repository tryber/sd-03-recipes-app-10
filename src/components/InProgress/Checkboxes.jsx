import React, { useEffect, useContext } from 'react';
import './Checkboxes.style.css';
import InProgressContext from '../../Context/InProgressContext';

export const ingredients = (recipeObj) => {
  let counter = 0;
  return Object.entries(recipeObj).reduce(
    (acc = [], [key, value]) => {
      if (!!key && key.includes('strIngredient') && !!value) {
        acc.push(value);
      }
      if (!!key && key.includes('strMeasure') && !!acc[counter]) {
        acc[counter] = `${acc[counter]} - ${value}`;
        counter += 1;
      }
      return acc;
    }, [],
  );
};
const toggleCheckbox = (index, dones, setDones) => {
  if (!dones) return setDones([index]);

  if (dones.includes(index)) {
    return setDones(
      (prev) => [
        ...prev.slice(0, prev.indexOf(index)),
        ...prev.slice(prev.indexOf(index) + 1),
      ],
    );
  }
  console.log('toggleCheckbox:', index);
  return setDones((prevDones) => {
    console.log(prevDones);
    return ([...prevDones, index]);
  });
};

export default function Checkboxes() {
  const {
    saveInProgress, requestKey, setDones, data, dones,
  } = useContext(InProgressContext);

  useEffect(() => {
    if (!!dones && dones !== []) {
      saveInProgress([...dones]);
    }
  }, [toggleCheckbox]);

  return data ? (
    <div style={{ display: 'grid' }}>
      {!!data[requestKey][0] && ingredients(data[requestKey][0]).map((e, index) => (
        <label
          className={!!dones && dones.includes(index) ? 'crossed' : 'not-crossed'}
          key={Math.random()}
          htmlFor={e}
          data-testid={`${index}-ingredient-step`}
        >
          <input
            name={e}
            type="checkbox"
            checked={!!dones && dones.includes(index)}
            onChange={() => toggleCheckbox(index, dones, setDones)}
          />
          {e}
        </label>
      ))}
    </div>
  ) : <h1>loading poxa...</h1>;
}
