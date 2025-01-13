import nodemailer from 'nodemailer';

export const emailSender = async (sendEmail: string, subject: string, html: string) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: process.env.EMAIL_USER,
    to: sendEmail,
    subject: subject,
    html: html,
  };

  await transport.sendMail(options);
};
