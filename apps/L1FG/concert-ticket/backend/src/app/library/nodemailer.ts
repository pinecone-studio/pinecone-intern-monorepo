import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maddison53@ethereal.email',
    pass: 'jn7jnAPss4f63QBp6D',
  },
});
export const sendEmail = async (to: string, text: string) => {
  const options = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to, // list of receivers
    subject: 'Hello ✔', // Subject line
    text,
    html: '<b>Hello world?</b>', // html body});
  };
  await transporter.sendMail(options);
};
