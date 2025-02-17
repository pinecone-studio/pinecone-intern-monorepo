import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'miketulgat@gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'miketulgat@gmail.com',
    pass: 'rooi ijxr uqyi radk',
  },
});

export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: 'miketulgat@gmail.com',
    to,
    subject: 'Reset Password Pinecone Intern',
    text,
  };

  await transporter.sendMail(options);
};
