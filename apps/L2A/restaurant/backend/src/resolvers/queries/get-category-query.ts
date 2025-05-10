import { categoryModel } from "../../models/category.model";

export const getCategoryById = async (_: unknown, { id }: { id: string }) => {
  try {
    const foundCategory = await categoryModel.findById(id);
    if (!foundCategory) {
      throw new Error('Category not found');
    }
    return foundCategory;
  } catch (error) {
    throw new Error(`Error fetching category: ${error}`);
  }
};