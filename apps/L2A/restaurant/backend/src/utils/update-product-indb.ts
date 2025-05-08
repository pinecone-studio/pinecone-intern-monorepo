import { UpdateProductInput } from '../generated';
import { productModel } from '../models/product.model';
import { buildUpdateData } from './build-update-data';

export const updateProductInDB = async (input: UpdateProductInput) => {
  const updateData = buildUpdateData(input);
  const updatedProduct = await productModel.findByIdAndUpdate(input._id, updateData, { new: true });

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
};
