import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendEmail = async (to: string, otp: string) => {
  const options = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject: 'Reset Password L1AB Team 2 Intern',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #00B7F4;">Reset Password Request</h2>
        <p>Hi,</p>
        <p>Your OTP for resetting your password is:</p>
        <h3 style="
          display: inline-block;
          padding: 10px 20px;
          font-size: 24px;
          font-weight: bold;
          color: #00B7F4;
          border: 1px solid #00B7F4;
          border-radius: 5px;
          text-align: center;
        ">
          ${otp}
        </h3>
        <p>This OTP will expire in <strong>5 minutes</strong>. 
        <br>If you send another OTP request before its expiration, 
        <br>this OTP will be replaced by a new one.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">This email was sent by L1AB Team 2 Intern.</p>
      </div>
    `,
  };

  await transporter.sendMail(options);
};

export const QRGenerator = async (to: string, qrCodeDataURL: string) => {
  const options = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject: 'Your Booking QR Code',
    html: `
      <div>
        <h1>Танд доорх QR кодыг илгээлээ</h1>
        <p>Захиалгын мэдээлээ харахын тулд доорх QR кодыг уншуулна уу !</p>
        <img src="cid:qr-code" alt="QR Code" style="width:"300px; height:300px;" />
      </div>`,
    attachments: [
      {
        filename: 'qrcode.png',
        content: qrCodeDataURL.split(',')[1],
        encoding: 'base64',
        cid: 'qr-code',
      },
    ],
  };

  await transporter.sendMail(options);
};
