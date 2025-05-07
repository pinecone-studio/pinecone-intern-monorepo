import { AddProductInput } from '../../generated';
import { createProduct } from '../../utils/create-product';

export const addProduct = async (_: unknown, { input }: { input: AddProductInput }) => {
  try {
    return await createProduct(input);
  } catch (error) {
    throw new Error(`Error adding product: ${(error as Error).message}`);
  }
};
