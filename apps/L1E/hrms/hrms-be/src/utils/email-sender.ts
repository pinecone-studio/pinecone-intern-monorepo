import nodemailer from 'nodemailer';

export const emailSender = async (sendEmail: string, subject: string, html: string) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dash.altanshagai48@gmail.com',
      pass: 'silrfrwgqbzvcyyf',
    },
  });

  const options = {
    from: 'dash.altanshagai48@gmail.com',
    to: sendEmail,
    subject: subject,
    html: html,
  };

  await transport.sendMail(options);
};
