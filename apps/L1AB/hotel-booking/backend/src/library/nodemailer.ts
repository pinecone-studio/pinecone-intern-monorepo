import { createTransport } from 'nodemailer';

export const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'st21aye@gmail.com',
    pass: 'rqpx kpje xnqo qnbe',
  },
});

export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: 'Maddison Foo Koch 👻" <st21aye@gmail.com>',
    to,
    subject: 'Reset Password Pinecone Intern',
    text,
  };

  await transporter.sendMail(options);
};
