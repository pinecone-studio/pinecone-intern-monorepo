import { QueryResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getEmployee: QueryResolvers['getEmployee'] = async (_, { id }) => {
  try {
    const employee = await EmployeeModel.findById(id).populate('relative');
    if (!employee) {
      throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
    }
    return employee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
