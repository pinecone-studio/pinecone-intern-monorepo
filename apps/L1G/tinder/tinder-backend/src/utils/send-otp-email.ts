import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export const sendOtpEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.OTP_EMAIL,
    to,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is: <strong>${otp}</strong>. It is valid for one minute.</p>`,

  });
};
