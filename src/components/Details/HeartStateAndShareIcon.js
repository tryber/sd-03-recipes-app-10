import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import notFavIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import isFavIcon from '../../images/blackHeartIcon.svg';
import './Details.style.css';
import functionToMakeRequisition from './funtionToMakeRequisition';

function changeFavorites(checkInLocalstorage, addToFavorites, removeFromFavorites) {
  return !checkInLocalstorage ? addToFavorites() : removeFromFavorites();
}

const copyToClipBoard = (setCopied) => {
  navigator.clipboard.writeText(window.location.href);
  navigator.clipboard.readText().then((el) => el === window.location.href && setCopied(true))
    .then(setTimeout(() => {
      setCopied(false);
    }, 2000));
};

const setObjInLocalStorage = (accessObj, stringObject, type, objectReturnedAfterReq) => {
  const newArray = [];
  if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
    const allFavorited = JSON.parse(localStorage.getItem('favoriteRecipes'));
    newArray.push(objectReturnedAfterReq[accessObj].map((el) => JSON.stringify([
      allFavorited.push({
        id: el[`id${stringObject}`],
        type,
        category: el.strCategory,
        alcoholicOrNot: el.strAlcoholic ? el.strAlcoholic : '',
        area: el.strArea ? el.strArea : '',
        name: el[`str${stringObject}`],
        image: el[`str${stringObject}Thumb`],
      }),
    ])));
    return JSON.stringify(allFavorited);
  }
  newArray.push(objectReturnedAfterReq[accessObj].map((el) => JSON.stringify([{
    id: el[`id${stringObject}`],
    type,
    area: el.strArea ? el.strArea : '',
    category: el.strCategory,
    alcoholicOrNot: el.strAlcoholic ? el.strAlcoholic : '',
    name: el[`str${stringObject}`],
    image: el[`str${stringObject}Thumb`],
  }])));
  return newArray;
};

export default function HeartStateAndShareIcon() {
  const [objectReturnedAfterReq, setObjectReturnedAfterReq] = useState(null);
  const typeRequsition = useHistory().location.pathname.split('/')[1];
  const itemId = useHistory().location.pathname.split('/')[2];
  const isInLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    && JSON.parse(localStorage.getItem('favoriteRecipes')).some((el) => el.id === itemId);
  const [checkInLocalstorage, setCheckInLocalstorage] = useState(isInLocalStorage);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    functionToMakeRequisition(typeRequsition, itemId, setObjectReturnedAfterReq);
  }, []);

  function addToFavorites() {
    setCheckInLocalstorage(true);
    if (typeRequsition === 'comidas') return localStorage.setItem('favoriteRecipes', setObjInLocalStorage('meals', 'Meal', 'comida', objectReturnedAfterReq));
    return localStorage.setItem('favoriteRecipes', setObjInLocalStorage('drinks', 'Drink', 'bebida', objectReturnedAfterReq));
  }

  const removeFromFavorites = () => {
    setCheckInLocalstorage(false);
    const findElementToRemove = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((el) => el.id !== itemId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(findElementToRemove));
  };

  return (
    <div className="icons-container">
      {copied && <p>Link copiado!</p>}
      <input
        data-testid="share-btn"
        type="image"
        src={shareIcon}
        onClick={() => copyToClipBoard(setCopied)}
        alt="share-button"
      />
      <input
        data-testid="favorite-btn"
        type="image"
        src={checkInLocalstorage ? isFavIcon : notFavIcon}
        onClick={() => changeFavorites(checkInLocalstorage, addToFavorites, removeFromFavorites)}
        alt="fav-button"
      />
    </div>
  );
}
