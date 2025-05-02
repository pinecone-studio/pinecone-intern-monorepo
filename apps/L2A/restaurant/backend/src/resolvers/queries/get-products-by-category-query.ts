import {productModel} from '../../models/product.model';
import { Types } from 'mongoose';

export const getProductsByCategory = async (_: unknown, { categoryId }: { categoryId: string }) => {
    return await productModel.find({ category: new Types.ObjectId(categoryId) });
  };