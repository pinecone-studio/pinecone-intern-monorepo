import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeByEmail: QueryResolvers['getEmployeeByEmail'] = async (_: unknown, { email }) => {
  const OTP = Math.floor(1000 + Math.random() * 9000);
  const tokenDate = new Date();
  const employee = await EmployeeModel.findOneAndUpdate(
    { email },
    {
      otpToken: OTP.toString(),
      otpUpdatedAt: tokenDate,
    }
  );

  if (!employee) {
    throw new Error('No employee found with the provided email address');
  }

  return employee;
};
