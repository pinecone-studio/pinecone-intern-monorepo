import { QueryResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';
import { mapCategory } from 'src/utils/types/category-type';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories.map(mapCategory);
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
