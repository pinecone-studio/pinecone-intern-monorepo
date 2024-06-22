import { QueryResolvers } from '@/graphql/generated';
import { hrmsUserModel } from '@/models';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getHrmsUser: QueryResolvers['getHrmsUser'] = async (_, { _id }) => {
  try {
    const getHrmsUser = await hrmsUserModel.findById(_id);

    if (!getHrmsUser) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return getHrmsUser;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
