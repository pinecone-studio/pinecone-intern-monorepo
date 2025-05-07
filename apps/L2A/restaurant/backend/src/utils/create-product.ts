import { Types } from 'mongoose';
import { AddProductInput } from '../generated';
import { productModel } from '../models/product.model';

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
