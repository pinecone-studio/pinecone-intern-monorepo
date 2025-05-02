import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';

export const getProductsByCategory = async (_: unknown, { categoryId }: { categoryId: string }) => {
  try {
    const products = await productModel.find({ category: new Types.ObjectId(categoryId) });

    if (!products || products.length === 0) {
      throw new Error('Product not found');
    }

    return products;
  } catch (error: unknown) {
    handleError(error);
  }
};

const handleError = (error: unknown): never => {
  if (error instanceof Error && error.message === 'Product not found') {
    throw new Error('Product not found');
  }
  throw new Error('Error fetching products by category');
};
