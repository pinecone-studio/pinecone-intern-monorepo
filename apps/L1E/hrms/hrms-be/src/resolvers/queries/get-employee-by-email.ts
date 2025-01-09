import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeByEmail: QueryResolvers['getEmployeeByEmail'] = async (_: unknown, { email }) => {
  const employee = await EmployeeModel.findOne({ email });
  console.log(employee);

  if (!employee) {
    throw new Error('No employee found with the provided email address');
  }

  return employee;
};
