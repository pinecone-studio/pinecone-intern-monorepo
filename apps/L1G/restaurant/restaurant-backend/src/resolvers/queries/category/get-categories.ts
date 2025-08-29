import { QueryResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
