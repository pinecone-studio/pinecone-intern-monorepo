import { productModel } from '../../models/product.model';
import { ProductError } from '../../utils/product-error';


export const getProductById = async (_: unknown, { id }: { id: string }) => {
  try {
    const product = await productModel.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error: unknown) {
    ProductError(error, 'Product not found');
    throw new Error (`Product not found`)
  }
};
