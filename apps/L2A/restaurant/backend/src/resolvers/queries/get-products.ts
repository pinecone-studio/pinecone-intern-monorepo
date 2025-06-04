import { productModel } from '../../models/product.model';

export const getProducts = async () => {
  try {
    const products = await productModel.find().populate('category');
    return products;
  } catch (error) {
    throw new Error(`Error fetching products: ${(error as Error).message}`);
  }
};
