import { UpdateProductInput } from '../../generated';
import { updateProductInDB } from '../../utils/update-product-indb';

export const updateProduct = async (_: unknown, { input }: { input: UpdateProductInput }) => {
  if (!input._id) {
    throw new Error('Product ID is required');
  }
  try {
    return await updateProductInDB(input);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }
};
