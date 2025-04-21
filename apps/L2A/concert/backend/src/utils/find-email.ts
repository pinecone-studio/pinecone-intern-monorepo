import { UserModel } from '../models';

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй');
  }
  return user;
};
