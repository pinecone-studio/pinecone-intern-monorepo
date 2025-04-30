import { ProductInput } from '../models/product.model';

export const validateUpdateInput = (input: ProductInput) => {
  if (!input || !input._id) {
    throw new Error('Product ID is required');
  }
};