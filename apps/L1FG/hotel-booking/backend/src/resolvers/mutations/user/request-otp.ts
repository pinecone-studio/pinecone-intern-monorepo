/* eslint-disable @nx/enforce-module-boundaries */
import { sendEmail } from 'apps/L1FG/restaurant/backend/src/library/nodemailer';
import { generateOTP } from 'otp-agent';
import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const requestOTP: MutationResolvers['requestOTP'] = async (_, { input }) => {
  const { email } = input;
  const user = await UserModel.findOne({ email });

  if (user) return { success: false, email: email };

  const otp = generateOTP({ length: 4 });

  await sendEmail(email, `Your OTP is ${otp}`);

  await UserModel.create({ email, otp });

  return { success: true, email: email };
};
