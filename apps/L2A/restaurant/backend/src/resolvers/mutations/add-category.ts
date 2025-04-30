import { categoryModel } from '../../models/category.model';

type AddCategoryInput = {
  name: string;
};
const validateCategoryInput = (input: AddCategoryInput) => {
    if (!input.name || typeof input.name !== 'string') {
      throw new Error("Category name is required and must be a string.");
    }
  };
  export const addCategory = async (_: unknown, input: AddCategoryInput) => {
    try {
      validateCategoryInput(input);
      return await createCategory(input);
    } catch (error) {
      throw new Error(`Error adding category: ${error}`);
    }
  };
  const createCategory = async (input: AddCategoryInput) => {
    try {
      return await categoryModel.create({ name: input.name });
    } catch (error) {
      throw new Error(`Error creating category: ${error}`);
    }
  };

  