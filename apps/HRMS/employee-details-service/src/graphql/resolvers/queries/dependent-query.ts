import { QueryResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getDependent: QueryResolvers['getDependent'] = async (_, { id }) => {
  try {
    const getDependent = await DependentModel.findById(id);

    if (!getDependent) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return getDependent;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
