import { CreateEmployeeInput, MutationResolvers } from '../../generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const createEmployee: MutationResolvers['createEmployee'] = async (_: unknown, { input }: { input: CreateEmployeeInput }) => {
  try {
    const createEmloyee = await EmployeeModel.create(input);
    return createEmloyee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
