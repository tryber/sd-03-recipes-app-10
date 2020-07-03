import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../../Context/RecipeContext';
import './CategoryFilter.style.css';
import { getFoodByIngredient, getFoodList } from '../../services/api';

export default function CategoryFilter(apiToCallFilters, valueToMap) {
  const { valueToFilter, setValueToFilter, objectReturnedAfterReq, setObjectReturnedAfterReq } = useContext(RecipeContext);
  const [categoriesButtons, setCategoriesButtons] = useState(null);

  const changeFilterValue = async (val) => {
    if (val === valueToFilter ) return await setValueToFilter('All');
    return await setValueToFilter(val);
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
    setCategoriesButtons(await apiToCallFilters());
  };

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return categoriesButtons === null ? (
    null
  ) : (
    <div className="filter-div">
      <button onClick={() => changeFilterValue('All')}>All</button>
      {categoriesButtons[valueToMap].map(categoryButton)}
    </div>
  );
}
