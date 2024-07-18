import { MutationResolvers } from '@/graphql/generated';
import { cmsUserModel } from '@/models';
import { graphqlErrorHandler, errorTypes } from '../error';

export const deletedCmsUser: MutationResolvers['deletedCmsUser'] = async (_, { _id }) => {
  try {
    const deletedCmsUser = await cmsUserModel.findByIdAndDelete(_id);
    if (!deletedCmsUser) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return deletedCmsUser;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
