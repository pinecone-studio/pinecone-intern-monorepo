import { UpdateCategoryInput } from '../../generated';
import { categoryModel } from '../../models/category.model';

export const updateCategory = async (_: unknown, { input }: { input: UpdateCategoryInput }) => {
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(input._id, { name: input.name, updatedAt: new Date() }, { new: true });
    if (!updatedCategory) {
      throw new Error('Category not found.');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error(`Error updating category: ${(error as Error).message}`);
  }
};
