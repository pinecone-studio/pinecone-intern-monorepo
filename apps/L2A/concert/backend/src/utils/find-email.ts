import { UserModel } from '../models';

export const findEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
