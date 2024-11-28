import { MutationResolvers } from '../../../generated';
import { otpModel, userModel } from '../../../models';
import bcrypt from 'bcrypt';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { email, password, otp } = input;

  const otpCheck = await otpModel.findOne({ email });

  if (!otpCheck) throw new Error('OTP is expired');

  if (otp !== otpCheck.otp) throw new Error('Invalid OTP');

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  await userModel.updateOne(
    {
      email,
    },
    {
      password: hash,
    }
  );

  return {
    success: true,
    message: 'successfully changed password',
  };
};
