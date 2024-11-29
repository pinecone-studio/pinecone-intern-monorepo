import { MutationResolvers } from '../../../generated';
import { Context } from '../../../handler';
import { userModel } from '../../../models';
import bcrypt from 'bcrypt';

const getUserIfExists = async (userId: string) => {
  return userModel.findById(userId);
};

const isPasswordCorrect = async (oldPassword: string, storedPassword: string) => {
  return bcrypt.compare(oldPassword, storedPassword);
};

const updatePassword = async (userId: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return userModel.findByIdAndUpdate(userId, { password: hashedPassword });
};

export const passwordUpdate: MutationResolvers['passwordUpdate'] = async (_, { input }, { user }: Context) => {
  const { oldPassword, newPassword } = input;

  if (!user?.userId) {
    return {
      success: false,
      message: 'Хэрэглэгч нэвтэрч ороогүй байна.',
    };
  }

  const existingUser = await getUserIfExists(user.userId);
  if (!existingUser) {
    return {
      success: false,
      message: 'Хэрэглэгч олдсонгүй.',
    };
  }

  const passwordIsValid = await isPasswordCorrect(oldPassword, existingUser.password);
  if (!passwordIsValid) {
    return {
      success: false,
      message: 'Нууц үг таарахгүй байна.',
    };
  }

  await updatePassword(user.userId, newPassword);

  return {
    success: true,
    message: 'Нууц үг амжилттай шинэчлэгдлээ.',
  };
};