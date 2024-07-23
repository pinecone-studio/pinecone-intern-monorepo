import { MutationResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models/category.model';

export const createCategory: MutationResolvers['createCategory'] = async (_, { name }) => {
  const category = await CategoryModel.create({ name });

  return category;
};