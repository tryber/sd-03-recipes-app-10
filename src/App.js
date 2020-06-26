import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login'; import Header from './Edu/Header';
import Header from './Edu/Header';

function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/comidas">{Header}</Route>
          <Route path="/bebidas">{}</Route>
          <Route path="/comidas/:id">{}</Route>
          <Route path="/bebidas/:id">{}</Route>
          <Route path="/comidas/:id/in-progress">{}</Route>
          <Route path="/bebidas/:id/in-progress">{}</Route>
          <Route path="/explorar">{}</Route>
          <Route path="/explorar/comidas">{}</Route>
          <Route path="/explorar/bebidas">{}</Route>
          <Route path="/explorar/comidas/ingredientes">{}</Route>
          <Route path="/explorar/bebidas/ingredientes">{}</Route>
          <Route path="/explorar/comidas/area">{}</Route>
          <Route path="/perfil">{}</Route>
          <Route path="/receitas-feitas">{}</Route>
          <Route path="/receitas-favoritas">{}</Route>
          <Route path="*">{}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
