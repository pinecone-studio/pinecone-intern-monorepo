import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeByOtp: QueryResolvers['getEmployeeByOtp'] = async (_: unknown, { email, otpToken }) => {
  const employee = await EmployeeModel.findOne({ email });
  if (employee.otpToken === otpToken) {
    return employee;
  }
  throw new Error('Invalid OTP token');
};
