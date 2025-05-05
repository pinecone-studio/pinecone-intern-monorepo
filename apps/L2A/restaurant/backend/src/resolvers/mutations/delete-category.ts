import { DeleteCategoryInput } from '../../generated';
import { categoryModel } from '../../models/category.model';

export const deleteCategory = async (_: unknown, { input }: { input: DeleteCategoryInput }) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(input._id);
    if (!deletedCategory) {
      throw new Error('Category not found.');
    }
    return deletedCategory;
  } catch (error) {
    throw new Error(`Error deleting category: ${(error as Error).message}`);
  }
};
