import nodemailer from 'nodemailer';
import { catchError } from './catch-error';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (email: string, otp: number): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: `"Ticket booking app" <${process.env.EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: 'Нууц үг солих хүсэлт!', // Subject line
      text: 'Нууц үг солих нэг удаагийн код', // plain text body
      html: `</b>
            <h3>Таны нэг удаагийн код: ${otp} </h3>
            <br>`, // html body
    });
    return true;
  } catch (err) {
    catchError(err);
    return false;
  }
};
