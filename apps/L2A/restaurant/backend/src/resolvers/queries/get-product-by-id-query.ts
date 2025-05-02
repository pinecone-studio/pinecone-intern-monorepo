import { productModel } from '../../models/product.model';

export const getProductById = async (_: unknown, { id }: { id: string }) => {
    return await productModel.findById(id);
  };