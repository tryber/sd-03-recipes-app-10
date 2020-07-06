import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import notFavIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import isFavIcon from '../../images/blackHeartIcon.svg';
import './Details.style.css';
import functionToMakeRequisition from './funtionToMakeRequisition';

const copyToClipBoard = () => {
  navigator.clipboard.writeText(window.location.href);
  navigator.clipboard.readText().then((el) => el === window.location.href && alert('Link copiado!'));
};

const setObjInLocalStorage = (accessObj, stringObject, type, objectReturnedAfterReq) => {
  const newArray = [];
  if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
    const allFavorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    newArray.push(objectReturnedAfterReq[accessObj].map((el) => JSON.stringify([
      allFavorited.push({
        id: el[`id${stringObject}`],
        type: el.type,
        category: el.strCategory,
        alcoholicOrNot: el.strAlcoholic,
        area: el.strArea,
        name: el[`str${stringObject}`],
        image: el[`str${stringObject}Thumb`],
      }),
    ])),
  );
    return JSON.stringify(allFavorited);
  }
  newArray.push(objectReturnedAfterReq[accessObj].map((el) =>
    JSON.stringify([{
      id: el[`id${stringObject}`],
      type: el.type,
      area: el.strArea,
      category: el.strCategory,
      alcoholicOrNot: '',
      name: el[`str${stringObject}`],
      image: el[`str${stringObject}Thumb`],
    }]),
  ));
  return newArray;
};

export default function HeartStateAndShareIcon() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];
  const isInLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes')).some((el) => el.id === itemId);
  const [checkInLocalstorage, setCheckInLocalstorage] = useState(isInLocalStorage);

  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setObjectReturnedAfterReq);
  }, []);

  const addToFavorites = () => {
    setCheckInLocalstorage(true);
    (typeRequsition === 'comidas') && localStorage.setItem('favoriteRecipes', setObjInLocalStorage('meals', 'Meal', 'comida', objectReturnedAfterReq));
    (typeRequsition === 'bebidas') && localStorage.setItem('favoriteRecipes', setObjInLocalStorage('drinks', 'Drink', 'bebida', objectReturnedAfterReq));
  };

  const removeFromFavorites = () => {
    setCheckInLocalstorage(false);
    const findElementToRemove = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((el) => el.id !== itemId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(findElementToRemove));
  };

  const changeFavorites = () => {
    if (checkInLocalstorage === false) return addToFavorites();
    return removeFromFavorites();
  };

  const checkIcon = () => {
    return checkInLocalstorage ? isFavIcon : notFavIcon;
  };

  return (
    <div className="icons-container">
      <input
        data-testid="share-btn"
        type="image"
        src={shareIcon}
        onClick={() => copyToClipBoard()}
      />
      <input
        data-testid="favorite-btn"
        type="image"
        src={checkIcon()}
        onClick={() => changeFavorites()}
      />
    </div>
  );
}
