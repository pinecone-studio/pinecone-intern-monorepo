import { User } from '../generated';
import { userModel } from '../models';

export const findUserById = async (id: string): Promise<User> => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error('Хэрэглэгч олдсонгүй');
  }
  return user;
};
