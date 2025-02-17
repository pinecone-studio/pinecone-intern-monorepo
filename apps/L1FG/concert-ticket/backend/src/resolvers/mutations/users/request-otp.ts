import { generateOTP } from 'otp-agent';

import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import { sendEmail } from '../../../library/nodemailer';

export const RequestChangePassword: MutationResolvers['RequestChangePassword'] = async (_, { input }) => {
  const { email } = input;

  const otp = generateOTP();

  await UserModel.findOneAndUpdate({ email }, { otp }, { new: true });

  await sendEmail(email, `Your OTP is ${otp}`);

  return {
    email,
  };
};
