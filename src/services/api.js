import getData from './getData';

const initialDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const getDrinkList = async () => {
  const initialPageDrinks = `${initialDrinksURL}search.php?s=`;
  return getData(initialPageDrinks);
};

export const getDrinksCategoriesList = async () => {
  const drinksCategories = `${initialDrinksURL}list.php?c=list`;
  return getData(drinksCategories);
};

export const getDrinkByCategorie = async (categorie) => {
  const drinksByCategorie = `${initialDrinksURL}filter.php?c=${categorie}`;
  return getData(drinksByCategorie);
};

export const getDrinkByIngredient = async (ingredient) => {
  const drinksByIngredient = `${initialDrinksURL}filter.php?i=${ingredient}`;
  return getData(drinksByIngredient);
};

export const getDrinkByName = async (name) => {
  const drinksByName = `${initialDrinksURL}search.php?s=${name}`;
  return getData(drinksByName);
};

export const getDrinkByFirstLetter = async (letter) => {
  const drinksByFirstLetter = `${initialDrinksURL}search.php?f=${letter}`;
  return getData(drinksByFirstLetter);
};

export const getDrinkByID = async (id) => {
  const drinksByID = `${initialDrinksURL}lookup.php?i=${id}`;
  return getData(drinksByID);
};

const initialFoodsURL = 'https://www.themealdb.com/api/json/v1/1/';

export const getFoodList = async () => {
  const initialPageFoods = `${initialFoodsURL}search.php?s=`;
  return getData(initialPageFoods);
};

export const getFoodsCategoriesList = async () => {
  const foodsCategories = `${initialFoodsURL}list.php?c=list`;
  return getData(foodsCategories);
};

export const getFoodByCategorie = async (categorie) => {
  const foodsByCategorie = `${initialFoodsURL}filter.php?c=${categorie}`;
  return getData(foodsByCategorie);
};

export const getFoodByIngredient = async (ingredient) => {
  const foodsByIngredient = `${initialFoodsURL}filter.php?i=${ingredient}`;
  return getData(foodsByIngredient);
};

export const getFoodByName = async (name) => {
  const foodsByName = `${initialFoodsURL}search.php?s=${name}`;
  return getData(foodsByName);
};

export const getFoodByFirstLetter = async (letter) => {
  const foodsByFirstLetter = `${initialFoodsURL}search.php?f=${letter}`;
  return getData(foodsByFirstLetter);
};

export const getFoodByID = async (id) => {
  const foodsByID = `${initialFoodsURL}lookup.php?i=${id}`;
  return getData(foodsByID);
};