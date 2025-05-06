import { categoryModel } from '../../models/category.model';
import { AddCategoryInput } from '../../generated';

export const addCategory = async (_: unknown, { input }: { input: AddCategoryInput }) => {
  const { name } = input;

  try {
    const createdCategory = await categoryModel.create({ name: name });
    return createdCategory;
  } catch (error) {
    throw new Error(`Error creating category: ${error}`);
  }
};
