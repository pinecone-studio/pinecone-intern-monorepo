import { userModel } from '../../../../models';
import { sendEmail } from '../../../../utils/send-email';

export const sendForgotOtp = async (_: unknown, { email }: { email: string }) => {
  const verficationCode = Math.floor(1000 + Math.random() * 9000).toString();

  await userModel.updateOne({ email }, { $set: { verficationCode } });

  await sendEmail({
    email,
    content: `<p>${verficationCode}</p>`,
    tittle: 'Your OTP code',
  });

  return verficationCode;
};
