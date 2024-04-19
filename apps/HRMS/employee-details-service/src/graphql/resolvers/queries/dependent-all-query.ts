import { DependentModel } from '@/models/dependent';
import graphqlErrorHandler, { errorTypes } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getAllDependents: QueryResolvers['getAllDependents'] = async () => {
  try {
    const getAllDependents = await DependentModel.find();
    return getAllDependents;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
