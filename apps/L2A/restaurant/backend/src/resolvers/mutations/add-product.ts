import { ProductInput } from '../../models/product.model';
import { validateProductInput } from '../../utils/validate-product-input';
import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';

export const addProduct = async (_: unknown, input: ProductInput) => {
  validateProductInput(input);
  return await createProduct(input);
};

export const createProduct = async (input: ProductInput) => {
  return await productModel.create({
    name: input.name,
    price: input.price,
    description: input.description,
    images: input.images,
    category: new Types.ObjectId(input.category),
  });
};
