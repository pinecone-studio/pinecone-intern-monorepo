import { QueryResolvers } from '@/graphql/generated';
import { CategoryModel } from '@/models/category.model';
import { GraphQLError } from 'graphql';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find({});
    return categories;
  } catch (error) {
    throw new GraphQLError('error');
  }
};
