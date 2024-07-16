import { QueryResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  const categories = await CategoryModel.find({});

  return categories;
};
