import { categoryModel } from '../../models/category.model';

type DeleteCategoryInput = {
  _id: string;
};
const validateDeleteInput = (input: DeleteCategoryInput) => {
  if (!input._id || typeof input._id !== 'string') {
    throw new Error("Category ID is required and must be a string.");
  }
};
export const deleteCategory = async (_: unknown, input: DeleteCategoryInput) => {
  try {
    validateDeleteInput(input);
    const deletedCategory = await categoryModel.findByIdAndDelete(input._id);
    if (!deletedCategory) {
      throw new Error("Category not found.");
    }
    return deletedCategory;
  } catch (error) {
    throw new Error(`Error deleting category: ${error}`);
  }
};
