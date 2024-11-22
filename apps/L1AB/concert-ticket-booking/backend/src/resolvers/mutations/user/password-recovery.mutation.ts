import { MutationResolvers, Response } from '../../../generated';
import { otpModel, userModel } from '../../../models';
import bcrypt from 'bcrypt';

export const passwordRecovery: MutationResolvers['passwordRecovery'] = async (_, { input }) => {
  const { email, password, otp } = input;

  const user = await otpModel.findOne({
    email,
  });

  if (!user) throw new Error('User not found');

  if (user.otp !== otp) throw new Error('Invalid OTP');

  const saltRounds = parseInt(process.env.SALTROUNDS as string);
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

  return Response.Success;
};
