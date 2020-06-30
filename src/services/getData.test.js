import getData from './getData';
jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

/* beforeEach(() => {
  fetch.mockClear();
}); */

/* test("Api up", async () => {
  fetch.mockReturnValue(Promise.resolve(new Response("aceitou top")));

  const response = await getData("url.test");
  console.log(response);
  expect(fetch).toHaveBeenCalledWith("url.test");
  expect(response).toBe("aceitou top");
}); */
test('APi down', async () => {
  fetch.mockReturnValue(Promise.reject(new Response('API is down')));
  const response = await getData('url.test');
  console.log(response);
  response
    .then(
      () => console.log('deubom'),
      () => console.log('deuruim')
    )
    .catch((e) => console.log(e));
  expect(response).toBe('API is down');
  expect(fetch).toHaveBeenCalledWith('url.test');
});
