import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_SECRET,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `Your App <${process.env.MAIL}>`,
    to: email,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>🔐 Verification Code</h2>
        <p>Here is your OTP code:</p>
        <h3 style="background: #f4f4f4; padding: 10px; display: inline-block;">${otp}</h3>
        <p>This code will expire in 15 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw new Error('Failed to send OTP email');
  }
};
