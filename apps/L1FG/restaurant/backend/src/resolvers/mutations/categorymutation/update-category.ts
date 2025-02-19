import { MutationResolvers } from '../../../generated';
import { CategoryModel } from '../../../models';

export const updateCategoryName: MutationResolvers['updateCategoryName'] = async (_, { input }) => {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(input.id, { categoryName: input.categoryName }, { new: true });
  if (!updatedCategory) {
    throw new Error('Category not found');
  }
  return updatedCategory;
};
