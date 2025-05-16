export const parsePriceMin = (min?: string) => {
  if (!min) return {};
  const value = Number(min);
  return value > 0 ? { min: value } : {};
};

export const parsePriceMax = (max?: string) => {
  if (!max) return {};
  const value = Number(max);
  return value > 0 ? { max: value } : {};
};