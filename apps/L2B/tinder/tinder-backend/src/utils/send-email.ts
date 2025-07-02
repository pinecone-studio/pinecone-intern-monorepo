import nodemailer from "nodemailer";
type options = {
  email: string;
  content: string;
  tittle: string;
};
export const sendEmail = async (options: options) => {
  const mailSecret = process.env.MAIL_SECRET;
  const mail = process.env.MAIL;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: mail,
      pass: mailSecret,
    },
  });

  const mailOption = {
    from: "Tinder",
    to: options.email,
    subject: options.tittle,
    html: options.content,
  };
  await transporter.sendMail(mailOption);
};
