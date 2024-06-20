import { CategoryModel } from '@/models/category.model';
import { MutationResolvers } from '@/graphql/generated';

export const createCategory: MutationResolvers['createCategory'] = async (_: unknown, { categoryInput }) => {
  const category = await CategoryModel.create(categoryInput);
  return category;
};
