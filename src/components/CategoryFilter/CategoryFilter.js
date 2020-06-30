import React, { useState, useEffect, useContext } from 'react'
import RecipeContext from '../../Context/RecipeContext';

export default function CategoryFilter( apiToCallFilters, valueToMap ) {
  const { valueToFilter, setValueToFilter } = useContext(RecipeContext);
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);

  const functionToMakeRequisition = async () => {
    setObjectReturnedAfterReq(await apiToCallFilters());
  };

  const superXablau = (val) => {
    if(val === valueToFilter) return setValueToFilter('All')
    return setValueToFilter(val)
  }

  useEffect(() => {
    functionToMakeRequisition();
  }, []);

  return objectReturnedAfterReq === null ? (
    null
  ) : (
    <div>
      <button onClick={()=> superXablau('All')}>All</button>
      {valueToMap==="categories" && objectReturnedAfterReq.categories.map((el, index) => index <= 4 &&
        <button onClick={()=> superXablau(el.strCategory)}>{el.strCategory}</button>)}
      {valueToMap==="drinks" && objectReturnedAfterReq.drinks.map((el, index) => index <= 4 &&
        <button onClick={()=> superXablau(el.strCategory)}>{el.strCategory}</button>)}
    </div>
  )
}
