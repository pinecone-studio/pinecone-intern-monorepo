import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'leapinternteam2@gmail.com',
    pass: 'dkuw wizo uhig dfrn',
  },
});

export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: 'leapinternteam2@gmail.com',
    to,
    subject: 'Reset Password L1AB Team 2 Intern',
    text,
  };

  await transporter.sendMail(options);
};
