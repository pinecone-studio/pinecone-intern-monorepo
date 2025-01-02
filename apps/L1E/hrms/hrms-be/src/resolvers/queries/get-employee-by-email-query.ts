import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeByEmail: QueryResolvers['getEmployeeByEmail'] = async (_: unknown, { email }) => {
  const employee = await EmployeeModel.findOne({ email });

  if (!employee) {
    throw new Error('There is no employee with this Email');
  }
  return employee;
};
