import React from 'react';
import { render, wait, waitForDomChange } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import { mockGetFoodByID } from '../../services/apiFood.mock';
import InProgress from './inProgress';
import InProgressProvider from '../../Context/InProgressProvider';
// import render from 'react-dom'

jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
  ok: 200,
  json: () => Promise.resolve(mockGetFoodByID),
}));

describe('Btn', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  test('should ', async () => {
    // const renderWithRouter = ({ children }) => (
    //   render(
    //     <MemoryRouter initialEntries={['52823']}>
    //       <Route path="comidas/:id">
    //         {children}
    //       </Route>
    //     </MemoryRouter>,
    //   )
    // );
    const { queryByRole, findByTestId } = act(() => {
      renderWithRouter(
        <InProgressProvider>
          <InProgress />
        </InProgressProvider>, { pathname: '/comidas/52823/in-progress' },
      );
    }, container);
    console.log(window.location.pathname);
    const button = queryByRole('checkbox');
    const checkboxes = findByTestId('finish-recipe-btn');
    console.log((useParams()));
    console.log('window.location.pathname:', global.location.pathname);
    console.log(await checkboxes);
    await checkboxes.forEach((box) => expect(box.checked).toBe(false));
    expect(await button).not.toBeDisabled();
    expect(await button).not.toBeInTheDocument();
  });
});
