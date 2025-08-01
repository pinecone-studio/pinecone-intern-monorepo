import { MutationResolvers } from 'src/generated';
import { CategoryModel } from 'src/models/category.model';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input: { categoryName } }) => {
  const newCategory = await CategoryModel.create({ categoryName });

  return newCategory;
};
