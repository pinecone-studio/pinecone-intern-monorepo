import { productModel } from '../../models/product.model';

export const getAllProducts = async () => {
  return await productModel.find();
};