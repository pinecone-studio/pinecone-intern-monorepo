import { MutationResolvers } from '../../../generated';
import { generateOTP } from 'otp-agent';
import { UserModel } from '../../../models';
import { sendEmail } from '../../../library/nodemailer';

export const requestChangePassword: MutationResolvers['requestChangePassword'] = async (_, { input }) => {
  const { email } = input;
  const otp = generateOTP();
  await UserModel.updateOne(
    {
      email,
    },
    { otp }
  );
  await sendEmail(email, `Your OTP is ${otp}`);
  return { email };
};
