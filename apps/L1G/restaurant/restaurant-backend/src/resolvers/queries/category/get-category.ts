import { CategoryModel } from 'src/models/category.model';
import { QueryResolvers } from '../../../generated';

export const getCategoryById: QueryResolvers['getCategoryById'] = async (_, { categoryId }) => {
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new Error(`Category with ID ${categoryId} is not found`);
  }

  return category;
};
