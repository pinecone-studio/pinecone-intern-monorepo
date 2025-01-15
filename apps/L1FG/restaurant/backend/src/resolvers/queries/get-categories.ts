import { QueryResolvers } from '../../generated';
import { CategoryModel } from '../../models/category';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find();

    return categories;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error fetching food items: ' + error.message);
    }

    throw new Error('Error fetching food items: An unknown error occurred');
  }
};
