import { MutationResolvers } from '@/graphql/generated';
import graphqlErrorHandler, { errorTypes } from '../error';
import { EmployeeModel } from '@/models/employee';

export const personalUpdate: MutationResolvers['personalUpdate'] = async (_, { id, input }) => {
  try {
    const personalUpdateId = await EmployeeModel.findByIdAndUpdate(id, input);
    if (!personalUpdateId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return personalUpdateId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};

