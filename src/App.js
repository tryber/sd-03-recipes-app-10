import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import MainFoodsScreen from './pages/MainFoodsScreen';
import MainDrinksScreen from './pages/MainDrinksScreen';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFoundPage from './pages/NotFoundPage';
import RecipesMade from './pages/RecipesMade';
import ExploreFoodsScreen from './components/ExploreFoods/ExploreFoodsScreen';
import ExploreDrinksScreen from './components/ExploreDrinks/ExploreDrinksScreen';

function App() {
  return (
    <div id="app-receitas">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/comidas" component={MainFoodsScreen} />
          <Route path="/bebidas" component={MainDrinksScreen} />
          <Route path="/comidas/:id" component />
          <Route path="/bebidas/:id" component />
          <Route path="/comidas/:id/in-progress" component />
          <Route path="/bebidas/:id/in-progress" component />
          <Route path="/explorar" component={Explore} />
          <Route path="/explorar/comidas" component={ExploreFoodsScreen} />
          <Route path="/explorar/bebidas" component={ExploreDrinksScreen} />
          <Route path="/explorar/comidas/ingredientes" component />
          <Route path="/explorar/bebidas/ingredientes" component />
          <Route path="/explorar/comidas/area" component />
          <Route path="/perfil" component={Profile} />
          <Route path="/receitas-feitas" component={RecipesMade} />
          <Route path="/receitas-favoritas" component={FavoriteRecipes} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
