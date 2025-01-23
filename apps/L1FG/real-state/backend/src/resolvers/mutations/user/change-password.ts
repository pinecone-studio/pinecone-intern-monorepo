import { MutationResolvers, Response } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { email, password, otp } = input;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('User not Found');
  }

  if (user.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.updateOne(
    { email },
    {
      password: hashedPassword,
      otp: '',
    }
  );
  return Response.Success;
};
