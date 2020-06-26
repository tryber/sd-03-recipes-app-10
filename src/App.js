import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
<<<<<<< HEAD
          <Route path="/">
=======
          <Route strict path="/">
>>>>>>> 7968609270fd388413ef72c5540a0277e67a1651
            <Login />
          </Route>
          <Route path="/comidas">{}</Route>
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
