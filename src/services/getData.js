export default async (url) => {
  const response = await fetch(url);
  try {
    const json = response.json ? response.json() : (e) => Promise.reject(e, null);
    return await Promise.resolve(json);
  } catch (e) {
    console.log(e);
  }
  return { recipe: null };
};
