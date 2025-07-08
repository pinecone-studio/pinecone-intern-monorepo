import nodemailer from 'nodemailer';

export const sendResetEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Password Reset Code',
    text: `Your 4-digit code is: ${code}`,
  });
};
