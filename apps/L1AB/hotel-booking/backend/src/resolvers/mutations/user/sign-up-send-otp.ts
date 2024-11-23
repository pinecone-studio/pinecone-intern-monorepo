import { MutationResolvers } from '../../../generated';
import { transporter } from '../../../library/nodemailer';
import { otpModel, userModel } from '../../../models';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signUpSendOtp: MutationResolvers['signUpSendOtp'] = async (_, { email }) => {
  if (!email || !emailRegex.test(email)) {
    return {
      success: false,
      message: 'Invalid email format',
    };
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const generatedOTP = Math.floor(1000 + Math.random() * 9000);
  const hashedOTP = String(generatedOTP); 

  await otpModel.create({
    email,
    otp: hashedOTP,
  });

  await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <st21aye@gmail.com>`,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is ${generatedOTP}. This will expire in 5 minutes.`,
  });

  return {
    success: true,
    message: 'OTP sent successfully. Please check your email.',
  };
};
