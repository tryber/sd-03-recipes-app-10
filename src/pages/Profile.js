import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// const { email } = JSON.parse(localStorage.getItem('user'));
// console.log(email)

export default function Profile() {
  return (
    <div>
      {Header('Perfil', false)}
      <div className="holder">
        {/* <h2>{email}</h2> */}
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/">
          <button onClick={() => localStorage.clear()} data-testid="profile-logout-btn">
            Sair
          </button>
          {/* {console.log(email)} */}
        </Link>
      </div>
      <Footer />
    </div>
  );
}
