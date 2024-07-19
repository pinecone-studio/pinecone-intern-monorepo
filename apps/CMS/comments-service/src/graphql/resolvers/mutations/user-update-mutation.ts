import { MutationResolvers } from '@/graphql/generated';
import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';

export const updatedCmsUser: MutationResolvers['updatedCmsUser'] = async (_, { _id, input }) => {
  try {
    const updatedUserId = await cmsUserModel.findByIdAndUpdate(_id, input);
    if (!updatedUserId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return updatedUserId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
