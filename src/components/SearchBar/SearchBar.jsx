import React, { useState } from 'react';
import './SearchBar.style.css';

export default function SearchBar() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(null);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setText(e.target.value)}
          className="search-bar"
          data-testid="search-input"
          placeholder="Buscar Receitas"
        />
      </div>
      <div className="search-btn-container">
        <button className="search-btn-display" type="submit">Buscar</button>
        </div>
      <form className="radio-btn-container">
        <div>
          <input
            className="radio-btn"
            type="radio"
            name="select"
            id="ingrediente"
            value="ingrediente"
            onClick={(e) => setCategory(e.target.value)}
          />
          <label htmlFor="ingrediente">Ingrediente</label>
        </div>
        <div>
          <input
            onClick={(e) => setCategory(e.target.value)}
            className="radio-btn"
            type="radio"
            name="select"
            id="nome"
            value="nome"
          />
          <label htmlFor="nome">Nome</label>
        </div>
        <div>
          <input
            className="radio-btn"
            type="radio"
            name="select"
            id="primeira-letra"
            value="primeira-letra"
            onClick={e => setCategory(e.target.value)}
          />
          <label htmlFor="primeira-letra">Primeira letra</label>
        </div>
      </form>
    </div>
  );
}
