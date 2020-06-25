import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const setLocalStorage = (email) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify({ email }));
};

const isEmailValid = (email) => {
  console.log(email);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !!email && typeof email === 'string' && !!email.match(emailRegex);
};

const isPasswordValid = (password) => password.length > 6;
const enter = (email) => setLocalStorage(email);


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) setIsValid(true);
    if (!isEmailValid(email) || !isPasswordValid(password)) setIsValid(false);
  }, [email, password]);

  return (
    <form>
      <input
        data-testid="login-input-email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        data-testid="login-input-password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit" data-testid="login-button" disabled={!isValid} onClick={() => enter(email)}>
        Entrar
        <Link to="/comidas" />
      </button>
    </form>
  );
};

export default Login;
