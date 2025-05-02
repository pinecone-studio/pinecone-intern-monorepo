import { productModel } from '../../models/product.model';
import { Types } from 'mongoose';

export const getAllProducts = async () => {
  return await productModel.find();
};

export const getProductById = async (_: unknown, { id }: { id: string }) => {
  return await productModel.findById(id);
};

export const getProductsByCategory = async (_: unknown, { categoryId }: { categoryId: string }) => {
  return await productModel.find({ category: new Types.ObjectId(categoryId) });
};
