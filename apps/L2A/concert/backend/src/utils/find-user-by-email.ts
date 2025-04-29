import { userModel } from '../models';

export const findUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй');
  }
  return user;
};
