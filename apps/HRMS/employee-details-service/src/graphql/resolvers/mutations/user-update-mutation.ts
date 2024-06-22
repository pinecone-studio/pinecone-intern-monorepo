import { MutationResolvers } from '@/graphql/generated';
import { hrmsUserModel } from '@/models';
import graphqlErrorHandler, { errorTypes } from '../error';

export const updatedHrmsUser: MutationResolvers['updatedHrmsUser'] = async (_, { _id, input }) => {
  try {
    const updatedUserId = await hrmsUserModel.findByIdAndUpdate(_id, input);
    if (!updatedUserId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return updatedUserId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
