import { QueryResolvers } from '@/graphql/generated';
import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';

export const getCmsUser: QueryResolvers['getCmsUser'] = async (_, { _id }) => {
  try {
    const cmsUser = await cmsUserModel.findById(_id);

    if (!cmsUser) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return cmsUser;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
