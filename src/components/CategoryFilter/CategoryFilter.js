import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../../Context/RecipeContext';
import './CategoryFilter.style.css';

export default function CategoryFilter(apiToCallFilters, valueToMap) {
  const { valueToFilter, setValueToFilter } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const changeFilterValue = (val) => {
    if (val === valueToFilter) return setValueToFilter('All');
    return setValueToFilter(val);
  };
  const categoryButton = (el, index) => index <= 4
    && (
    <button
      data-testid={`${el.strCategory}-category-filter`}
      onClick={() => changeFilterValue(el.strCategory)}
      type="button"
    >
      {el.strCategory}
    </button>
    );

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await apiToCallFilters());
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div className="filter-div">
      <button onClick={() => changeFilterValue('All')}>All</button>
      {objectReturnedAfterReq[valueToMap].map(categoryButton)}
    </div>
  );
}
