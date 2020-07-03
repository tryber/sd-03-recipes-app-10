export default async (url) => {
  const response = await fetch(url);
  try {
    const json = (await !!response.json) ? response.json() : null;
    return await Promise.resolve(json);
  } catch (e) {
    Promise.reject(e);
  }
  return { recipe: null };
};
