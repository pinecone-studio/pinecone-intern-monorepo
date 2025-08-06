import { QueryResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';
import { mapCategory } from 'src/utils/types/category-type';

export const getCategoryById: QueryResolvers['getCategoryById'] = async (_, { categoryId }) => {
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  return mapCategory(category);
};
