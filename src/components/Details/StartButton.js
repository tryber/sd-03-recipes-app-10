import React, {useContext} from 'react'

const saveInProgressRecipes = (key, id, value) => localStorage.setItem(
    "inProgressRecipes",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("inProgressRecipes")),
      [key]: { [id]: value },
    })
  );


export default function StartButton ({typeRequsition, itemId, recipe}){
    const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));

    const isRecipeDone = (doneRecipes !== null ? doneRecipes : [])
        .some((e) => e.id === itemId);
    const inProgressRecipes = JSON.parse(
      localStorage.getItem("inProgressRecipes")
    );
    const inProgressKey = typeRequsition === "comidas" ? "meals" : "cocktails"
    console.log(inProgressKey)
    const isRecipeInProgress = !!inProgressRecipes[inProgressKey] && inProgressRecipes[inProgressKey].hasOwnProperty(itemId);
  
    const text = () => {
      if (!!isRecipeInProgress) return "Continuar Receita";
      if (isRecipeDone) return null;
      return "Iniciar Receita";
    };
  
    const setRecipeToInProgress = () => {
      const drinksOrMeals = typeRequsition === "comidas" ? "meals" : "drinks";
      const recipeObj = recipe[drinksOrMeals][0];
      const ingredients = (counter = 0) =>
        Object.entries(recipeObj).reduce((acc = [], [key, value]) => {
          if (key.includes("strIngredient") && !!value) {
            acc.push(value);
          }
          if (key.includes("strMeasure") && !!acc[counter]) {
            acc[counter] = `${acc[counter]} - ${value}`;
            counter += 1;
          }
          console.log(acc)
          return acc;
        }, []);
  
      return typeRequsition === "comidas"
        ? saveInProgressRecipes("meals", itemId, ingredients())
        : saveInProgressRecipes("cocktails", itemId, ingredients());
    };
    
    return (<button onClick={() => setRecipeToInProgress()}>{text()}</button>)
}