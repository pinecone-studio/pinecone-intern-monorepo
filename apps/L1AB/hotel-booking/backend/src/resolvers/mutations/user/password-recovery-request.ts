import { MutationResolvers } from '../../../generated';
import { transporter } from '../../../library/nodemailer';
import { otpModel, userModel } from '../../../models';

export const passwordRecoveryRequest: MutationResolvers['passwordRecoveryRequest'] = async (_: unknown, { input }) => {
  const { email } = input;

  const user = await userModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);

  await otpModel.create({
    email: email,
    otp: generatedOTP,
  });

  await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <st21aye@gmail.com>',
    to: input.email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is ${generatedOTP}. This will expire in 5 minutes.`,
  });

  return {
    success: true,
    message: 'OTP sent successfully. Please check your email.',
  };
};
