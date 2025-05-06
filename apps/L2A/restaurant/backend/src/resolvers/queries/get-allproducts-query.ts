import { productModel } from '../../models/product.model';
import { ProductError } from '../../utils/product-error';

export const getAllProducts = async () => {
  try {
    const products = await productModel.find();

    return products;
  } catch (error: unknown) {
    ProductError(error, 'Product not found');
    }
};
