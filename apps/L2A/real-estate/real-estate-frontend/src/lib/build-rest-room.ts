export const buildRestrooms = (restrooms?: string) => {
  return restrooms
    ? { restrooms: restrooms.split(',').map(Number) }
    : {};
};