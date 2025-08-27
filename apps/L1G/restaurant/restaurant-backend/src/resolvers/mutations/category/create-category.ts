import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input: { categoryName } }) => {
  try {
    const newCategory = await CategoryModel.create({ categoryName });

    return newCategory;
  } catch (error) {
    throw new Error('Failed to create category');
  }
};
