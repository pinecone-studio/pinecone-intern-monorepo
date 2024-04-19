import { MutationResolvers } from '@/graphql/generated';
import { DependentModel } from '@/models/dependent';
import graphqlErrorHandler, { errorTypes } from '../error';

export const deletedDependent: MutationResolvers['deletedDependent'] = async (_, { id }) => {
  try {
    const deletedDependent = await DependentModel.findByIdAndDelete(id);
    if (!deletedDependent) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }

    return deletedDependent;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
