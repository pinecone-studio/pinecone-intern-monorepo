import { MutationResolvers } from '@/graphql/generated';
import graphqlErrorHandler, { errorTypes } from '../error';
import { EmployeeModel } from '@/models/employee';

export const updateEmployment: MutationResolvers['updateEmployment'] = async (_, { id, input }) => {
  try {
    const updateEmploymentId = await EmployeeModel.findByIdAndUpdate(id, input, { new: true });
    if (!updateEmploymentId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return updateEmploymentId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
