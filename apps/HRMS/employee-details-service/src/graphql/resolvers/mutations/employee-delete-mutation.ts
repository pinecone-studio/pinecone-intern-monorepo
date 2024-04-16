import { Employee, MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const deleteEmployee: MutationResolvers['EmployeeDelete'] = async (_: string, { id }: Employee) => {
  const deleteEmployeeId = await EmployeeModel.findByIdAndDelete(id);
  if (!deleteEmployeeId) {
    throw new Error('failed to delete Employee');
  }
  return deleteEmployeeId;
};
