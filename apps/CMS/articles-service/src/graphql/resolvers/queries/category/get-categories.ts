import { QueryResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models/category.model';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  const categories = await CategoryModel.find({});

  return categories;
};
