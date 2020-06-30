import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../../Context/RecipeContext';
import './CategoryFilter.style.css';

export default function CategoryFilter(apiToCallFilters, valueToMap) {
  const { valueToFilter, setValueToFilter } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await apiToCallFilters());
  };

  const superXablau = (val) => {
    if (val === valueToFilter) return setValueToFilter('All');
    return setValueToFilter(val);
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div className="filter-div">
      <button onClick={() => superXablau('All')}>All</button>
      {valueToMap === 'categories' && objectReturnedAfterReq.meals.map((el, index) => index <= 4 &&
        <button
          data-testid={`${el.strCategory}-category-filter`}
          onClick={() => superXablau(el.strCategory)}
        >{el.strCategory}</button>)}
      {valueToMap === 'drinks' && objectReturnedAfterReq.drinks.map((el, index) => index <= 4 &&
        <button
          data-testid={`${el.strCategory}-category-filter`}
          onClick={() => superXablau(el.strCategory)}
        >{el.strCategory}</button>)}
    </div>
  );
}
