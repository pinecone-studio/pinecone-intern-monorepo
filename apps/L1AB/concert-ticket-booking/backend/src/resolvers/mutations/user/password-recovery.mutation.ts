import { MutationResolvers, Response } from '../../../generated';
import { otpModel, userModel } from '../../../models';

export const passwordRecovery: MutationResolvers['passwordRecovery'] = async (_, { input }) => {
  const { email, password, otp } = input;

  const user = await otpModel.findOne({
    email,
  });

  if (!user) throw new Error('User not found');
  
  if (user.otp !== otp) throw new Error('Invalid OTP');

  await userModel.updateOne(
    {
      password,
    }
  );

  return Response.Success;
};
