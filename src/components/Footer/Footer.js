import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.style.css';

export default function Footer() {
  return (
    <div className="footer-container">
        <Link to="/explorar/comidas">
          <button data-testid="food-bottom-btn" type="button" className="explore-icon" />
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="drinks-bottom-btn" type="button" className="drink-icon" />
        </Link>
        <Link to="/explorar">
          <button data-testid="explore-bottom-btn" type="button" className="meal-icon" />
        </Link>
    </div>
  );
}
