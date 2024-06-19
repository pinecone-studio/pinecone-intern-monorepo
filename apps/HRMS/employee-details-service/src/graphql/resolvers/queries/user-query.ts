import { QueryResolvers } from '@/graphql/generated';
import {UserModel} from '@/models/user.model';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getUser: QueryResolvers['getUser'] = async (_, { _id }) => {
  try {
    const getUser = await UserModel.findById(_id);

    if (!getUser) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return getUser;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};