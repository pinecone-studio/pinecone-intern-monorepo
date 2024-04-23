import { Employee, MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const deleteEmployee: MutationResolvers['deleteEmployee'] = async (_, { id }) => {
  try {
    const deleteEmployeeId = await EmployeeModel.findByIdAndDelete(id);
    if (!deleteEmployeeId) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return deleteEmployeeId;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
