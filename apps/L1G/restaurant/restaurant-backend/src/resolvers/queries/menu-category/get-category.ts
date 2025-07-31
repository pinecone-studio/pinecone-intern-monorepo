import { MenuCategoryModel } from 'src/models/menu-category.model';
import { QueryResolvers } from '../../../generated';

export const getCategoryById: QueryResolvers['getCategoryById'] = async (_, { categoryId }) => {
  const category = await MenuCategoryModel.findById(categoryId);

  if (!category) {
    throw new Error(`Category with ID ${categoryId} is not found`);
  }

  return category;
};
