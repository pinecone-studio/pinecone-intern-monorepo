import { MutationResolvers } from '@/graphql/generated';
import { hrmsUserModel } from '@/models';
import graphqlErrorHandler, { errorTypes } from '../error';

export const deletedHrmsUser: MutationResolvers['deletedHrmsUser'] = async (_, { _id }) => {
  try {
    const deletedHrmsUser = await hrmsUserModel.findByIdAndDelete(_id);
    if (!deletedHrmsUser) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return deletedHrmsUser;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
