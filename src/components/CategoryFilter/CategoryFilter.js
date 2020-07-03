import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../../Context/RecipeContext';
import './CategoryFilter.style.css';

export default function CategoryFilter(apiToCallFilters, valueToMap) {
  const { valueToFilter, setValueToFilter, toggleSearchBar } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await apiToCallFilters());
  };

  useEffect(() => {
    functionToMakeRequisition();
    return setValueToFilter('All');
  }, []);

  const changeFilterValue = (val) => {
    if (val === valueToFilter) return setValueToFilter('All');
    return setValueToFilter(val);
  };

  const categoryButton = (el, index) =>
    index <= 4 && (
      <button
        data-testid={`${el.strCategory}-category-filter`}
        onClick={() => changeFilterValue(el.strCategory)}
        type="button"
        key={index}
        className="category-filter-btn"
      >
        {el.strCategory}
      </button>
    );

  if (objectReturnedAfterReq === null || toggleSearchBar === true) {
    return null;
  }
  return (
    <div className="filter-div">
      <button className="category-filter-btn" onClick={() => changeFilterValue('All')}>
        All
      </button>
      {objectReturnedAfterReq[valueToMap].map(categoryButton)}
    </div>
  );
}
