import { categoryModel } from "../../models/category.model";
export const categories = async () => {
  try {
    return await categoryModel.find();
  } catch (error) {
    throw new Error(`Error fetching categories: ${error}`);
  }
};