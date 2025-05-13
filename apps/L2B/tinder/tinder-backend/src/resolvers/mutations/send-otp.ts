import { userModel } from '../../models';
import { sendEmail } from '../../utils/send-email';

export const sendOTP = async (_: unknown, { email }: { email: string }) => {
  try {
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newUser = await userModel.create({
      email,
      verficationCode: verficationCode,
    });
    await sendEmail({
      email,
      content: `<p>${verficationCode}</p>`,
      tittle: 'Your otp code',
    });
    return newUser;
  } catch (error) {
    throw new Error('failed to send otp mutation');
  }
};
