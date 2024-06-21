import { hrmsUserModel } from '@/models';
import graphqlErrorHandler, { errorTypes } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getHrmsUsers: QueryResolvers['getHrmsUsers'] = async () => {
  try {
    const users = await hrmsUserModel.find();
    return users;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
