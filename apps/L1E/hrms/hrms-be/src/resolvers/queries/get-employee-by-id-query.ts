import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeById: QueryResolvers['getEmployeeById'] = async (_: unknown, { id }) => {
  const employee = await EmployeeModel.findById(id);
  console.log(employee);

  if (!employee) {
    throw new Error('There is no employee with this ID');
  }
  return employee;
};
