import { parsePriceMax, parsePriceMin } from "./parse-price";


export const buildPrice = (min?: string, max?: string) => {
  const price = {
    ...parsePriceMin(min),
    ...parsePriceMax(max),
  };

  return Object.keys(price).length ? { price } : {};
};