import { MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';
import graphqlErrorHandler, { errorTypes } from '../error';

type inputType = {
  firstname: string;
  lastname: string;
  email: string;
  imageURL: string;
  department: string;
  jobTitle: [string];
  ladderLevel: string;
  salary: number;
  dateOfEmployment: Date;
  employmentStatus: string;
};

export const createEmployee: MutationResolvers['createEmployee'] = async (_: unknown, { input }: { input: inputType }) => {
  console.log('inp', input);
  try {
    const createEmloyee = await EmployeeModel.create(input);
    console.log('re', createEmloyee);
    return createEmloyee;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
  }
};
