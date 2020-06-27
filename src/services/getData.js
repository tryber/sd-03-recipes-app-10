export default async (url) => {
  const response = await fetch(url);
  const json = await response.json();
  const data = await (response.ok ? Promise.resolve(json) : Promise.reject(json));
  return data;
};
