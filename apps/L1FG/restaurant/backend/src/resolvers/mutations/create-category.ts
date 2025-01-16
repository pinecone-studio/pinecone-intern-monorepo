import { MutationResolvers } from '../../generated';
import { CategoryModel } from '../../models/category';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input }) => {
  const savedCategory = await CategoryModel.create(input);

  return savedCategory;
};
