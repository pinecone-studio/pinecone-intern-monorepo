import { MutationResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models';

export const createCategory: MutationResolvers['createCategory'] = async (_, { name }) => {
  const category = await CategoryModel.create({ name });

  return category;
};