import { CreateEmployeeInput, MutationResolvers } from '@/graphql/generated';
import { EmployeeModel } from '@/models/employee';

export const createEmployee: MutationResolvers['Employee'] = async (_: string, { firstName, lastName, email, department, jobTitle, ladderLevel, salary, employmentStatus }: CreateEmployeeInput) => {
  const createEmloyee = await EmployeeModel.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    department: department,
    jobTitle: jobTitle,
    ladderLevel: ladderLevel,
    salary: salary,
    employmentStatus: employmentStatus,
  });
  if (!createEmloyee) {
    throw new Error('failed create employee');
  }
  return createEmloyee;
};
