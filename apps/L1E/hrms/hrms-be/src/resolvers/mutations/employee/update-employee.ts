import { MutationResolvers } from '../../../generated';
import { EmployeeModel } from '../../../models';

export const updateEmployee: MutationResolvers['updateEmployee'] = async (_, { input, id }) => {
  const { email, jobTitle, username, employeeStatus } = input;
  const Employee = await EmployeeModel.findByIdAndUpdate(
    id,
    {
      email,
      jobTitle,
      username,
      employeeStatus,
    },
    { new: true }
  );
  return Employee;
};
