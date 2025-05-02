import { ProductInput } from '../models/product.model';
import { Types } from 'mongoose';

export const buildUpdateData = (input: ProductInput) => {
  const updateData: Partial<Record<keyof ProductInput, unknown>> = {};

  addIfPresent(updateData, 'name', input.name);
  addIfPresent(updateData, 'price', input.price);
  addIfPresent(updateData, 'description', input.description);
  addIfPresent(updateData, 'images', input.images);
  addIfCategory(updateData, input.category?.toString());

  return updateData;
};

const addIfPresent = (
  target: Partial<Record<string, unknown>>,
  key: string,
  value: unknown
) => {
  if (value !== undefined && value !== null) {
    target[key] = value;
  }
};

const addIfCategory = (
  target: Partial<Record<string, unknown>>,
  category?: string
) => {
  if (category) {
    target.category = new Types.ObjectId(category);
  }
};
