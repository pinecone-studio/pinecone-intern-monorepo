import { MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getAllEmployee: MutationResolvers['getAllEmployee'] = async () => {
  try {
    const employee = await EmployeeModel.find({});
    return employee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};
