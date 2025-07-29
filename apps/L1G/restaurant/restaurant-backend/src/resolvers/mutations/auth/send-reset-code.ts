import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';
import { sendResetEmail } from 'src/utils/send-email';

export const sendResetCode: MutationResolvers['sendResetCode'] = async (_, { input: { email } }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  user.resetCode = code;
  user.resetCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ new: true });

  await sendResetEmail(email, code);
  return true;
};
