import { categoryModel } from '../../models/category.model';

type UpdateCategoryInput = {
  _id: string;
  name: string;
};
const validateCategoryId = (id: string) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Category ID is required and must be a string.');
  }
};
const validateCategoryName = (name: string) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Category name is required and must be a string.');
  }
};
const validateUpdateInput = (input: UpdateCategoryInput) => {
  validateCategoryId(input._id);
  validateCategoryName(input.name);
};
export const updateCategory = async (_: unknown, input: UpdateCategoryInput) => {
  try {
    validateUpdateInput(input);
    const updatedCategory = await categoryModel.findByIdAndUpdate(input._id, { name: input.name, updatedAt: new Date() }, { new: true });
    if (!updatedCategory) {
      throw new Error('Category not found.');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error(`Error updating category: ${error}`);
  }
};
