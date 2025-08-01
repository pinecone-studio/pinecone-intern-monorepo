import { CategoryModel } from 'src/models/category.model';
import { QueryResolvers } from '../../../generated';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  const categories = await CategoryModel.find();

  return categories;
};
