import {UserModel} from '@/models/user.model';
import graphqlErrorHandler, { errorTypes } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getUsers: QueryResolvers['getUsers'] = async () => {
  try {
    const getAllUsers = await UserModel.find();
    return getAllUsers;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};