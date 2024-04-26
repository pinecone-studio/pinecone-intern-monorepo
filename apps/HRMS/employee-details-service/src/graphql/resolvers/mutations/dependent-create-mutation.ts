import { MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '../../../models/dependent';
import graphqlErrorHandler, { errorTypes } from '../error';

export const createDependent: MutationResolvers['createDependent'] = async (_, { input }) => {
  try {
    const create = await DependentModel.create(input);
    return create;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
