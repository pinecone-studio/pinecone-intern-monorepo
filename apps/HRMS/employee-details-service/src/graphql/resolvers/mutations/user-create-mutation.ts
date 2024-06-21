import { MutationResolvers } from '@/graphql/generated';
import { hrmsUserModel } from '@/models';
import graphqlErrorHandler, { errorTypes } from '../error';

export const createHrmsUser: MutationResolvers['createHrmsUser'] = async (_, { input }) => {
  try {
    const create = await hrmsUserModel.create(input);
    return create;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
