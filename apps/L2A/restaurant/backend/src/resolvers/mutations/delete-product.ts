import { DeleteProductInput, Product } from '../../generated';
import { productModel } from '../../models/product.model';

export const deleteProduct = async (_: unknown, { input }: { input: DeleteProductInput }): Promise<Product | null> => {
  try {
    const { _id } = input;
    const product = await productModel.findByIdAndDelete(_id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (err) {
    throw new Error(`Error deleting product: ${err}`);
  }
};
