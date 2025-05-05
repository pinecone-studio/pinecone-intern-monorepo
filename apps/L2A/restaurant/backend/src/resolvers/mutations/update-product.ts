import { UpdateProductInput } from '../../generated';
import { productModel } from '../../models/product.model';
import { buildUpdateData } from '../../utils/build-update-data';

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

export const updateProductInDB = async (input: UpdateProductInput) => {
  const updateData = buildUpdateData(input);
  const updatedProduct = await productModel.findByIdAndUpdate(input._id, updateData, { new: true });

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
};
