import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getAllEmployees: QueryResolvers['getAllEmployees'] = async (_: unknown) => {
  const AllEmployees = await EmployeeModel.find();
  if (!AllEmployees) {
    throw new Error('There is no employees');
  }
  return AllEmployees;
};
