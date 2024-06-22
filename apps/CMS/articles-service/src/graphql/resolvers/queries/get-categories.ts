import { CategoryModel } from '@/models/category.model';
import { QueryResolvers } from '@/graphql/generated';
import { GraphQLError } from 'graphql';

export const getCategories: QueryResolvers['getCategories'] = async () => {
  try {
    const categories = await CategoryModel.find();
    if (!categories) {
      throw new GraphQLError('Category not found');
    }
    return categories;
  } catch (error) {
  
    throw new GraphQLError('Database error');
  }
};
