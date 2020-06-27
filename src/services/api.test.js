import * as api from './api';
import * as mock from './api.mock';

beforeEach(() => {

});

const mockFetch = (data) => jest.fn().mockImplementation(() => Promise.resolve(
  { ok: true, json: () => Promise.resolve(data) },
));

Object.values(mock).forEach((mockedData, index) => {
  it('', async () => {
    window.fetch = mockFetch(mockedData);
    const response = await Object.values(api)[index](mockedData.foundBy);
    expect(response).toBe(mockedData);
  });
});
