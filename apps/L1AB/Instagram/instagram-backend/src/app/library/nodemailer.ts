import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'iteam0939@gmail.com',
    pass: 'ywnu efmf xomz xpbm',
  },
});

export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: 'iteam0939@gmail.com',
    to,
    subject: 'Reset Password Pinecone Intern',
    text,
  };

  await transporter.sendMail(options);
};
