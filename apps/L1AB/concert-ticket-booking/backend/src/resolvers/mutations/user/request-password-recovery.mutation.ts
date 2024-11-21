import { sendEmail } from '../../../library/nodemailer';
import { MutationResolvers } from '../../../generated';
import { otpModel } from '../../../models';
import { generateOTP } from 'otp-agent';

export const requestPasswordRecovery: MutationResolvers["requestPasswordRecovery"] = async (_, { input }) => {
  const { email } = input;

  const otp = generateOTP();

  await otpModel.create({
    email,
    otp,
  });

  await sendEmail(email, `Your OTP is ${otp}. This will expire in 5 minute`);

  return {
    success: true,
    email
  };
};
