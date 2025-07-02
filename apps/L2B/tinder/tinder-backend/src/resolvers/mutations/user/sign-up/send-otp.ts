import { userModel } from '../../../../models';
import { sendEmail } from '../../../../utils/send-email';

export const sendOTP = async (_: unknown, { email }: { email: string }) => {
  try {
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const newUser = await userModel.create({
      email,
      verficationCode,
    });

    await sendEmail({
      email,
      content: `<p>${verficationCode}</p>`,
      tittle: 'Your OTP code',
    });

    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
