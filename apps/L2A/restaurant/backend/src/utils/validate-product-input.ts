import { ProductInput } from '../models/product.model';

export const validateProductInput = (input: ProductInput) => {
  if (!input) {
    throw new Error('Product input is required.');
  }

  validateName(input.name);
  validatePrice(input.price);
  validateDescription(input.description);
  validateImages(input.images);
};

const validateName = (name?: string) => {
  if (!name) throw new Error('Product name is required.');
};

const validatePrice = (price?: number) => {
  if (price == null) throw new Error('Product price is required.');
};

const validateDescription = (description?: string) => {
  if (!description) throw new Error('Product description is required.');
};

const validateImages = (images?: string[]) => {
  if (!images || !images.length) throw new Error('Product images are required.');
};
