import jwt from 'jsonwebtoken';
import { QueryResolvers } from '../../generated';
import { EmployeeModel } from '../../models';

export const getEmployeeByOtp: QueryResolvers['getEmployeeByOtp'] = async (_: unknown, { email, otpToken }) => {
  const employee = await EmployeeModel.findOne({ email });
  if (employee.otpToken === otpToken) {
    const token = jwt.sign(
      {
        id: employee.id,
      },
      process.env.SECRET!,
      { expiresIn: '1h' }
    );
    return { employee, token };
  }
  throw new Error('Invalid OTP token');
};
