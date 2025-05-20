export const buildPriceFilter = (price?: { min?: number; max?: number }) => {
  const filter: Record<string, number> = {};

  price?.min !== undefined && (filter.$gte = price.min);
  price?.max !== undefined && (filter.$lte = price.max);

  return Object.keys(filter).length ? { price: filter } : {};
};
