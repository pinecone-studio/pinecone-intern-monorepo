import { CreateEmployeeInput, MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

export const createEmployee: MutationResolvers['createEmployee'] = async (_: unknown, { input }: { input: CreateEmployeeInput }) => {
  console.log('inp', input);
  try {
    const createEmloyee = await EmployeeModel.create(input);
    console.log('re', createEmloyee);
    return createEmloyee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
