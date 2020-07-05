import getData from './getData';

test('Api up', async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve({
        value: 'aceitou top',
      }),
    }));
  const response = await getData('url.test');
  console.log(response.value);
  expect(fetch).toHaveBeenCalledWith('url.test');
  expect(response.value).toBe('aceitou top');
  global.fetch.mockClear();
});

test('APi down', async () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.reject({
        value: 'API is down',
      }),
    }));

  const response = await getData('url.test');
  console.log(response.value);

  expect(response.value).toBe('API is down');
  expect(fetch).toHaveBeenCalledWith('url.test');
  global.fetch.mockClear();
});
