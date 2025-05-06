import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';
import { ProductError } from '../../utils/product-error';

export const getProductsByCategory = async (_: unknown, { categoryId }: { categoryId: string }) => {
  try {
    const products = await productModel.find({ category: new Types.ObjectId(categoryId) });

    if (!products || products.length === 0) {
      throw new Error('Product not found');
    }

    return products;
  } catch (error: unknown) {
    ProductError(error, 'Product not found');
  }
};
