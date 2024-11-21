import { MutationResolvers } from '../../../generated';
import { otpModel, userModel } from '../../../models';
import bcrypt from 'bcrypt';

export const passwordChange: MutationResolvers['passwordChange'] = async (_: unknown, { input }) => {
  const { email, otp, password } = input;

  const response = await otpModel.findOne({ email });
  if (!response) throw new Error('OTP is expired');

  if (response.otp !== otp) throw new Error('Invalid OTP');

  const hashedPassword = await bcrypt.hash(password, 10);

  await userModel.updateOne({ email }, { password: hashedPassword });

  return { success: true, message: 'Your password successfully changed' };
};
