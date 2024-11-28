import { sendEmail } from '../../../app/library/nodemailer';
import { MutationResolvers } from '../../../generated';
import { otpModel, userModel } from '../../../models';
import { generateOTP } from 'otp-agent';

export const requestOtp: MutationResolvers['requestOtp'] = async (_, { input }) => {
  const { email } = input;

  const otp = generateOTP();

  const user = await userModel.findOne({
    email,
  });

  if (!user) throw new Error('User not found');

  await otpModel.create({
    email,
    otp,
  });

  await sendEmail(email, `Your OTP is ${otp}.`);

  return {
    success: true,
    email,
  };
};
