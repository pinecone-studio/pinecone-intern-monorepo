
import { MutationResolvers } from 'src/generated';
import { MenuCategoryModel } from 'src/models/menu-category.model';

export const deleteCategory: MutationResolvers['deleteCategory'] = async (_, { categoryId }) => {
  const deletedCategory = await MenuCategoryModel.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    throw new Error(`Category with ID ${categoryId} is not found`);
  }

  return deletedCategory;
};

