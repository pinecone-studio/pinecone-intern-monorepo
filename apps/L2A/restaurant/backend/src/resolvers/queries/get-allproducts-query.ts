import { productModel } from '../../models/product.model';

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();

    return products;
  } catch (error: unknown) {
    throw new Error('Error fetching all products');
  }
};
