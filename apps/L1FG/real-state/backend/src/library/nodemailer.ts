import { createTransport } from 'nodemailer';

const transport = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Mail,
    pass: process.env.Mail_Password,
  },
});

export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: 'real.estate.mongolia.2025',
    to,
    subject: 'Reset Password',
    text,
  };
  await transport.sendMail(options);
};
