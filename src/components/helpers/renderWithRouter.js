import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, route) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <Route
          history={history}
        >
          {component}
        </Route>
      </MemoryRouter>,
    ),
    history,
  };
};

export default renderWithRouter;
