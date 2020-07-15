import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Profile.style.css';

export default function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div>
      {Header('Perfil', false)}
      <div className="holder">
        <div className="profile-info-display">
          <div>
            {user ? (
              <h2 className="profile-email" data-testid="profile-email">
                {user.email}
              </h2>
            ) : null}
          </div>
          <div className="profile-btn-container">
            <Link to="/receitas-favoritas">
              <button type="button" className="profile-btn" data-testid="profile-favorite-btn">
                Receitas Favoritas
              </button>
            </Link>
            <Link to="/receitas-feitas">
              <button className="profile-btn" data-testid="profile-done-btn">
                Receitas Feitas
              </button>
            </Link>
            <Link to="/">
              <button
                className="profile-btn"
                onClick={() => localStorage.clear()}
                data-testid="profile-logout-btn"
              >
                Sair
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
