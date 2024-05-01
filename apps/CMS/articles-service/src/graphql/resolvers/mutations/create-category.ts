import { CategoryModel } from '../../../models/category.model';
import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';

export const createCategory: MutationResolvers['createCategory'] = async (_, { name }) => {
  try {
    const newCategory = await CategoryModel.create({ name });
    return newCategory;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot created category' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
