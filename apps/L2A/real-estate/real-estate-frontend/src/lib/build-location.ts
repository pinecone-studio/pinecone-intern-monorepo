const buildLocationObject = (city?: string, district?: string) => ({
  ...(city && { city }),
  ...(district && { district }),
});

export const buildLocation = (city?: string, district?: string) => {
  return city || district
    ? { location: buildLocationObject(city, district) }
    : {};
};