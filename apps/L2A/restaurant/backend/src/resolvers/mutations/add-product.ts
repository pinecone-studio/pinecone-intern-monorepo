import { AddProductInput } from '../../generated';
import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';

export const addProduct = async (_: unknown, { input }: { input: AddProductInput }) => {
  try {
    return await createProduct(input);
  } catch (error) {
    throw new Error(`Error adding product: ${(error as Error).message}`);
  }
};

export const createProduct = async (input: AddProductInput) => {
  try {
    return await productModel.create({
      name: input.name,
      price: input.price,
      description: input.description,
      images: input.images,
      category: new Types.ObjectId(input.category),
    });
  } catch (error) {
    throw new Error(`Error creating product: ${(error as Error).message}`);
  }
};
