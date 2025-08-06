import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';
import { mapCategory } from '../../../utils/types/category-type';

export const updateCategory: MutationResolvers['updateCategory'] = async (_, { categoryId, input: { categoryName } }) => {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, { $set: { categoryName } }, { new: true, runValidators: true });

  if (!updatedCategory) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }

  return mapCategory(updatedCategory);
};
