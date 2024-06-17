import { QueryResolvers, QueryGetEmployeeArgs } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const getEmployee: QueryResolvers['getEmployee'] = async (_parent, args: QueryGetEmployeeArgs) => {
  try {
    const { id } = args;
    const employee = await EmployeeModel.findById(id).populate('relative');
    if (!employee) {
      throw graphqlErrorHandler({ message: 'Ажилтан олдсонгүй' }, errorTypes.NOT_FOUND);
    }
    return employee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
