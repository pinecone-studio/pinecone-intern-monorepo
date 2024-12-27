import { EmployeeStatus, MutationResolvers } from '../../../generated';
import { EmployeeModel } from '../../../models';

export const createEmployee: MutationResolvers['createEmployee'] = async (_, { input }) => {
  const { email, jobTitle, username, employeeStatus, createdAt } = input;
  if (!Object.values(EmployeeStatus).includes(employeeStatus)) {
    throw new Error('Invalid employee status');
  }
  const Employee = await EmployeeModel.create({
    email,
    jobTitle,
    username,
    adminStatus:false,
    employeeStatus,
    paidLeaveLimit:5,
    remoteLimit:5,
    freeLimit:5,
    createdAt,
  });

  return Employee;
};
