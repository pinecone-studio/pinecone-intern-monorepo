import nodemailer, { Transporter } from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendMail = async (email: string, description: string, substitute: string, leaveType: string, endDate: Date) => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'internpinecone@gmail.com',
        pass: 'gcmxgpemfoabphsz',
      },
    });

    const mailOptions: MailOptions = {
      from: 'internpinecone@gmail.com',
      to: email,
      subject: 'Leaving request',
      text: `For ${leaveType} reason, I had to leave work until ${endDate}. My substitute worker is ${substitute}. ${description}`,
    };
    await transporter.sendMail(mailOptions);
    return { message: 'Email sent successfully' };
  } catch (error) {
    return { error: 'Failed to send email' };
  }
};
