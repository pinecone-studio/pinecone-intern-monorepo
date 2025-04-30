import { productModel } from '../models/product.model';
import { Types } from 'mongoose';
import { ProductInput } from '../models/product.model';
import { buildUpdateData } from '../utils/build-update-data';

export const createProduct = async (input: ProductInput) => {
  return await productModel.create({
    name: input.name,
    price: input.price,
    description: input.description,
    images: input.images,
    category: new Types.ObjectId(input.category),
  });
};

export const updateProductInDB = async (input: ProductInput) => {
  const updateData = buildUpdateData(input);

  const updatedProduct = await productModel.findByIdAndUpdate(
    input._id,
    updateData,
    { new: true }
  );

  if (!updatedProduct) {
    throw new Error('Product not found');
  }

  return updatedProduct;
}