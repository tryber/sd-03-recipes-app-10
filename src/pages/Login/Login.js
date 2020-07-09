import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.style.css';

const setLocalStorage = (email) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify({ email }));
};

const isEmailValid = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};

const isPasswordValid = (password) => password.length > 6;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  return (
    <div style={{ margin: 'auto', height: '640px', display: 'flex' }}>
      <form className="form-container">
        <h1 className="app-name">{" Bon App'étit! "}</h1>
        <input
          className="login-and-pass-input"
          data-testid="email-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-and-pass-input"
          data-testid="password-input"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <Link to="/comidas">
          <button
            className="signin-button"
            style={{ width: '-webkit-fill-available' }}
            type="button"
            data-testid="login-submit-btn"
            disabled={!isValid}
            onClick={() => setLocalStorage(email)}
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
