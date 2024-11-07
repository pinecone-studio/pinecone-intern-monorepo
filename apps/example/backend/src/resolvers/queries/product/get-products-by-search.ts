import { QueryResolvers } from '../../../generated';
import { productModel, ProductPopulatedType } from '../../../models';

export const getProductsBySearch: QueryResolvers['getProductsBySearch'] = async (_, { searchValue }) => {
  if (!searchValue) {
    return [];
  }
  const products = await productModel.find({ name: { $regex: searchValue, $options: 'i' } }).populate<ProductPopulatedType>('category');

  return products;
};
