import * as api from './api';
import * as mockDrink from './apiDrink.mock';
import * as mockFood from './apiFood.mock';

/* beforeEach(() => {

}); */

const mockFetch = (data) => jest.fn().mockImplementation(() => Promise.resolve(
  { ok: true, json: () => Promise.resolve(data) },
));

const mockArray = Object.values(mockDrink).concat(Object.values(mockFood))

mockArray.forEach((mockedData, index) => {
  it('', async () => {
    window.fetch = mockFetch(mockedData);
    const response = await Object.values(api)[index](mockedData.foundBy);
    expect(response).toBe(mockedData);
  });
});
