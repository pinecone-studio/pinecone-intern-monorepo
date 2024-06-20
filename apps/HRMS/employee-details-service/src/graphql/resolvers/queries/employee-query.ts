import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getEmployeeDetails: QueryResolvers['getEmployee'] = async (_: unknown, { id }: { id: string }) => {
  try {
    const employee = await EmployeeModel.findById(id).lean();

    if (!employee) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
    return employee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
