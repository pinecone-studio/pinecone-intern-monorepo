import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';
import { QueryResolvers } from '@/graphql/generated';

export const getCmsUsers: QueryResolvers['getCmsUsers'] = async () => {
  try {
    const users = await cmsUserModel.find();
    return users;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
