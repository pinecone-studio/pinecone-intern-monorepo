import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

interface IUser {
  email: string;
  resetCode?: string;
  resetCodeExpiresAt?: Date;
  newPassword?: string;
  code?: string;
}

function validateResetCode(user: IUser, code: string) {
  if (!user || user.resetCode !== code) {
    throw new Error('Invalid code');
  }
}

function validateResetCodeExpiration(user: IUser) {
  if (!user.resetCodeExpiresAt || new Date() > user.resetCodeExpiresAt) {
    throw new Error('Code expired');
  }
}

export const verifyResetCode: MutationResolvers['verifyResetCode'] = async (_, { input: { email, code } }) => {
  const user = await UserModel.findOne({ email });
  validateResetCode(user, code);
  validateResetCodeExpiration(user);
  return {
    success: true,
    message: 'Code verified successfully',
  };
};
