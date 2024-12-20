import { MutationResolvers } from '../../../generated';
import { EmployeeModel } from '../../../models';

export const deleteEmployee: MutationResolvers['deleteEmployee'] = async (_, { id }) => {
  const employeeDeleted = await EmployeeModel.findByIdAndDelete(id);
  if (!employeeDeleted) {
    throw new Error('Employee not found');
  }
  return employeeDeleted;
};
