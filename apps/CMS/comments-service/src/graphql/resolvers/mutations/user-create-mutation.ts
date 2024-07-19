import { MutationResolvers } from '@/graphql/generated';
import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';

export const createCmsUser: MutationResolvers['createCmsUser'] = async (_, { input }) => {
  try {
    const create = await cmsUserModel.create(input);
    return create;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
