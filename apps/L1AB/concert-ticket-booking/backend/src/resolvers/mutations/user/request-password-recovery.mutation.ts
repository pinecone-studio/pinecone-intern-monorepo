import { sendEmail } from '../../../library/nodemailer';
import { MutationResolvers } from '../../../generated';
import { otpModel, userModel } from '../../../models';
import { generateOTP } from 'otp-agent';

export const requestPasswordRecovery: MutationResolvers['requestPasswordRecovery'] = async (_, { input }) => {
  const { email } = input;

  const otp = generateOTP();

  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error('User not found');

  await otpModel.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true });

  await sendEmail(email, otp);

  return {
    success: true,
    email,
  };
};
