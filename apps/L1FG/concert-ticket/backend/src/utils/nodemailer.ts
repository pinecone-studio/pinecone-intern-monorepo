import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

type MailType = {
  to: string | undefined;
  OTP: string;
};

export const nodeMailer = async ({ to, OTP }: MailType) => {
  await transporter.sendMail({
    from: '<miketulgat@gmail.com>',
    to: to,
    subject: 'Concert ticket вэб сайт',
    text: OTP,
    html: `<div>Нууц үг сэргээх Код:${OTP}</div>`,
  });
};
