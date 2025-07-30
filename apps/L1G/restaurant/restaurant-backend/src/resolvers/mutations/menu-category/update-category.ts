
import { MutationResolvers } from 'src/generated';
import { MenuCategoryModel } from 'src/models/menu-category.model';

export const updateCategory: MutationResolvers['updateCategory'] = async (_, { categoryId, input: { categoryName } }) => {
  const updatedCategory = await MenuCategoryModel.findByIdAndUpdate(categoryId, { $set: { categoryName } }, { new: true, runValidators: true });

  if (!updatedCategory) {
    throw new Error(`Category with ID ${categoryId} is not found`);
  }

  return updatedCategory;
};

