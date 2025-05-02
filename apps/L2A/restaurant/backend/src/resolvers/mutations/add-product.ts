import { ProductInput } from '../../models/product.model';
import { validateProductInput } from '../../utils/validate-product-input';
import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';

export const addProduct = async (_: unknown, input: ProductInput) => {
  try{ 
  validateProductInput(input);
  return await createProduct(input);
} catch (error) {
  throw new Error(`Error adding product: ${error}`);}
};
export const createProduct = async (input: ProductInput) => {
  try {
  return await productModel.create({
    name: input.name,
    price: input.price,
    description: input.description,
    images: input.images,
    category: new Types.ObjectId(input.category),
  });
} catch (error) {
  throw new Error(`Error creating product: ${error}`);
}
};
