import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';
import { MutationResolvers } from '@/graphql/generated';

export const EmployeeDependentUpdate: MutationResolvers['EmployeeDependentUpdate'] = async (_, { id, input }) => {
  try {
    const EmployeeDependentUpdate = await EmployeeModel.findByIdAndUpdate(id, input, { new: true }).populate('relative');
    if (!EmployeeDependentUpdate) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND);
    }
    return EmployeeDependentUpdate;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
