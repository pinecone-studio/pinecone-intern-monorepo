import { User } from '../generated';
import { userModel } from '../models';
import { catchError } from './catch-error';

export const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error('Хэрэглэгч олдсонгүй');
    }
    return user;
  } catch (err) {
    return catchError(err);
  }
};
