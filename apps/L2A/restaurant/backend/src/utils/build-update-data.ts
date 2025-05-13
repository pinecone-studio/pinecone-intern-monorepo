import { UpdateProductInput } from '../generated';
import { Types } from 'mongoose';

export const buildUpdateData = (input: UpdateProductInput) => {
  const updateData: Partial<Record<keyof UpdateProductInput, unknown>> = {};

  addIfPresent(updateData, 'name', input.name);
  addIfPresent(updateData, 'price', input.price);
  addIfPresent(updateData, 'status', input.status);
  addIfPresent(updateData, 'images', input.images);
  addIfCategory(updateData, input.category);

  return updateData;
};

const addIfPresent = (target: Partial<Record<string, unknown>>, key: string, value: unknown) => {
  if (value !== undefined && value !== null) {
    target[key] = value;
  }
};

const addIfCategory = (target: Partial<Record<string, unknown>>, category?: string) => {
  if (category) {
    target.category = new Types.ObjectId(category);
  }
};
