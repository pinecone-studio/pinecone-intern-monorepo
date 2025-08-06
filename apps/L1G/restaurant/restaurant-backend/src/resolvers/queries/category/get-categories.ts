import { CategoryModel } from 'src/models/category.model';
import { QueryResolvers } from '../../../generated';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
