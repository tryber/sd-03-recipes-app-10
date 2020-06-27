import getData from './getData';
import fetch, {Response} from 'node-fetch';
const {Response} = jest.requireActual('node-fetch');

jest.mock('node-fetch');

// const mockFetchReject = (error) => jest.fn().mockImplementation(() => Promise.reject(() => { () => Promise.reject(error); }));


const mockFetchReject = function () {
  return new Promise((resolve, reject) => {
    reject('error');
  });
};
test('asdasdasd', async () => {
  fetch.mockRejectedValue(new Error('Async error'));
  const response = await getData('url.test');
  console.log(response);
  expect(response).toBe('error');
});
