import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployees: QueryResolvers['getEmployees'] = async (_: unknown, { input }) => {
  const lead = input;
  const employees = await EmployeeModel.find({ employeeStatus: lead });
  if (!employees) {
    throw new Error('There is no employees');
  }
  return employees;
};
