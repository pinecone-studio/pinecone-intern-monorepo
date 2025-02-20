import { generateOTP } from 'otp-agent';

import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import { sendEmail } from '../../../library/nodemailer';

export const RequestChangePassword: MutationResolvers['RequestChangePassword'] = async (_, { input }) => {
  const { email } = input;

  const findEmail = await UserModel.findOne({ email: email });

  if (!findEmail) throw new Error('Таны имэйл олдсонгүй');

  const otp = generateOTP();

  await UserModel.findOneAndUpdate({ email }, { otp }, { new: true });

  await sendEmail(email, `Your OTP is ${otp}`);

  return {
    email,
  };
};
