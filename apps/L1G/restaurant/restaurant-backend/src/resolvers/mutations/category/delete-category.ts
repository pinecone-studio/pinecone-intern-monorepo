import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';

export const deleteCategory: MutationResolvers['deleteCategory'] = async (_, { categoryId }) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  return deletedCategory;
};
