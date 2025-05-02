import { productModel } from '../../models/product.model';

const handleGetProductByIdError = (error: unknown) => {
  if (error instanceof Error && error.message === 'Product not found') {
    throw error;
  }
  throw new Error('Error fetching product by ID');
};

export const getProductById = async (_: unknown, { id }: { id: string }) => {
  try {
    const product = await productModel.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error: unknown) {
    handleGetProductByIdError(error);
  }
};
