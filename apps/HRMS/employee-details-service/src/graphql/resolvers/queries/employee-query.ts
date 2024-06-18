import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getEmployeeDetails: QueryResolvers['getEmployee'] = async (_: unknown, { id }: { id: string }) => {
  console.log('ID', id);
  try {
    const employee = await EmployeeModel.findById(id).lean();
    console.log('EE', employee);
    if (!employee) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
    return employee;
  } catch (error) {
    console.log('error', error);
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
