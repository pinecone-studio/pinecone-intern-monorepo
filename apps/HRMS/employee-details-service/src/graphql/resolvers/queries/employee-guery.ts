import { Employee, QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const getEmployee: QueryResolvers['getEmployees'] = async (_:string, { _id }:Employee) => {
  try {
    const employee = await EmployeeModel.findById({ _id });
    if (!employee) {
      return null;
    }
    return employee.toObject();
  } catch (error) {
    throw new Error('Employee not found');
  }
};
