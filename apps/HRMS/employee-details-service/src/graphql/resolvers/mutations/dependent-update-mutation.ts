import { MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';
import graphqlErrorHandler, { errorTypes } from '../error';

export const updatedDependent: MutationResolvers['updatedDependent'] = async (_, { id, input }) => {
  try {
    const updateDependenId = await DependentModel.findByIdAndUpdate(id, input);
    if (!updateDependenId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return updateDependenId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
