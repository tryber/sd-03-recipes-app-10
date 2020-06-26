import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './components/helpers/renderWithRouter';
import App from './App';

test('Farewell, front-end', () => {
  renderWithRouter(<App />);
  const appReceitas = document.querySelector('#app-receitas');
  expect(appReceitas).toBeInTheDocument();
});
