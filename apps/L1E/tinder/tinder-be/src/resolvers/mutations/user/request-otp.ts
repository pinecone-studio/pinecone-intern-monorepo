import { MutationResolvers } from '../../../generated';
import { otpModel } from '../../../models/user/otpmodel';
import nodemailer from 'nodemailer';

export const requestOtp: MutationResolvers['requestOtp'] = async (_, { input }) => {
  const { email, otp } = input;

  let response = await otpModel.findOne({ email });

  if (!response) {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    response = await otpModel.create({
      email,
      otp: newOtp,
      expiresAt,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'uzkhuthef@gmail.com',
        pass: 'fbvelrxjtwijqrsi',
      },
    });

    const mailOptions = {
      from: 'uzkhuthef@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${newOtp}.`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: false,
      message: 'A new OTP has been generated and sent to your email.',
      email,
    };
  }

  if (response.expiresAt < new Date()) {
    await otpModel.deleteMany({ email });
    throw new Error('OTP has expired. Please request a new one.');
  }

  if (response.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await otpModel.deleteMany({ email });

  return {
    success: true,
    email,
    message: 'OTP successfully validated.',
  };
};
