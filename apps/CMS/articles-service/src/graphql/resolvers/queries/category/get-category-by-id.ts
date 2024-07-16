import { QueryResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models';

export const getCategoryById: QueryResolvers['getCategoryById'] = async (_, { _id }) => {
  const category = await CategoryModel.findById(_id);

  if (!category) {
    throw new Error('Category not found');
  }

  return category;
};
